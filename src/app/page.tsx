'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
// import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";

// const Router = dynamic(() => import('next/router'), { ssr: false });

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState("");

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Login failed');

      const authData = await res.json();
      if (res.ok) {
        localStorage.setItem("token", authData.token); // Store token
        window.location.href = "/pages/dashboard"; // Redirect
      } else {
        setError(authData.error);
      }

      setMessage('Login successful!');
      // Redirect to the dashboard after a short delay
      setTimeout(() => {
        router.push("/pages/dashboard"); // Redirect to the dashboard
      }, 1000); // 1-second delay before redirecting
    } catch (error) {
      setMessage('Error registering user');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-16 mt-20 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-thin mb-4 text-center uppercase">Login Form</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p className="mb-4 text-center text-green-600">{message}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div> 
          <label className="block text-sm font-medium">Email</label>
          <input
          type="email"
            {...register('email')}
            className="w-full p-2 border rounded"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            {...register('password')}
            className="w-full p-2 border rounded"
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Login...' : 'Login'}
        </button>

        <p className="text-gray-800 text-sm mt-6 text-center">Don't have an account? <a href="pages/register" className="text-blue-600 font-semibold hover:underline ml-1">Register here</a></p>
      </form>
    </div>
  );
}