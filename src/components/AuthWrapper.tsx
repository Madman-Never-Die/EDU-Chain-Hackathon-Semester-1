"use client"

import {useRecoilState, useRecoilValue} from "recoil";
import {accountState} from "@/recoil/account";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import LoginPage from "@/components/LoginPage";
import Header from "@/components/Header/Header";
import {roleState} from "@/recoil/role";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const account = useRecoilValue(accountState);
  const [role, setRole] = useRecoilState(roleState)
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // 또는 로딩 인디케이터
  }

  // 로그인하지 않은 경우 로그인 페이지 표시 (지갑 해제하는 경우 로그인 페이지로)
  if (!account || !role) {
    return <LoginPage />;
  }



  return (
      <>
        <Header isAuthenticated={!!account} />
        <main className="overflow-hidden">
          {children}
        </main>
      </>
  );
};

export default AuthWrapper;