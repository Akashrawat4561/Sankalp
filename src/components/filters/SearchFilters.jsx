// src/components/filters/SearchFilters.jsx
// Search and filter controls for projects

import React, { useState } from 'react';
import {
    Search,
    Filter,
    ChevronDown,
    X,
    MapPin,
    Building2,
    Star,
    Clock,
    SlidersHorizontal
} from 'lucide-react';
import { projectTypes, statusOptions } from '../../data/projectsData';

const SearchFilters = ({
    searchQuery,
    onSearchChange,
    filters,
    onFilterChange,
    onClearFilters,
    showAdvanced = false,
    onToggleAdvanced
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(null);

    const ratingRanges = [
        { label: 'All Ratings', value: 'all' },
        { label: 'Excellent (8-10)', value: '8-10' },
        { label: 'Good (6-8)', value: '6-8' },
        { label: 'Fair (4-6)', value: '4-6' },
        { label: 'Poor (0-4)', value: '0-4' }
    ];

    const activeFiltersCount = Object.values(filters).filter(
        v => v && v !== 'All Types' && v !== 'All Status' && v !== 'all'
    ).length;

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 shadow-sm">
            {/* Main Search */}
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Input */}
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="search"
                        placeholder="Search projects, contractors, locations..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => onSearchChange('')}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center"
                        >
                            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                        </button>
                    )}
                </div>

                {/* Quick Filters */}
                <div className="flex flex-wrap gap-2">
                    {/* Project Type Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(isDropdownOpen === 'type' ? null : 'type')}
                            className={`flex items-center gap-2 px-4 py-3 border rounded-xl transition-all ${filters.type && filters.type !== 'All Types'
                                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <Building2 className="w-4 h-4" />
                            <span className="hidden sm:inline">{filters.type || 'Project Type'}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen === 'type' ? 'rotate-180' : ''}`} />
                        </button>

                        {isDropdownOpen === 'type' && (
                            <div className="absolute top-full mt-2 left-0 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
                                {projectTypes.map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => {
                                            onFilterChange('type', type);
                                            setIsDropdownOpen(null);
                                        }}
                                        className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors ${filters.type === type ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Status Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(isDropdownOpen === 'status' ? null : 'status')}
                            className={`flex items-center gap-2 px-4 py-3 border rounded-xl transition-all ${filters.status && filters.status !== 'All Status'
                                    ? 'bg-green-50 border-green-200 text-green-700'
                                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <Clock className="w-4 h-4" />
                            <span className="hidden sm:inline">{filters.status || 'Status'}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen === 'status' ? 'rotate-180' : ''}`} />
                        </button>

                        {isDropdownOpen === 'status' && (
                            <div className="absolute top-full mt-2 left-0 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
                                {statusOptions.map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => {
                                            onFilterChange('status', status);
                                            setIsDropdownOpen(null);
                                        }}
                                        className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors ${filters.status === status ? 'bg-green-50 text-green-700' : 'text-gray-700'
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Rating Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(isDropdownOpen === 'rating' ? null : 'rating')}
                            className={`flex items-center gap-2 px-4 py-3 border rounded-xl transition-all ${filters.rating && filters.rating !== 'all'
                                    ? 'bg-amber-50 border-amber-200 text-amber-700'
                                    : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <Star className="w-4 h-4" />
                            <span className="hidden sm:inline">Rating</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen === 'rating' ? 'rotate-180' : ''}`} />
                        </button>

                        {isDropdownOpen === 'rating' && (
                            <div className="absolute top-full mt-2 right-0 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
                                {ratingRanges.map((range) => (
                                    <button
                                        key={range.value}
                                        onClick={() => {
                                            onFilterChange('rating', range.value);
                                            setIsDropdownOpen(null);
                                        }}
                                        className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors ${filters.rating === range.value ? 'bg-amber-50 text-amber-700' : 'text-gray-700'
                                            }`}
                                    >
                                        {range.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Advanced Filters Toggle */}
                    <button
                        onClick={onToggleAdvanced}
                        className={`flex items-center gap-2 px-4 py-3 border rounded-xl transition-all ${showAdvanced
                                ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        <span className="hidden sm:inline">More</span>
                    </button>
                </div>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Active filters:</span>
                    <div className="flex flex-wrap gap-2">
                        {filters.type && filters.type !== 'All Types' && (
                            <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                {filters.type}
                                <button onClick={() => onFilterChange('type', 'All Types')}>
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        )}
                        {filters.status && filters.status !== 'All Status' && (
                            <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                {filters.status}
                                <button onClick={() => onFilterChange('status', 'All Status')}>
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        )}
                        {filters.rating && filters.rating !== 'all' && (
                            <span className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                                Rating: {filters.rating}
                                <button onClick={() => onFilterChange('rating', 'all')}>
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        )}
                    </div>
                    <button
                        onClick={onClearFilters}
                        className="ml-auto text-sm text-red-600 hover:text-red-700"
                    >
                        Clear all
                    </button>
                </div>
            )}

            {/* Advanced Filters Panel */}
            {showAdvanced && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Location Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <select
                                    value={filters.city || ''}
                                    onChange={(e) => onFilterChange('city', e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">All Cities</option>
                                    <option value="Indore">Indore</option>
                                </select>
                            </div>
                        </div>

                        {/* Budget Range */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                            <select
                                value={filters.budgetRange || ''}
                                onChange={(e) => onFilterChange('budgetRange', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Budgets</option>
                                <option value="0-10">₹0 - ₹10 Cr</option>
                                <option value="10-50">₹10 - ₹50 Cr</option>
                                <option value="50-100">₹50 - ₹100 Cr</option>
                                <option value="100+">₹100 Cr+</option>
                            </select>
                        </div>

                        {/* Sort By */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                            <select
                                value={filters.sortBy || 'rating-desc'}
                                onChange={(e) => onFilterChange('sortBy', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="rating-desc">Rating (High to Low)</option>
                                <option value="rating-asc">Rating (Low to High)</option>
                                <option value="budget-desc">Budget (High to Low)</option>
                                <option value="budget-asc">Budget (Low to High)</option>
                                <option value="progress-desc">Progress (High to Low)</option>
                                <option value="name-asc">Name (A-Z)</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchFilters;
