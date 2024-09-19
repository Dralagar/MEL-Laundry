import { useState } from "react";

const SettingsContent = () => {
  const [settings, setSettings] = useState({
    siteName: "MEL Laundry",
    email: "admin@mel-laundry.com",
    theme: "light",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleSave = () => {
    // Handle saving settings, e.g., send data to API
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-semibold mb-8">Settings</h1>

      {isEditing ? (
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="siteName">
              Site Name
            </label>
            <input
              type="text"
              id="siteName"
              name="siteName"
              value={settings.siteName}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={settings.email}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="theme">
              Theme
            </label>
            <select
              id="theme"
              name="theme"
              value={settings.theme}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <p className="mb-4">
            <strong>Site Name:</strong> {settings.siteName}
          </p>
          <p className="mb-4">
            <strong>Email Address:</strong> {settings.email}
          </p>
          <p className="mb-4">
            <strong>Theme:</strong> {settings.theme.charAt(0).toUpperCase() + settings.theme.slice(1)}
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Settings
          </button>
        </div>
      )}
    </div>
  );
};

export default SettingsContent;
