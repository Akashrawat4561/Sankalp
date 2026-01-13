// src/components/common/RatingBadge.jsx
// Visual rating indicator component with color-coded scale

import React from 'react';
import { getRatingColor, getRiskLevel } from '../../utils/ratingAlgorithm';

const RatingBadge = ({ rating, size = 'md', showLabel = false, showRisk = false }) => {
    const ratingColor = getRatingColor(rating);
    const riskLevel = getRiskLevel(rating);

    const sizeClasses = {
        sm: 'w-8 h-8 text-sm',
        md: 'w-12 h-12 text-lg',
        lg: 'w-16 h-16 text-2xl',
        xl: 'w-20 h-20 text-3xl'
    };

    const labelSizes = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg'
    };

    return (
        <div className="flex flex-col items-center gap-1">
            <div
                className={`
          ${sizeClasses[size]} 
          rounded-full 
          bg-gradient-to-br ${ratingColor.gradient}
          flex items-center justify-center 
          font-bold text-white 
          shadow-lg
          ring-2 ring-white/30
          transition-transform hover:scale-105
        `}
            >
                {rating.toFixed(1)}
            </div>

            {showLabel && (
                <span className={`${labelSizes[size]} font-medium text-gray-600`}>
                    Rating
                </span>
            )}

            {showRisk && (
                <span className={`
          ${labelSizes[size]} 
          px-2 py-0.5 
          rounded-full 
          ${riskLevel.bgColor} 
          ${riskLevel.textColor}
          font-medium
        `}>
                    {riskLevel.level}
                </span>
            )}
        </div>
    );
};

// Horizontal progress bar variant
export const RatingBar = ({ rating, showValue = true, height = 'h-2' }) => {
    const ratingColor = getRatingColor(rating);
    const percentage = (rating / 10) * 100;

    return (
        <div className="flex items-center gap-3 w-full">
            <div className={`flex-1 bg-gray-200 rounded-full ${height} overflow-hidden`}>
                <div
                    className={`${height} bg-gradient-to-r ${ratingColor.gradient} rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            {showValue && (
                <span className={`font-bold ${ratingColor.text} min-w-[2.5rem] text-right`}>
                    {rating.toFixed(1)}
                </span>
            )}
        </div>
    );
};

// Detailed breakdown component
export const RatingBreakdown = ({ breakdown }) => {
    if (!breakdown) return null;

    const factors = [
        { key: 'budgetEfficiency', label: 'Budget Efficiency', icon: '💰' },
        { key: 'timelineAdherence', label: 'Timeline Adherence', icon: '⏱️' },
        { key: 'progressRate', label: 'Progress Rate', icon: '📈' },
        { key: 'biddingTransparency', label: 'Bidding Transparency', icon: '📋' },
        { key: 'contractorTrackRecord', label: 'Contractor Track Record', icon: '🏗️' }
    ];

    return (
        <div className="space-y-4">
            {factors.map(({ key, label, icon }) => {
                const factor = breakdown[key];
                if (!factor) return null;

                const ratingColor = getRatingColor(factor.score);

                return (
                    <div key={key} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                            <span className="flex items-center gap-2">
                                <span>{icon}</span>
                                <span className="font-medium text-gray-700">{label}</span>
                                <span className="text-gray-400">({factor.weight}%)</span>
                            </span>
                            <span className={`font-bold ${ratingColor.text}`}>
                                {factor.score.toFixed(1)}/10
                            </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className={`h-2 bg-gradient-to-r ${ratingColor.gradient} rounded-full transition-all duration-500`}
                                style={{ width: `${(factor.score / 10) * 100}%` }}
                            />
                        </div>
                        <p className="text-xs text-gray-500">{factor.description}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default RatingBadge;
