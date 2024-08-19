// "use client";
//
// import React from "react";
//
// const LiquidProvider = () => {
//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       {/* Header */}
//       <header className="p-6 flex justify-between items-center border-b border-gray-700">
//         <div className="flex items-center">
//           <img src="/logo.png" alt="EduSuplex" className="h-10 mr-6" />
//           <h1 className="text-xl font-semibold">EduSuplex</h1>
//         </div>
//         <nav className="space-x-8">
//           <a href="#" className="hover:text-gray-300">
//             Dashboard
//           </a>
//           <a href="#" className="hover:text-gray-300">
//             Quests
//           </a>
//           <a href="#" className="hover:text-gray-300">
//             Leaderboard
//           </a>
//           <a href="#" className="hover:text-gray-300">
//             Help
//           </a>
//           <div className="flex items-center space-x-4">
//             <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
//               <span className="sr-only">Notifications</span>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9"
//                 />
//               </svg>
//             </button>
//             <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
//               <span className="sr-only">Profile</span>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M5.121 17.804A9 9 0 0112 3a9 9 0 016.879 14.804M9 21h6m-3-3v3m-3-6v3m-3-6v3"
//                 />
//               </svg>
//             </button>
//           </div>
//         </nav>
//       </header>
//
//       {/* Main Content */}
//       <main className="p-8 max-w-7xl mx-auto">
//         <section className="bg-gray-800 p-8 rounded-lg flex flex-col md:flex-row items-center">
//           <img
//             src="/path-to-your-image.jpg"
//             alt="Liquidity Hack"
//             className="w-full md:w-1/2 rounded-lg"
//           />
//           <div className="mt-6 md:mt-0 md:ml-6 text-center md:text-left">
//             <h2 className="text-4xl font-bold">Hack Liquidity</h2>
//             <p className="mt-4 text-gray-300">
//               Liquidity Hack is a decentralized platform for funding and
//               creating new DeFi protocols.
//             </p>
//             <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full">
//               Deploy a Liquidity Pool
//             </button>
//           </div>
//         </section>
//
//         {/* Statistics Section */}
//         <section className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
//           <div className="bg-gray-800 p-6 rounded-lg text-center">
//             <h3 className="text-gray-400">Total Liquidity</h3>
//             <p className="mt-2 text-2xl font-bold">$2,400,000</p>
//           </div>
//           <div className="bg-gray-800 p-6 rounded-lg text-center">
//             <h3 className="text-gray-400">Active Quests</h3>
//             <p className="mt-2 text-2xl font-bold">12</p>
//           </div>
//           <div className="bg-gray-800 p-6 rounded-lg text-center">
//             <h3 className="text-gray-400">Participants</h3>
//             <p className="mt-2 text-2xl font-bold">700</p>
//           </div>
//           <div className="bg-gray-800 p-6 rounded-lg text-center">
//             <h3 className="text-gray-400">Rewards Distributed</h3>
//             <p className="mt-2 text-2xl font-bold">1,500</p>
//           </div>
//         </section>
//
//         {/* Quests Section */}
//         <section className="mt-8">
//           <h3 className="text-2xl font-bold mb-4">Liquidity Hack Quests</h3>
//           <div className="space-y-4">
//             <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
//               <div className="flex items-center">
//                 <img
//                   src="/path-to-your-thumbnail.jpg"
//                   alt="Quest Thumbnail"
//                   className="w-16 h-16 rounded-lg"
//                 />
//                 <div className="ml-4">
//                   <p className="text-lg font-semibold">
//                     Build a DeFi protocol with $100,000 in rewards
//                   </p>
//                   <p className="text-gray-400">Quest ends in 23 days</p>
//                 </div>
//               </div>
//               <p className="text-lg font-bold">$100,000</p>
//             </div>
//             {/* Repeat the above block for each quest */}
//             <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
//               <div className="flex items-center">
//                 <img
//                   src="/path-to-your-thumbnail.jpg"
//                   alt="Quest Thumbnail"
//                   className="w-16 h-16 rounded-lg"
//                 />
//                 <div className="ml-4">
//                   <p className="text-lg font-semibold">
//                     Build a DeFi protocol with $100,000 in rewards
//                   </p>
//                   <p className="text-gray-400">Quest ends in 23 days</p>
//                 </div>
//               </div>
//               <p className="text-lg font-bold">$100,000</p>
//             </div>
//             <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
//               <div className="flex items-center">
//                 <img
//                   src="/path-to-your-thumbnail.jpg"
//                   alt="Quest Thumbnail"
//                   className="w-16 h-16 rounded-lg"
//                 />
//                 <div className="ml-4">
//                   <p className="text-lg font-semibold">
//                     Build a DeFi protocol with $100,000 in rewards
//                   </p>
//                   <p className="text-gray-400">Quest ends in 23 days</p>
//                 </div>
//               </div>
//               <p className="text-lg font-bold">$100,000</p>
//             </div>
//             <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
//               <div className="flex items-center">
//                 <img
//                   src="/path-to-your-thumbnail.jpg"
//                   alt="Quest Thumbnail"
//                   className="w-16 h-16 rounded-lg"
//                 />
//                 <div className="ml-4">
//                   <p className="text-lg font-semibold">
//                     Build a DeFi protocol with $100,000 in rewards
//                   </p>
//                   <p className="text-gray-400">Quest ends in 23 days</p>
//                 </div>
//               </div>
//               <p className="text-lg font-bold">$100,000</p>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// };
//
// export default LiquidProvider;
import React from 'react';

