'use client'

import React from "react";
import {router} from "next/client";
import {useRouter} from "next/navigation";

const Icon = ({d}: any) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
      <path d={d}/>
    </svg>
);

const icons = {
  dashboard: "M3 3v18h18",
  quests:
      "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
  analytics: "M18 20V10m-6 10V4M6 20v-6",
  rewards: "M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6m16-4H4m4-2l4-4 4 4",
  plus: "M12 5v14m-7-7h14",
  feedback: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  help: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m.08 4h.01",
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
};

// const Sidebar = () => (
//   <div className="w-64 bg-gray-900 text-white p-4">
//     <div className="flex items-center mb-8">
//       <div className="w-10 h-10 bg-gray-700 rounded-full mr-3"></div>
//       <h1 className="text-xl font-bold">Quest</h1>
//     </div>
//     <nav>
//       <ul className="space-y-2">
//         <li>
//           <a href="#" className="flex items-center">
//             <Icon d={icons.dashboard} /> <span className="ml-2">Dashboard</span>
//           </a>
//         </li>
//         <li>
//           <a href="#" className="flex items-center bg-indigo-700 p-2 rounded">
//             <Icon d={icons.quests} /> <span className="ml-2">My Quests</span>
//           </a>
//         </li>
//         <li>
//           <a href="#" className="flex items-center">
//             <Icon d={icons.analytics} /> <span className="ml-2">Analytics</span>
//           </a>
//         </li>
//         <li>
//           <a href="#" className="flex items-center">
//             <Icon d={icons.rewards} /> <span className="ml-2">Rewards</span>
//           </a>
//         </li>
//       </ul>
//     </nav>
//     <div className="mt-auto pt-8">
//       <button className="w-full bg-indigo-600 text-white py-2 rounded flex items-center justify-center">
//         <Icon d={icons.plus} /> <span className="ml-2">New quest</span>
//       </button>
//       <ul className="mt-4 space-y-2">
//         <li>
//           <a href="#" className="flex items-center">
//             <Icon d={icons.feedback} /> <span className="ml-2">Feedback</span>
//           </a>
//         </li>
//         <li>
//           <a href="#" className="flex items-center">
//             <Icon d={icons.help} /> <span className="ml-2">Help & Docs</span>
//           </a>
//         </li>
//       </ul>
//     </div>
//   </div>
// );

const Sidebar = () => (
    <div className="w-64 bg-gray-800 text-white p-4 h-screen flex flex-col">
    <div className="flex items-center mb-8">
        <div className="w-10 h-10 bg-gray-700 rounded-full mr-3"></div>
        <h1 className="text-xl font-bold">Quest</h1>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
              <Icon d={icons.dashboard}/> <span className="ml-2">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center bg-indigo-700 py-2 px-4 rounded">
              <Icon d={icons.quests}/> <span className="ml-2">My Quests</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
              <Icon d={icons.analytics}/> <span className="ml-2">Analytics</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
              <Icon d={icons.rewards}/> <span className="ml-2">Rewards</span>
            </a>
          </li>
        </ul>
      </nav>
      <div className="mt-auto pt-8">
        <button className="w-full bg-indigo-600 text-white py-2 rounded flex items-center justify-center">
          <Icon d={icons.plus}/> <span className="ml-2">New quest</span>
        </button>
        <ul className="mt-4 space-y-2">
          <li>
            <a href="#" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
              <Icon d={icons.feedback}/> <span className="ml-2">Feedback</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
              <Icon d={icons.help}/> <span className="ml-2">Help & Docs</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
);
const Header = ({handleNavigation}:any) => (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">My Quests</h1>
      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded" onClick={() => handleNavigation("/quest/create")} // 페이지 이동 처리
      >
        Create quest
      </button>
    </header>
);

const SearchBar = () => (
    <div className="relative mb-6">
      <input
          type="text"
          placeholder="Search for a quest"
          className="w-full bg-gray-800 text-white rounded-lg py-2 px-4 pl-10"
      />
      <Icon d={icons.search} className="absolute left-3 top-2.5 text-gray-400"/>
    </div>
);

const Stats = () => (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-gray-400 mb-2">Total quests</h3>
        <p className="text-3xl font-bold">21</p>
      </div>
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-gray-400 mb-2">Total participation</h3>
        <p className="text-3xl font-bold">1,234</p>
      </div>
    </div>
);
const CreateQuestCard = ({ handleNavigation }: any) => (
    <div className="bg-gray-800 p-4 rounded-lg mb-6">
      <h3 className="font-bold mb-2">Create a quest</h3>
      <p className="text-gray-400 mb-4">
        Create a new quest for your community and start rewarding participation.
      </p>
      <button
          className="bg-indigo-600 text-white px-4 py-2 rounded"
          onClick={() => handleNavigation("/quest/create")}
      >
        Create quest
      </button>
    </div>
);

const QuestTable = () => (
    <div>
      <h3 className="text-xl font-bold mb-4">Recent quests</h3>
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead className="bg-gray-700 text-gray-300">
          <tr>
            <th className="py-2 px-4 text-left">Quest Name</th>
            <th className="py-2 px-4 text-left">Participants</th>
            <th className="py-2 px-4 text-left">Start Date</th>
            <th className="py-2 px-4 text-left">End Date</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Action</th>
          </tr>
          </thead>
          <tbody>
          {["2022", "2023", "2024", "2025", "2026"].map((year, index) => (
              <tr key={year} className="border-t border-gray-700">
                <td className="py-3 px-4">{`#Quest ${year}`}</td>
                <td className="py-3 px-4">{123 + index * 111}</td>
                <td className="py-3 px-4">{`Jan ${15 + index * 5}, 2022`}</td>
                <td className="py-3 px-4">{`Feb ${15 + index * 5}, 2022`}</td>
                <td className="py-3 px-4">
                <span
                    className={`px-2 py-1 rounded ${
                        index < 3 ? "bg-indigo-600" : "bg-gray-600"
                    }`}
                >
                  {index < 3 ? "Active" : "Draft"}
                </span>
                </td>
                <td className="py-3 px-4">
                  <button className="text-indigo-400">Edit</button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
);


// const QuestProviderPage = () => (
//   <div className="flex bg-gray-900 text-white min-h-screen">
//     <Sidebar />
//     <main className="flex-1 p-8 flex-col">
//       <Header />
//       <SearchBar />
//       <Stats />
//       <CreateQuestCard />
//       <QuestTable />
//     </main>
//   </div>
// );

const QuestProviderPage = () => {
  const router = useRouter(); // useRouter 훅을 컴포넌트 내부에서 사용

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
      <div className="flex w-full h-screen bg-gray-900 text-white">
        <Sidebar/>
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <Header  handleNavigation={handleNavigation}/>
            <SearchBar/>
            <Stats/>
            <CreateQuestCard handleNavigation={handleNavigation}/>
            <QuestTable/>
          </div>
        </main>
      </div>
  );
}

export default QuestProviderPage;
