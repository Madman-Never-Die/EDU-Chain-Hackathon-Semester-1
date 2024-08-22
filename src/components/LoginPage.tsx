'use client'

import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {useRecoilState} from "recoil";
import {accountState, stepState} from "@/recoil/account";
import {roleState} from "@/recoil/role";
import {MetaMaskInpageProvider} from "@metamask/providers";
import {useRouter} from "next/navigation";

// @ts-ignore
import {useOCAuth} from "@opencampus/ocid-connect-js";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider | undefined;
  }
}

const LoginPage = () => {
  const [account, setAccount] = useRecoilState(accountState);
  const [role, setRole]: any = useRecoilState(roleState);
  const [step, setStep] = useRecoilState(stepState)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const {authState, ocAuth} = useOCAuth();


  useEffect(() => {
    const checkUserStatus = async () => {
      const savedAccount = localStorage.getItem("account");
      if (savedAccount) {
        setAccount(savedAccount);
        try {
          const response = await fetch('/api/users/check-wallet', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({walletAddress: savedAccount}),
          });

          if (!response.ok) {
            throw new Error('Backend server error');
          }

          const data = await response.json();

          if (data.exists) {
            setRole(data.role);
            // 여기서 사용자 정보를 상태나 로컬 스토리지에 저장할 수 있습니다.
            localStorage.setItem("userRole", data.role);

          } else {
            setStep('roleSelection');
          }
        } catch (error) {
          console.error("Error checking user status:", error);
          setError("Failed to check user status. Please try again.");
        }
      }
    };

    checkUserStatus();
  }, [setAccount, setRole, router]);

  if (authState.error) {
    return <div>Error: {authState.error.message}</div>;
  }

  // Add a loading state
  if (authState.isLoading) {
    return <div>Loading...</div>;
  }

  const handleRoleSelect = async (selectedRole: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const roleIdMap: any = {
        "Protocol Provider": 3,
        "Quest Provider": 2,
        "User": 1
      };

      const roleId = roleIdMap[selectedRole];

      if (!roleId) {
        throw new Error('Invalid role selected');
      }

      const response = await fetch('/api/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: "no-store",
        body: JSON.stringify(
            {
              nickname: ocAuth.getAuthInfo().edu_username,
              walletAddress: account,
              roleId
            }
        ),
      });

      if (!response.ok) {
        throw new Error('There is a problem with the server response.');
      }

      const data = await response.json();

      setRole(selectedRole);
      localStorage.setItem("userRole", selectedRole); // 로컬 스토리지에 역할 저장
      console.log("User created:", data);

    } catch (error) {
      console.error("Role selection failed:", error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      await ocAuth.signInWithRedirect({state: 'opencampus'});
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const renderInitialStep = () => (
      <div className="bg-black text-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">EduSuplex</h2>
        <p className="text-center mb-8">Lets Deep dive into EduSuplex</p>
        <p className="text-center text-sm mb-4">Connect your wallet to track your progress</p>


        <>
          <button
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mb-4"
          >
            Create a Wallet
          </button>
        </>

        <button
            onClick={handleLogin}
            className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold py-2 px-4 rounded-md"
        >
          Already have a wallet?
        </button>
      </div>
  );

  const renderRoleSelection = () => (
      <div className="bg-black text-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Select your role</h2>
        <div className="space-y-4">
          <RoleCard
              title="Protocol Provider"
              description="Develop and deploy smart contract tech"
              imageSrc="/protocol-provider.jpg"
              onClick={() => handleRoleSelect("Protocol Provider")}
          />
          <RoleCard
              title="Quest Provider"
              description="Design and launch quests on the blockchain"
              imageSrc="/quest-provider.jpg"
              onClick={() => handleRoleSelect("Quest Provider")}
          />
          <RoleCard
              title="User"
              description="Earn crypto by completing quests"
              imageSrc="/user.jpg"
              onClick={() => handleRoleSelect("User")}
          />
        </div>
      </div>
  );

  return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
        {isLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <p className="text-white text-xl">
                {step === 'initial' ? 'Connecting wallet...' : 'Processing...'}
              </p>
            </div>
        )}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {step === 'initial' ? renderInitialStep() : renderRoleSelection()}
      </div>
  );
};

interface RoleCardProps {
  title: string;
  description: string;
  imageSrc: string;
  onClick: () => void;
}

const RoleCard: React.FC<RoleCardProps> = ({title, description, imageSrc, onClick}) => {
  return (
      <button
          onClick={onClick}
          className="bg-gray-800 rounded-lg overflow-hidden shadow-md focus:outline-none w-full text-left flex items-center"
      >
        <Image src={imageSrc} alt={title} width={100} height={100} className="w-1/3 h-24 object-cover"/>
        <div className="p-4 w-2/3">
          <h3 className="font-bold text-white">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </button>
  );
};

export default LoginPage;