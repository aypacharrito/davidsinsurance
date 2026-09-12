import {normalizeQuoteRequest} from "../../../lib/quote-request";
import {NextRequest,NextResponse} from "next/server";

export const runtime="nodejs";

const LABELS:Record<string,string>={
  "insurance-type":"Insurance type",
  "full-name":"Full name",
  "date-of-birth":"Date of birth",
  phone:"Phone",
  email:"Email",
  address:"Home address",
  "vehicle-vin":"Vehicle VIN",
  "vehicle-year":"Vehicle year",
  vehicle:"Make and model",
  "vehicle-use":"Primary use",
  "annual-miles":"Estimated annual miles",
  "current-insurer":"Current insurer",
  "additional-auto":"Additional drivers or vehicles",
  "property-address":"Property address",
  "property-type":"Property type",
  occupancy:"Occupancy",
  "year-built":"Year built",
  "square-footage":"Approximate square footage",
  "current-home-insurer":"Current home insurer",
  "home-claims":"Claims in last 5 years",
  "life-type":"Life insurance type",
  "coverage-amount":"Coverage amount",
  "term-length":"Term length",
  "coverage-purpose":"Primary purpose",
  "tobacco-use":"Tobacco or nicotine use",
  "general-health":"General health",
  height:"Height",
  weight:"Weight",
  "existing-life-insurance":"Existing life insurance",
  notes:"Notes",
  "sms-consent":"SMS consent"
};

const clean=(v:unknown,max=2000)=>
  String(v??"").replace(/\u0000/g,"").trim().slice(0,max);

const esc=(s:string)=>
  s.replace(/&/g,"&amp;")
   .replace(/</g,"&lt;")
   .replace(/>/g,"&gt;")
   .replace(/"/g,"&quot;")
   .replace(/'/g,"&#039;");

const validEmail=(s:string)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

async function sendToPacifica(data:Record<string,string>,vehicles:ReturnType<typeof normalizeQuoteRequest>["vehicles"]) {
  const url=(process.env.PACIFICA_CRM_LEAD_URL?.trim() ||
    "https://pacificacrm.com/api/integrations/leads?workspace=user_3IO1vkCV5ltKY8npgIoZpwKrQTV&source=David%27s%20Insurance%20Website");
  const secret=(
    process.env.PACIFICA_CRM_WEBHOOK_SECRET?.trim() ||
    process.env.LEAD_WEBHOOK_SECRET?.trim() ||
    process.env.SMARTFINANCIAL_WEBHOOK_SECRET?.trim()
  );

  if(!url||!secret){
    console.warn("Pacifica CRM lead sync is not configured: no supported webhook secret env var was found.");
    return {ok:false,skipped:true};
  }

  const payload={
    ...data,
    vehicles,
    product:data["insurance-type"]==="auto"?(data["auto-type"]==="commercial"?"Commercial Auto":"Personal Auto"):data["insurance-type"],
    source:"David's Insurance Website",
    brand:"David's Insurance",
    disposition:"Received - not worked yet",
    received:new Date().toISOString(),
  };

  let lastStatus=0;
  let lastBody="";

  // One automatic retry for a temporary CRM/network failure.
  for(let attempt=0;attempt<2;attempt++){
    try{
      const response=await fetch(url,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "x-pacifica-webhook-secret":secret,
        },
        body:JSON.stringify(payload),
        cache:"no-store",
      });

      if(response.ok){
        return {ok:true,skipped:false};
      }

      lastStatus=response.status;
      lastBody=await response.text();

      // Don't retry auth/config/bad request problems.
      if(response.status<500)break;
    }catch(error){
      lastBody=error instanceof Error?error.message:String(error);
    }

    if(attempt===0){
      await new Promise(resolve=>setTimeout(resolve,350));
    }
  }

  console.error("Pacifica CRM lead sync failed",lastStatus,lastBody);
  return {ok:false,skipped:false};
}

