import React from 'react';

const UserPoolPage = ({userPoolValue, setUserPoolValue, handleUserPoolChange}: any) => {
  return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-purple-300">Manage Liquidity Pools</h1>
          <p className="text-gray-400 mb-8">Adjust your distribution for the User Pool</p>

          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 text-purple-200">User Pool</h3>
            <div className="flex items-center mb-4">
              <input
                  type="range"
                  className="w-full mr-4 accent-purple-500"
                  value={userPoolValue}
                  onChange={(e) => handleUserPoolChange(Number(e.target.value))}
                  min="0"
                  max="100"
              />
              <div className="flex items-center bg-gray-800 rounded p-2">
                <input
                    type="number"
                    className="w-20 bg-transparent text-purple-300 text-2xl"
                    value={userPoolValue}
                    onChange={(e) => handleUserPoolChange(Number(e.target.value))}
                    min="0"
                    max="100"
                />
                <span className="text-purple-300 ml-2">%</span>
              </div>
            </div>
          </div>

          {/* Distribution Visualization */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 text-purple-200">Distribution</h3>
            <p className="mb-2 text-purple-300">{userPoolValue}% User Pool</p>
            <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
              <div className="bg-purple-400 h-4 rounded-full transition-all duration-300 ease-in-out" style={{ width: `${userPoolValue}%` }}></div>
            </div>
            <p className="text-right text-purple-300">{100 - userPoolValue}% Remaining</p>
          </div>

          {/* Confirm Button */}
          <div className="text-right">
            <button className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition duration-300 font-bold">
              Confirm Distribution
            </button>
          </div>
        </div>
      </div>
  );
};

export default UserPoolPage;