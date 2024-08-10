"use client";

import React, { useState } from "react";

const ManagePool = () => {
  const [userPoolValue, setUserPoolValue] = useState(0);
  const [providerPoolPercentage, setProviderPoolPercentage] = useState(50);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 p-6 bg-gray-800 border-r border-gray-700">
        <h2 className="text-lg font-semibold mb-4">Quest Provider Pool</h2>
        <div className="space-y-4">
          <div className="flex items-center p-4 bg-gray-900 rounded-lg">
            <img
              src="/path-to-edu-icon.jpg"
              alt="EDU"
              className="w-12 h-12 rounded-full"
            />
            <div className="ml-4">
              <p className="text-sm font-semibold">EDU</p>
              <p className="text-xs text-gray-400">0.5%</p>
              <p className="text-xs text-gray-400">Token Balance: 10,000</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-900 rounded-lg">
            <img
              src="/path-to-eth-icon.jpg"
              alt="ETH"
              className="w-12 h-12 rounded-full"
            />
            <div className="ml-4">
              <p className="text-sm font-semibold">ETH</p>
              <p className="text-xs text-gray-400">0.5%</p>
              <p className="text-xs text-gray-400">Token Balance: 10,000</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-900 rounded-lg">
            <img
              src="/path-to-arb-icon.jpg"
              alt="ARB"
              className="w-12 h-12 rounded-full"
            />
            <div className="ml-4">
              <p className="text-sm font-semibold">ARB</p>
              <p className="text-xs text-gray-400">0.5%</p>
              <p className="text-xs text-gray-400">Token Balance: 10,000</p>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="0"
            className="w-full p-3 bg-gray-800 text-white rounded-lg"
          />
          <input
            type="text"
            placeholder="0"
            className="w-full p-3 bg-gray-800 text-white rounded-lg"
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        <h2 className="text-2xl font-bold mb-6">Manage Liquidity Pools</h2>
        <p className="text-gray-400 mb-4">
          Adjust your distribution between the Quest Provider Pool and the User
          Pool
        </p>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">User Pool</h3>
            <div className="flex items-center bg-gray-800 p-3 rounded-lg">
              <input
                type="text"
                value={userPoolValue}
                onChange={(e) => setUserPoolValue(Number(e.target.value))}
                className="bg-transparent text-white w-24 text-right"
              />
              <span className="text-gray-400 ml-2">+</span>
            </div>
          </div>
          <div className="w-full bg-gray-700 h-2 rounded-full">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${providerPoolPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">50% Quest Provider Pool</h3>
            <span className="text-gray-400">
              {100 - providerPoolPercentage}% User Pool
            </span>
          </div>
          <div className="w-full bg-gray-700 h-2 rounded-full">
            <div
              className="bg-purple-600 h-2 rounded-full"
              style={{ width: `${100 - providerPoolPercentage}%` }}
            ></div>
          </div>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full">
          Confirm Distribution
        </button>
      </main>
    </div>
  );
};

export default ManagePool;
