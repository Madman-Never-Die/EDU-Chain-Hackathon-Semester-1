import Image from "next/image";
import React from "react";
import {useRecoilState} from "recoil";
import {accountState} from "@/recoil/account";
import {roleState} from "@/recoil/role";

const QuestProviderHeader = ({handleNavigation, handleConnectWallet, isAuthenticated}: any) => {
  const [account, setAccount] = useRecoilState(accountState)
  const [role, setRole] = useRecoilState(roleState)

  return (
      <>
        {isAuthenticated &&
            <header className="p-4 sm:p-6 border-b border-gray-700 flex flex-wrap justify-between items-center">
              <div className="flex items-center">
                <Image src="/logo.png" alt="Logo" width={50} height={50} className="h-10 mr-6 cursor-pointer"
                       onClick={() => handleNavigation("/")}/>
                <nav className="space-x-4">
                  <a onClick={() => handleNavigation("/quest/provider")} href="#"
                     className="hover:text-gray-300">QuestProvider</a>
                </nav>
              </div>
              <div>
                {account ? (
                    <span>Connected: {account}</span>
                ) : (
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                        onClick={handleConnectWallet}
                    >
                      Connect Wallet
                    </button>
                )}
              </div>
            </header>
        }</>
  )
}

export default QuestProviderHeader