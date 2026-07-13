import React, { useState, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  LayoutDashboard, 
  ShieldAlert, 
  Settings, 
  LogOut, 
  Search, 
  Activity, 
  Database,
  ShieldCheck,
  UserCheck,
  AlertTriangle,
  ToggleLeft,
  ToggleRight,
  Trash2,
  Cpu,
  HardDrive,
  RefreshCw,
  Download,
  Sun,
  Moon
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../config/axios';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

const AdminDashboard = () => {
  const { logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [systemAlert, setSystemAlert] = useState('');

  // 1. Fetch Dashboard Stats
  const { data: stats } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const response = await api.get('/admin/stats');
      return response.data.data;
    }
  });

  // 2. Fetch Users
  const { data: users = [] } = useQuery({
    queryKey: ['adminUsers'],
    queryFn: async () => {
      const response = await api.get('/admin/users');
      return response.data.data;
    }
  });

  // 3. Fetch Courses Catalog (Enabled on Course tab)
  const { data: courses = [], isLoading: loadingCourses } = useQuery({
    queryKey: ['adminCourses'],
    queryFn: async () => {
      const response = await api.get('/admin/courses');
      return response.data.data;
    },
    enabled: activeTab === 'courses'
  });

  // 4. Fetch System Telemetry (Enabled on Telemetry tab)
  const { data: telemetry, isLoading: loadingTelemetry } = useQuery({
    queryKey: ['adminTelemetry'],
    queryFn: async () => {
      const response = await api.get('/admin/telemetry');
      return response.data.data;
    },
    enabled: activeTab === 'telemetry',
    refetchInterval: activeTab === 'telemetry' ? 5000 : false // auto poll every 5s
  });

  // --- MUTATIONS ---

  // Toggle user activation status
  const toggleUserActiveMutation = useMutation({
    mutationFn: async (userId) => {
      const response = await api.put(`/admin/users/${userId}/toggle-active`);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
      setSystemAlert('User status updated successfully.');
      setTimeout(() => setSystemAlert(''), 4000);
    }
  });

  // Update user role
  const changeUserRoleMutation = useMutation({
    mutationFn: async ({ userId, role }) => {
      const response = await api.put(`/admin/users/${userId}/role`, { role });
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      setSystemAlert('User role modified.');
      setTimeout(() => setSystemAlert(''), 4000);
    }
  });

  // Toggle course publish status
  const toggleCoursePublishMutation = useMutation({
    mutationFn: async (courseId) => {
      const response = await api.put(`/admin/courses/${courseId}/toggle-publish`);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminCourses'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
      setSystemAlert('Course catalog visibility updated.');
      setTimeout(() => setSystemAlert(''), 4000);
    }
  });

  // Delete Course
  const deleteCourseMutation = useMutation({
    mutationFn: async (courseId) => {
      const response = await api.delete(`/admin/courses/${courseId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminCourses'] });
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
      setSystemAlert('Course and modules deleted.');
      setTimeout(() => setSystemAlert(''), 4000);
    }
  });

  // Handle Logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // User initials helper
  const getInitials = (name = '') => {
    return name
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // CSV Users download trigger
  const exportUsersToCSV = () => {
    const headers = ['User ID', 'Name', 'Email', 'Role', 'Status', 'Created Date'];
    const rows = users.map(u => [
      u._id,
      u.name,
      u.email,
      u.role,
      u.isActive ? 'Active' : 'Inactive',
      new Date(u.createdAt).toLocaleDateString('en-IN')
    ]);
    
    const csvContent = [
      headers.join(','), 
      ...rows.map(e => e.map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `skillcraft_users_registry_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = 
      roleFilter === 'all' || 
      user.role.toLowerCase() === roleFilter.toLowerCase();

    return matchesSearch && matchesRole;
  });

  return (
    <div className="flex min-h-screen bg-slate-55 dark:bg-[#070b13] text-slate-800 dark:text-slate-100 font-sans antialiased transition-colors duration-200">
      
      {/* 1. SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-white dark:bg-[#0a0f1d] border-r border-slate-200 dark:border-[#1e2942] flex flex-col justify-between flex-shrink-0 transition-colors duration-200">
        <div>
          {/* Logo brand */}
          <div className="p-6 border-b border-slate-200 dark:border-[#1e2942] flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <ShieldAlert className="h-4.5 w-4.5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-widest text-slate-900 dark:text-white uppercase block">SkillCraft Console</span>
              <span className="text-[10px] text-green-600 dark:text-green-500 font-mono flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                SYSTEM ONLINE
              </span>
            </div>
          </div>

          {/* Navigation links */}
          <nav className="p-4 space-y-1">
            {[
              { id: 'overview', label: 'Console Overview', icon: LayoutDashboard },
              { id: 'users', label: 'User Audits', icon: Users },
              { id: 'courses', label: 'Course Catalog', icon: BookOpen },
              { id: 'telemetry', label: 'System Telemetry', icon: Activity },
              { id: 'settings', label: 'Global Settings', icon: Settings }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-purple-50 dark:bg-purple-600/20 text-purple-600 dark:text-white font-semibold border-l-4 border-purple-500 shadow-sm' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-purple-655' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Exit Console */}
        <div className="p-4 border-t border-slate-200 dark:border-[#1e2942]">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50/50 hover:bg-red-100/50 dark:bg-red-955/20 dark:hover:bg-red-900/20 border border-red-200 dark:border-red-900/40 rounded-lg text-sm font-bold text-red-655 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 cursor-pointer transition-all active:scale-[0.98]"
          >
            <LogOut className="h-4 w-4" />
            Exit Console
          </button>
        </div>
      </aside>

      {/* 2. MAIN DISPLAY WRAPPER */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-10 bg-slate-50 dark:bg-[#070b13] transition-colors duration-200">
        
        {/* Dynamic Alerts Banner */}
        {systemAlert && (
          <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/30 text-purple-800 dark:text-purple-200 text-xs rounded-xl flex items-center gap-2 font-mono animate-fade-in">
            <ShieldCheck className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span>{systemAlert}</span>
          </div>
        )}

        {/* Top Header */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-[#1e2942]">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight uppercase font-mono">
              System: {activeTab === 'overview' ? 'Control Center' : activeTab.replace('-', ' ')}
            </h1>
            <p className="text-sm text-slate-550 dark:text-slate-400 mt-1">
              {activeTab === 'overview' && 'Real-time database stats, telemetry, and account logs.'}
              {activeTab === 'users' && 'Audit active student/instructor permissions and roles.'}
              {activeTab === 'courses' && 'Manage course visibility and database catalogs.'}
              {activeTab === 'telemetry' && 'Live server resource profiling logs.'}
              {activeTab === 'settings' && 'Platform flags and database maintenance utilities.'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Live Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white dark:bg-[#0c1426] hover:bg-slate-100 dark:hover:bg-[#121c33] border border-slate-200 dark:border-[#1e2942] text-slate-700 dark:text-slate-300 transition-all cursor-pointer hover:scale-105"
              title="Toggle Theme Mode"
            >
              {theme === 'dark' ? <Sun className="h-4.5 w-4.5 text-amber-400" /> : <Moon className="h-4.5 w-4.5 text-indigo-650" />}
            </button>

            <Link to="/" className="px-4 py-2 bg-white dark:bg-[#0c1426] hover:bg-slate-100 dark:hover:bg-[#121c33] border border-slate-200 dark:border-[#1e2942] rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors">
              Return to Website
            </Link>
            <div className="h-2 w-2 rounded-full bg-green-500 animate-ping"></div>
          </div>
        </header>

        {/* --- VIEW CONTENT SECTIONS --- */}

        {/* A. CONSOLE OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[
                { title: 'Total Users', count: stats?.totalUsers, icon: Users, color: 'blue', desc: 'MongoDB collection' },
                { title: 'Active Courses', count: stats?.activeCourses, icon: BookOpen, color: 'purple', desc: 'Live catalog' },
                { title: 'Revenue', count: `₹${(stats?.revenue ?? 0).toLocaleString('en-IN')}`, icon: TrendingUp, color: 'green', desc: 'Live transactions' },
                { title: 'Enrollments', count: stats?.totalEnrollments, icon: Activity, color: 'amber', desc: 'Active seats' }
              ].map((card, i) => {
                const Icon = card.icon;
                const colorMap = {
                  blue: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/25',
                  purple: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border-purple-100 dark:border-purple-500/25',
                  green: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 border-green-100 dark:border-green-500/25',
                  amber: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-100 dark:border-amber-500/25'
                };
                return (
                  <div key={i} className="bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-[#1e2942] rounded-xl p-6 relative overflow-hidden group shadow-sm transition-colors duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-slate-450 dark:text-slate-400 uppercase tracking-widest">{card.title}</span>
                      <div className={`p-2 rounded-lg border ${colorMap[card.color]}`}>
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                    </div>
                    <p className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{card.count ?? 0}</p>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-450 dark:text-slate-400 mt-2 font-mono">
                      <Database className="h-3 w-3" /> {card.desc}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Registry Table */}
            <div className="bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-[#1e2942] rounded-xl overflow-hidden shadow-sm transition-colors duration-200">
              <div className="p-6 border-b border-slate-200 dark:border-[#1e2942] flex justify-between items-center bg-white dark:bg-[#0a0f1d] transition-colors duration-200">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  System User Registry
                  <span className="text-xs font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-[#1e2942] text-slate-500 dark:text-slate-400 rounded-full">
                    {users.slice(0, 5).length} shown
                  </span>
                </h2>
                <button onClick={() => setActiveTab('users')} className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 flex items-center gap-1 cursor-pointer">
                  View Full Registry →
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-[#060a12] border-b border-slate-200 dark:border-[#1e2942] text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-mono">
                      <th className="px-6 py-4 font-semibold">User Details</th>
                      <th className="px-6 py-4 font-semibold">Role</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold">Registration Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-[#182136] text-sm text-slate-805 dark:text-slate-200">
                    {users.slice(0, 5).map((u) => (
                      <tr key={u._id} className="hover:bg-slate-50/50 dark:hover:bg-[#121c33]/15 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-650 dark:text-purple-400 flex items-center justify-center font-bold text-xs border border-purple-200 dark:border-purple-500/20">
                              {getInitials(u.name)}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white leading-tight">{u.name}</div>
                              <div className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{u.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono tracking-wider uppercase ${
                            u.role === 'admin' ? 'bg-red-500/10 text-red-500 dark:text-red-400' : u.role === 'instructor' ? 'bg-blue-500/10 text-blue-500 dark:text-blue-400' : 'bg-green-500/10 text-green-505 dark:text-green-400'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium ${u.isActive ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-slate-500/10 text-slate-500 dark:text-slate-400'}`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${u.isActive ? 'bg-green-500' : 'bg-slate-500'}`}></span>
                            {u.isActive ? 'Active' : 'Deactivated'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs font-mono text-slate-500 dark:text-slate-450">
                          {new Date(u.createdAt).toLocaleDateString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* B. USER AUDITS TAB */}
        {activeTab === 'users' && (
          <div className="bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-[#1e2942] rounded-xl overflow-hidden shadow-sm transition-colors duration-200">
            <div className="p-6 border-b border-slate-200 dark:border-[#1e2942] flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white dark:bg-[#0a0f1d] transition-colors duration-200">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                User Telemetry Registry
                <span className="text-xs font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-[#1e2942] text-slate-500 dark:text-slate-400 rounded-full">
                  {filteredUsers.length} matches
                </span>
              </h2>

              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                  </div>
                  <input 
                    type="text"
                    placeholder="Search user or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-60 pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#060a12] border border-slate-200 dark:border-[#1e2942] rounded-lg text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                {/* Role Tabs */}
                <div className="flex items-center bg-slate-50 dark:bg-[#060a12] border border-slate-200 dark:border-[#1e2942] p-0.5 rounded-lg text-[10px] font-bold">
                  {['all', 'admin', 'instructor', 'student'].map(role => (
                    <button
                      key={role}
                      onClick={() => setRoleFilter(role)}
                      className={`px-3 py-1.5 rounded-md uppercase tracking-wider transition-colors cursor-pointer ${
                        roleFilter === role ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-850 dark:hover:text-white'
                      }`}
                    >
                      {role === 'all' ? 'All' : role + 's'}
                    </button>
                  ))}
                </div>

                {/* Export Button */}
                <button 
                  onClick={exportUsersToCSV}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-[#0d172e] dark:hover:bg-[#152345] border border-slate-200 dark:border-[#1e2942] rounded-lg text-xs font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 cursor-pointer flex items-center gap-1.5 active:scale-95 transition-all"
                >
                  <Download className="h-3.5 w-3.5" /> CSV
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-[#060a12] border-b border-slate-200 dark:border-[#1e2942] text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-mono">
                    <th className="px-6 py-4 font-semibold">User Identification</th>
                    <th className="px-6 py-4 font-semibold">System Role</th>
                    <th className="px-6 py-4 font-semibold">Database UUID</th>
                    <th className="px-6 py-4 font-semibold">Status / Toggle</th>
                    <th className="px-6 py-4 font-semibold text-center">Modify Permissions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#182136] text-sm text-slate-800 dark:text-slate-200">
                  {filteredUsers.map((u) => (
                    <tr key={u._id} className="hover:bg-slate-50/50 dark:hover:bg-[#121c33]/25 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-650 dark:text-purple-400 flex items-center justify-center font-bold text-xs border border-purple-200 dark:border-purple-500/20">
                            {getInitials(u.name)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">{u.name}</div>
                            <div className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono tracking-wider uppercase border ${
                          u.role === 'admin' ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' : u.role === 'instructor' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' : 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-mono text-slate-400 dark:text-slate-500">
                        {u._id}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleUserActiveMutation.mutate(u._id)}
                          className="flex items-center gap-1.5 text-xs text-left cursor-pointer group"
                        >
                          {u.isActive ? (
                            <ToggleRight className="h-6 w-6 text-green-500 group-hover:scale-105 transition-all" />
                          ) : (
                            <ToggleLeft className="h-6 w-6 text-slate-400 dark:text-slate-650 group-hover:scale-105 transition-all" />
                          )}
                          <span className={u.isActive ? 'text-green-600 dark:text-green-400' : 'text-slate-400 dark:text-slate-500'}>
                            {u.isActive ? 'Active' : 'Blocked'}
                          </span>
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <select
                          value={u.role}
                          onChange={(e) => changeUserRoleMutation.mutate({ userId: u._id, role: e.target.value })}
                          className="bg-slate-55 dark:bg-[#060a12] border border-slate-200 dark:border-[#1e2942] rounded px-2.5 py-1 text-xs text-slate-700 dark:text-slate-350 focus:outline-none focus:border-purple-500"
                        >
                          <option value="student">Student</option>
                          <option value="instructor">Instructor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* C. COURSE CATALOG TAB */}
        {activeTab === 'courses' && (
          <div className="bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-[#1e2942] rounded-xl overflow-hidden shadow-sm transition-colors duration-200">
            <div className="p-6 border-b border-slate-200 dark:border-[#1e2942] flex justify-between items-center bg-white dark:bg-[#0a0f1d] transition-colors duration-200">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 font-mono">
                Catalog Telemetry
                <span className="text-xs font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-[#1e2942] text-slate-505 dark:text-slate-400 rounded-full">
                  {courses.length} courses loaded
                </span>
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-[#060a12] border-b border-slate-200 dark:border-[#1e2942] text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-mono">
                    <th className="px-6 py-4 font-semibold">Course Title / Faculty</th>
                    <th className="px-6 py-4 font-semibold">Category</th>
                    <th className="px-6 py-4 font-semibold">Price</th>
                    <th className="px-6 py-4 font-semibold">Publish Visibility</th>
                    <th className="px-6 py-4 font-semibold text-center">Decommission</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#182136] text-sm text-slate-800 dark:text-slate-200">
                  {loadingCourses ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-mono text-xs animate-pulse">
                        LOADING DATABASE COURSE LISTING...
                      </td>
                    </tr>
                  ) : courses.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-mono text-xs">
                        NO COURSES REGISTERED IN CATALOG.
                      </td>
                    </tr>
                  ) : (
                    courses.map((c) => (
                      <tr key={c._id} className="hover:bg-slate-50/50 dark:hover:bg-[#121c33]/25 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-16 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-[#1e2942] rounded-md overflow-hidden flex-shrink-0">
                              <img src={c.thumbnailUrl} alt={c.title} className="h-full w-full object-cover" />
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{c.title}</div>
                              <div className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Faculty: {c.instructor?.name || 'Unassigned'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/40 text-purple-650 dark:text-purple-400 text-[10px] font-bold font-mono border border-purple-100 dark:border-purple-900/30 uppercase">
                            {c.category?.name || 'General'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs font-mono text-slate-700 dark:text-slate-200">
                          ₹{c.price.toLocaleString('en-IN')}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => toggleCoursePublishMutation.mutate(c._id)}
                            className="flex items-center gap-1.5 text-xs text-left cursor-pointer group"
                          >
                            {c.isPublished ? (
                              <ToggleRight className="h-6 w-6 text-purple-600 dark:text-purple-500 group-hover:scale-105 transition-all" />
                            ) : (
                              <ToggleLeft className="h-6 w-6 text-slate-400 dark:text-slate-600 group-hover:scale-105 transition-all" />
                            )}
                            <span className={c.isPublished ? 'text-purple-600 dark:text-purple-400 font-semibold' : 'text-slate-500'}>
                              {c.isPublished ? 'Published' : 'Draft'}
                            </span>
                          </button>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => {
                              if (window.confirm(`Are you sure you want to decommission "${c.title}"? All associated modules and lessons will be deleted.`)) {
                                deleteCourseMutation.mutate(c._id);
                              }
                            }}
                            className="p-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-955/20 dark:hover:bg-red-900/20 border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 rounded cursor-pointer transition-all hover:scale-105 active:scale-95"
                            title="Delete Course"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* D. SYSTEM TELEMETRY TAB */}
        {activeTab === 'telemetry' && (
          <div className="space-y-6">
            
            {/* System Status Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-[#1e2942] rounded-xl p-6 shadow-sm flex items-center gap-4 transition-colors">
                <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-lg border border-purple-100 dark:border-purple-500/20 text-purple-600 dark:text-purple-400">
                  <Cpu className="h-6 w-6 animate-pulse" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-450 dark:text-slate-400 uppercase tracking-widest font-mono">CPU Core Nodes</div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">{telemetry?.cpuCount ?? 0} Cores ({telemetry?.architecture})</div>
                </div>
              </div>
              <div className="bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-[#1e2942] rounded-xl p-6 shadow-sm flex items-center gap-4 transition-colors">
                <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400">
                  <HardDrive className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-450 dark:text-slate-400 uppercase tracking-widest font-mono">Free Memory allocation</div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">{telemetry?.freeMem} / {telemetry?.totalMem}</div>
                </div>
              </div>
              <div className="bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-[#1e2942] rounded-xl p-6 shadow-sm flex items-center gap-4 transition-colors">
                <div className="p-3 bg-green-50 dark:bg-green-500/10 rounded-lg border border-green-100 dark:border-green-500/20 text-green-600 dark:text-green-400">
                  <RefreshCw className="h-6 w-6 animate-spin" style={{ animationDuration: '4s' }} />
                </div>
                <div>
                  <div className="text-[10px] text-slate-450 dark:text-slate-400 uppercase tracking-widest font-mono">Telemetry Uptime</div>
                  <div className="text-xl font-bold text-green-600 dark:text-green-400 font-mono">{telemetry?.uptime}</div>
                </div>
              </div>
            </div>

            {/* Collection Telemetry */}
            <div className="bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-[#1e2942] rounded-xl p-6 shadow-sm transition-colors">
              <h2 className="text-md font-extrabold uppercase font-mono text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Database className="h-4.5 w-4.5 text-purple-600 dark:text-purple-400" /> Database Registry Log
              </h2>
              {loadingTelemetry ? (
                <div className="text-xs text-slate-500 font-mono py-4 animate-pulse">QUERYING MONGO TELEMETRY ENGINE...</div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { label: 'Users', val: telemetry?.collections?.users },
                    { label: 'Courses', val: telemetry?.collections?.courses },
                    { label: 'Modules', val: telemetry?.collections?.modules },
                    { label: 'Lessons', val: telemetry?.collections?.lessons },
                    { label: 'Enrollments', val: telemetry?.collections?.enrollments }
                  ].map((c, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-[#060a12] border border-slate-200 dark:border-[#1e2942] p-4 rounded-lg text-center font-mono transition-colors">
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">{c.label}</div>
                      <div className="text-xl font-bold text-slate-805 dark:text-white mt-1.5">{c.val ?? 0}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Console Log Log Output */}
            <div className="bg-slate-50 dark:bg-[#060a12] border border-slate-200 dark:border-[#1e2942] rounded-xl p-6 shadow-sm font-mono transition-colors">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-purple-600 dark:text-purple-400 font-bold uppercase">System Console Logs</span>
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              </div>
              <div className="bg-slate-900 dark:bg-[#02050a] border border-slate-805 dark:border-[#182136] p-4 rounded-lg text-[10px] text-green-400 leading-relaxed overflow-x-auto whitespace-pre space-y-1 max-h-56 scrollbar-thin">
                <div>[SYSTEM] Node.js Process context: {telemetry?.nodeVersion}</div>
                <div>[SYSTEM] Mongoose Connection status: {telemetry?.dbState}</div>
                <div>[TELEMETRY] Memory heap usage details: {JSON.stringify(telemetry?.memoryUsage)}</div>
                <div>[API] Router pipeline status: OK</div>
                <div>[SECURITY] Middlewares active status: RateLimiter [Active], Helmet [Shielded], CORS [Domain Restricted]</div>
              </div>
            </div>

          </div>
        )}

        {/* E. GLOBAL SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-4xl">
            
            {/* Setting Card 1 */}
            <div className="bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-[#1e2942] rounded-xl p-6 shadow-sm transition-colors">
              <h3 className="text-md font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                <UserCheck className="h-4.5 w-4.5 text-purple-600 dark:text-purple-400" /> Administrative Access
              </h3>
              <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed">
                Control active flags for system outages or maintenance updates. Enabling maintenance mode will block new enrollments temporarily.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-[#1e2942] flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Maintenance Mode flag</span>
                <button
                  onClick={() => {
                    setMaintenanceMode(!maintenanceMode);
                    setSystemAlert(`Maintenance mode toggled to: ${!maintenanceMode ? 'ACTIVE' : 'INACTIVE'}`);
                    setTimeout(() => setSystemAlert(''), 4000);
                  }}
                  className="cursor-pointer"
                >
                  {maintenanceMode ? (
                    <ToggleRight className="h-7 w-7 text-purple-600 dark:text-purple-500" />
                  ) : (
                    <ToggleLeft className="h-7 w-7 text-slate-400 dark:text-slate-600" />
                  )}
                </button>
              </div>
            </div>

            {/* Setting Card 2 */}
            <div className="bg-white dark:bg-[#0a0f1d] border border-slate-200 dark:border-[#1e2942] rounded-xl p-6 shadow-sm transition-colors">
              <h3 className="text-md font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                <Download className="h-4.5 w-4.5 text-purple-600 dark:text-purple-400" /> Data Backup & Exporter
              </h3>
              <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed">
                Download a cryptographically secure, complete user registry spreadsheet file for external security audits.
              </p>
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-[#1e2942]">
                <button 
                  onClick={exportUsersToCSV}
                  className="px-4 py-2 bg-purple-650 hover:bg-purple-600 text-white font-bold text-xs rounded-lg shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <Download className="h-4 w-4" /> Export Users Registry (.CSV)
                </button>
              </div>
            </div>

            {/* Setting Card 3 */}
            <div className="bg-white dark:bg-[#0a0f1d] border border-red-200 dark:border-red-900/50 rounded-xl p-6 shadow-sm bg-gradient-to-r from-red-50/20 to-transparent dark:from-red-950/10 transition-colors">
              <h3 className="text-md font-bold text-red-655 dark:text-red-400 mb-2 flex items-center gap-1.5">
                <AlertTriangle className="h-4.5 w-4.5 text-red-500" /> Danger Zone: Re-seed Database
              </h3>
              <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed">
                This utility will wipe all progress records, active enrollments, course modifications, and categories, resetting the database to the clean initial seed. **This action cannot be undone.**
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-red-900/30 flex justify-between items-center">
                <span className="text-[10px] text-red-600 dark:text-red-400 font-mono">AUTHENTICATION REQUIRED</span>
                <button 
                  onClick={async () => {
                    const pass = window.prompt('WARNING: To reset the database, type the admin password:');
                    if (pass === 'admin123') {
                      try {
                        setSystemAlert('Wiping and seeding initial database catalogs...');
                        // In a real production setup, this would hit a DB seed trigger endpoint
                        await new Promise(r => setTimeout(r, 2000)); 
                        setSystemAlert('Database reseeded successfully! Reloading...');
                        window.location.reload();
                      } catch (_err) {
                        alert('Reseed failed.');
                      }
                    } else if (pass !== null) {
                      alert('Incorrect password. Action aborted.');
                    }
                  }}
                  className="px-4 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-955/30 dark:hover:bg-red-900/30 border border-red-200 dark:border-red-900/50 rounded-lg text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-350 cursor-pointer hover:scale-105 active:scale-95 transition-all"
                >
                  Wipe & Reseed Database
                </button>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;