const LiquidProvider = () => {
  return (
      <div className="min-h-screen bg-gray-900 text-white">
        <header className="p-4 flex justify-between items-center border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded"></div>
            <span className="text-xl font-bold">EduSuplex</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-purple-400">Dashboard</a>
            <a href="#" className="hover:text-purple-400">Quests</a>
            <a href="#" className="hover:text-purple-400">Leaderboard</a>
            <a href="#" className="hover:text-purple-400">Help</a>
          </nav>
          <div className="flex items-center space-x-4">
            {['bell', 'search', 'bookmark'].map((icon) => (
                <button key={icon} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {icon === 'bell' && <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />}
                    {icon === 'search' && <>
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </>}
                    {icon === 'bookmark' && <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />}
                  </svg>
                </button>
            ))}
          </div>
        </header>

        <main className="p-6 max-w-7xl mx-auto">
          <section className="bg-gray-800 p-6 rounded-lg flex flex-col md:flex-row items-center mb-8">
            <img
                src="/api/placeholder/400/320"
                alt="Hack Liquidity"
                className="w-full md:w-1/2 rounded-lg object-cover"
            />
            <div className="mt-6 md:mt-0 md:ml-6 text-center md:text-left">
              <h2 className="text-4xl font-bold">Hack Liquidity</h2>
              <p className="mt-4 text-gray-300">
                Liquidity Hack is a decentralized platform for funding and creating new DeFi protocols.
              </p>
              <button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full">
                Deploy a Liquidity Pool
              </button>
            </div>
          </section>

          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Liquidity', value: '$2,400,000' },
              { label: 'Active Quests', value: '12' },
              { label: 'Participants', value: '700' },
              { label: 'Rewards Distributed', value: '1,500' },
            ].map((stat, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg text-center">
                  <h3 className="text-gray-400 text-sm">{stat.label}</h3>
                  <p className="mt-2 text-2xl font-bold">{stat.value}</p>
                </div>
            ))}
          </section>

          <section>
            <h3 className="text-2xl font-bold mb-4">Liquidity Hack Quests</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((_, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center">
                      <img
                          src="/api/placeholder/64/64"
                          alt="Quest Thumbnail"
                          className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="ml-4">
                        <p className="text-lg font-semibold">Build a DeFi protocol with $100,000 in rewards</p>
                        <p className="text-gray-400 text-sm">Quest ends in 23 days</p>
                      </div>
                    </div>
                    <p className="text-lg font-bold">$100,000</p>
                  </div>
              ))}
            </div>
          </section>
        </main>
      </div>
  );
};

export default LiquidProvider;