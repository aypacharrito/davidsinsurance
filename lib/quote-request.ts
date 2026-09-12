export type QuoteVehicle={vin:string;year:string;makeModel:string;use:string;annualMiles:string};
const clean=(v:unknown,max=2000)=>typeof v==='string'||typeof v==='number'?String(v).replace(/\u0000/g,'').trim().slice(0,max):'';
export function normalizeQuoteRequest(body:Record<string,unknown>){
  const data:Record<string,string>={};
  for(const [key,value] of Object.entries(body)) if(key!=='vehicles'&&!/^vehicle-\d+-/.test(key)) data[key]=clean(value);
  if(!data['first-name']||!data['last-name']) throw new Error('Please enter both your first name and last name.');
  data['full-name']=[data['first-name'],data['last-name']].join(' ');
  const vehicles:QuoteVehicle[]=[];
  if(data['insurance-type']==='auto'){
    if(!['personal','commercial'].includes(data['auto-type'])) throw new Error('Please choose Personal Auto or Commercial Auto.');
    if(!Array.isArray(body.vehicles)||body.vehicles.length<1||body.vehicles.length>6) throw new Error('Please enter between 1 and 6 vehicles.');
    if(Number(data['vehicle-count'])!==body.vehicles.length) throw new Error('Please complete every selected vehicle.');
    const vins=new Set<string>();
    for(const [index,raw] of body.vehicles.entries()){
      if(!raw||typeof raw!=='object'||Array.isArray(raw)) throw new Error(`Please complete vehicle ${index+1}.`);
      const v:QuoteVehicle={vin:clean(raw.vin,50).toUpperCase(),year:clean(raw.year,20),makeModel:clean(raw.makeModel,120),use:clean(raw.use,80),annualMiles:clean(raw.annualMiles,30)};
      if(!/^[A-HJ-NPR-Z0-9]{17}$/.test(v.vin)) throw new Error(`Vehicle ${index+1} needs a valid 17-character VIN.`);
      if(!/^\d{4}$/.test(v.year)||!v.makeModel) throw new Error(`Please enter the year, make and model for vehicle ${index+1}.`);
      if(v.annualMiles&&!/^\d+$/.test(v.annualMiles)) throw new Error(`Please enter valid annual mileage for vehicle ${index+1}.`);
      if(vins.has(v.vin)) throw new Error(`Vehicle ${index+1} repeats another vehicle's VIN.`);
      vins.add(v.vin);vehicles.push(v);
      for(const [field,label] of Object.entries({vin:'VIN',year:'Year',makeModel:'Make and model',use:'Primary use',annualMiles:'Annual miles'})) data[`Vehicle ${index+1} ${label}`]=v[field as keyof QuoteVehicle];
    }
    if(data['auto-type']==='commercial'&&(!data['business-name']||!data['business-type']||!data['business-address'])) throw new Error('Please complete the business name, operations, and address.');
    data['vehicle-vin']=vehicles[0].vin;data['vehicle-year']=vehicles[0].year;data.vehicle=vehicles[0].makeModel;
    data['vehicle-use']=vehicles[0].use;data['annual-miles']=vehicles[0].annualMiles;
  }
  const count=Number(data['additional-driver-count']||0);
  if(data['insurance-type']==='auto'&&data['additional-auto']==='Yes'){
    if(!Number.isInteger(count)||count<1||count>5)throw new Error('Please add between 1 and 5 additional drivers.');
    for(let i=1;i<=count;i++){
      const prefix=`Additional driver ${i} `;
      if(!data[prefix+'First name']||!data[prefix+'Last name'])throw new Error(`Please enter first and last names for additional driver ${i}.`);
      const dob=data[prefix+'Date of birth'];
      const parsed=new Date(`${dob}T00:00:00Z`);
      if(!/^\d{4}-\d{2}-\d{2}$/.test(dob||'')||!Number.isFinite(parsed.getTime())||parsed.toISOString().slice(0,10)!==dob||parsed.getTime()>Date.now())throw new Error(`Please enter a valid date of birth for additional driver ${i}.`);
    }
  }else data['additional-driver-count']='0';
  // Only selected drivers may reach the email or CRM; discard removed/stale entries.
  const activeCount=data['insurance-type']==='auto'&&data['additional-auto']==='Yes'?count:0;
  for(const key of Object.keys(data)){
    const match=key.match(/^Additional driver (\d+) /);
    if(match&&(Number(match[1])<1||Number(match[1])>activeCount))delete data[key];
  }
  return {data,vehicles};
}
