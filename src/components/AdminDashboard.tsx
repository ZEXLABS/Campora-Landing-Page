import React, { useState, useEffect } from 'react';
import { getAllWaitlistUsers } from '../lib/firebase';
import { WaitlistUser } from '../types';
import { Shield, Lock, Search, Download, Users, GraduationCap, Clock, RefreshCw, X, Database, CheckCircle2, Home } from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [users, setUsers] = useState<WaitlistUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUniversity, setFilterUniversity] = useState('ALL');
  const [filterTimeline, setFilterTimeline] = useState('ALL');

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadData();
    }
  }, [isOpen, isAuthenticated]);

  const loadData = async () => {
    setIsLoading(true);
    const data = await getAllWaitlistUsers();
    setUsers(data);
    setIsLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPwd = password.trim();
    if (cleanPwd === 'Dormiqa26/27' || cleanPwd.toLowerCase() === 'dormiqa26/27') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Access denied. Invalid administrator credentials.');
    }
  };

  if (!isOpen) return null;

  // Filtered users
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.university.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesUni = filterUniversity === 'ALL' || u.university === filterUniversity;
    const matchesTimeline = filterTimeline === 'ALL' || u.accommodationTimeline === filterTimeline;

    return matchesSearch && matchesUni && matchesTimeline;
  });

  // Calculate metrics
  const totalUsers = users.length;
  const immediateNeed = users.filter((u) => u.accommodationTimeline === 'Immediately' || u.accommodationTimeline === 'Within 1 month').length;
  const needAccommodationCount = users.filter((u) => u.accommodationNeed === 'Yes').length;

  // CSV Export handler
  const exportCSV = () => {
    const headers = ['Queue Position', 'Full Name', 'Email', 'Phone', 'University', 'Level', 'Timeline', 'Need Off-Campus', 'How Heard', 'Joined Date'];
    const rows = filteredUsers.map((u) => [
      u.position,
      `"${u.fullName}"`,
      u.email,
      u.phone || '',
      `"${u.university}"`,
      u.level,
      `"${u.accommodationTimeline}"`,
      u.accommodationNeed,
      u.referralSource || '',
      u.createdAt,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `dormiqa_firebase_waitlist_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-[#E7E5E4] relative flex flex-col">
        {/* Header Bar */}
        <div className="bg-[#0F172A] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-[#0D9488]" />
            <h3 className="font-bold text-base tracking-tight">Dormiqa Firebase Waitlist Admin</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unauthenticated Lock Screen */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto">
            <div className="w-12 h-12 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6 text-[#0D9488]" />
            </div>
            <h4 className="text-xl font-bold text-[#0F172A] mb-1">Protected Admin Portal</h4>
            <p className="text-xs text-[#78716C] mb-6">Enter administrative password to view student waitlist metrics directly from Firebase.</p>

            {authError && (
              <div className="mb-4 text-xs text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Enter admin password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 text-sm border border-[#D6D3D1] rounded-xl text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F172A]"
              />
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#0F172A] hover:bg-[#1E293B] text-white text-sm font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Unlock Admin Portal
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[#FAF9F6]">
            {/* Firebase Live Status Indicator Banner */}
            <div className="bg-[#F0FDF4] border border-emerald-200 p-3.5 rounded-xl flex items-center justify-between text-xs text-emerald-900">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>Firebase Firestore Sync Active:</strong> Reading live waitlist documents from collection <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-emerald-200">waitlistUsers</code>.
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Live</span>
              </div>
            </div>

            {/* Top Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-[#E7E5E4] shadow-2xs">
                <div className="flex items-center justify-between text-[#78716C] text-xs font-semibold mb-1">
                  <span>Total Students on Waitlist</span>
                  <Users className="w-4 h-4 text-[#0D9488]" />
                </div>
                <div className="text-3xl font-black text-[#0F172A]">{totalUsers}</div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E7E5E4] shadow-2xs">
                <div className="flex items-center justify-between text-[#78716C] text-xs font-semibold mb-1">
                  <span>Immediate Need (0-30 days)</span>
                  <Clock className="w-4 h-4 text-[#0D9488]" />
                </div>
                <div className="text-3xl font-black text-[#0F172A]">{immediateNeed}</div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E7E5E4] shadow-2xs">
                <div className="flex items-center justify-between text-[#78716C] text-xs font-semibold mb-1">
                  <span>Off-Campus Need (Yes)</span>
                  <Home className="w-4 h-4 text-[#0D9488]" />
                </div>
                <div className="text-3xl font-black text-[#0F172A]">{needAccommodationCount}</div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#E7E5E4] shadow-2xs">
                <div className="flex items-center justify-between text-[#78716C] text-xs font-semibold mb-1">
                  <span>Institutions Represented</span>
                  <GraduationCap className="w-4 h-4 text-[#0D9488]" />
                </div>
                <div className="text-3xl font-black text-[#0F172A]">
                  {new Set(users.map((u) => u.university)).size}
                </div>
              </div>
            </div>

            {/* Filter & Action Controls */}
            <div className="bg-white p-4 rounded-xl border border-[#E7E5E4] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-[#78716C]" />
                <input
                  type="text"
                  placeholder="Search student name, email address, or university..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full text-xs py-1.5 px-2 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={loadData}
                  className="p-2 border border-[#E7E5E4] rounded-lg text-[#57534E] hover:bg-[#F5F5F4] text-xs font-medium flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>Refresh Firebase</span>
                </button>

                <button
                  onClick={exportCSV}
                  className="px-3 py-2 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#0D9488]" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* User Data Table */}
            <div className="bg-white rounded-xl border border-[#E7E5E4] overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-[#0F172A]">
                  <thead className="bg-[#FAF9F6] border-b border-[#E7E5E4] font-bold text-[#57534E] uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">#</th>
                      <th className="py-3 px-4">Student</th>
                      <th className="py-3 px-4">University</th>
                      <th className="py-3 px-4">Level</th>
                      <th className="py-3 px-4">Timeline</th>
                      <th className="py-3 px-4">Source</th>
                      <th className="py-3 px-4">Joined Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7E5E4]">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-[#78716C]">
                          No waitlist records found in Firebase match your filters.
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-[#FAF9F6] transition-colors">
                          <td className="py-3 px-4 font-mono text-[#78716C]">#{u.position}</td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-[#0F172A]">{u.fullName}</div>
                            <div className="text-[11px] text-[#78716C]">{u.email}</div>
                            {u.phone && <div className="text-[10px] text-[#A8A29E] font-mono">{u.phone}</div>}
                          </td>
                          <td className="py-3 px-4 font-medium">{u.university}</td>
                          <td className="py-3 px-4 text-[#57534E]">{u.level}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-md bg-[#F5F5F4] border border-[#E7E5E4] font-medium text-[11px]">
                              {u.accommodationTimeline}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-medium text-[#0D9488]">{u.referralSource || 'Direct'}</td>
                          <td className="py-3 px-4 text-[#78716C] font-mono text-[10px]">
                            {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'Recent'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
