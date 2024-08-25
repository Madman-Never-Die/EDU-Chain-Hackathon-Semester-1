'use client'
// @ts-ignore
import { useOCAuth } from '@opencampus/ocid-connect-js';
import React from "react";
import {useRecoilState} from "recoil";
import {accountState} from "@/recoil/account";
import {roleState} from "@/recoil/role";

export default function LoginButton() {
  const { ocAuth } = useOCAuth();
  const [account, setAccount] = useRecoilState(accountState);
  const [role, setRole]:any= useRecoilState(roleState);


  const handleLogin = async () => {
    try {
      await ocAuth.signInWithRedirect({ state: 'opencampus' });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
      <>
        <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mb-4"
        >
          Create a Wallet
        </button>
      </>
  )
}