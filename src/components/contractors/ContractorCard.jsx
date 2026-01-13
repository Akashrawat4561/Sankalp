// src/components/contractors/ContractorCard.jsx
// Contractor profile card with detailed info and public rating

import React, { useMemo } from 'react';
import {
    X,
    MapPin,
    Building2,
    Mail,
    Phone,
    Calendar,
    Users,
    Award,
    TrendingUp,
    CheckCircle,
    Star,
    Briefcase,
    Clock
} from 'lucide-react';
import RatingBadge, { RatingBar } from '../common/RatingBadge';
import { calculateContractorRating } from '../../utils/ratingAlgorithm';

const ContractorCard = ({ contractor, isOpen, onClose }) => {
    if (!isOpen || !contractor) return null;

    // Calculate contractor rating
    const rating = useMemo(() => calculateContractorRating(contractor), [contractor]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div
                className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="relative h-32 bg-gradient-to-br from-indigo-600 to-purple-700 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>

                    <div className="absolute -bottom-12 left-6">
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 border-4 border-white shadow-lg flex items-center justify-center">
                            <Building2 className="w-12 h-12 text-white" />
                        </div>
                    </div>

                    <div className="absolute bottom-4 right-6">
                        <RatingBadge rating={rating.overall} size="lg" />
                    </div>
                </div>

                {/* Content */}
                <div className="pt-16 px-6 pb-6 max-h-[calc(90vh-128px)] overflow-y-auto">
                    {/* Company Info */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">{contractor.name}</h2>
                        <p className="text-gray-500">{contractor.fullName}</p>
                        <div className="flex items-center gap-4 mt-2">
                            <span className="flex items-center gap-1 text-sm text-gray-600">
                                <MapPin className="w-4 h-4" />
                                {contractor.headquarters}
                            </span>
                            <span className="flex items-center gap-1 text-sm text-gray-600">
                                <Calendar className="w-4 h-4" />
                                Est. {contractor.established}
                            </span>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100 text-center">
                            <Briefcase className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                            <p className="text-xl font-bold text-gray-900">{contractor.stats.totalProjects}</p>
                            <p className="text-xs text-gray-500">Total Projects</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100 text-center">
                            <CheckCircle className="w-5 h-5 text-green-600 mx-auto mb-1" />
                            <p className="text-xl font-bold text-gray-900">{contractor.stats.completedOnTime}</p>
                            <p className="text-xs text-gray-500">On Time</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-3 border border-purple-100 text-center">
                            <TrendingUp className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                            <p className="text-xl font-bold text-gray-900">{contractor.stats.avgBudgetAdherence}%</p>
                            <p className="text-xs text-gray-500">Budget Adherence</p>
                        </div>
                        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-3 border border-amber-100 text-center">
                            <Star className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                            <p className="text-xl font-bold text-gray-900">{contractor.publicRating}</p>
                            <p className="text-xs text-gray-500">Public Rating</p>
                        </div>
                    </div>

                    {/* Specializations */}
                    <div className="mb-6">
                        <h3 className="font-bold text-gray-900 mb-2">Specializations</h3>
                        <div className="flex flex-wrap gap-2">
                            {contractor.specialization.map((spec, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                                >
                                    {spec}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Rating Breakdown */}
                    <div className="mb-6 bg-gray-50 rounded-xl p-4">
                        <h3 className="font-bold text-gray-900 mb-4">Performance Metrics</h3>
                        <div className="space-y-4">
                            {Object.entries(rating.breakdown).map(([key, data]) => (
                                <div key={key}>
                                    <div className="flex items-center justify-between text-sm mb-1">
                                        <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                        <span className="text-gray-500">{data.value}</span>
                                    </div>
                                    <RatingBar rating={data.score} height="h-2" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Public Reviews */}
                    <div className="mb-6 bg-amber-50 rounded-xl p-4 border border-amber-100">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-bold text-gray-900">Public Rating</h3>
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-5 h-5 ${star <= Math.round(contractor.publicRating / 2)
                                                ? 'text-amber-400 fill-amber-400'
                                                : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-amber-700">{contractor.publicRating}/10</p>
                        <p className="text-sm text-gray-600">Based on {contractor.totalReviews} citizen reviews</p>
                    </div>

                    {/* Past Projects */}
                    <div className="mb-6">
                        <h3 className="font-bold text-gray-900 mb-3">Past Projects</h3>
                        <div className="space-y-3">
                            {contractor.pastProjects.map((project, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div>
                                        <p className="font-medium text-gray-900">{project.name}</p>
                                        <p className="text-sm text-gray-500">₹{project.budget} Cr</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`px-2 py-1 text-xs rounded-full ${project.status === 'Completed'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {project.status}
                                        </span>
                                        <p className="text-sm font-medium text-gray-700 mt-1">{project.rating}/10</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Certifications */}
                    <div className="mb-6">
                        <h3 className="font-bold text-gray-900 mb-2">Certifications</h3>
                        <div className="flex flex-wrap gap-2">
                            {contractor.certifications.map((cert, idx) => (
                                <span
                                    key={idx}
                                    className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                                >
                                    <Award className="w-3 h-3" />
                                    {cert}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-gray-50 rounded-xl p-4">
                        <h3 className="font-bold text-gray-900 mb-3">Contact Information</h3>
                        <div className="space-y-2">
                            <a
                                href={`mailto:${contractor.contact.email}`}
                                className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                <Mail className="w-5 h-5" />
                                {contractor.contact.email}
                            </a>
                            <a
                                href={`tel:${contractor.contact.phone}`}
                                className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                <Phone className="w-5 h-5" />
                                {contractor.contact.phone}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-4 p-4 border-t border-gray-200 bg-gray-50">
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

export default ContractorCard;
