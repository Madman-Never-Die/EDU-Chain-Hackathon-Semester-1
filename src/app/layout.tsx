import "../styles/globals.css";
import Header from "@/components/Header/Header";
import RecoilRootProvider from "@/components/RecoilRootProvider";
import AuthWrapper from "@/components/AuthWrapper";
import OCConnectWrapper from "@/components/OCConnectWrapper";
import Head from "next/head";

export const metadata = {
  title: "Edusuplex",
  description: "This is Super DApp",
  icons: {
    icon: "/images/edusuplex_logo.png",
  },
};

const opts = {
  redirectUri: process.env.NEXT_PUBLIC_LOGIN_REDIRECT_URI
};


export default function RootLayout({children,}: { children: React.ReactNode; }) {
  return (
      <html lang="en">
      <body className="min-h-screen bg-[#0f172a] text-white flex flex-col">
      <RecoilRootProvider>
        <OCConnectWrapper opts={opts} sandboxMode={true}>
          <AuthWrapper>
            {children}
          </AuthWrapper>
        </OCConnectWrapper>
      </RecoilRootProvider>
      </body>
      </html>
  );
}
