// pages/LandingPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Search,
  MapPin,
  TrendingUp,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Eye,
  Building2
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LandingPage = () => {
  const [stats, setStats] = useState({
    projects: 0,
    totalBudget: 0,
    avgRating: 0,
    citizens: 0
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        projects: 10,
        totalBudget: 2809,
        avgRating: 8.2,
        citizens: 1000
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Eye className="w-10 h-10" />,
      title: "Track Any Project",
      description: "Search and monitor infrastructure projects with detailed progress reports and budget tracking"
    },
    {
      icon: <Star className="w-10 h-10" />,
      title: "AI Transparency Ratings",
      description: "See unbiased ratings based on budget efficiency, timeline adherence, and contractor performance"
    },
    {
      icon: <MapPin className="w-10 h-10" />,
      title: "Interactive Map View",
      description: "Find projects near you with our interactive map showing all active infrastructure work"
    },
    {
      icon: <Building2 className="w-10 h-10" />,
      title: "Contractor Records",
      description: "View contractor history, past project performance, and citizen ratings"
    }
  ];

  const statsData = [
    { label: "Projects in Indore", value: stats.projects, suffix: "" },
    { label: "Total Budget (₹ Cr)", value: stats.totalBudget, suffix: "" },
    { label: "Avg. Rating", value: stats.avgRating, suffix: "/10" },
    { label: "Citizens Tracking", value: stats.citizens, suffix: "+" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 mb-6">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="font-medium">100% Free for Citizens</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Your Right to Know<br />
                <span className="text-blue-600">How Tax Money is Spent</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                SANKALP empowers citizens to track public infrastructure projects in Indore.
                See budgets, timelines, contractor records, and AI-powered transparency ratings — all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Start Tracking Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/signin"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-blue-700 bg-white border-2 border-blue-200 rounded-xl hover:bg-blue-50 transition-all duration-300"
                >
                  Sign In
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-6 lg:p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Live Indore Stats
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {statsData.map((stat, index) => (
                    <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100">
                      <div className="text-2xl lg:text-3xl font-bold text-gray-900">
                        {typeof stat.value === 'number' && stat.value % 1 !== 0
                          ? stat.value.toFixed(1)
                          : stat.value.toLocaleString()}{stat.suffix}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-100">
                  <p className="text-sm text-green-700 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Data updated in real-time from official sources
                  </p>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* What You Can Do Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What You Can Do
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hold your government accountable with complete visibility into public infrastructure spending
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="relative bg-white p-6 rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Create Account", desc: "Sign up free in 30 seconds" },
              { step: "2", title: "Explore Projects", desc: "Search, filter, or browse the map" },
              { step: "3", title: "Check Ratings", desc: "See AI-powered transparency scores" }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Start Tracking Today
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Join 1,000+ citizens monitoring public infrastructure in Indore
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center px-10 py-4 text-lg font-medium text-blue-700 bg-white rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Create Free Account
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;