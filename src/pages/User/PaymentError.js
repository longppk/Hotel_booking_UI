import React from 'react';

const PaymentError = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
        <div className="bg-white rounded shadow-lg overflow-hidden w-80">
            <div className="text-center p-5">
                <h2 className="mb-5 text-2xl">LOGIN</h2>
                <input type="text" placeholder="@username" className="block w-4/5 mx-auto mb-3 p-2 border rounded" />
                <input type="password" placeholder="password" className="block w-4/5 mx-auto mb-3 p-2 border rounded" />
                <button className="bg-blue-500 text-white p-2 rounded w-4/5 mx-auto">GO!</button>
            </div>
            <div className="h-px bg-gray-300 my-4"></div>
            <div className="text-center p-5">
                <button className="block w-4/5 mx-auto mb-3 p-2 bg-blue-800 text-white rounded">Login With Facebook</button>
                <button className="block w-4/5 mx-auto mb-3 p-2 bg-blue-400 text-white rounded">Login With Twitter</button>
            </div>
            <div className="text-center p-5">
                <a href="#" className="block text-blue-500 mb-3">Create an Account</a>
                <a href="#" className="text-blue-500">ABOUT | CONTACT</a>
            </div>
        </div>
    </div>
);
    };

export default PaymentError;