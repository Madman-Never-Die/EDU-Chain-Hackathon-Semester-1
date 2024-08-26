import React from "react";
import Image from "next/image";

const ProtocolProviderHeader = ({handleNavigation}: any) => {

  return (
      <>
        <header className="p-4 flex justify-between items-center border-b border-gray-800">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavigation("/")}>
            <Image src="/images/edusuplex_logo.png" alt="Logo" width={50} height={50} className="h-10 mr-6 cursor-pointer"
                   onClick={() => handleNavigation("/")}/>
            <span className="text-xl font-bold">EduSuplex</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" onClick={() => handleNavigation("/protocol/provider")}  className="hover:text-gray-300">ProtocolProvider</a>

            <a href="#" className="hover:text-purple-400">Dashboard</a>
            <a href="#" className="hover:text-purple-400">Quests</a>
            <a href="#" className="hover:text-purple-400">Leaderboard</a>
            <a href="#" className="hover:text-purple-400">Help</a>

          </nav>
          <div className="flex items-center space-x-4">
            {['bell', 'search', 'bookmark'].map((icon) => (
                <button key={icon} className="p-2 rounded-full bg-gray-800 hover:bg-gray-700">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                       strokeLinecap="round" strokeLinejoin="round">
                    {icon === 'bell' &&
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/>}
                    {icon === 'search' && <>
                      <circle cx="11" cy="11" r="8"/>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </>}
                    {icon === 'bookmark' && <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>}
                  </svg>
                </button>
            ))}
          </div>
        </header>
      </>
  )
}

export default ProtocolProviderHeader