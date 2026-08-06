import { User } from "@/types/user";

interface Props {
  user: User;
}

export default function UserDetails({
  user,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-8">

      <h2 className="text-2xl font-bold mb-8">
        User Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div>

          <p className="text-gray-500">
            Full Name
          </p>

          <h3 className="font-semibold">
            {user.fullName}
          </h3>

        </div>

        <div>

          <p className="text-gray-500">
            Email
          </p>

          <h3 className="font-semibold">
            {user.email}
          </h3>

        </div>

        <div>

          <p className="text-gray-500">
            Role
          </p>

          <h3 className="font-semibold capitalize">
            {user.role}
          </h3>

        </div>

        <div>

          <p className="text-gray-500">
            Status
          </p>

          <h3 className="font-semibold">
            {user.status}
          </h3>

        </div>

        <div>

          <p className="text-gray-500">
            Joined On
          </p>

          <h3 className="font-semibold">
            {new Date(
              user.createdAt
            ).toLocaleDateString()}
          </h3>

        </div>

      </div>

    </div>
  );
}