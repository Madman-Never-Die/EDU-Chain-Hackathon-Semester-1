import "../styles/globals.css";
import Header from "@/components/Header/Header";
import RecoilRootProvider from "@/components/RecoilRootProvider";
import AuthWrapper from "@/components/AuthWrapper";
import OCConnectWrapper from "@/components/OCConnectWrapper";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

// const opts = {
//   redirectUri: 'http://localhost:3000/redirect', // Adjust this URL
// };

const opts = {
  redirectUri: 'https://edusuplex.xyz/redirect', // Adjust this URL
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
