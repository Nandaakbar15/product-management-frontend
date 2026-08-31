/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Sidebar from "../../../../components/Sidebar";
import Header from "../../../../components/Header";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import { useEffect, useState } from "react";

import type { Product } from "@/src/types/Product";

import Modal from "@/components/Modal";

export default function ProductDataPages() {
  const [products, setProducts] = useState<Product[]>([]);

  const [paginations, setPaginations] = useState({
    current_page: 1,
    last_page: 1,
  });

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const fetchProduct = async (page: number = 1) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/products?page=${page}`,
      );

      // debug the data
      console.log(res.data);

      setProducts(res.data.data);
      setPaginations({
        current_page: res.data.meta.page,
        last_page: res.data.meta.last_page,
      });
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const deleteProduct = async (id: number) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/deleteProduct/${id}`,
      );

      setShowModal(true);
      setMessage(res.data.message);

      setTimeout(() => {
        setShowModal(false);
        navigate("/product_data");
      }, 2000);

      // refresh the data
      fetchProduct();
    } catch (error) {
      console.error("Error : ", error);

      setShowModal(true);
      setMessage("Error, failed to delete the data!");
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
                  Halaman Data Produk
                </h1>
                <p className="text-sm text-gray-500">Kelola data produk</p>
              </div>

              <div className="mt-3">
                <h2>
                  <Link
                    to={"/add_product"}
                    className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-blue-500 hover:bg-blue-700"
                  >
                    + Tambah Produk
                  </Link>
                </h2>
              </div>
            </div>
            <div className="overflow-x-auto mt-3">
              <Card>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold text-[16px] px-4 py-2">
                          Product ID
                        </TableHead>
                        <TableHead className="font-semibold text-[16px] px-4 py-2">
                          Product Name
                        </TableHead>
                        <TableHead className="font-semibold text-[16px] px-4 py-2">
                          Description
                        </TableHead>
                        <TableHead className="font-semibold text-[16px] px-4 py-2">
                          Category
                        </TableHead>
                        <TableHead className="font-semibold text-[16px] px-4 py-2">
                          Brand Name
                        </TableHead>
                        <TableHead className="font-semibold text-[16px] px-4 py-2">
                          Supplier Name
                        </TableHead>
                        <TableHead className="font-semibold text-[16px] px-4 py-2">
                          Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((data) => (
                        <TableRow key={data.id}>
                          <TableCell className="font-medium border border-gray-300 px-4 py-2">
                            {data.id}
                          </TableCell>
                          <TableCell className="font-medium border border-gray-300 px-4 py-2">
                            {data.name}
                          </TableCell>
                          <TableCell className="font-medium border border-gray-300 px-4 py-2">
                            {data.description || "-"}
                          </TableCell>
                          <TableCell className="font-medium border border-gray-300 px-4 py-2">
                            {data.category?.name || "-"}
                          </TableCell>
                          <TableCell className="font-medium border border-gray-300 px-4 py-2">
                            {data.brand?.name || "-"}
                          </TableCell>
                          <TableCell className="font-medium border border-gray-300 px-4 py-2">
                            {data.supplier?.companyName || "-"}
                          </TableCell>
                          <TableCell className="space-x-2 border border-gray-300 px-4 py-2">
                            <Link
                              to={`/edit_product/${data.id}`}
                              className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-blue-500 hover:bg-blue-700"
                            >
                              Edit
                            </Link>

                            <button
                              className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-red-500 hover:bg-reed-700"
                              onClick={() => deleteProduct(data.id)}
                            >
                              Delete
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {/* Paginations */}
                  <div className="flex justify-center items-center mt-6 space-x-2">
                    <button
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={paginations.current_page === 1}
                      onClick={() => fetchProduct(paginations.current_page - 1)}
                    >
                      Previous
                    </button>
                    <span className="text-sm text-gray-600">
                      Pages {paginations.current_page} from{" "}
                      {paginations.last_page}
                    </span>
                    <button
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={
                        paginations.current_page === paginations.last_page
                      }
                      onClick={() => fetchProduct(paginations.current_page + 1)}
                    >
                      Next
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
