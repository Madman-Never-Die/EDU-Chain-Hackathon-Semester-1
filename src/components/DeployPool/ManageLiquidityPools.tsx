import React, { useState } from "react";
import {BrowserProvider, Contract, ethers} from "ethers";
import { parseUnits } from 'ethers';
import ProtocolProviderAbi from '../../ProtocolProvider.json' assert {type: "json"};
const ProtocolProviderAddress: any = process.env.NEXT_PUBLIC_PROTOCOL_PROVIDER

const ManageLiquidityPools = () => {
  const [poolLiquidity, setPoolLiquidity] = useState(5000); // 초기값을 5000 Edu로 유지
  const minLiquidity = 0.1;
  const maxLiquidity = 10000;
  const [status, setStatus] = useState<string>('');

  const handlePoolLiquidityChange = (e: any) => {
    const value = Math.min(Math.max(parseFloat(e.target.value) || minLiquidity, minLiquidity), maxLiquidity);
    setPoolLiquidity(value);
  };

  const percentage = ((poolLiquidity - minLiquidity) / (maxLiquidity - minLiquidity)) * 100;
  const questProviderAmount = poolLiquidity * 0.8;
  const userPoolAmount = poolLiquidity * 0.2;

  const handleConfirm = async () => {
    try {
      // 컨트랙트 콜
      if (window.ethereum) {
        try {
          const provider = new BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract: any = new Contract(ProtocolProviderAddress, ProtocolProviderAbi, signer);
          const address = await signer.getAddress();




          // 사용자 입력(소수점 처리)을 wei 단위로 변환
          const amountInWei = parseUnits(poolLiquidity.toString(), 18);
          console.log("Wei : ", amountInWei)
          setStatus('Approving tokens...');

          console.log(1)
          const submitResultTx = await contract.deposit(1)
          console.log(1, submitResultTx)
          console.log(1)

          console.log(2)

          const receipt = await submitResultTx.wait()
          console.log("receipt : ", receipt)
          setStatus('Pool created successfully!');
          console.log(2)


        }catch(e: any){
          console.error('Error:', e);
          setStatus('Failed to create pool: ' + (e as Error).message);
          console.error(e)
          console.error(e.message)
        }
      }
    }catch(e: any){
      console.error(e)
      console.error(e.message)
    }

  }

  return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-purple-300">Manage Liquidity Pools</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-purple-200">Pool Liquidity</h2>
          <p className="mb-2 text-gray-300">Set liquidity between 0.1 and 10,000 Edu</p>

          <div className="flex items-center mb-4">
            <input
                type="range"
                min={minLiquidity}
                max={maxLiquidity}
                step="0.1"
                value={poolLiquidity}
                onChange={handlePoolLiquidityChange}
                className="w-full mr-4 accent-purple-500"
            />
            <input
                type="number"
                min={minLiquidity}
                max={maxLiquidity}
                step="0.1"
                value={poolLiquidity}
                onChange={handlePoolLiquidityChange}
                className="w-28 px-2 py-1 bg-gray-800 text-purple-300 rounded border border-purple-500"
            />
          </div>

          <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
            <div
                className="bg-purple-600 h-4 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${percentage}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-gray-400">
            <span>{minLiquidity} Edu</span>
            <span>{poolLiquidity.toFixed(1)} Edu</span>
            <span>{maxLiquidity} Edu</span>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-purple-200">Distribution</h2>

          {/* Quest Provider Pool */}
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <p className="text-gray-300">Quest Provider Pool (80%):</p>
              <p className="text-purple-300 font-bold">{questProviderAmount.toFixed(2)} Edu</p>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div className="bg-purple-600 h-4 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>

          {/* User Pool */}
          <div>
            <div className="flex justify-between mb-2">
              <p className="text-gray-300">User Pool (20%):</p>
              <p className="text-purple-300 font-bold">{userPoolAmount.toFixed(2)} Edu</p>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div className="bg-purple-400 h-4 rounded-full" style={{ width: '20%' }}></div>
            </div>
          </div>
        </section>

        <div>
          <button onClick={handleConfirm} className="w-full bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition duration-300 font-bold">
            Confirm Distribution
          </button>
        </div>
      </div>
  )
}

export default ManageLiquidityPools