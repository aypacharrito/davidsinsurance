import {ImageResponse} from "next/og";

export const alt="David's Insurance. Save money. Stay covered.";
export const size={width:1200,height:630};
export const contentType="image/png";

export default function Image(){
  return new ImageResponse(
    <div
      style={{
        width:"100%",
        height:"100%",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between",
        padding:"72px 82px",
        background:"#142b4b",
        color:"#ffffff",
        fontFamily:"Arial, Helvetica, sans-serif"
      }}
    >
      <div style={{display:"flex",fontSize:28,fontWeight:800,letterSpacing:"0.08em"}}>
        DAVID'S INSURANCE
      </div>

      <div style={{display:"flex",flexDirection:"column",maxWidth:970}}>
        <div style={{display:"flex",fontSize:72,fontWeight:800,lineHeight:1.04,letterSpacing:"-0.04em"}}>
          Save money. Stay covered.
        </div>
        <div style={{display:"flex",marginTop:26,fontSize:30,lineHeight:1.35,color:"#f3f6f8"}}>
          Auto, home and life insurance with real help finding a rate that fits your budget.
        </div>
      </div>

      <div style={{display:"flex",fontSize:24,color:"#f8a496",fontWeight:700}}>
        davidsinsurance.org
      </div>
    </div>,
    size
  );
}
