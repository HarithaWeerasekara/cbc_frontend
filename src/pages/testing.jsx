import React, { useState } from "react";
import toast from "react-hot-toast";
import mediaUpload from "../utils/mediaUpload";
// adjust path as needed

export default function Testing() {
  const [file, setFile] = useState(null);

  async function handleUpload() {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    try {
      const url = await mediaUpload(file);
      toast.success("File uploaded successfully!");
      console.log("Public URL:", url);
    } catch (err) {
      toast.error(err);
    }
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-[#575656] text-white">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-gray-700 p-2 rounded-lg"
      >
        UPLOAD
      </button>
    </div>
  );
}
