/* eslint-disable react-hooks/set-state-in-effect */
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

import axios from "axios";

import Modal from "@/components/Modal";

import type { Product } from "@/src/types/Product";

import { Link, useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function EditProductVariantPages() {
  const { id } = useParams();

  const [products, setProducts] = useState<Product[]>([]);

  const [productId, setProductId] = useState("");
  const [variantName, setVariantName] = useState("");
  const [sku, setSku] = useState("");
  const [barcode, setBarcode] = useState("");
  const [price, setPrice] = useState(0);
  const [costPrice, setCostPrice] = useState(0);
  const [stockQuantity, setStockQuantity] = useState(0);

  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/products?limit=100",
      );

      setProducts(res.data.data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  useEffect(() => {
    const fetchProductVariant = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/productVariants/${id}`,
        );

        const {
          productId,
          variantName,
          sku,
          barcode,
          price,
          costPrice,
          stockQuantity,
        } = res.data.data;

        setProductId(productId);
        setVariantName(variantName);
        setSku(sku);
        setBarcode(barcode);
        setPrice(price);
        setCostPrice(costPrice);
        setStockQuantity(stockQuantity);
      } catch (error) {
        console.error("Error : ", error);
      }
    };

    fetchProductVariant();

    fetchProducts();
  }, [id]);

  const editProductVariant = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3000/api/v1/updateProductVariants/${id}`,
        {
          productId: productId,
          variantName: variantName,
          sku: sku,
          barcode: barcode,
          price: price,
          costPrice: costPrice,
          stockQuantity: stockQuantity,
        },
      );

      setShowModal(true);
      setMessage(res.data.message);

      setTimeout(() => {
        setShowModal(false);
        navigate("/product_variant_data");
      }, 2000);

      // clear the form
      setProductId("");
      setVariantName("");
      setSku("");
      setBarcode("");
      setPrice(0);
      setCostPrice(0);
      setStockQuantity(0);
    } catch (error) {
      console.error("Error : ", error);

      setShowModal(true);
      setMessage("Error, cannot add new data!");
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
                  Halaman form edit data varian produk
                </h1>
                <p className="text-sm text-gray-500">
                  Form untuk mengubah data varian produk
                </p>
              </div>
            </div>

            <div className="max-w mx-auto mt-10">
              <Card>
                <CardContent>
                  <form className="p-6" onSubmit={editProductVariant}>
                    <div className="mb-5">
                      <label
                        htmlFor="productId"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Produk
                      </label>
                      <select
                        id="productId"
                        name="productId"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        className="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand shadow-lg placeholder:text-body"
                      >
                        <option value={""}>-- Pilih Produk --</option>
                        {products.map((data) => (
                          <option value={data.id} key={data.id}>
                            {data.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="variantName"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Nama Variant Produk
                      </label>
                      <input
                        type="text"
                        id="variantName"
                        name="variantName"
                        value={variantName}
                        onChange={(e) => setVariantName(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-lg placeholder:text-body"
                        placeholder="masukan nama varian produk..."
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="sku"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        SKU <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="sku"
                        name="sku"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-lg placeholder:text-body"
                        placeholder="masukan sku..."
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="barcode"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Barcode <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="barcode"
                        name="barcode"
                        value={barcode}
                        onChange={(e) => setBarcode(e.target.value)}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-lg placeholder:text-body"
                        placeholder="masukan barcode..."
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="price"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Price <span className="text-red-500">*</span>
                      </label>
                      Rp.
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(parseInt(e.target.value))}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-lg placeholder:text-body"
                        placeholder="masukan price..."
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="costPrice"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Cost Price <span className="text-red-500">*</span>
                      </label>
                      Rp.
                      <input
                        type="number"
                        id="costPrice"
                        name="costPrice"
                        value={costPrice}
                        onChange={(e) => setCostPrice(parseInt(e.target.value))}
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-lg placeholder:text-body"
                        placeholder="masukan cost price..."
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label
                        htmlFor="stockQuantity"
                        className="block mb-2.5 text-sm font-medium text-heading"
                      >
                        Jumlah Stok <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="stockQuantity"
                        name="stockQuantity"
                        value={stockQuantity}
                        onChange={(e) =>
                          setStockQuantity(parseInt(e.target.value))
                        }
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-lg placeholder:text-body"
                        placeholder="masukan stok..."
                        required
                      />
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
                    to={"/product_variant_data"}
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
