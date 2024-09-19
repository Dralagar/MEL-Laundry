import { useState } from "react";
import UserTable from "../components/UserTable";
import UserForm from "../components/UserForm";

const UserManagementContent = () => {
  const [isAddingUser, setIsAddingUser] = useState(false);

  const handleAddUserClick = () => {
    setIsAddingUser(!isAddingUser);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-semibold mb-8">User Management</h1>

      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={handleAddUserClick}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isAddingUser ? "Cancel" : "Add New User"}
        </button>
      </div>

      {/* Conditionally Render User Form or Table */}
      {isAddingUser ? (
        <div className="mb-6">
          <UserForm />
        </div>
      ) : (
        <div>
          <UserTable />
        </div>
      )}
    </div>
  );
};

export default UserManagementContent;
