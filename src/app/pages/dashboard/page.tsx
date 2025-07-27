"use client";

import { useEffect, useState } from "react";
import { showToastError } from '@/app/utils/alert';
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If no token, redirect to login
    showToastError("You must be logged in to view this page.");

    if (!token) {
       // Wait a little so user sees the toast
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }

    fetch("/api/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => localStorage.removeItem("token"));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <button onClick={() => { localStorage.removeItem("token"); window.location.href = "/"; }}>
        Logout
      </button>
    </div>
  );
}
