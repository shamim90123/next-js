"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

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
