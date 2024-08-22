// 'use client'
// import React, { useState } from 'react';
//
// const DeployPoolPage = () => {
//   const [addToPoolValue, setAddToPoolValue] = useState(50);
//
//   return (
//       <div className="flex h-screen bg-gray-900 text-white">
//         {/* Sidebar */}
//         <aside className="w-64 bg-gray-800 flex flex-col h-full">
//           <div className="p-6 flex-grow overflow-y-auto">
//             <h2 className="text-xl font-bold mb-6">Liquidity Pools</h2>
//             <nav className="space-y-2 mb-8">
//               <a href="#" className="block py-2 px-4 rounded bg-indigo-600">Manage Liquidity Pools</a>
//               <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">Quest Provider Pool</a>
//               <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">User Pool</a>
//             </nav>
//
//             {/* Token Balances */}
//             <div className="space-y-4 mb-8">
//               {['EDU', 'ETH', 'ARB'].map((token) => (
//                   <div key={token} className="bg-gray-700 p-4 rounded-lg">
//                     <h3 className="font-bold">{token}</h3>
//                     <p className="text-gray-400 text-sm">Balance: 0</p>
//                   </div>
//               ))}
//             </div>
//
//             {/* Amount and Price Inputs */}
//             <div className="space-y-4 mb-8">
//               <div>
//                 <label className="block text-gray-400 mb-2">Amount</label>
//                 <input type="text" className="w-full bg-gray-700 p-2 rounded" placeholder="0.00" />
//               </div>
//               <div>
//                 <label className="block text-gray-400 mb-2">Price</label>
//                 <input type="text" className="w-full bg-gray-700 p-2 rounded" placeholder="0.00" />
//               </div>
//             </div>
//
//             {/* Add to pool slider */}
//             <div>
//               <label className="block text-gray-400 mb-2">Add to pool</label>
//               <input
//                   type="range"
//                   min="0"
//                   max="100"
//                   value={addToPoolValue}
//                   onChange={(e: any) => setAddToPoolValue(e.target.value)}
//                   className="w-full mb-2"
//               />
//               <div className="flex justify-between text-sm">
//                 <span>0%</span>
//                 <span>{addToPoolValue}%</span>
//                 <span>100%</span>
//               </div>
//             </div>
//           </div>
//         </aside>
//
//         {/* Main content */}
//         <main className="flex-1 p-8 overflow-y-auto">
//           <div className="max-w-4xl mx-auto">
//             {/* Quest Provider Pool */}
//             <section className="mb-8">
//               <h2 className="text-2xl font-bold mb-4">Quest Provider Pool</h2>
//               <p className="mb-2">You have 75% of the pool</p>
//               <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
//                 <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '75%' }}></div>
//               </div>
//               <p className="text-right">$30,000</p>
//             </section>
//
//             {/* User Pool */}
//             <section className="mb-8">
//               <h2 className="text-2xl font-bold mb-4">User Pool</h2>
//               <p className="mb-2">You have 25% of the pool</p>
//               <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
//                 <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '25%' }}></div>
//               </div>
//               <p className="text-right">$10,000</p>
//             </section>
//
//             {/* Confirm Distribution Button */}
//             <div>
//               <button className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700">
//                 Confirm Distribution
//               </button>
//             </div>
//           </div>
//         </main>
//       </div>
//   );
// };
//
// export default DeployPoolPage;

'use client'
import React, {useState} from 'react';
import QuestProviderPoolPage from "@/components/DeployPool/QuestProviderPool";
import ManageLiquidityPools from "@/components/DeployPool/ManageLiquidityPools";
import UserPool from "@/components/DeployPool/UserPool";


