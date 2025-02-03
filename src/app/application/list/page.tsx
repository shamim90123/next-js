"use client";

import { useEffect, useState } from "react";

type Application = {
  id: string;
  student: { name: string; email: string };
  status: string;
  createdAt: string;
};

export default function ApplicationList() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/applications/list");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchApplications();
}, []);


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Application List</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Student Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Created At</th>
            </tr>
          </thead>
        <tbody>
          {applications.length > 0 ? (
            applications.map((app) => (
              <tr key={app.id} className="border-t">
                <td className="border p-2">{app?.name || "No Name"}</td> {/* Safe access */}
                <td className="border p-2">{app?.email || "No Email"}</td> {/* Safe access */}
                <td className="border p-2">{app.status}</td>
                <td className="border p-2">{new Date(app.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center p-4">No applications found</td>
            </tr>
          )}
        </tbody>
        </table>
      )}
    </div>
  );
}
