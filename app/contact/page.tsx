"use client";
import {FormEvent,useRef,useState} from "react";
type Coverage="auto"|"home"|"life";type LifeType="term"|"whole"|"final"|"unsure";
const lifeAmounts:Record<LifeType,string[]>={term:["$100,000","$250,000","$500,000","$750,000","$1,000,000","$1,500,000","$2,000,000","Not sure"],whole:["$10,000","$25,000","$50,000","$100,000","$250,000","$500,000","Not sure"],final:["$5,000","$10,000","$15,000","$20,000","$25,000","$30,000","$40,000","$50,000","Not sure"],unsure:["$25,000","$50,000","$100,000","$250,000","$500,000","$1,000,000","Not sure"]};

export default function Contact(){
 const[coverage,setCoverage]=useState<Coverage>("auto");
 const[vehicleCount,setVehicleCount]=useState(1);
 const[autoType,setAutoType]=useState("personal");
 const[lifeType,setLifeType]=useState<LifeType>("term");
 const[status,setStatus]=useState<"idle"|"sending"|"success"|"error">("idle");
 const[msg,setMsg]=useState("");
 const[dobText,setDobText]=useState("");
 const dobPickerRef=useRef<HTMLInputElement>(null);

 function dateToDisplay(value:string){
   if(!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "";
   const [year,month,day]=value.split("-");
   return `${month}/${day}/${year}`;
 }

 function displayToDate(value:string){
   const match=value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
   if(!match) return "";
   const [,month,day,year]=match;
   return `${year}-${month}-${day}`;
 }

 function normalizeDobTyping(value:string){
   const digits=value.replace(/\D/g,"").slice(0,8);
   if(digits.length<=2) return digits;
   if(digits.length<=4) return `${digits.slice(0,2)}/${digits.slice(2)}`;
   return `${digits.slice(0,2)}/${digits.slice(2,4)}/${digits.slice(4)}`;
 }

 function openDobPicker(){
   const picker=dobPickerRef.current;
   if(!picker) return;
   const nativeValue=displayToDate(dobText);
   if(nativeValue) picker.value=nativeValue;
   if(typeof picker.showPicker==="function") picker.showPicker();
   else picker.click();
 }
 async function submit(e:FormEvent<HTMLFormElement>){
   e.preventDefault(); const form=e.currentTarget; setStatus("sending"); setMsg("");
   try{
     const data:Record<string,unknown>=Object.fromEntries(new FormData(form).entries());
     if(coverage==="auto") {
       data.vehicles=Array.from({length:vehicleCount},(_,i)=>Object.fromEntries(
         ["vin","year","makeModel","use","annualMiles"].map(field=>[field,data[`vehicle-${i+1}-${field}`]||""])
       ));
       for(const key of Object.keys(data)) if(/^vehicle-\d+-/.test(key)) delete data[key];
     }
     const r=await fetch("/api/quote",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
     const j=await r.json().catch(()=>({}));
     if(!r.ok) throw new Error(j.error||"We could not send your request.");
     setStatus("success");setMsg("Quote request received. David will contact you shortly.");form.reset();setDobText("");setCoverage("auto");setLifeType("term");setVehicleCount(1);setAutoType("personal");
   }catch(err){setStatus("error");setMsg(err instanceof Error?err.message:"We could not send your request. Please try again.");}
 }
 return <section className="inner shell"><p className="eyebrow">Get a personalized quote</p><h1>Request a quote.</h1><div className="contact-grid"><div><p className="lead">Share a few details and we’ll contact you to review coverage options. No obligation.</p><div className="contact-list"><a href="tel:+18005424242"><small>Call</small>1-800-542-4242</a><a href="mailto:davidscarinsurance@gmail.com"><small>Email</small>davidscarinsurance@gmail.com</a><div><small>Office</small>14445 Victory Blvd.<br/>Van Nuys, CA 91401</div></div></div>
 <form className="form quote-form" onSubmit={submit} autoComplete="on">
 <fieldset className="coverage-picker"><legend>What would you like to insure?</legend><div>{(["auto","home","life"] as Coverage[]).map(item=><button key={item} type="button" className={coverage===item?"active":""} onClick={()=>setCoverage(item)}>{item[0].toUpperCase()+item.slice(1)}</button>)}</div><input type="hidden" name="insurance-type" value={coverage}/></fieldset>
 <div className="form-section-title">Contact information</div>
 <label>First name<input required name="first-name" autoComplete="given-name" pattern={".*\\S.*"}/></label>
 <label>Last name<input required name="last-name" autoComplete="family-name" pattern={".*\\S.*"}/></label>
 <label>
   Date of birth
   <span style={{position:"relative",display:"block"}}>
     <input
       required
       type="text"
       name="date-of-birth"
       value={dobText}
       onChange={e=>setDobText(normalizeDobTyping(e.target.value))}
       autoComplete="bday"
       inputMode="numeric"
       placeholder="MM/DD/YYYY"
       pattern="(?:0[1-9]|1[0-2])/(?:0[1-9]|[12]\d|3[01])/\d{4}"
       title="Enter date of birth as MM/DD/YYYY"
       style={{paddingRight:"46px"}}
     />
     <button
       type="button"
       onClick={openDobPicker}
       aria-label="Choose date of birth from calendar"
       title="Choose date"
       style={{
         position:"absolute",
         right:"8px",
         top:"50%",
         transform:"translateY(-50%)",
         width:"32px",
         height:"32px",
         display:"grid",
         placeItems:"center",
         padding:0,
         border:"0",
         background:"transparent",
         cursor:"pointer",
         color:"currentColor"
       }}
     >
       <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
         <path d="M7 3v3M17 3v3M4.5 9h15M6.5 5h11a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
       </svg>
     </button>
     <input
       ref={dobPickerRef}
       type="date"
       tabIndex={-1}
       aria-hidden="true"
       onChange={e=>setDobText(dateToDisplay(e.target.value))}
       style={{
         position:"absolute",
         width:"1px",
         height:"1px",
         opacity:0,
         pointerEvents:"none",
         right:0,
         bottom:0
       }}
     />
   </span>
 </label>
 <label>Phone number<input required type="tel" name="phone" autoComplete="tel"/></label>
 <label>Email address<input required type="email" name="email" autoComplete="email"/></label>
 <label className="wide">Home address<input required name="address" autoComplete="street-address" placeholder="Street, city, state, ZIP"/></label>
 {coverage==="auto"&&<>
 <div className="form-section-title">Auto coverage</div>
 <label>Personal or commercial?<select name="auto-type" value={autoType} onChange={e=>setAutoType(e.target.value)}><option value="personal">Personal Auto</option><option value="commercial">Commercial Auto</option></select></label>
 <label>How many vehicles?<select name="vehicle-count" value={vehicleCount} onChange={e=>setVehicleCount(Number(e.target.value))}>{[1,2,3,4,5,6].map(n=><option key={n} value={n}>{n} {n===1?"vehicle":"vehicles"}</option>)}</select></label>
 {autoType==="commercial"&&<><label>Business name<input required name="business-name" autoComplete="organization"/></label><label>Business type / operations<input required name="business-type" placeholder="e.g. plumbing, delivery, construction"/></label><label className="wide">Business address<input required name="business-address" autoComplete="street-address"/></label></>}
 {Array.from({length:vehicleCount},(_,i)=><fieldset key={i} className="wide" style={{border:"1px solid #d6dee8",borderRadius:12,padding:16,display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,220px),1fr))",gap:16,minWidth:0}}>
 <legend>Vehicle {i+1}</legend>
 <label>VIN<input required name={`vehicle-${i+1}-vin`} minLength={17} maxLength={17} pattern="[A-HJ-NPR-Za-hj-npr-z0-9]{17}" title="Enter the 17-character VIN (no I, O, or Q)" placeholder="17-character VIN" autoCapitalize="characters" autoComplete="off"/></label>
 <label>Year<input required name={`vehicle-${i+1}-year`} inputMode="numeric" pattern="[0-9]{4}" placeholder="2022"/></label>
 <label>Make and model<input required name={`vehicle-${i+1}-makeModel`} placeholder="Toyota Camry"/></label>
 <label>Primary use<select name={`vehicle-${i+1}-use`} defaultValue="Commute"><option>Commute</option><option>Pleasure</option><option>Business</option><option>Delivery</option><option>Rideshare</option></select></label>
 <label>Estimated annual miles<input name={`vehicle-${i+1}-annualMiles`} type="number" min="0" step="1" placeholder="12000"/></label>
 </fieldset>)}
 <label>Current insurer<input name="current-insurer" placeholder="If currently insured" autoComplete="off"/></label>
 <label>Additional drivers?<select name="additional-auto"><option>No</option><option>Yes</option></select></label>
 </>}
 {coverage==="home"&&<><div className="form-section-title">Property information</div><label className="wide">Property address<input required name="property-address" placeholder="If different from home address" autoComplete="street-address"/></label><label>Property type<select name="property-type"><option>Single-family home</option><option>Condo</option><option>Townhome</option><option>Rental property</option></select></label><label>Occupancy<select name="occupancy"><option>Primary residence</option><option>Secondary residence</option><option>Tenant occupied</option><option>Vacant</option></select></label><label>Year built<input name="year-built" inputMode="numeric"/></label><label>Approximate square footage<input name="square-footage" inputMode="numeric"/></label><label>Current insurer<input name="current-home-insurer" placeholder="If currently insured" autoComplete="off"/></label><label>Claims in the last 5 years?<select name="home-claims"><option>No</option><option>Yes</option></select></label></>}
 {coverage==="life"&&<><div className="form-section-title">Coverage information</div><label>Type of life insurance<select name="life-type" value={lifeType} onChange={e=>setLifeType(e.target.value as LifeType)}><option value="term">Term life</option><option value="whole">Whole life</option><option value="final">Final expense</option><option value="unsure">Not sure yet</option></select></label><label>Coverage amount<select name="coverage-amount" key={lifeType}>{lifeAmounts[lifeType].map(amount=><option key={amount}>{amount}</option>)}</select></label>{lifeType==="term"&&<label>Term length<select name="term-length"><option>10 years</option><option>15 years</option><option>20 years</option><option>25 years</option><option>30 years</option><option>40 years</option><option>Not sure</option></select></label>}<label>Primary purpose<select name="coverage-purpose"><option>Income replacement</option><option>Mortgage protection</option><option>Final expenses</option><option>Family protection</option><option>Legacy or estate planning</option><option>Not sure</option></select></label><label>Tobacco or nicotine use?<select name="tobacco-use"><option>No</option><option>Yes</option></select></label><label>General health<select name="general-health"><option>Excellent</option><option>Good</option><option>Fair</option><option>Prefer to discuss</option></select></label><label>Height<input name="height" placeholder="5 ft 10 in"/></label><label>Weight<input name="weight" inputMode="numeric" placeholder="lbs"/></label><label>Existing life insurance?<select name="existing-life-insurance"><option>No</option><option>Yes</option></select></label></>}
 <label className="wide optional-note">Anything else we should know?<textarea name="notes" rows={3} placeholder="Optional"/></label>
 <label className="check"><input type="checkbox" name="sms-consent" value="yes"/><span>I agree to receive text messages from David’s Insurance about my insurance inquiry, requested quote, appointments, and customer service. Message frequency varies. Message and data rates may apply. Consent is not a condition of purchase. Reply STOP to opt out or HELP for help. View our <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms &amp; Conditions</a>.</span></label>
 <button className="button primary" type="submit" disabled={status==="sending"}>{status==="sending"?"Sending...":status==="success"?"✓ Request received":"Submit quote request"}</button>
 {msg&&<p className="form-note" role={status==="error"?"alert":"status"} style={{fontWeight:700,color:status==="error"?"#b42318":"#23613c"}}>{msg}</p>}
 <p className="form-note">Submitting this form does not bind or change insurance coverage.</p>
 </form></div></section>
}