const DeployPoolPage = () => {
  const [addToPoolValue, setAddToPoolValue] = useState(50);
  const [selectedMenu, setSelectedMenu] = useState('manage');
  const [questProviderPoolValue, setQuestProviderPoolValue] = useState(50);
  const [userPoolValue, setUserPoolValue] = useState(0);

  const handleUserPoolChange = (value: any) => {
    setUserPoolValue(value);
  };

  const handleQuestProviderPoolChange = (value: any) => {
    setQuestProviderPoolValue(100 - value);
  };

  const renderMainContent = () => {
    switch (selectedMenu) {
      case 'questProvider':
        return <QuestProviderPoolPage questProviderPoolValue={questProviderPoolValue}
                                      setQuestProviderPoolValue={setQuestProviderPoolValue}
                                      handleQuestProviderPoolChange={handleQuestProviderPoolChange}/>;
      case 'user':
        return <UserPool userPoolValue={userPoolValue} setUserPoolValue={setUserPoolValue}
                         handleUserPoolChange={handleUserPoolChange}/>; // Placeholder for User Pool content
      default:
        return <ManageLiquidityPools/>
    }
  };

  return (
      <div className="flex h-screen bg-gray-900 text-white">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 flex flex-col h-full">
          <div className="p-6 flex-grow overflow-y-auto">
            <h2 className="text-xl font-bold mb-6">Liquidity Pools</h2>
            <nav className="space-y-2 mb-8">
              <a
                  href="#"
                  className={`block py-2 px-4 rounded ${selectedMenu === 'manage' ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}
                  onClick={() => setSelectedMenu('manage')}
              >
                Manage Liquidity Pools
              </a>
              <a
                  href="#"
                  className={`block py-2 px-4 rounded ${selectedMenu === 'questProvider' ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}
                  onClick={() => setSelectedMenu('questProvider')}
              >
                Quest Provider Pool
              </a>
              <a
                  href="#"
                  className={`block py-2 px-4 rounded ${selectedMenu === 'user' ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}
                  onClick={() => setSelectedMenu('user')}
              >
                User Pool
              </a>
            </nav>


            {
                selectedMenu === "manage" &&
                <>
                  {['EDU', 'ETH', 'ARB'].map((token) => (
                      <div key={token} className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gray-700 rounded-lg mr-4"></div>
                        <div>
                          <h3 className="font-bold">{token}</h3>
                          <p className="text-gray-400">0.5%</p>
                          <p className="text-gray-400">Token Balance: 10,000</p>
                        </div>
                      </div>
                  ))}
                </>
            }


            {
                selectedMenu === "questProvider" &&
                <>
                  {['EDU', 'ETH', 'ARB'].map((token) => (
                      <div key={token} className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gray-700 rounded-lg mr-4"></div>
                        <div>
                          <h3 className="font-bold">{token}</h3>
                          <p className="text-gray-400">0.5%</p>
                          <p className="text-gray-400">Token Balance: 10,000</p>
                        </div>
                      </div>
                  ))}
                </>
            }

            {
              selectedMenu === "user" &&
                <>
                  {/* Token Information */}
                  {['EDU', 'ETH', 'ARB'].map((token) => (
                      <div key={token} className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gray-700 rounded-lg mr-4"></div>
                        <div>
                          <h3 className="font-bold">{token}</h3>
                          <p className="text-gray-400">0.5%</p>
                          <p className="text-gray-400">Token Balance: 10,000</p>
                        </div>
                      </div>
                  ))}
                </>
            }


            {/* Amount and Price Inputs */}
            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-gray-400 mb-2">Amount</label>
                <input type="text" className="w-full bg-gray-700 p-2 rounded" placeholder="0.00"/>
              </div>
            </div>


            {
                selectedMenu === "questProvider" &&
                <>
                  <div className="mt-8">
                    <p className="mb-2">{questProviderPoolValue}% Quest Provider Pool</p>
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                      <div className="bg-indigo-600 h-2 rounded-full"
                           style={{width: `${questProviderPoolValue}%`}}></div>
                    </div>
                    <p>{questProviderPoolValue}% Quest Provider Pool</p>
                  </div>
                </>
            }

            {
                selectedMenu === "user" &&
                <>

                  {/* Distribution Slider */}
                  <div className="mt-8">
                    <p className="mb-2">{userPoolValue}% User Provider Pool</p>
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{width: `${userPoolValue}%`}}></div>
                    </div>
                    <p>{userPoolValue}% User Pool</p>
                  </div>
                </>
            }

            {
                selectedMenu === "manage" &&
                <>

                  <div>
                    <label className="block text-gray-400 mb-2">Add to pool</label>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={addToPoolValue}
                        onChange={(e: any) => setAddToPoolValue(e.target.value)}
                        className="w-full mb-2"
                    />
                    <div className="flex justify-between text-sm">
                      <span>0%</span>
                      <span>{addToPoolValue}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </>
            }
          </div>
        </aside>

        {/* Main content */
        }
        <main className="flex-1 p-8">
          {renderMainContent()}
        </main>
      </div>
  )
      ;
};

export default DeployPoolPage;