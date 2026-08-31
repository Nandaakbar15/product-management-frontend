/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

import axios from "axios";

import type { Supplier } from "@/src/types/Supplier";

import { Card, CardContent } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Modal from "@/components/Modal";

import { useNavigate } from "react-router-dom";

export default function SupplierDataPages() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const [paginations, setPaginations] = useState({
    current_page: 1,
    last_page: 1,
  });

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const fetchSuppliers = async (page: number = 1) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/suppliers?page=${page}`,
      );

      setSuppliers(res.data.data);

      setPaginations({
        current_page: res.data.meta.page,
        last_page: res.data.meta.last_page,
      });
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const deleteSupplier = async (id: number) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/deleteSupplier/${id}`,
      );

      setShowModal(true);
      setMessage(res.data.message);

      setTimeout(() => {
        setShowModal(false);
        navigate("/supplier_data");
      }, 2000);

      // refresh the data
      fetchSuppliers();
    } catch (error) {
      console.error("Error : ", error);

      setShowModal(true);
      setMessage("Error, failed to delete data!");
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
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Halaman data supplier
                </h1>
                <p className="text-sm text-gray-500">Kelola data supplier</p>
              </div>

              <div className="mt-3">
                <h2>
                  <Link
                    to={"/add_supplier"}
                    className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-blue-500 hover:bg-blue-700"
                  >
                    + Add Supplier
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
                          Supplier ID
                        </TableHead>
                        <TableHead className="font-semibold text-[16px] px-4 py-2">
                          Company Name
                        </TableHead>
                        <TableHead className="font-semibold text-[16px] px-4 py-2">
                          Contact Name
                        </TableHead>
                        <TableHead className="font-semibold text-[16px] px-4 py-2">
                          Phone
                        </TableHead>
                        <TableHead className="font-semibold text-[16px] px-4 py-2">
                          Email
                        </TableHead>
                        <TableHead className="font-semibold text-[16px] px-4 py-2">
                          Address
                        </TableHead>
                        <TableHead className="font-semibold text-[16px] px-4 py-2">
                          Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {suppliers.map((data) => (
                        <TableRow key={data.id}>
                          <TableCell className="font-medium border border-gray-300 px-4 py-2">
                            {data.id}
                          </TableCell>
                          <TableCell className="font-medium border border-gray-300 px-4 py-2">
                            {data.companyName || "-"}
                          </TableCell>
                          <TableCell className="font-medium border border-gray-300 px-4 py-2">
                            {data.contactName || "-"}
                          </TableCell>
                          <TableCell className="font-medium border border-gray-300 px-4 py-2">
                            {data.phone || "-"}
                          </TableCell>
                          <TableCell className="font-medium border border-gray-300 px-4 py-2">
                            {data.email || "-"}
                          </TableCell>
                          <TableCell className="font-medium border border-gray-300 px-4 py-2">
                            {data.address || "-"}
                          </TableCell>
                          <TableCell className="space-x-2 border border-gray-300 px-4 py-2">
                            <Link
                              to={`/edit_supplier/${data.id}`}
                              className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-blue-500 hover:bg-blue-700"
                            >
                              Edit
                            </Link>

                            <button
                              className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-red-500 hover:bg-red-700"
                              onClick={() => deleteSupplier(data.id)}
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
                      onClick={() =>
                        fetchSuppliers(paginations.current_page - 1)
                      }
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
                      onClick={() =>
                        fetchSuppliers(paginations.current_page + 1)
                      }
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
