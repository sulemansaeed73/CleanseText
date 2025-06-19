"use client";
import React, { useState, useEffect } from "react";
import PublicApi from "@/axios/PublicApi";
import { useSelector } from "react-redux";

function Paraphraser() {
  const fileText = useSelector((state) => state.file.fileText);
  const [document, setDocument] = useState("");
  const [corrected, setCorrected] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fileText) {
      setDocument(fileText);
    }
  }, [fileText]);

  async function submitDocument() {
    if (!document.trim()) return;

    setLoading(true);
    try {
      const response = await PublicApi.post("api/correct_grammar", {
        text: document,
      });

      setCorrected(response.data.corrected_text);
    } catch (error) {
      console.error(error);
      setCorrected("Error occurred, please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="p-6 space-y-6">
      {loading && (
        <div className="fixed inset-0 opacity-50 bg-black flex justify-center items-center py-10 z-50">
          <div className="w-20 h-20 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      <h2 className="text-3xl text-center">Text Paraphraser</h2>

      <div>
        <h2 className="text-xl font-semibold mb-2">Write Your Text Here</h2>
        <textarea
          rows={15}
          className="w-full border border-gray-400 rounded-md p-3 resize-y"
          placeholder="Type your text..."
          value={document}
          onChange={(e) => setDocument(e.target.value)}
        ></textarea>

        <button
          className="mt-3 bg-green-600 hover:bg-green-700 text-white px-10 py-2 rounded shadow"
          onClick={submitDocument}
        >
          Run
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Get Your Text Here</h2>
        <textarea
          readOnly
          rows={15}
          className="w-full border border-gray-400 rounded-md p-3 resize-y"
          placeholder="Output will appear here..."
          value={corrected}
        ></textarea>
      </div>
    </div>
  );
}

export default Paraphraser;
