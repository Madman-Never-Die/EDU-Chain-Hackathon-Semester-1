"use client";

import React, { useState } from "react";

const ProviderPool = () => {
  const [amount, setAmount] = useState("0.00");
  const [price, setPrice] = useState("0.00");
  const [poolPercentage, setPoolPercentage] = useState(50);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 p-6 bg-gray-800 border-r border-gray-700">
        <h2 className="text-lg font-semibold mb-4">Liquidity Pools</h2>
        <nav className="space-y-2">
          <a
            href="#"
            className="block text-gray-300 hover:text-white py-2 px-4 rounded-md bg-gray-700"
          >
            Manage Liquidity Pools
          </a>
          <a
            href="#"
            className="block text-gray-300 hover:text-white py-2 px-4 rounded-md"
          >
            Quest Provider Pool
          </a>
          <a
            href="#"
            className="block text-gray-300 hover:text-white py-2 px-4 rounded-md"
          >
            User Pool
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Quest Provider Pool</h3>
          <p className="text-gray-300 mb-2">You have 75% of the pool</p>
          <div className="w-full bg-gray-700 h-2 rounded-full mb-4">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: "75%" }}
            ></div>
          </div>
          <p className="text-gray-300">$30,000</p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">User Pool</h3>
          <p className="text-gray-300 mb-2">You have 25% of the pool</p>
          <div className="w-full bg-gray-700 h-2 rounded-full mb-4">
            <div
              className="bg-purple-600 h-2 rounded-full"
              style={{ width: "25%" }}
            ></div>
          </div>
          <p className="text-gray-300">$10,000</p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full">
          Confirm Distribution
        </button>
      </main>

      {/* Right Sidebar */}
      <aside className="w-64 p-6 bg-gray-800 border-l border-gray-700">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
              <div className="ml-3">
                <p className="text-sm font-semibold">EDU</p>
                <p className="text-xs text-gray-400">Balance: 0</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
              <div className="ml-3">
                <p className="text-sm font-semibold">ETH</p>
                <p className="text-xs text-gray-400">Balance: 0</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
              <div className="ml-3">
                <p className="text-sm font-semibold">ARB</p>
                <p className="text-xs text-gray-400">Balance: 0</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Amount</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 bg-gray-900 text-gray-200 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 bg-gray-900 text-gray-200 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Add to pool
            </label>
            <input
              type="range"
              value={poolPercentage}
              onChange={(e) => setPoolPercentage(Number(e.target.value))}
              className="w-full"
            />
            <p className="text-sm text-gray-400 mt-2">{poolPercentage}%</p>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ProviderPool;
