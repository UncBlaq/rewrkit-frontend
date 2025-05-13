import React from 'react';


export default function UserProfilePage({ params }: { params: { id: string } }) {
    const { id } = params;
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-center text-white text-2xl mb-6">Profile</h1>
            <hr className="mb-6 border-gray-600" />
            <p className="text-center text-white">User Profile Information 
                <span className='p-2 ml-2 rounded bg-orange-500 text-black'>user Id:  {id}</span>
                </p>
        </div>
        </div>
    );

}