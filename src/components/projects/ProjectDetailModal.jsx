// src/components/projects/ProjectDetailModal.jsx
// Expanded project details modal with bidding info, timeline, and contractor access

import React, { useMemo, useState } from 'react';
import {
    X,
    Calendar,
    Clock,
    IndianRupee,
    MapPin,
    Building2,
    FileText,
    TrendingUp,
    AlertTriangle,
    CheckCircle,
    Users,
    ChevronRight,
    Award,
    Gavel,
    Timer,
    Target
} from 'lucide-react';
import RatingBadge, { RatingBreakdown } from '../common/RatingBadge';
import { calculateProjectRating, getRiskLevel } from '../../utils/ratingAlgorithm';
import { contractorsData } from '../../data/contractorsData';

const ProjectDetailModal = ({ project, isOpen, onClose, onViewContractor, onViewMap }) => {
    const [activeTab, setActiveTab] = useState('overview');

    // Get contractor and calculate rating - must be before early return
    const contractor = project ? contractorsData.find(c => c.id === project.contractor.id) : null;
    const rating = useMemo(() => {
        if (!project || !contractor) return { overall: 0, breakdown: {} };
        return calculateProjectRating(project, contractor);
    }, [project, contractor]);
    const riskLevel = getRiskLevel(rating.overall);

    // Early return after all hooks
    if (!isOpen || !project) return null;

    // Format currency
    const formatBudget = (amount, currency = 'Cr') => {
        if (amount >= 100) return `₹${amount.toFixed(0)} ${currency}`;
        if (amount >= 1) return `₹${amount.toFixed(2)} ${currency}`;
        return `₹${(amount * 100).toFixed(0)} Lakh`;
    };

    // Calculate budget savings
    const budgetSavings = project.budget.estimated - project.budget.actual;
    const savingsPercent = ((budgetSavings / project.budget.estimated) * 100).toFixed(1);

    // Timeline calculations
    const startDate = new Date(project.timeline.startDate);
    const endDate = new Date(project.timeline.expectedEnd);

    const tabs = [
        { id: 'overview', label: 'Overview', icon: <FileText className="w-4 h-4" /> },
        { id: 'bidding', label: 'Bidding Details', icon: <Gavel className="w-4 h-4" /> },
        { id: 'timeline', label: 'Timeline', icon: <Timer className="w-4 h-4" /> },
        { id: 'rating', label: 'AI Rating', icon: <Award className="w-4 h-4" /> }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div
                className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="relative h-40 bg-gradient-to-br from-blue-600 to-indigo-700 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>

                    <div className="absolute bottom-4 left-6 right-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${project.status === 'Completed'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-blue-100 text-blue-800'
                                        }`}>
                                        {project.status}
                                    </span>
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                                        {project.type}
                                    </span>
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-1">{project.name}</h2>
                                <p className="flex items-center gap-2 text-white/80 text-sm">
                                    <MapPin className="w-4 h-4" />
                                    {project.location.city}, {project.location.state}
                                </p>
                            </div>
                            <RatingBadge rating={rating.overall} size="lg" showRisk />
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="p-6 max-h-[calc(90vh-280px)] overflow-y-auto">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* Description */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">About This Project</h3>
                                <p className="text-gray-600 leading-relaxed">{project.description}</p>
                            </div>

                            {/* Key Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                                    <div className="flex items-center gap-2 text-blue-600 mb-2">
                                        <IndianRupee className="w-5 h-5" />
                                        <span className="text-sm font-medium">Budget</span>
                                    </div>
                                    <p className="text-xl font-bold text-gray-900">
                                        {formatBudget(project.budget.awarded)}
                                    </p>
                                </div>

                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                                    <div className="flex items-center gap-2 text-green-600 mb-2">
                                        <Target className="w-5 h-5" />
                                        <span className="text-sm font-medium">Progress</span>
                                    </div>
                                    <p className="text-xl font-bold text-gray-900">{project.progress}%</p>
                                </div>

                                <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-100">
                                    <div className="flex items-center gap-2 text-purple-600 mb-2">
                                        <Calendar className="w-5 h-5" />
                                        <span className="text-sm font-medium">Duration</span>
                                    </div>
                                    <p className="text-xl font-bold text-gray-900">{project.timeline.plannedDuration} months</p>
                                </div>

                                <div className={`rounded-xl p-4 border ${project.timeline.currentDelay > 0
                                    ? 'bg-gradient-to-br from-red-50 to-orange-50 border-red-100'
                                    : 'bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-100'
                                    }`}>
                                    <div className={`flex items-center gap-2 mb-2 ${project.timeline.currentDelay > 0 ? 'text-red-600' : 'text-teal-600'
                                        }`}>
                                        <Clock className="w-5 h-5" />
                                        <span className="text-sm font-medium">Delay</span>
                                    </div>
                                    <p className="text-xl font-bold text-gray-900">
                                        {project.timeline.currentDelay > 0
                                            ? `${project.timeline.currentDelay} months`
                                            : 'On Schedule'}
                                    </p>
                                </div>
                            </div>

                            {/* Highlights */}
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Key Highlights</h3>
                                <div className="grid md:grid-cols-3 gap-3">
                                    {project.highlights.map((highlight, idx) => (
                                        <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm text-gray-700">{highlight}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Contractor Preview */}
                            <div className="bg-gray-50 rounded-xl p-4">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Contractor</h3>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                            <Building2 className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{project.contractor.name}</p>
                                            <p className="text-sm text-gray-500">{project.contractor.fullName}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => onViewContractor?.(contractor)}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                    >
                                        <Users className="w-4 h-4" />
                                        View Profile
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Bidding Tab */}
                    {activeTab === 'bidding' && (
                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Bidding Process */}
                                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 bg-purple-100 rounded-lg">
                                            <Gavel className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900">Bidding Process</h3>
                                    </div>
                                    <p className="text-2xl font-bold text-purple-700 mb-2">{project.biddingProcess}</p>
                                    <p className="text-sm text-gray-600">
                                        Tender ID: <span className="font-mono font-medium">{project.tenderId}</span>
                                    </p>
                                </div>

                                {/* Budget Comparison */}
                                <div className={`rounded-xl p-6 border ${budgetSavings > 0
                                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-100'
                                    : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-100'
                                    }`}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`p-2 rounded-lg ${budgetSavings > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                                            <IndianRupee className={`w-6 h-6 ${budgetSavings > 0 ? 'text-green-600' : 'text-red-600'}`} />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900">Budget Efficiency</h3>
                                    </div>
                                    <p className={`text-2xl font-bold mb-2 ${budgetSavings > 0 ? 'text-green-700' : 'text-red-700'}`}>
                                        {budgetSavings > 0 ? `${savingsPercent}% Under Budget` : `${Math.abs(savingsPercent)}% Over Budget`}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        Saved: {formatBudget(Math.abs(budgetSavings))}
                                    </p>
                                </div>
                            </div>

                            {/* Budget Breakdown */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Budget Breakdown</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Estimated Cost</span>
                                        <span className="font-bold text-gray-900">{formatBudget(project.budget.estimated)}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Awarded Amount</span>
                                        <span className="font-bold text-blue-600">{formatBudget(project.budget.awarded)}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Actual Expenditure</span>
                                        <span className="font-bold text-gray-900">{formatBudget(project.budget.actual)}</span>
                                    </div>
                                    <div className="h-px bg-gray-300" />
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-gray-700">Bid Discount</span>
                                        <span className={`font-bold ${budgetSavings > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {((project.budget.estimated - project.budget.awarded) / project.budget.estimated * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Timeline Tab */}
                    {activeTab === 'timeline' && (
                        <div className="space-y-6">
                            {/* Timeline Stats */}
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                    <p className="text-sm text-blue-600 mb-1">Start Date</p>
                                    <p className="text-xl font-bold text-gray-900">
                                        {startDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </p>
                                </div>
                                <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                                    <p className="text-sm text-indigo-600 mb-1">Expected End</p>
                                    <p className="text-xl font-bold text-gray-900">
                                        {endDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </p>
                                </div>
                                <div className={`rounded-xl p-4 border ${project.timeline.currentDelay > 0
                                    ? 'bg-red-50 border-red-100'
                                    : 'bg-green-50 border-green-100'
                                    }`}>
                                    <p className={`text-sm mb-1 ${project.timeline.currentDelay > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                        Delay Status
                                    </p>
                                    <p className="text-xl font-bold text-gray-900">
                                        {project.timeline.currentDelay > 0
                                            ? `${project.timeline.currentDelay} months delayed`
                                            : 'On Schedule'}
                                    </p>
                                </div>
                            </div>

                            {/* Progress Timeline */}
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Project Progress</h3>
                                <div className="relative">
                                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className={`h-4 rounded-full transition-all duration-500 ${project.status === 'Completed'
                                                ? 'bg-gradient-to-r from-green-400 to-green-600'
                                                : 'bg-gradient-to-r from-blue-400 to-indigo-600'
                                                }`}
                                            style={{ width: `${project.progress}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-between mt-2 text-sm">
                                        <span className="text-gray-500">0%</span>
                                        <span className="font-bold text-gray-900">{project.progress}% Complete</span>
                                        <span className="text-gray-500">100%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Delay Analysis */}
                            {project.timeline.currentDelay > 0 && (
                                <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-red-100 rounded-lg">
                                            <AlertTriangle className="w-6 h-6 text-red-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-red-800 mb-1">Delay Analysis</h3>
                                            <p className="text-red-700">
                                                This project is currently {project.timeline.currentDelay} months behind schedule,
                                                representing a {((project.timeline.currentDelay / project.timeline.plannedDuration) * 100).toFixed(1)}%
                                                delay relative to the planned duration.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Rating Tab */}
                    {activeTab === 'rating' && (
                        <div className="space-y-6">
                            <div className="text-center mb-6">
                                <RatingBadge rating={rating.overall} size="xl" showLabel showRisk />
                                <p className="mt-4 text-gray-600">
                                    This rating is calculated using our AI algorithm based on 5 key factors.
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Rating Breakdown</h3>
                                <RatingBreakdown breakdown={rating.breakdown} />
                            </div>

                            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                                <h3 className="font-bold text-blue-800 mb-2">How We Calculate Ratings</h3>
                                <p className="text-sm text-blue-700 leading-relaxed">
                                    Our AI rating system evaluates projects based on Budget Efficiency (25%),
                                    Timeline Adherence (25%), Progress Rate (20%), Bidding Transparency (15%),
                                    and Contractor Track Record (15%). Each factor is scored 0-10 and weighted
                                    to produce the final rating.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between gap-4 p-4 border-t border-gray-200 bg-gray-50">
                    <button
                        onClick={() => onViewMap?.(project)}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        <MapPin className="w-5 h-5" />
                        View on Map
                    </button>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailModal;
