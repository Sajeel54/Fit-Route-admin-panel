import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle,
  Activity,
  Target,
  Utensils,
  Bug,
  User,
} from "lucide-react";

const UserDetails = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserReports = async () => {
      try {
        const authToken = localStorage.getItem("adminToken");
        if (!authToken) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          `https://electrical-trixi-21fit-route666-b4d11dd8.koyeb.app/report/user?username=${username}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 401) {
          localStorage.clear();
          navigate("/login");
          return;
        }

        if (!response.ok) throw new Error("Failed to fetch user reports");

        const data = await response.json();
        setReports(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserReports();
  }, [username]);

  const getReportStatusIcon = (status) => {
    switch (status) {
      case "new":
        return <Clock className="w-5 h-5 text-blue-400" />;
      case "reviewed":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case "resolved":
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getReportTypeIcon = (type) => {
    switch (type) {
      case "fitness":
        return <Activity className="w-5 h-5 text-purple-400" />;
      case "nutrition":
        return <Utensils className="w-5 h-5 text-orange-400" />;
      case "progress":
        return <Target className="w-5 h-5 text-green-400" />;
      case "issue":
        return <Bug className="w-5 h-5 text-red-400" />;
      default:
        return <FileText className="w-5 h-5 text-blue-400" />;
    }
  };

  const sortedReports = [...reports].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-blue-200">
        Loading user data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-red-400">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <button
              onClick={() => navigate("/reports")}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Reports
            </button>
            <h1 className="text-xl font-bold text-white">
              {`${username}'s`} Reports
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Reports Section */}
        <div className="bg-white/10 rounded-xl border border-white/20 p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-6 h-6 text-blue-400" />
            <h3 className="text-2xl font-bold text-white">Reports</h3>
            <span className="bg-blue-500/20 text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
              {reports.length} reports
            </span>
          </div>

          {reports.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-blue-300 mx-auto mb-4" />
              <p className="text-blue-200 text-lg">
                No reports found for this user
              </p>
              <p className="text-blue-300 text-sm mt-2">
                Reports will appear here when submitted
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {sortedReports.map((report, index) => (
                <div
                  key={index}
                  className="bg-white/10 rounded-lg border border-white/20 p-6 hover:bg-white/15"
                >
                  <div className="flex items-start gap-4">
                    {/* Reporter Image */}
                    {report.reporterImage ? (
                      <img
                        src={report.reporterImage}
                        alt={report.reporterUsername}
                        className="w-12 h-12 rounded-full object-cover border border-white/20"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center text-white text-lg font-bold">
                        {report.reporterUsername.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-lg font-semibold text-white">
                          {report.reporterUsername}
                        </h4>
                        <div className="flex gap-2">
                          {getReportTypeIcon(report.type)}
                          {getReportStatusIcon(report.status)}
                        </div>
                      </div>
                      <p className="text-blue-200">{report.reason}</p>
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

export default UserDetails;
