"use client";
import React, { useState, useEffect } from "react";
import PublicApi from "@/axios/PublicApi";
import Image from "next/image";
import { toast } from "react-toastify";
import Steps from "@/components/Steps";
import WhyCard from "@/components/WhyCard";
import Link from "next/link";
import TokenApi from "@/axios/TokenApi";
import { useDispatch } from "react-redux";
import { setFileText } from "@/redux/FileSlice";
import { useSelector } from "react-redux";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [modal, setModal] = useState(false);
  const [fileData, setFileData] = useState("");
  const dispatch = useDispatch();
  const {id}=useSelector((id)=>id.auth)
  useEffect(() => {
    if (!file) return;

    const fileType = file.name.split(".").pop().toLowerCase();
    if (!["pdf", "docx"].includes(fileType)) {
      toast.error("Only PDF or DOCX files are allowed", { autoClose: 1500 });
      setFile(null);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user", id);
    formData.append("name", file.name);
    formData.append("type", file.type);

    TokenApi.post("/api/fileUpload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        if (response?.data?.extracted_text) {
          setFileData(response.data.extracted_text);
          dispatch(setFileText(response.data.extracted_text));
          setModal(true);
        } else {
          toast.error("No text extracted from the file", { autoClose: 1500 });
        }
      })
      .catch((error) => {
        console.error("Upload error:", error?.response?.data);
        toast.error(
          error?.response?.data?.errors || "Failed to upload file",
          { autoClose: 1500 }
        );
      });
  }, [file]);

  return (
    <>
      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="flex flex-col bg-white p-10 w-[380px] md:w-[400px] gap-5 border border-gray-300 shadow-2xl rounded-2xl">
            <h1 className="text-center text-2xl font-bold text-gray-800">
              Select What You Want
            </h1>

            <Link
              href={{
                pathname: "/dashboard/paraphraser"
              }}
            >
              <button className="w-full py-2 px-4 bg-amber-500 hover:bg-amber-600 text-white rounded-md font-semibold transition duration-300 shadow cursor-pointer">
                Paraphraser
              </button>
            </Link>

            <Link
              href={{
                pathname: "/dashboard/summarization"
              }}
            >
              <button className="w-full py-2 px-4 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-md font-semibold transition duration-300 shadow cursor-pointer">
                Summarization
              </button>
            </Link>

            <Link
              href={{
                pathname: "/dashboard/grammer-checker",
               
              }}
            >
              <button className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-md font-semibold transition duration-300 shadow cursor-pointer">
                Grammar Checker
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* File Upload Section */}
      <div className="block md:flex bg-gray-900 text-white min-h-[70vh]">
        <div className="w-full md:w-1/2">
          <Image
            src={"/img/FileUpload.png"}
            alt="Upload File"
            width={1536}
            height={1024}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-between pl-4 pr-4 py-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
              Upload Your Document Here
            </h2>
            <p className="mt-4 text-gray-300 text-lg max-w-2xl">
              Upload your document and get results like AI check, paraphrasing,
              or plagiarism detection. Supported formats:{" "}
              <strong>.pdf</strong> and <strong>.docx</strong>.
            </p>
          </div>

          <div className="mt-6 self-start">
            <label className="cursor-pointer py-3 px-9 text-white rounded-md bg-gradient-to-r from-blue-600 to-cyan-700 hover:from-blue-500 hover:to-cyan-600 transition">
              Upload File
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>
        </div>
      </div>

      <Steps />
      <WhyCard />
    </>
  );
}

export default FileUpload;
