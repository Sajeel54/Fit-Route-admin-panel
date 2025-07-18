import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LogOut,
  Users,
  TrendingUp,
  Clock,
  ChevronRight,
  Target,
  FileText,
} from "lucide-react";
import myImage from "../assets/image.png";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [totalUsers, setTotalUsers] = useState(0);
  const [unsuspend, setUnsuspend] = useState(0);

  const fetchTotalUsers = async () => {
    try {
      const authToken = localStorage.getItem("adminToken");
      if (!authToken) {
        logout();
        navigate("/login");
        return;
      }

      const res = await fetch(
        "https://electrical-trixi-21fit-route666-b4d11dd8.koyeb.app/Profile/total-users",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 401) {
        logout();
        navigate("/login");
        return;
      }

      const data = await res.json();
      setTotalUsers(data.value || 0);
    } catch (err) {
      console.error("Total Users Fetch Error:", err);
    }
  };

  const fetchUnsuspend = async () => {
    try {
      const authToken = localStorage.getItem("adminToken");
      if (!authToken) {
        logout();
        navigate("/login");
        return;
      }

      const res = await fetch(
        "https://electrical-trixi-21fit-route666-b4d11dd8.koyeb.app/report/unsuspend",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 401) {
        logout();
        navigate("/login");
        return;
      }

      const data = await res.json();
      setUnsuspend(data.value || 0);
    } catch (err) {
      console.error("Unsuspend Fetch Error:", err);
    }
  };

  const fetchReports = async () => {
    setLoading(true);
    try {
      const authToken = localStorage.getItem("adminToken");
      if (!authToken) {
        logout();
        navigate("/login");
        return;
      }

      const response = await fetch(
        "https://electrical-trixi-21fit-route666-b4d11dd8.koyeb.app/report",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 401) {
        logout();
        navigate("/login");
        return;
      }

      const data = await response.json();
      setReports(data || []);
    } catch (err) {
      console.error("Reports Fetch Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
    fetchTotalUsers();
    fetchUnsuspend();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCardClick = (username) => {
    navigate(`/user/${username}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <img src={myImage} alt="Logo" className="w-20 h-10" />
              <h1 className="text-xl font-bold text-white">FITROUTE Admin</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-200 rounded-lg hover:bg-red-500/30 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>
      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Dashboard Overview
          </h2>
          <p className="text-blue-200">Welcome to FITROUTE Admin Panel</p>
        </div>
      </div>
      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium">Total Users</p>
                <p className="text-3xl font-bold text-white">{totalUsers}</p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-sm font-medium">
                  Active Users
                </p>
                <p className="text-3xl font-bold text-white">{unsuspend}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-200 text-sm font-medium">
                  Total Reports
                </p>
                <p className="text-3xl font-bold text-white">
                  {reports.reduce((acc, user) => acc + user.reportCount, 0)}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            onClick={() => navigate("/users")}
            className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-8 hover:bg-white/20 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-all">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors">
                  Manage Users
                </h3>
                <p className="text-blue-200">
                  View and manage all registered users
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-300 text-sm">
                {totalUsers} total users
              </span>
              <Target className="w-5 h-5 text-blue-300 group-hover:text-white transition-colors" />
            </div>
          </div>

          <div
            onClick={() => navigate("/reports")}
            className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 p-8 hover:bg-white/20 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-all">
                <FileText className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-green-200 transition-colors">
                  View Reports
                </h3>
                <p className="text-blue-200">Review all user reports</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-blue-300 text-sm">
                {reports.length || 0} total reports
              </span>
              <Target className="w-5 h-5 text-blue-300 group-hover:text-white transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
