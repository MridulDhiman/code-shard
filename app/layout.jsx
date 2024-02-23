import Navbar from "./Navbar";
import "./globals.css";
import AuthProvider from "./AuthProvider";
import ReduxProvider from "./ReduxProvider";



export const metadata = {
  title: "CodeShard: Collaborative Code Editor",
  description: "CodePen is a social development environment for front-end designers and developers.",
};

export default function RootLayout({ children }) {


  return (
    <html lang="en" >   
      <body className="bg-[#131417] text-white" suppressHydrationWarning={true}>
        <AuthProvider>
        <ReduxProvider>
        {children}
        </ReduxProvider>   
        </AuthProvider> 
        </body>
    </html>
  );
}
