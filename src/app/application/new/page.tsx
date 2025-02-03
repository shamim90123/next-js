"use client";
import { useState } from "react";

const NewApplication = () => {
  const [formData, setFormData] = useState({
    generalInfo: "",
    addressInfo: "",
    academicInfo: "",
    visaDetails: "",
    passportDetails: "",
    englishProof: ""
  });

  const handleSubmit = async () => {
    const response = await fetch("/api/applications/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      alert("Application submitted successfully!");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">New Application</h2>
      <textarea
        placeholder="General Info"
        onChange={(e) => setFormData({ ...formData, generalInfo: e.target.value })}
        className="w-full p-2 border my-2"
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2">
        Submit
      </button>
    </div>
  );
};

export default NewApplication;
