import React, { useState } from "react";
import { BigNumberish, BrowserProvider, Contract, parseUnits, formatUnits } from "ethers";
import ProtocolProviderAbi from '../../ProtocolProvider.json' assert {type: "json"};
import SingleTokenLiquidityPool from '../../SingleTokenLiquidityPool.json' assert {type: "json"};


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

  // const handleConfirm = async () => {
  //   try {
  //     // 컨트랙트 콜
  //     if (window.ethereum) {
  //       try {
  //         const provider = new BrowserProvider(window.ethereum);
  //         const signer = await provider.getSigner();
  //         const contract: any = new Contract(ProtocolProviderAddress, ProtocolProviderAbi, signer);
  //         // const contract: any = new Contract(ProtocolProviderAddress, SingleTokenLiquidityPool, signer);
  //
  //         const tokenAddress = "0xBC9129Dc0487fc2E169941C75aABC539f208fb01"
  //         const address = await signer.getAddress();
  //
  //         const token = new ethers.Contract(tokenAddress, [
  //           "function approve(address spender, uint256 amount) external returns (bool)"
  //         ], signer);
  //
  //         // approve 호출 - 유동성 풀 컨트랙트에 'amount' 만큼의 토큰을 사용하도록 허용
  //         const amountInWei: BigNumberish = parseUnits(poolLiquidity.toString(), 18);
  //
  //         const tx = await token.approve(ProtocolProviderAddress, amountInWei);
  //         await tx.wait();
  //         console.log(`Approved ${ethers.formatUnits(amountInWei, 18)} tokens to ${ProtocolProviderAddress}`);
  //
  //         // 사용자 입력(소수점 처리)을 wei 단위로 변환
  //         console.log("Wei : ", amountInWei)
  //
  //         const submitResultTx = await contract.deposit(amountInWei)
  //         // const submitResultTx = await contract.provideLiquidity(amountInWei)
  //         const receipt = await submitResultTx.wait()
  //         console.log("receipt : ", receipt)
  //         console.log(2)
  //
  //
  //       }catch(e: any){
  //         console.error('Error:', e);
  //         setStatus('Failed to create pool: ' + (e as Error).message);
  //         console.error(e)
  //         console.error(e.message)
  //       }
  //     }
  //   }catch(e: any){
  //     console.error(e)
  //     console.error(e.message)
  //   }
  //
  // }


  const handleConfirm = async () => {
    try {
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        console.log("Signer address:", address);
        console.log("ProtocolProviderAddress:", ProtocolProviderAddress);

        const tokenAddress = "0xBC9129Dc0487fc2E169941C75aABC539f208fb01";

        const token = new Contract(tokenAddress, [
          "function approve(address spender, uint256 amount) external returns (bool)",
          "function allowance(address owner, address spender) external view returns (uint256)",
          "function balanceOf(address account) external view returns (uint256)"
        ], signer);

        const amountInWei = parseUnits(poolLiquidity.toString(), 18);

        console.log(address)
        // 토큰 잔액 확인
        const balance = await token.balanceOf(address);
        console.log(`Token balance: ${formatUnits(balance, 18)} EDU`);

        if (balance < amountInWei) {
          throw new Error("Insufficient token balance");
        }

        // 현재 허용량 확인
        const currentAllowance = await token.allowance(address, ProtocolProviderAddress);
        console.log(`Current allowance: ${formatUnits(currentAllowance, 18)} EDU`);

        if (currentAllowance < amountInWei) {
          console.log("Approving tokens...");
          const approveTx = await token.approve(ProtocolProviderAddress, amountInWei);
          await approveTx.wait();
          console.log(`Approved ${formatUnits(amountInWei, 18)} EDU tokens to ${ProtocolProviderAddress}`);
        } else {
          console.log("Sufficient allowance already exists");
        }

        // ProtocolProvider 컨트랙트 인스턴스 생성
        const contract = new Contract(ProtocolProviderAddress, ProtocolProviderAbi, signer);

        // 가스 추정
        const gasEstimate = await contract.deposit.estimateGas(amountInWei);
        console.log(`Estimated gas for deposit: ${gasEstimate.toString()}`);

        console.log("Depositing tokens...");
        const depositTx = await contract.deposit(amountInWei, {
          gasLimit: gasEstimate * 120n / 100n // 20% 버퍼 추가
        });

        console.log("Transaction sent:", depositTx.hash);
        const receipt = await depositTx.wait();
        console.log("Transaction confirmed in block:", receipt.blockNumber);

        setStatus('Liquidity provision successful');
      }
    } catch (e: any) {
      console.error('Detailed error:', e);
      if (e.error && e.error.message) {
        setStatus('Failed: ' + e.error.message);
      } else {
        setStatus('Failed: ' + e.message);
      }
    }
  };

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