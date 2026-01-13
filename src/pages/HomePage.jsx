// pages/HomePage.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Menu,
  X,
  Search,
  Bell,
  User,
  LogOut,
  Shield,
  BarChart3,
  Map,
  FileText,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Download,
  Eye,
  Settings,
  Home
} from 'lucide-react';

const HomePage = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { label: 'Total Projects', value: '8,567', change: '+12%', icon: <Home />, color: 'blue' },
    { label: 'Active Projects', value: '1,234', change: '+5%', icon: <TrendingUp />, color: 'green' },
    { label: 'High Risk', value: '89', change: '-3%', icon: <AlertTriangle />, color: 'red' },
    { label: 'Completed', value: '6,215', change: '+8%', icon: <CheckCircle />, color: 'indigo' }
  ];

  const recentProjects = [
    { id: 1, name: 'Indore Metro Line 3', status: 'High Risk', progress: 45, budget: '₹1,200 Cr', delay: '4 months' },
    { id: 2, name: 'Mumbai Coastal Road', status: 'On Track', progress: 78, budget: '₹2,500 Cr', delay: '0 months' },
    { id: 3, name: 'Delhi Smart City', status: 'Medium Risk', progress: 32, budget: '₹3,400 Cr', delay: '2 months' },
    { id: 4, name: 'Chennai Port Expansion', status: 'On Track', progress: 91, budget: '₹1,800 Cr', delay: '0 months' }
  ];

  const notifications = [
    { id: 1, title: 'New Project Alert', description: 'Highway project flagged for review', time: '2 hours ago', read: false },
    { id: 2, title: 'Contractor Rating Updated', description: 'XYZ Constructions reliability score changed', time: '1 day ago', read: true },
    { id: 3, title: 'Budget Overrun Detected', description: 'Bridge construction exceeds budget by 15%', time: '2 days ago', read: false }
  ];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 /> },
    { id: 'projects', label: 'Projects', icon: <Map /> },
    { id: 'contractors', label: 'Contractors', icon: <Users /> },
    { id: 'reports', label: 'Reports', icon: <FileText /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp /> },
    { id: 'alerts', label: 'Alerts', icon: <AlertTriangle /> }
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              
              <div className="flex items-center ml-4">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  SANKALP
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:block relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Search projects, contractors..."
                  className="pl-10 pr-4 py-2 w-64 lg:w-96 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Menu */}
              <div className="relative group">
                <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white">
                    {user?.name?.[0] || <User className="w-5 h-5" />}
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="font-medium text-gray-900">{user?.name || 'User'}</div>
                    <div className="text-sm text-gray-500 capitalize">{user?.role}</div>
                  </div>
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-4 border-b border-gray-200">
                    <div className="font-medium text-gray-900">{user?.name}</div>
                    <div className="text-sm text-gray-500">{user?.email}</div>
                  </div>
                  <div className="p-2">
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                      <User className="w-4 h-4 mr-3" />
                      Profile Settings
                    </button>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                      <Settings className="w-4 h-4 mr-3" />
                      Preferences
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 pt-16 pb-4 flex flex-col transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto`}>
          <nav className="flex-1 px-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className={`mr-3 ${activeTab === item.id ? 'text-blue-600' : 'text-gray-500'}`}>
                  {item.icon}
                </span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="px-4 mt-8">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" />
                <div>
                  <div className="font-medium text-gray-900">Risk Detected</div>
                  <div className="text-sm text-gray-600">3 projects need review</div>
                </div>
              </div>
              <button className="mt-4 w-full py-2 text-sm font-medium text-blue-700 bg-white border border-blue-300 rounded-lg hover:bg-blue-50">
                Review Now
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name?.split(' ')[0] || 'User'}!
              </h1>
              <p className="text-gray-600">
                Here's what's happening with public infrastructure projects today.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                      <div className={`text-${stat.color}-600`}>{stat.icon}</div>
                    </div>
                    <span className={`text-sm font-medium ${
                      stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Projects */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900">Recent Projects</h2>
                      <div className="flex items-center space-x-3">
                        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                          <Filter className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delay</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {recentProjects.map((project) => (
                          <tr key={project.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div className="font-medium text-gray-900">{project.name}</div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                project.status === 'High Risk'
                                  ? 'bg-red-100 text-red-800'
                                  : project.status === 'Medium Risk'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-green-100 text-green-800'
                              }`}>
                                {project.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                                  <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{ width: `${project.progress}%` }}
                                  />
                                </div>
                                <span className="text-sm text-gray-900">{project.progress}%</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-900 font-medium">{project.budget}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 text-gray-400 mr-2" />
                                <span className={project.delay === '0 months' ? 'text-green-600' : 'text-red-600'}>
                                  {project.delay}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                <Eye className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div>
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {notifications.map((notification) => (
                      <div key={notification.id} className={`p-4 hover:bg-gray-50 ${
                        !notification.read ? 'bg-blue-50/50' : ''
                      }`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium text-gray-900">{notification.title}</div>
                            <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                            <div className="text-xs text-gray-500 mt-2">{notification.time}</div>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="flex items-center w-full p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                      <FileText className="w-5 h-5 mr-3" />
                      Generate Report
                    </button>
                    <button className="flex items-center w-full p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                      <AlertTriangle className="w-5 h-5 mr-3" />
                      View High Risk Projects
                    </button>
                    <button className="flex items-center w-full p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                      <Users className="w-5 h-5 mr-3" />
                      Contractor Directory
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;