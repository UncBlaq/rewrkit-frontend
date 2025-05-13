"use client"; // if you're using Next.js 13+ App Router

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
        user
      );
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-center text-white text-2xl mb-6">
          {loading ? "Authenticating..." : "Login"}
        </h1>
        <hr className="mb-6 border-gray-600" />

        <form onSubmit={onLogin}>
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            className="text-black rounded-md p-2 w-full mb-4 border-2 border-gray-300"
            type="email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
            required
          />

          <label htmlFor="password" className="text-white">
            Password
          </label>
          <input
            className="text-black rounded-md p-2 w-full mb-6 border-2 border-gray-300"
            type="password"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Enter your password"
            required
          />

          <button
            className="bg-blue-500 hover:bg-blue-600 hover:opacity-90 text-white rounded-md p-2 w-full mb-4 cursor-pointer"
            type="submit"
            onClick={onLogin}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-white text-sm">
          Don't have an account?{" "}
          <Link className="text-blue-400 underline" href="/signup">
            Sign Up
          </Link>
        </p>

        <p className="text-center text-white text-sm">
          <Link className="text-blue-400 underline" href="/forgot-password">
            Forgot Password?
          </Link>
        </p>

        <p className="text-center text-white text-sm mt-4">
          <Link className="text-blue-400 underline" href="/">
            Home
          </Link>{" "}
          |{" "}
          <Link className="text-blue-400 underline" href="/dashboard">
            Dashboard
          </Link>{" "}
          |{" "}
          <Link className="text-blue-400 underline" href="/profile">
            Profile
          </Link>
        </p>
      </div>
    </div>
  );
}