export async function POST(req:NextRequest){
  try{
    const key=process.env.RESEND_API_KEY;
    if(!key){
      return NextResponse.json(
        {error:"Quote email service is not configured yet."},
        {status:500}
      );
    }

    const body=await req.json();

    if(!body||typeof body!=="object"||Array.isArray(body)){
      return NextResponse.json({error:"Invalid form data."},{status:400});
    }

    let normalized:ReturnType<typeof normalizeQuoteRequest>;
    try { normalized=normalizeQuoteRequest(body); }
    catch(error) { return NextResponse.json({error:error instanceof Error?error.message:"Invalid quote request."},{status:400}); }
    const {data,vehicles}=normalized;

    const name=clean(data["full-name"],120);
    const email=clean(data.email,254);
    const phone=clean(data.phone,80);
    const coverage=clean(data["insurance-type"],30).toLowerCase();

    if(!name||!phone||!validEmail(email)){
      return NextResponse.json(
        {error:"Please complete your name, phone number, and a valid email."},
        {status:400}
      );
    }

    if(!["auto","home","life"].includes(coverage)){
      return NextResponse.json(
        {error:"Please select Auto, Home, or Life."},
        {status:400}
      );
    }

    // Start CRM delivery immediately while we build/send the email.
    const crmPromise=sendToPacifica(data,vehicles);

    const rows=Object.entries(data)
      .filter(([,v])=>v!=="")
      .map(([k,v])=>
        `<tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e6e8eb;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:19px;color:#627083;font-weight:700;vertical-align:top;width:38%;">
            ${esc(LABELS[k]??k)}
          </td>
          <td style="padding:10px 12px;border-bottom:1px solid #e6e8eb;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:20px;color:#13243c;vertical-align:top;">
            ${esc(k==="sms-consent"?(v==="yes"?"Yes":"No"):v)}
          </td>
        </tr>`
      ).join("");

    const subject=`New ${coverage.toUpperCase()} quote request — ${name}`;

    const text=[
      "New David's Insurance quote request",
      "",
      ...Object.entries(data)
        .filter(([,v])=>v!=="")
        .map(([k,v])=>`${LABELS[k]??k}: ${v}`)
    ].join("\n");

    const html=`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
</head>
<body style="margin:0;background-color:#f7f5f0;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" bgcolor="#f7f5f0" style="padding-top:28px;padding-right:14px;padding-bottom:28px;padding-left:14px;background-color:#f7f5f0;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;background-color:#ffffff;">
          <tr>
            <td bgcolor="#142b4b" style="padding-top:24px;padding-right:28px;padding-bottom:24px;padding-left:28px;background-color:#142b4b;">
              <p style="margin:0 0 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#f8a496;font-weight:700;">DAVID'S INSURANCE</p>
              <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:24px;line-height:31px;color:#ffffff;font-weight:700;">New ${esc(coverage.toUpperCase())} quote request</h1>
            </td>
          </tr>
          <tr>
            <td bgcolor="#ffffff" style="padding-top:24px;padding-right:28px;padding-bottom:10px;padding-left:28px;background-color:#ffffff;">
              <p style="margin:0 0 6px 0;font-family:Arial,Helvetica,sans-serif;font-size:18px;line-height:25px;color:#13243c;font-weight:700;">${esc(name)}</p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:21px;color:#627083;">${esc(phone)} · ${esc(email)}</p>
            </td>
          </tr>
          <tr>
            <td bgcolor="#ffffff" style="padding-top:10px;padding-right:28px;padding-bottom:28px;padding-left:28px;background-color:#ffffff;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e6e8eb;">
                ${rows}
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const emailResponse=await fetch("https://api.resend.com/emails",{
      method:"POST",
      headers:{
        Authorization:`Bearer ${key}`,
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        from:process.env.QUOTE_FROM_EMAIL||
          "David's Insurance Website <quotes@davidsinsurance.org>",
        to:[
          process.env.QUOTE_TO_EMAIL||
          "davidscarinsurance@gmail.com"
        ],
        subject,
        text,
        html,
        reply_to:email
      }),
      cache:"no-store"
    });

    if(!emailResponse.ok){
      console.error("Resend error",emailResponse.status,await emailResponse.text());
      // Still let the CRM attempt finish before returning.
      await crmPromise;
      return NextResponse.json(
        {error:"We could not send your request. Please try again."},
        {status:502}
      );
    }

    const crm=await crmPromise;

    // Customer submission succeeds if the email is safely delivered.
    // CRM errors are logged server-side so a CRM outage does not make
    // the customer resubmit and create duplicate inquiries.
    return NextResponse.json({
      ok:true,
      crmSynced:crm.ok,
    });

  }catch(error){
    console.error("Quote form error",error);
    return NextResponse.json(
      {error:"We could not send your request. Please try again."},
      {status:500}
    );
  }
}
