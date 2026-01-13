// src/components/projects/ProjectCard.jsx
// Project card component displaying key info with AI rating

import React, { useMemo } from 'react';
import {
    Calendar,
    Clock,
    IndianRupee,
    MapPin,
    ChevronRight,
    Building2,
    TrendingUp,
    AlertTriangle
} from 'lucide-react';
import RatingBadge from '../common/RatingBadge';
import { calculateProjectRating, getRiskLevel } from '../../utils/ratingAlgorithm';
import { contractorsData } from '../../data/contractorsData';

const ProjectCard = ({ project, onViewDetails, onViewMap }) => {
    // Calculate AI rating
    const contractor = contractorsData.find(c => c.id === project.contractor.id);
    const rating = useMemo(() => calculateProjectRating(project, contractor), [project, contractor]);
    const riskLevel = getRiskLevel(rating.overall);

    // Format currency
    const formatBudget = (amount, currency = 'Cr') => {
        if (amount >= 100) return `₹${amount.toFixed(0)} ${currency}`;
        if (amount >= 1) return `₹${amount.toFixed(2)} ${currency}`;
        return `₹${(amount * 100).toFixed(0)} Lakh`;
    };

    // Calculate timeline info
    const getTimelineInfo = () => {
        const start = new Date(project.timeline.startDate);
        const end = new Date(project.timeline.expectedEnd);
        const monthsTotal = project.timeline.plannedDuration;
        const delay = project.timeline.currentDelay;

        return {
            startFormatted: start.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
            endFormatted: end.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
            duration: `${monthsTotal} months`,
            delay: delay > 0 ? `+${delay} months delay` : 'On Schedule'
        };
    };

    const timeline = getTimelineInfo();

    // Status badge colors
    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
            case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Delayed': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    // Project type icon colors
    const getTypeColor = (type) => {
        const colors = {
            'Metro/Transit': 'from-purple-500 to-indigo-600',
            'Railway/Transit': 'from-blue-500 to-cyan-600',
            'Flyover/Bridge': 'from-orange-500 to-amber-600',
            'Roads': 'from-gray-500 to-slate-600',
            'Smart City': 'from-teal-500 to-emerald-600',
            'Heritage': 'from-amber-500 to-yellow-600',
            'Municipal/Sanitation': 'from-green-500 to-lime-600'
        };
        return colors[type] || 'from-blue-500 to-indigo-600';
    };

    return (
        <div className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all duration-300">
            {/* Image Section */}
            <div className="relative h-48 bg-gradient-to-br overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${getTypeColor(project.type)} opacity-90`} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Building2 className="w-20 h-20 text-white/30" />
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(project.status)}`}>
                        {project.status}
                    </span>
                </div>

                {/* Project Type */}
                <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white backdrop-blur-sm">
                        {project.type}
                    </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-4 right-4">
                    <RatingBadge rating={rating.overall} size="md" />
                </div>

                {/* Map Pin Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onViewMap?.(project);
                    }}
                    className="absolute bottom-4 left-4 p-2 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-colors"
                >
                    <MapPin className="w-5 h-5 text-white" />
                </button>
            </div>

            {/* Content Section */}
            <div className="p-5">
                {/* Title & Risk Level */}
                <div className="mb-3">
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {project.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${riskLevel.bgColor} ${riskLevel.textColor}`}>
                            {riskLevel.level}
                        </span>
                        <span className="text-xs text-gray-500">
                            {project.location.city}, {project.location.state}
                        </span>
                    </div>
                </div>

                {/* Contractor */}
                <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                    <Building2 className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{project.contractor.name}</span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    {/* Budget */}
                    <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                            <IndianRupee className="w-3 h-3" />
                            <span>Budget</span>
                        </div>
                        <p className="font-bold text-gray-900">
                            {formatBudget(project.budget.awarded, project.budget.currency)}
                        </p>
                        {project.budget.awarded < project.budget.estimated && (
                            <p className="text-xs text-green-600">
                                {((1 - project.budget.awarded / project.budget.estimated) * 100).toFixed(0)}% under estimate
                            </p>
                        )}
                    </div>

                    {/* Timeline */}
                    <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-1 text-gray-500 text-xs mb-1">
                            <Calendar className="w-3 h-3" />
                            <span>Duration</span>
                        </div>
                        <p className="font-bold text-gray-900">{timeline.duration}</p>
                        <p className={`text-xs ${project.timeline.currentDelay > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {timeline.delay}
                        </p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-bold text-gray-900">{project.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className={`h-2 rounded-full transition-all duration-500 ${project.progress === 100
                                    ? 'bg-green-500'
                                    : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                                }`}
                            style={{ width: `${project.progress}%` }}
                        />
                    </div>
                </div>

                {/* Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                    <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-2">Key Highlights:</p>
                        <div className="flex flex-wrap gap-1">
                            {project.highlights.slice(0, 2).map((highlight, idx) => (
                                <span
                                    key={idx}
                                    className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full"
                                >
                                    {highlight.length > 30 ? highlight.substring(0, 30) + '...' : highlight}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* View Details Button */}
                <button
                    onClick={() => onViewDetails?.(project)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl transition-all group-hover:shadow-lg"
                >
                    <span>More Info</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
            </div>
        </div>
    );
};

export default ProjectCard;
