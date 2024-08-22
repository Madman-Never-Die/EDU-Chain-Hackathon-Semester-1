'use client'

// @ts-ignore
import {LoginCallBack, useOCAuth} from '@opencampus/ocid-connect-js';
import { useRouter } from 'next/navigation';
import {any} from "prop-types";

export default function RedirectPage() {
  const router = useRouter();

  const loginSuccess = () => {
    router.push('/'); // Redirect after successful login
  };

  const loginError = (error: any) => {
    console.error('Login error:', error);
  };

  function CustomErrorComponent() {
    const { authState } = useOCAuth()
    console.log(authState)
    return <div>Error Logging in: {authState.error?.message}</div>;
  }

  function CustomLoadingComponent() {
    return <div>Loading....</div>;
  }

  return (
      <LoginCallBack
          errorCallback={loginError}
          successCallback={loginSuccess}
          customErrorComponent={<CustomErrorComponent />}
          customLoadingComponent={<CustomLoadingComponent />}
      />
  );
}