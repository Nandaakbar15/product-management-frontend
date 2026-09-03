/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

import axios from "axios";

import type { Users } from "@/src/types/Users";

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

export default function UserDataPages() {
  const [users, setUsers] = useState<Users[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/users");

      setUsers(res.data.data);
    } catch (error) {
      console.error("Error : ", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
                  Halaman data pengguna
                </h1>
                <p className="text-sm text-gray-500">Kelola data pengguna</p>
              </div>
            </div>

            <div className="overflow-x-auto mt-3">
              <Card>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold text-[16px] px-4 py-2">
                          User ID
                        </TableHead>
                        <TableHead className="font-semibold text-[16px] px-4 py-2">
                          Username
                        </TableHead>
                        <TableHead className="font-semibold text-[16px] px-4 py-2">
                          Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((data) => (
                        <TableRow key={data.id}>
                          <TableCell className="font-medium border border-gray-300 px-4 py-2">
                            {data.id}
                          </TableCell>
                          <TableCell className="font-medium border border-gray-300 px-4 py-2">
                            {data.username}
                          </TableCell>
                          <TableCell className="space-x-2 border border-gray-300 px-4 py-2">
                            <Link
                              to={`/detail_user/${data.id}`}
                              className="inline-block text-white px-4 py-2 rounded-lg shadow-lg bg-blue-500 hover:bg-blue-700"
                            >
                              Detail
                            </Link>

                            <button className="inline-block text-white rounded-lg shadow-lg px-4 py-2 bg-red-500 hover:bg-red-700">
                              Delete
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
