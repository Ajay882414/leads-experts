"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import UserDetails from "@/components/admin/users/UserDetails";
import { getUser } from "@/services/userApi";
import { User } from "@/types/user";

export default function UserDetailsPage() {
  const { id } = useParams();

  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await getUser(
        id as string
      );

      setUser(res.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-10">
        User Not Found
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          User Details
        </h1>

        <p className="text-gray-500">
          Complete user information
        </p>

      </div>

      <UserDetails
        user={user}
      />

    </div>
  );
}