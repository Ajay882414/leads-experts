interface Props {
  users: any[];
}

export default function UserReportTable({
  users,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-4 text-left">
              Name
            </th>

            <th className="text-left">
              Email
            </th>

            <th className="text-left">
              Role
            </th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr
              key={user._id}
              className="border-b"
            >

              <td className="p-4">
                {user.fullName}
              </td>

              <td>
                {user.email}
              </td>

              <td className="capitalize">
                {user.role}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}