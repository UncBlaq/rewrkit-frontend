"use client";
import axios from "axios";
import Link from "next/link";

export default function ProfilePage() {
    // const logout = () => {
    //     return
    // }
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-center text-white text-2xl mb-6">Profile</h1>
            <hr className="mb-6 border-gray-600" />
            <p className="text-center text-white">User Profile Information</p>
            <button
            // onClick={logout}
            className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Logout</button>
        </div>
        </div>
    );

}