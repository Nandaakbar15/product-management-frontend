/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

import type { Category } from "@/src/types/Category";
import type { Brand } from "@/src/types/Brand";
import type { Supplier } from "@/src/types/Supplier";
import { useEffect, useState } from "react";
import axios from "axios";

import Modal from "@/components/Modal";

export default function AddProductPages() {
  const [productName, setProductNames] = useState("");
  const [description, setDescriptions] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [brandId, setBrandId] = useState("");
  const [supplierId, setSupplierId] = useState("");

  const [category, setCategory] = useState<Category[]>([]);
  const [brand, setBrand] = useState<Brand[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/categories?limit=100",
      );

      setCategory(res.data.data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  const fetchBrand = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/brand?limit=100",
      );

      setBrand(res.data.data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/suppliers?limit=100",
      );

      setSuppliers(res.data.data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBrand();
    fetchSuppliers();
  }, []);

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/createProducts",
        {
          name: productName,
          description: description,
          categoryId: categoryId,
          brandId: brandId,
          supplierId: supplierId,
        },
      );

      setMessage(res.data.message);
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate("/product_data");
      }, 2000);

      // clear the form
      setProductNames("");
      setDescriptions("");
      setBrandId("");
      setCategoryId("");
      setSupplierId("");
    } catch (error) {
      console.error("Error : ", error);

      setShowModal(true);
      setMessage("Error, failed to add new product!");
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
                  Halaman form tambah produk
                </h1>
                <p className="text-sm text-gray-500">
                  Form untuk menambahkan data produk
                </p>
              </div>
            </div>

            <div className="max-w mx-auto mt-10">
              <Card>
                <CardContent>
                  <form className="p-6" onSubmit={addProduct}>
                    <div className="mb-5">
                      <label
                        htmlFor="name"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Nama Produk <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={(e) => setProductNames(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-lg placeholder:text-body"
                        placeholder="masukan nama produk..."
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="description"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="description"
                        rows={4}
                        onChange={(e) => setDescriptions(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full p-3.5 shadow-lg placeholder:text-body"
                        placeholder="masukan deskripsi..."
                      ></textarea>
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="categoryId"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Kategori <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="categoryId"
                        name="categoryId"
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand shadow-lg placeholder:text-body"
                      >
                        <option value={""}>-- Pilih kategori --</option>
                        {category.map((data) => (
                          <option value={data.id} key={data.id}>
                            {data.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="brandId"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Brand <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="brandId"
                        name="brandId"
                        onChange={(e) => setBrandId(e.target.value)}
                        className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand shadow-lg placeholder:text-body"
                      >
                        <option value={""}>-- Pilih Brand --</option>
                        {brand.map((data) => (
                          <option value={data.id} key={data.id}>
                            {data.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="supplierId"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Supplier <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="supplierId"
                        name="supplierId"
                        onChange={(e) => setSupplierId(e.target.value)}
                        className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand shadow-lg placeholder:text-body"
                      >
                        <option value={""}>-- Pilih supplier --</option>
                        {suppliers.map((data) => (
                          <option value={data.id} key={data.id}>
                            {data.companyName}
                          </option>
                        ))}
                      </select>
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
                    to={"/product_data"}
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
