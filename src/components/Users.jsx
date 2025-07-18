import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LogOut,
  Users as UsersIcon,
  Search,
  ChevronRight,
  Activity,
  ArrowLeft,
} from "lucide-react";
import myImage from "../assets/image.png";

const Users = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleUserClick = (username) => {
    navigate(`/users/edit-user/${username}`);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          "https://electrical-trixi-21fit-route666-b4d11dd8.koyeb.app/Profile/allUsers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 401) {
          localStorage.clear();
          navigate("/login");
          return;
        }

        if (!response.ok) throw new Error("Failed to fetch users");

        const data = await response.json();
        setUsers(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 border-b border-white/20 p-4 flex items-center gap-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded hover:bg-white/20"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashobard
        </button>
      </header>

      {/* Users Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">All Users</h2>
          <p className="text-blue-200">Search users by username</p>
        </div>

        {/* Search Input */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6 mb-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
            <input
              type="text"
              placeholder="Search by username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Users Grid */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
          <div className="flex items-center gap-3 mb-6">
            <UsersIcon className="w-6 h-6 text-blue-400" />
            <h3 className="text-2xl font-bold text-white">
              Users ({filteredUsers.length})
            </h3>
          </div>

          {loading ? (
            <p className="text-blue-200">Loading users...</p>
          ) : error ? (
            <p className="text-red-400">Error: {error}</p>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <UsersIcon className="w-16 h-16 text-blue-300 mx-auto mb-4" />
              <p className="text-blue-200 text-lg">No users found</p>
              <p className="text-blue-300 text-sm mt-2">
                Try a different username
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((user, index) => (
                <div
                  key={index}
                  onClick={() => handleUserClick(user.username)}
                  className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 p-6 hover:bg-white/20 transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.image || "https://placehold.co/100x100"}
                        alt={user.username}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                      />
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-blue-200 transition-colors">
                          {user.username}
                        </h3>
                        <p className="text-blue-200 text-sm">
                          {user.firstName} {user.lastName}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-blue-300 group-hover:text-white transition-colors" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200 text-sm">Email</span>
                      <span className="text-white text-sm">{user.email}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-blue-200 text-sm">Gender</span>
                      <span className="text-white text-sm">
                        {user.gender || "-"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-blue-200 text-sm">Joined</span>
                      <span className="text-white text-sm">
                        {formatDate(user.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
