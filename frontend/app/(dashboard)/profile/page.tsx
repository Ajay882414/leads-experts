"use client";

import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
} from "@/services/authApi";

export default function ProfilePage() {

  const [user, setUser] = useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await getProfile();

    setUser(res.user);
  };

  const handleUpdate = async () => {

    setLoading(true);

    await updateProfile(user);

    alert("Profile Updated");

    setLoading(false);
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-8">
        My Profile
      </h1>

      <input
        className="border p-3 w-full mb-4"
        value={user.fullName}
        onChange={(e) =>
          setUser({
            ...user,
            fullName: e.target.value,
          })
        }
      />

      <input
        className="border p-3 w-full mb-4"
        value={user.mobileNumber}
        onChange={(e) =>
          setUser({
            ...user,
            mobileNumber:
              e.target.value,
          })
        }
      />

      <input
        className="border p-3 w-full mb-4"
        value={user.platform}
        onChange={(e) =>
          setUser({
            ...user,
            platform: e.target.value,
          })
        }
      />

      <input
        className="border p-3 w-full mb-4"
        value={user.state}
        onChange={(e) =>
          setUser({
            ...user,
            state: e.target.value,
          })
        }
      />

      <button
        onClick={handleUpdate}
        className="bg-black text-white px-6 py-3"
      >
        {loading
          ? "Updating..."
          : "Update Profile"}
      </button>

    </div>
  );
}