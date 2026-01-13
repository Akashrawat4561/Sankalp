// src/components/comments/CommentSection.jsx
// Comment section component for project discussions with image upload

import React, { useState, useRef } from 'react';
import {
    Send,
    Image as ImageIcon,
    X,
    User,
    Clock,
    ThumbsUp,
    MessageCircle,
    Camera,
    AlertCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

// Mock comments data - in production, this would come from a backend
const mockCommentsData = {
    1: [
        {
            id: 1,
            userId: 'user1',
            userName: 'Rajesh Kumar',
            userAvatar: null,
            text: 'Great progress on the metro construction! I saw the TBM being delivered last month. Looking forward to better connectivity.',
            image: null,
            timestamp: '2026-01-10T09:30:00',
            likes: 12,
            replies: 2
        },
        {
            id: 2,
            userId: 'user2',
            userName: 'Priya Sharma',
            userAvatar: null,
            text: 'Can anyone confirm if the tunneling has started near Rajwada? I live nearby and want to know about any noise concerns.',
            image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=400&q=60',
            timestamp: '2026-01-12T14:15:00',
            likes: 8,
            replies: 5
        }
    ],
    2: [
        {
            id: 1,
            userId: 'user3',
            userName: 'Amit Patel',
            userAvatar: null,
            text: 'The flyover is now open and traffic has improved significantly! Here is a photo from today.',
            image: 'https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=400&q=60',
            timestamp: '2026-01-08T16:45:00',
            likes: 24,
            replies: 3
        },
        {
            id: 2,
            userId: 'user4',
            userName: 'Sunita Verma',
            userAvatar: null,
            text: 'Finally no more waiting at Bhanwarkuan signal! Commute time reduced by 15 minutes.',
            image: null,
            timestamp: '2026-01-11T08:20:00',
            likes: 18,
            replies: 1
        }
    ],
    3: [
        {
            id: 1,
            userId: 'user5',
            userName: 'Vikram Singh',
            userAvatar: null,
            text: 'The riverfront looks beautiful in the evening! Great place for evening walks now.',
            image: 'https://images.unsplash.com/photo-1519922639192-e73293ca430e?w=400&q=60',
            timestamp: '2026-01-07T19:30:00',
            likes: 31,
            replies: 4
        }
    ],
    6: [
        {
            id: 1,
            userId: 'user6',
            userName: 'Meera Joshi',
            userAvatar: null,
            text: 'Saw the foundation work starting. The design looks very modern! Excited for the new station.',
            image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&q=60',
            timestamp: '2026-01-05T11:00:00',
            likes: 15,
            replies: 2
        }
    ],
    7: [
        {
            id: 1,
            userId: 'user7',
            userName: 'Arun Mehta',
            userAvatar: null,
            text: 'Important to preserve our heritage! Great to see careful restoration work being done.',
            image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=60',
            timestamp: '2026-01-09T15:45:00',
            likes: 22,
            replies: 6
        }
    ]
};

const CommentSection = ({ projectId, projectName }) => {
    const { user } = useAuth();
    const [comments, setComments] = useState(mockCommentsData[projectId] || []);
    const [newComment, setNewComment] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);

    // Handle image selection
    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Remove selected image
    const removeImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Submit comment
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim() && !selectedImage) return;

        setIsSubmitting(true);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        const newCommentObj = {
            id: Date.now(),
            userId: user?.id || 'current-user',
            userName: user?.name || 'Anonymous Citizen',
            userAvatar: null,
            text: newComment.trim(),
            image: imagePreview, // In production, this would be the uploaded image URL
            timestamp: new Date().toISOString(),
            likes: 0,
            replies: 0
        };

        setComments(prev => [newCommentObj, ...prev]);
        setNewComment('');
        removeImage();
        setIsSubmitting(false);
    };

    // Like a comment
    const handleLike = (commentId) => {
        setComments(prev =>
            prev.map(comment =>
                comment.id === commentId
                    ? { ...comment, likes: comment.likes + 1 }
                    : comment
            )
        );
    };

    // Format timestamp
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    };

    return (
        <div className="space-y-6">
            {/* Comment Input Form */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                    Join the Discussion
                </h3>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-3">
                        {/* Text Input */}
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Share your thoughts, observations, or questions about this project..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            rows={3}
                        />

                        {/* Image Preview */}
                        {imagePreview && (
                            <div className="relative inline-block">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="max-h-40 rounded-lg border border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute -top-2 -right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                {/* Image Upload Button */}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageSelect}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <Camera className="w-5 h-5" />
                                    <span className="text-sm font-medium">Add Photo</span>
                                </button>
                                <span className="text-xs text-gray-400">Max 5MB</span>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting || (!newComment.trim() && !selectedImage)}
                                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium rounded-lg transition-all disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Posting...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Post Comment
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">
                        Citizen Comments ({comments.length})
                    </h3>
                </div>

                {comments.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 rounded-xl">
                        <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <h4 className="text-lg font-medium text-gray-700 mb-1">No comments yet</h4>
                        <p className="text-gray-500 text-sm">
                            Be the first to share your thoughts about this project!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <div
                                key={comment.id}
                                className="bg-white rounded-xl border border-gray-200 p-4 hover:border-blue-200 transition-colors"
                            >
                                {/* Comment Header */}
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                                        {comment.userAvatar ? (
                                            <img
                                                src={comment.userAvatar}
                                                alt={comment.userName}
                                                className="w-10 h-10 rounded-full"
                                            />
                                        ) : (
                                            <span className="text-white font-medium text-sm">
                                                {comment.userName.charAt(0).toUpperCase()}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-semibold text-gray-900">
                                                {comment.userName}
                                            </span>
                                            <span className="flex items-center gap-1 text-xs text-gray-500">
                                                <Clock className="w-3 h-3" />
                                                {formatTime(comment.timestamp)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Comment Content */}
                                {comment.text && (
                                    <p className="text-gray-700 leading-relaxed mb-3">
                                        {comment.text}
                                    </p>
                                )}

                                {/* Comment Image */}
                                {comment.image && (
                                    <div className="mb-3">
                                        <img
                                            src={comment.image}
                                            alt="Comment attachment"
                                            className="max-w-full max-h-80 rounded-lg border border-gray-200 cursor-pointer hover:opacity-95 transition-opacity"
                                            onClick={() => window.open(comment.image, '_blank')}
                                        />
                                    </div>
                                )}

                                {/* Comment Actions */}
                                <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                                    <button
                                        onClick={() => handleLike(comment.id)}
                                        className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 transition-colors"
                                    >
                                        <ThumbsUp className="w-4 h-4" />
                                        <span className="text-sm">{comment.likes}</span>
                                    </button>
                                    <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 transition-colors">
                                        <MessageCircle className="w-4 h-4" />
                                        <span className="text-sm">{comment.replies} replies</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Community Guidelines */}
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-medium text-amber-800 mb-1">Community Guidelines</h4>
                        <p className="text-sm text-amber-700">
                            Please keep discussions constructive and factual. Share genuine observations
                            and photos from project sites. Report any corruption or quality issues with evidence.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentSection;
