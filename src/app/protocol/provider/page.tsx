"use client"

import React from 'react';
import {useRouter} from "next/navigation";



const ProtocolProvider = () => {
  const router = useRouter();

  const handleNavigation = (url: string) => {
    const protectedRoutes = ["/hacksLiquid", "/community"];
    const account = "test"; // 실제 구현에서는 상태나 컨텍스트를 통해 account를 관리할 수 있습니다.

    if (protectedRoutes.includes(url) && !account) {
      alert("Please connect your wallet before accessing this page.");
      return;
    }
    router.push(url); // 페이지 이동
  };

  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="p-8 max-w-7xl w-full">
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-start mb-12">
            <img
                src="/api/placeholder/400/300"
                alt="Hack Liquidity"
                className="w-full md:w-1/3 rounded-lg object-cover mb-6 md:mb-0 md:mr-8"
            />
            <div>
              <h1 className="text-4xl font-bold mb-4">Hack Liquidity</h1>
              <p className="text-gray-400 mb-6">
                Liquidity Hack is a decentralized platform for funding and creating new DeFi protocols.
              </p>
              <button onClick={() => {handleNavigation('/protocol/provider/deploy-pool')}} className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700">
                Deploy a Liquidity Pool
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Total Liquidity', value: '$2,400,000' },
              { label: 'Active Quests', value: '12' },
              { label: 'Participants', value: '700' },
              { label: 'Rewards Distributed', value: '1,500' },
            ].map((stat, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <h3 className="text-gray-400 text-sm">{stat.label}</h3>
                </div>
            ))}
          </div>

          {/* Quests */}
          <h2 className="text-2xl font-bold mb-6">Liquidity Hack Quests</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center">
                    <img
                        src="/api/placeholder/64/64"
                        alt="Quest Thumbnail"
                        className="w-16 h-16 rounded-lg object-cover mr-4"
                    />
                    <div>
                      <p className="font-semibold">Build a DeFi protocol with $100,000 in rewards</p>
                      <p className="text-gray-400 text-sm">Quest ends in 23 days</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold">$100,000</p>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default ProtocolProvider;

