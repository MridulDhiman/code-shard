import Navbar from "./Navbar";
import "./globals.css";
import AuthProvider from "./AuthProvider";
import ReduxProvider from "./ReduxProvider";
import { Analytics } from "@vercel/analytics/react"

import { SandPackCSS } from "@/components/sandpack-styles";
import SandpackEditor from "@/components/SandpackEditor";


export const metadata = {
  title: "CodeShard: Collaborative Code Editor",
  description: "CodePen is a social development environment for front-end designers and developers.",
};

export default function RootLayout({ children }) {


  return (
    <html lang="en" >  
    <head>
          <SandPackCSS/>
        </head> 
      <body className="bg-[#131417] text-white" suppressHydrationWarning={true}>
        <AuthProvider>
        <ReduxProvider>
        {children}
        {/* <SandpackEditor/> */}
        <Analytics/>
        </ReduxProvider>   
        </AuthProvider> 
        </body>
    </html>
  );
}
