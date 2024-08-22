import React from "react";

const ManageLiquidityPools = () => {

  return(
      <div className="max-w-4xl mx-auto">
        {/* Quest Provider Pool */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Quest Provider Pool</h2>
          <p className="mb-2">You have 75% of the pool</p>
          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
            <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className="text-right">$30,000</p>
        </section>

        {/* User Pool */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">User Pool</h2>
          <p className="mb-2">You have 25% of the pool</p>
          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
            <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '25%' }}></div>
          </div>
          <p className="text-right">$10,000</p>
        </section>

        {/* Confirm Distribution Button */}
        <div>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700">
            Confirm Distribution
          </button>
        </div>
      </div>
  )
}


export default ManageLiquidityPools