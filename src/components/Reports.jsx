import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, Users, ChevronRight, ArrowLeft } from "lucide-react";

const Reports = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCardClick = (username) => {
    navigate(`/reports/user/${username}`);
  };

  const fetchReports = async () => {
    setLoading(true);
    setError(null);
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

      if (!response.ok) throw new Error("Failed to fetch reports");

      const data = await response.json();
      setReports(data || []);
    } catch (err) {
      console.error("Error fetching reports:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Reports Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-white mb-6">
          Users with Reports
        </h2>

        {loading && <p className="text-blue-200">Loading reports...</p>}
        {error && <p className="text-red-400">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(report.username)}
              className="bg-white/5 border border-white/20 p-4 rounded-lg hover:bg-white/10 cursor-pointer transition"
            >
              <div className="flex items-center gap-4">
                {report.imageUrl ? (
                  <img
                    src={report.imageUrl}
                    alt={report.username}
                    className="w-12 h-12 rounded-full object-cover border border-white/20"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center text-white">
                    {report.username.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="text-white font-semibold">
                    {report.username}
                  </h3>
                  <p className="text-sm text-blue-200">
                    Reports: {report.reportCount}
                  </p>
                </div>

                <ChevronRight className="text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
