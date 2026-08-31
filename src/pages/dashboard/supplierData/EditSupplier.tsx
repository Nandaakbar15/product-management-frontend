/* eslint-disable @typescript-eslint/no-unused-vars */
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

import axios from "axios";

import Modal from "@/components/Modal";

import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function EditSupplierPages() {
  const { id } = useParams();
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupplierById = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/suppliers/${id}`,
        );

        const { companyName, contactName, phone, email, address } =
          res.data.data;

        setCompanyName(companyName);
        setContactName(contactName);
        setPhoneNumber(phone);
        setEmail(email);
        setAddress(address);
      } catch (error) {
        console.error("Error : ", error);
      }
    };

    fetchSupplierById();
  }, [id]);

  const editSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/updateSupplier/${id}`,
        {
          companyName: companyName,
          contactName: contactName,
          phone: phoneNumber,
          email: email,
          address: address,
        },
      );

      setShowModal(true);
      setMessage(res.data.message);

      setTimeout(() => {
        setShowModal(false);
        navigate("/supplier_data");
      }, 2000);

      // clear the form
      setCompanyName("");
      setContactName("");
      setPhoneNumber("");
      setEmail("");
      setAddress("");
    } catch (error) {
      console.error("Error : ", error);

      setShowModal(true);
      setMessage("Error, failed to add new supplier!");
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
                  Halaman form edit data supplier
                </h1>
                <p className="text-sm text-gray-500">
                  Form untuk mengubah data supplier
                </p>
              </div>
            </div>

            <div className="max-w mx-auto mt-10">
              <Card>
                <CardContent>
                  <form className="p-6" onSubmit={editSupplier}>
                    <div className="mb-5">
                      <label
                        htmlFor="companyName"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Nama Perusahaan <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-lg placeholder:text-body"
                        placeholder="masukan nama perusahaan..."
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="contactName"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Nama Kontak
                      </label>
                      <input
                        type="text"
                        id="contactName"
                        name="contactName"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-lg placeholder:text-body"
                        placeholder="masukan nama kontak..."
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="phone"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Nomor Telepon
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-lg placeholder:text-body"
                        placeholder="masukan nomor telepon..."
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="email"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-lg placeholder:text-body"
                        placeholder="masukan email..."
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="address"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Alamat
                      </label>
                      <textarea
                        id="address"
                        rows={4}
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full p-3.5 shadow-lg placeholder:text-body"
                        placeholder="Masukan alamat..."
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
                    to={"/supplier_data"}
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
