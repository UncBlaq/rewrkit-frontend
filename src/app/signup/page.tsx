"use client";
import { useState, useEffect } from "react";
import { useRouter, redirect} from "next/navigation";
import { toast } from "react-hot-toast";


// import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

// function component to handle sign up
export default function SignUpPage() {
  // const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    industry: [],
    skills: [],
    location: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    const { email, password, confirmPassword, industry, skills, location } =
      user;
    const data = {
      email,
      password,
      confirmPassword,
      industry,
      skills,
      location,
    };
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:8000/stack/auth/signup`,
        // `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        data
      );
      if (response.status === 200) {
        toast.success("Sign up successful");
        redirect("/login");
        // router.push("/login");
      } else {
        toast.error("Sign up failed");
      }

      console.log(response.data);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Bad request";

        toast.error(`Signup failed: ${message}`);
      } else {
        toast.error("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.industry.length > 0 &&
      user.skills.length > 0 &&
      user.location.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-center text-white text-2xl mb-6">
          {loading ? "Signing Up... " : "Sign up"}
        </h1>
        <hr className="mb-6 border-gray-600" />

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
          className="text-black rounded-md p-2 w-full mb-4 border-2 border-gray-300"
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
          required
        />
        <label htmlFor="confirmPassword" className="text-white">
          Confirm Password
        </label>
        <input
          className="text-black rounded-md p-2 w-full mb-4 border-2 border-gray-300"
          type="password"
          id="confirmPassword"
          value={user.confirmPassword}
          onChange={(e) =>
            setUser({ ...user, confirmPassword: e.target.value })
          }
          placeholder="Confirm your password"
          required
        />

        <label htmlFor="industry" className="text-white">
          Industry
        </label>
        <input
          className="text-black rounded-md p-2 w-full mb-4 border-2 border-gray-300"
          type="text"
          id="industry"
          value={user.industry}
          onChange={(e) =>
            setUser({
              ...user,
              industry: e.target.value.split(",").map((s) => s.trim()),
            })
          }
          placeholder="Enter your industry"
          required
        />

        <label htmlFor="skills" className="text-white">
          Skills
        </label>
        <input
          className="text-black rounded-md p-2 w-full mb-4 border-2 border-gray-300"
          type="text"
          id="skills"
          value={user.skills}
          onChange={(e) =>
            setUser({
              ...user,
              skills: e.target.value.split(",").map((s) => s.trim()),
            })
          }
          placeholder="Enter your skills"
          required
        />

        <label htmlFor="location" className="text-white">
          Location
        </label>
        <input
          className="text-black rounded-md p-2 w-full mb-6 border-2 border-gray-300"
          type="text"
          id="location"
          value={user.location}
          onChange={(e) => setUser({ ...user, location: e.target.value })}
          placeholder="Enter your location"
          required
        />

        <button
        className="bg-blue-500 hover:bg-blue-600 hover:opacity-90 text-white rounded-md p-2 w-full mb-4 cursor-pointer"
        type="submit"
        onClick={onSignUp}
        >
        {buttonDisabled ? "No Sign Up" : "Sign Up"}
        </button>


        <p className="text-center text-white text-sm">
          Already have an account?{" "}
          <Link className="text-blue-400 underline" href="/login">
            Login
          </Link>
        </p>

        <p className="text-center text-white text-sm">
          <Link className="text-blue-400 underline" href="/forgot-password">
            Forgot Password?
          </Link>
        </p>

        <p className="text-center text-white text-sm">
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
