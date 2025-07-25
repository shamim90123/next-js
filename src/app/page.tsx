'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
// import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";
import { showToastSuccess, showToastError } from '@/app/utils/alert';

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

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const authData = await res.json();

      if (!res.ok) {
        showToastError(authData.error || 'Login failed. Please try again.');
        setLoading(false);
        return;
      }

      // Success: Store token
      localStorage.setItem("token", authData.token);

      // Show success toast
      showToastSuccess('Login successful! Redirecting to dashboard...');

      // Wait a little so user sees the toast
      setTimeout(() => {
        router.push("/pages/dashboard");
        setLoading(false);
      }, 1500);

    } catch (error) {
      console.error('Login error:', error);
      showToastError('Login failed. Please try again.');
      setLoading(false);
    }
  };


 return (
  <div className="w-screen min-h-screen flex items-center justify-center bg-gray-100">
    <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full p-2 border rounded"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            {...register('password')}
            className="w-full p-2 border rounded"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Login...' : 'Login'}
        </button>

        <p className="text-gray-800 text-sm mt-6 text-center">
          Don't have an account?
          <a
            href="/pages/register"
            className="text-blue-600 font-semibold hover:underline ml-1"
          >
            Register here
          </a>
        </p>
      </form>
    </div>
  </div>
);

}