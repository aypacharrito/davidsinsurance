import type {Metadata} from "next";
import "./globals.css";
import {Footer,Header} from "./components";

export const metadata:Metadata={
  metadataBase:new URL("https://davidsinsurance.org"),
  title:"David's Insurance | Save on Auto, Home & Life Insurance",
  description:"Real help finding auto, home and life insurance that fits your needs and your budget.",
  icons:{
    icon:"/favicon.svg",
    shortcut:"/favicon.svg",
    apple:"/favicon.svg"
  },
  openGraph:{
    title:"Save money on insurance without cutting the coverage you need.",
    description:"Auto, home and life insurance with real help finding a rate that fits your budget.",
    url:"https://davidsinsurance.org",
    siteName:"David's Insurance",
    type:"website"
  },
  twitter:{
    card:"summary_large_image",
    title:"Save money on insurance without cutting the coverage you need.",
    description:"Auto, home and life insurance with real help finding a rate that fits your budget."
  }
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body><Header/><main>{children}</main><Footer/></body></html>
}
