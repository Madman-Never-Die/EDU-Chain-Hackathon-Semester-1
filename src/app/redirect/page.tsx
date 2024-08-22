'use client'

// @ts-ignore
import {LoginCallBack, useOCAuth} from '@opencampus/ocid-connect-js';
import {useRouter} from 'next/navigation';
import {useRecoilState} from "recoil";
import {accountState, stepState} from "@/recoil/account";
import {useState} from "react";
import {roleState} from "@/recoil/role";


export default function RedirectPage() {
  const router = useRouter();

  const {authState, ocAuth} = useOCAuth();
  const [account, setAccount] = useRecoilState(accountState);
  const [role, setRole] = useRecoilState(roleState)
  const [step, setStep] = useRecoilState(stepState);

  const loginSuccess = async () => {
    const {edu_username, eth_address} = ocAuth.getAuthInfo()

    try {
      if (eth_address) {
        setAccount(eth_address);
        localStorage.setItem("account", eth_address);
        console.log("Connected account:", eth_address);

        const response = await fetch('/api/users/check-wallet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({eth_address}),
        });

        if (!response.ok) {
          throw new Error('Backend server error');
        }

        const data = await response.json();

        if (data.exists) {
          setRole(data.role);
          localStorage.setItem("userRole", data.role);
        } else {
          setStep('roleSelection');
        }
      } else {
        throw new Error("You have not been authenticated.");
      }

    } catch (error) {
      console.error("Wallet creation/connection failure: ", error);
    }

    router.push('/'); // Redirect after successful login
  };

  const loginError = (error: any) => {
    console.error('Login error:', error);
  };

  function CustomErrorComponent() {
    const {authState} = useOCAuth()
    return <div>Error Logging in: {authState.error?.message}</div>;
  }

  function CustomLoadingComponent() {
    return <div>Loading....</div>;
  }

  return (
      <>
        <LoginCallBack
            errorCallback={loginError}
            successCallback={loginSuccess}
            customErrorComponent={<CustomErrorComponent/>}
            customLoadingComponent={<CustomLoadingComponent/>}
        />
      </>
  );
}