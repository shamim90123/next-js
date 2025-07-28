"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { showToastError } from "@/app/utils/alert";
import { Menu, X } from "lucide-react";

type User = {
  name: string;
  email: string;
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  // check if user is logged in and fetch user data
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      showToastError("You must be logged in to view this page.");
      setTimeout(() => router.push("/"), 1500);
      return;
    }

    fetch("/api/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data: User) => setUser(data))
      .catch(() => {
        localStorage.removeItem("token");
        router.push("/");
      });
  }, [router]);

  // handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (!user) {
    return (
      <div className="flex h-screen justify-center items-center bg-gray-100">
        <p className="text-gray-600 text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full grid grid-cols-1 md:grid-cols-[250px_1fr]">
      {/* Sidebar */}
      <aside className="hidden md:block bg-white border-r shadow-sm">
        <div className="p-4 text-xl font-bold text-blue-600 border-b">
          📚 Student Portal
        </div>
        <nav className="p-4 space-y-3">
          <a href="#" className="block text-gray-700 hover:text-blue-600">Dashboard</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">Applications</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">Profile</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">Settings</a>
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside
        className={`fixed z-50 top-0 left-0 h-full w-64 bg-white border-r shadow-sm transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="p-4 text-xl font-bold text-blue-600 border-b flex justify-between items-center">
          📚 Student Portal
          <button onClick={() => setSidebarOpen(false)} className="text-gray-600">
            <X size={24} />
          </button>
        </div>
        <nav className="p-4 space-y-3">
          <a href="#" className="block text-gray-700 hover:text-blue-600">Dashboard</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">Applications</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">Profile</a>
          <a href="#" className="block text-gray-700 hover:text-blue-600">Settings</a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col h-full">
        {/* Navbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden text-gray-600">
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">
            Welcome, <span className="text-blue-600">{user.name}</span>
          </h1>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        </header>

        <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <p className="text-gray-600 mb-2">📧 Email: {user.email}</p>
          <p className="text-gray-500">Here you can manage your applications, profile, and more.</p>
        </main>
      </div>
    </div>
  );
}
