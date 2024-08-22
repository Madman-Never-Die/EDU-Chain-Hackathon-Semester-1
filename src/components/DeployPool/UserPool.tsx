import React, { useState } from 'react';

const UserPoolPage = ({userPoolValue, setUserPoolValue, handleUserPoolChange}: any) => {


  return (
      <div className="flex h-screen bg-gray-900 text-white p-8">
        {/* Right Column */}
        <div className="w-2/3 pl-8">
          <h1 className="text-4xl font-bold mb-4">Manage Liquidity Pools</h1>
          <p className="text-gray-400 mb-8">Adjust your distribution between the User Pool and the User Pool</p>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">User Pool</h3>
            <div className="flex items-center bg-gray-800 rounded p-2">
              <input
                  type="number"
                  className="flex-grow bg-transparent text-white text-2xl"
                  value={userPoolValue}
                  onChange={(e) => handleUserPoolChange(Number(e.target.value))}
                  min="0"
                  max="100"
              />
              <button className="text-3xl text-gray-400 px-2">+</button>
            </div>
          </div>

          {/* Distribution Visualization */}
          <div className="mb-8">
            <p className="mb-2">{userPoolValue}% User Pool</p>
            <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
              <div className="bg-indigo-600 h-4 rounded-full" style={{ width: `${userPoolValue}%` }}></div>
            </div>
            <p>{userPoolValue}% User Pool</p>
          </div>

          {/* Confirm Button */}
          <button className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 float-right">
            Confirm Distribution
          </button>
        </div>
      </div>
  );
};

export default UserPoolPage;