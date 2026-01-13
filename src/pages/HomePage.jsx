// pages/HomePage.jsx
// Main dashboard with project grid, search, and map view for citizens

import React, { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Menu,
  X,
  Search,
  Bell,
  User,
  LogOut,
  Shield,
  Map,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  Grid3X3,
  LayoutGrid,
  Settings,
  Home,
  IndianRupee,
  Building2,
  Eye
} from 'lucide-react';

// Import components
import ProjectCard from '../components/projects/ProjectCard';
import ProjectDetailModal from '../components/projects/ProjectDetailModal';
import ContractorCard from '../components/contractors/ContractorCard';
import SearchFilters from '../components/filters/SearchFilters';
import MapView from '../components/map/MapView';

// Import data
import { projectsData } from '../data/projectsData';
import { contractorsData } from '../data/contractorsData';
import { calculateProjectRating } from '../utils/ratingAlgorithm';

const HomePage = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [viewMode, setViewMode] = useState('grid');

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'All Types',
    status: 'All Status',
    rating: 'all',
    city: '',
    budgetRange: '',
    sortBy: 'rating-desc'
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Modal state
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [showContractorModal, setShowContractorModal] = useState(false);
  const [mapSelectedProject, setMapSelectedProject] = useState(null);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let result = [...projectsData];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.contractor.name.toLowerCase().includes(query) ||
        p.type.toLowerCase().includes(query) ||
        p.location.city.toLowerCase().includes(query)
      );
    }

    if (filters.type && filters.type !== 'All Types') {
      result = result.filter(p => p.type === filters.type);
    }

    if (filters.status && filters.status !== 'All Status') {
      result = result.filter(p => p.status === filters.status);
    }

    if (filters.rating && filters.rating !== 'all') {
      const [min, max] = filters.rating.split('-').map(Number);
      result = result.filter(p => {
        const contractor = contractorsData.find(c => c.id === p.contractor.id);
        const rating = calculateProjectRating(p, contractor);
        return rating.overall >= min && rating.overall <= max;
      });
    }

    if (filters.budgetRange) {
      if (filters.budgetRange === '100+') {
        result = result.filter(p => p.budget.awarded >= 100);
      } else {
        const [min, max] = filters.budgetRange.split('-').map(Number);
        result = result.filter(p => p.budget.awarded >= min && p.budget.awarded < max);
      }
    }

    result.sort((a, b) => {
      const contractorA = contractorsData.find(c => c.id === a.contractor.id);
      const contractorB = contractorsData.find(c => c.id === b.contractor.id);
      const ratingA = calculateProjectRating(a, contractorA).overall;
      const ratingB = calculateProjectRating(b, contractorB).overall;

      switch (filters.sortBy) {
        case 'rating-desc': return ratingB - ratingA;
        case 'rating-asc': return ratingA - ratingB;
        case 'budget-desc': return b.budget.awarded - a.budget.awarded;
        case 'budget-asc': return a.budget.awarded - b.budget.awarded;
        case 'progress-desc': return b.progress - a.progress;
        case 'name-asc': return a.name.localeCompare(b.name);
        default: return ratingB - ratingA;
      }
    });

    return result;
  }, [searchQuery, filters]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = projectsData.length;
    const completed = projectsData.filter(p => p.status === 'Completed').length;
    const inProgress = projectsData.filter(p => p.status === 'In Progress').length;
    const totalBudget = projectsData.reduce((sum, p) => sum + p.budget.awarded, 0);

    let totalRating = 0;
    projectsData.forEach(p => {
      const contractor = contractorsData.find(c => c.id === p.contractor.id);
      totalRating += calculateProjectRating(p, contractor).overall;
    });
    const avgRating = (totalRating / total).toFixed(1);

    return [
      { label: 'Total Projects', value: total.toString(), icon: <Eye className="w-5 h-5" />, color: 'blue' },
      { label: 'Completed', value: completed.toString(), icon: <CheckCircle className="w-5 h-5" />, color: 'green' },
      { label: 'In Progress', value: inProgress.toString(), icon: <Clock className="w-5 h-5" />, color: 'orange' },
      { label: 'Avg. Rating', value: `${avgRating}/10`, icon: <TrendingUp className="w-5 h-5" />, color: 'purple' }
    ];
  }, []);

  // Handlers
  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setShowProjectModal(true);
  };

  const handleViewContractor = (contractor) => {
    setSelectedContractor(contractor);
    setShowContractorModal(true);
    setShowProjectModal(false);
  };

  const handleViewMap = (project) => {
    setViewMode('map');
    setMapSelectedProject(project);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      type: 'All Types',
      status: 'All Status',
      rating: 'all',
      city: '',
      budgetRange: '',
      sortBy: 'rating-desc'
    });
    setSearchQuery('');
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const navItems = [
    { id: 'projects', label: 'All Projects', icon: <LayoutGrid /> },
    { id: 'map', label: 'Map View', icon: <Map /> },
    { id: 'contractors', label: 'Contractors', icon: <Users /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
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
                <div className="ml-3">
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    SANKALP
                  </span>
                  <p className="text-xs text-gray-500 -mt-1">Citizen Transparency Portal</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* View Toggle */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'grid'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'map'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  <Map className="w-4 h-4" />
                  Map
                </button>
              </div>

              {/* User Menu */}
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user?.name?.[0]?.toUpperCase() || 'C'}
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-sm font-medium text-gray-900">{user?.name || 'Citizen'}</div>
                    <div className="text-xs text-gray-500">Tracking Projects</div>
                  </div>
                </button>

                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <div className="font-medium text-gray-900">{user?.name || 'Citizen'}</div>
                    <div className="text-sm text-gray-500">{user?.email}</div>
                  </div>
                  <div className="p-2">
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                      <User className="w-4 h-4 mr-3" />
                      My Profile
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
        {/* Sidebar - Mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-30 lg:hidden" onClick={() => setSidebarOpen(false)}>
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}

        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 pt-16 pb-4 flex flex-col transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-auto`}>
          <nav className="flex-1 px-4 space-y-1 mt-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (item.id === 'map') setViewMode('map');
                  else if (item.id === 'projects') setViewMode('grid');
                  setSidebarOpen(false);
                }}
                className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === item.id
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

          {/* Info Box */}
          <div className="px-4 mt-4">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white">
              <h3 className="text-sm font-bold mb-2">🔍 Your Right to Know</h3>
              <p className="text-xs text-blue-100 leading-relaxed">
                Track how your tax money is being spent on public infrastructure in Indore.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Welcome Section */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Indore Infrastructure Projects
              </h1>
              <p className="text-gray-600">
                Monitor {projectsData.length} public infrastructure projects with AI-powered transparency ratings.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
                  <div className={`inline-flex p-2 rounded-lg bg-${stat.color}-100 text-${stat.color}-600 mb-2`}>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Search and Filters */}
            <SearchFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              showAdvanced={showAdvancedFilters}
              onToggleAdvanced={() => setShowAdvancedFilters(!showAdvancedFilters)}
            />

            {/* Results Count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">
                Showing <span className="font-bold text-gray-900">{filteredProjects.length}</span> projects
              </p>

              {/* Mobile View Toggle */}
              <div className="flex md:hidden items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-2 rounded-md ${viewMode === 'map' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'}`}
                >
                  <Map className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content View */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onViewDetails={handleViewDetails}
                    onViewMap={handleViewMap}
                  />
                ))}
              </div>
            ) : (
              <MapView
                projects={filteredProjects}
                selectedProject={mapSelectedProject}
                onSelectProject={setMapSelectedProject}
                onViewDetails={handleViewDetails}
                isFullscreen={isMapFullscreen}
                onToggleFullscreen={() => setIsMapFullscreen(!isMapFullscreen)}
              />
            )}

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="p-4 bg-gray-100 rounded-full mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">No projects found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                <button
                  onClick={handleClearFilters}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={showProjectModal}
        onClose={() => {
          setShowProjectModal(false);
          setSelectedProject(null);
        }}
        onViewContractor={handleViewContractor}
        onViewMap={handleViewMap}
      />

      {/* Contractor Card Modal */}
      <ContractorCard
        contractor={selectedContractor}
        isOpen={showContractorModal}
        onClose={() => {
          setShowContractorModal(false);
          setSelectedContractor(null);
        }}
      />
    </div>
  );
};

export default HomePage;