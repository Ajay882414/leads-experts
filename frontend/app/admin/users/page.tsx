"use client";

import { useEffect, useState } from "react";

import UserTable from "@/components/admin/users/UserTable";
import UserStats from "@/components/admin/users/UserStats";
import UserFilters from "@/components/admin/users/UserFilters";

import {
  getUsers,
  deleteUser,
  updateUserStatus,
  getUserStats,
} from "@/services/userApi";

import { User } from "@/types/user";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    blockedUsers: 0,
    adminUsers: 0,
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await getUsers({
        search,
        status,
      });

      setUsers(res.users);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await getUserStats();

      setStats(res.stats);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [search, status]);

  const handleDelete = async (id: string) => {
    const ok = confirm("Delete User?");

    if (!ok) return;

    try {
      await deleteUser(id);

      fetchUsers();

      fetchStats();
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async (
    id: string,
    newStatus: string
  ) => {
    try {
      await updateUserStatus(
        id,
        newStatus
      );

      fetchUsers();

      fetchStats();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Users
        </h1>

        <p className="text-gray-500">
          Manage all registered users
        </p>

      </div>

      <UserStats stats={stats} />

      <UserFilters
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />

      <UserTable
        users={users}
        onDelete={handleDelete}
        onStatus={handleStatus}
      />

    </div>
  );
}