/* eslint-disable @typescript-eslint/no-unused-vars */
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

import axios from "axios";

import Modal from "@/components/Modal";

import { Link, useNavigate, useParams } from "react-router-dom";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function EditCategoriesPages() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescriptions] = useState("");

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoriesById = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/categories/${id}`,
        );

        const { name, slug, description } = res.data.data;

        setName(name);
        setSlug(slug);
        setDescriptions(description);
      } catch (error) {
        console.error("Error : ", error);
      }
    };

    fetchCategoriesById();
  }, [id]);

  const editCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/updateCategories/${id}`,
        {
          name: name,
          slug: slug,
          description: description,
        },
      );

      setShowModal(true);
      setMessage(res.data.message);

      setTimeout(() => {
        setShowModal(false);
        navigate("/category_data");
      }, 2000);
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
                  Halaman form edit kategori
                </h1>
                <p className="text-sm text-gray-500">
                  Form untuk mengubah data kategori
                </p>
              </div>
            </div>

            <div className="max-w mx-auto mt-10">
              <Card>
                <CardContent>
                  <form className="p-6" onSubmit={editCategory}>
                    <div className="mb-5">
                      <label
                        htmlFor="name"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Nama Kategori <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-lg placeholder:text-body"
                        placeholder="masukan nama kategori..."
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="slug"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Slug Kategori <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="slug"
                        name="slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-lg placeholder:text-body"
                        placeholder="masukan slug kategori..."
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="deskripsi"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Deskripsi
                      </label>
                      <textarea
                        id="deskripsi"
                        rows={4}
                        name="deskripsi"
                        value={description}
                        onChange={(e) => setDescriptions(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full p-3.5 shadow-lg placeholder:text-body"
                        placeholder="Masukan deskripsi..."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="text-white bg-blue-500 box-border border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-brand-medium shadow-lg font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none"
                    >
                      Edit!
                    </button>
                  </form>
                </CardContent>
                <CardFooter>
                  <Link
                    to={"/category_data"}
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
