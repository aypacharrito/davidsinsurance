import type {Metadata} from "next";import "./globals.css";import {Footer,Header} from "./components";
export const metadata:Metadata={title:"David's Insurance | Auto, Home & Life",description:"Personal insurance guidance for auto, home, and life coverage in Van Nuys, California.",icons:{icon:"/favicon.svg",shortcut:"/favicon.svg",apple:"/favicon.svg"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Header/><main>{children}</main><Footer/></body></html>}
