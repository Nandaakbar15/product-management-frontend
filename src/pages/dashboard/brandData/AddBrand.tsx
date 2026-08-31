/* eslint-disable @typescript-eslint/no-unused-vars */
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

import axios from "axios";

import Modal from "@/components/Modal";

import { Link, useNavigate } from "react-router-dom";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";

export default function AddBrandPages() {
  const [brandName, setBrandName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const addBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/v1/createBrand", {
        name: brandName,
        logoUrl: logoUrl,
        website: websiteUrl,
      });

      setMessage(res.data.message);
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate("/brand_data");
      }, 2000);

      // clear the form
      setBrandName("");
      setLogoUrl("");
      setWebsiteUrl("");
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  return (
    <div className="bg-gray-100 font-sans antialiased min-h-screen">
      <div className="flex h-screen overflow-hidden">
        {/* 1. SIDEBAR */}
        <Sidebar />

        {/* 2. MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col overflow-y-auto min-w-0">
          {/* HEADER */}
          <Header />

          {/* MAIN CONTAINER */}
          <main className="p-6 space-y-6 flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <Modal show={showModal} onClose={() => setShowModal(false)}>
                <p className="text-center text-gray-700">{message}</p>
              </Modal>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Halaman form tambah data brand
                </h1>
                <p className="text-sm text-gray-500">
                  Form untuk menambahkan data brand
                </p>
              </div>
            </div>

            <div className="max-w mx-auto mt-10">
              <Card>
                <CardContent>
                  <form className="p-6" onSubmit={addBrand}>
                    <div className="mb-5">
                      <label
                        htmlFor="brand"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Nama Brand <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="brand"
                        name="brand"
                        onChange={(e) => setBrandName(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-lg placeholder:text-body"
                        placeholder="masukan nama brand..."
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="logoUrl"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Logo URL
                      </label>
                      <input
                        type="text"
                        id="logoUrl"
                        name="logoUrl"
                        onChange={(e) => setLogoUrl(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-lg placeholder:text-body"
                        placeholder="masukan link url logo brand..."
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="website"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Website
                      </label>
                      <input
                        type="text"
                        id="website"
                        name="website"
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-lg placeholder:text-body"
                        placeholder="masukan link website brand..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="text-white bg-blue-500 box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-brand-medium shadow-lg font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none"
                    >
                      Add!
                    </button>
                  </form>
                </CardContent>
                <CardFooter>
                  <Link
                    to={"/brand_data"}
                    className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-slate-500 hover:bg-slate-700"
                  >
                    Back
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
