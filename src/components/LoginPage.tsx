import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {useRecoilState, useRecoilValue} from "recoil";
import {accountState} from "@/recoil/account";
import {roleState} from "@/recoil/role";
import {MetaMaskInpageProvider} from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider | undefined;
  }
}

const LoginPage = () => {
  const [account, setAccount] = useRecoilState(accountState);
  const [role, setRole] = useRecoilState(roleState)


  useEffect(() => {
    const savedAccount = localStorage.getItem("account");
    if (savedAccount) {
      setAccount(savedAccount);
    }
  }, []);

  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts: any = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        if (accounts && accounts.length > 0) {
          setAccount(accounts[0]);
          localStorage.setItem("account", accounts[0]);
          console.log("Connected account:", accounts[0]);
        } else {
          console.error("Failed to retrieve accounts.");
        }
      } catch (error) {
        console.error("Wallet connection failed:", error);
      }
    } else {
      console.error("MetaMask is not installed.");
      alert("Please install MetaMask to use this feature.");
    }
  };

  const handleRoleSelect = (selectedRole: string) => {
    setRole(selectedRole);
    console.log("Selected role:", selectedRole);
  };




  return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-center text-white mb-6">EDU SUPLEX</h2>
              {!account ? (
                  <>
                    <button
                        onClick={handleConnectWallet}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mb-4"
                    >
                      Connect Wallet
                    </button>
                    <button className="w-full bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold py-2 px-4 rounded-md">
                      Create a Wallet
                    </button>
                  </>
              ) : (
                  <div className="text-center">
                    <p className="text-green-400 mb-2">Wallet Connected</p>
                    <p className="text-gray-300 break-all">{account}</p>
                  </div>
              )}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <RoleCard
                title="Protocol Provider"
                description="Develop and deploy smart contract tech"
                imageSrc="/protocol-provider.jpg"
                onClick={() => handleRoleSelect("Protocol Provider")} // 역할 선택 핸들러 추가
            />
            <RoleCard
                title="Quest Provider"
                description="Design and launch quests on the blockchain"
                imageSrc="/quest-provider.jpg"
                onClick={() => handleRoleSelect("Quest Provider")} // 역할 선택 핸들러 추가
            />
            <RoleCard
                title="User"
                description="Earn crypto by completing quests"
                imageSrc="/user.jpg"
                onClick={() => handleRoleSelect("User")} // 역할 선택 핸들러 추가
            />
          </div>
        </div>
      </div>
  );
};

interface RoleCardProps {
  title: string;
  description: string;
  imageSrc: string;
  onClick: () => void; // onClick prop 추가
}

const RoleCard: React.FC<RoleCardProps> = ({ title, description, imageSrc, onClick }) => {
  return (
      <button
          onClick={onClick}
          className="bg-gray-800 rounded-lg overflow-hidden shadow-md focus:outline-none"
      >
        <Image src={imageSrc} alt={title} width={300} height={200} className="w-full h-32 object-cover" />
        <div className="p-4">
          <h3 className="font-bold text-white">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </button>
  );
};
export default LoginPage;