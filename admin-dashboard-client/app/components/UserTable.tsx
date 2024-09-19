// components/UserTable.tsx
export default function UserTable() {
    return (
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
          </tr>
        </thead>
        <tbody>
          {/* Example rows, you can replace with dynamic data */}
          <tr>
            <td className="py-2 px-4 border-b">1</td>
            <td className="py-2 px-4 border-b">John Doe</td>
            <td className="py-2 px-4 border-b">johndoe@example.com</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">2</td>
            <td className="py-2 px-4 border-b">Jane Smith</td>
            <td className="py-2 px-4 border-b">janesmith@example.com</td>
          </tr>
        </tbody>
      </table>
    );
  }
  