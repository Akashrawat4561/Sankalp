// src/components/map/MapView.jsx
// Interactive map view for project locations using CSS/HTML-based map

import React, { useState, useMemo } from 'react';
import {
    MapPin,
    ZoomIn,
    ZoomOut,
    Maximize2,
    X,
    Building2,
    IndianRupee,
    TrendingUp
} from 'lucide-react';
import RatingBadge from '../common/RatingBadge';
import { calculateProjectRating } from '../../utils/ratingAlgorithm';
import { contractorsData } from '../../data/contractorsData';

const MapView = ({
    projects,
    selectedProject,
    onSelectProject,
    onViewDetails,
    isFullscreen = false,
    onToggleFullscreen
}) => {
    const [zoom, setZoom] = useState(1);
    const [hoveredProject, setHoveredProject] = useState(null);

    // Indore map bounds (approximate)
    const mapBounds = {
        minLat: 22.60,
        maxLat: 22.80,
        minLng: 75.75,
        maxLng: 75.95
    };

    // Convert lat/lng to pixel position
    const getPosition = (lat, lng) => {
        const x = ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * 100;
        const y = ((mapBounds.maxLat - lat) / (mapBounds.maxLat - mapBounds.minLat)) * 100;
        return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
    };

    // Get marker color based on status
    const getMarkerColor = (project) => {
        const contractor = contractorsData.find(c => c.id === project.contractor.id);
        const rating = calculateProjectRating(project, contractor);

        if (rating.overall >= 8) return 'bg-green-500 border-green-600';
        if (rating.overall >= 6) return 'bg-yellow-500 border-yellow-600';
        if (rating.overall >= 4) return 'bg-orange-500 border-orange-600';
        return 'bg-red-500 border-red-600';
    };

    // Calculate rating for selected project
    const selectedProjectRating = useMemo(() => {
        if (!selectedProject) return null;
        const contractor = contractorsData.find(c => c.id === selectedProject.contractor.id);
        return calculateProjectRating(selectedProject, contractor);
    }, [selectedProject]);

    return (
        <div className={`relative bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100 rounded-2xl overflow-hidden border border-gray-200 ${isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[500px]'
            }`}>
            {/* Map Header */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg border border-gray-200">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        Indore Infrastructure Map
                    </h3>
                    <p className="text-xs text-gray-500">{projects.length} projects</p>
                </div>

                <div className="flex items-center gap-2">
                    {/* Zoom Controls */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 flex">
                        <button
                            onClick={() => setZoom(Math.min(2, zoom + 0.2))}
                            className="p-2 hover:bg-gray-100 rounded-l-xl transition-colors"
                        >
                            <ZoomIn className="w-5 h-5 text-gray-700" />
                        </button>
                        <button
                            onClick={() => setZoom(Math.max(0.5, zoom - 0.2))}
                            className="p-2 hover:bg-gray-100 rounded-r-xl transition-colors border-l border-gray-200"
                        >
                            <ZoomOut className="w-5 h-5 text-gray-700" />
                        </button>
                    </div>

                    {/* Fullscreen Toggle */}
                    <button
                        onClick={onToggleFullscreen}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                    >
                        {isFullscreen ? <X className="w-5 h-5 text-gray-700" /> : <Maximize2 className="w-5 h-5 text-gray-700" />}
                    </button>
                </div>
            </div>

            {/* Map Container */}
            <div
                className="absolute inset-0"
                style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
            >
                {/* City Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {/* Grid lines */}
                        {[...Array(10)].map((_, i) => (
                            <React.Fragment key={i}>
                                <line x1={i * 10} y1="0" x2={i * 10} y2="100" stroke="#4F46E5" strokeWidth="0.1" />
                                <line x1="0" y1={i * 10} x2="100" y2={i * 10} stroke="#4F46E5" strokeWidth="0.1" />
                            </React.Fragment>
                        ))}
                    </svg>
                </div>

                {/* City Label */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <p className="text-6xl font-bold text-blue-200/30 whitespace-nowrap">INDORE</p>
                </div>

                {/* Project Markers */}
                {projects.map((project) => {
                    const pos = getPosition(project.location.coordinates.lat, project.location.coordinates.lng);
                    const isSelected = selectedProject?.id === project.id;
                    const isHovered = hoveredProject?.id === project.id;

                    return (
                        <div
                            key={project.id}
                            className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-all duration-200"
                            style={{ left: `${pos.x}%`, top: `${pos.y}%`, zIndex: isSelected || isHovered ? 30 : 10 }}
                            onClick={() => onSelectProject(project)}
                            onMouseEnter={() => setHoveredProject(project)}
                            onMouseLeave={() => setHoveredProject(null)}
                        >
                            {/* Marker */}
                            <div className={`relative ${isSelected || isHovered ? 'scale-125' : 'scale-100'} transition-transform`}>
                                {/* Pulse Animation for Selected */}
                                {isSelected && (
                                    <div className="absolute inset-0 -m-2 animate-ping">
                                        <div className={`w-8 h-8 rounded-full ${getMarkerColor(project).split(' ')[0]} opacity-50`} />
                                    </div>
                                )}

                                {/* Pin */}
                                <div className={`relative w-8 h-8 ${getMarkerColor(project)} rounded-full border-2 shadow-lg flex items-center justify-center`}>
                                    <Building2 className="w-4 h-4 text-white" />
                                </div>

                                {/* Pin Tail */}
                                <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-transparent ${getMarkerColor(project).split(' ')[0].replace('bg-', 'border-t-')}`} />
                            </div>

                            {/* Tooltip */}
                            {(isHovered || isSelected) && (
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-48 bg-white rounded-xl shadow-xl border border-gray-200 p-3 pointer-events-auto">
                                    <p className="font-bold text-gray-900 text-sm line-clamp-2">{project.name}</p>
                                    <p className="text-xs text-gray-500 mt-1">{project.type}</p>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-xs text-gray-600">₹{project.budget.awarded} Cr</span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${project.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {project.progress}%
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Selected Project Panel */}
            {selectedProject && selectedProjectRating && (
                <div className="absolute bottom-4 left-4 right-4 z-20 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 p-4">
                    <div className="flex items-start gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`px-2 py-0.5 text-xs rounded-full ${selectedProject.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                    }`}>
                                    {selectedProject.status}
                                </span>
                                <span className="text-xs text-gray-500">{selectedProject.type}</span>
                            </div>
                            <h4 className="font-bold text-gray-900">{selectedProject.name}</h4>
                            <p className="text-sm text-gray-500">{selectedProject.contractor.name}</p>

                            <div className="flex items-center gap-4 mt-2">
                                <span className="flex items-center gap-1 text-sm text-gray-600">
                                    <IndianRupee className="w-4 h-4" />
                                    {selectedProject.budget.awarded} Cr
                                </span>
                                <span className="flex items-center gap-1 text-sm text-gray-600">
                                    <TrendingUp className="w-4 h-4" />
                                    {selectedProject.progress}% Complete
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <RatingBadge rating={selectedProjectRating.overall} size="md" />
                            <button
                                onClick={() => onViewDetails(selectedProject)}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Legend */}
            <div className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-3">
                <p className="text-xs font-medium text-gray-700 mb-2">Rating Scale</p>
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-xs text-gray-600">Excellent (8-10)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <span className="text-xs text-gray-600">Good (6-8)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange-500" />
                        <span className="text-xs text-gray-600">Fair (4-6)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="text-xs text-gray-600">Poor (0-4)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapView;
