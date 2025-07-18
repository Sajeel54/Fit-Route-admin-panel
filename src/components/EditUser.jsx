import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Camera } from "lucide-react";

const EditUser = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch(
          `https://electrical-trixi-21fit-route666-b4d11dd8.koyeb.app/Profile/userDetails?u=${username}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 401) {
          localStorage.clear();
          navigate("/login");
          return;
        }

        if (!res.ok) throw new Error("Failed to fetch user details");

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("adminToken");

      const payload = {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role || "USER",
        gender: user.gender,
        bio: user.bio,
      };

      const res = await fetch(
        `https://electrical-trixi-21fit-route666-b4d11dd8.koyeb.app/Profile/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
      console.log("Res", res);
      if (!res.ok) throw new Error("Failed to update user");

      alert("User updated successfully");
      navigate("/users");
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        Loading user data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-red-400">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="bg-white/10 border-b border-white/20 p-4 flex items-center gap-4">
        <button
          onClick={() => navigate("/users")}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded hover:bg-white/20"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Users
        </button>
        <h2 className="text-xl font-bold">Edit User: {user.username}</h2>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white/10 rounded-lg border border-white/20 p-6 space-y-6">
          {/* Editable Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex flex-col">
              First Name
              <input
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                className="mt-1 px-4 py-2 bg-slate-800 border border-white/20 rounded text-white"
              />
            </label>
            <label className="flex flex-col">
              Last Name
              <input
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                className="mt-1 px-4 py-2 bg-slate-800 border border-white/20 rounded text-white"
              />
            </label>
            <label className="flex flex-col">
              Email
              <input
                name="email"
                value={user.email}
                onChange={handleChange}
                className="mt-1 px-4 py-2 bg-slate-800 border border-white/20 rounded text-white"
              />
            </label>
            <label className="flex flex-col">
              Gender
              <select
                name="gender"
                value={user.gender}
                onChange={handleChange}
                className="mt-1 px-4 py-2 bg-slate-800 border border-white/20 rounded text-white"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>

            <label className="flex flex-col md:col-span-2">
              Bio
              <textarea
                name="bio"
                value={user.bio}
                onChange={handleChange}
                className="mt-1 px-4 py-2 bg-slate-800 border border-white/20 rounded text-white"
                rows={3}
              />
            </label>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded flex items-center gap-2 text-white"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
