// pages/LandingPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  BarChart3, 
  Search, 
  Globe, 
  TrendingUp, 
  Users,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LandingPage = () => {
  const [stats, setStats] = useState({
    projects: 0,
    contractors: 0,
    savings: 0,
    citizens: 0
  });

  useEffect(() => {
    // Animation for stats counter
    const timer = setTimeout(() => {
      setStats({
        projects: 8567,
        contractors: 2431,
        savings: 482.5,
        citizens: 24500
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Shield className="w-12 h-12" />,
      title: "AI-Powered Transparency",
      description: "Advanced machine learning algorithms detect anomalies and ensure fair procurement processes"
    },
    {
      icon: <BarChart3 className="w-12 h-12" />,
      title: "Real-time Analytics",
      description: "Monitor project progress, budgets, and timelines with interactive dashboards"
    },
    {
      icon: <Search className="w-12 h-12" />,
      title: "Smart Auditing",
      description: "Automated fraud detection using Benford's Law and Isolation Forest algorithms"
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Nationwide Coverage",
      description: "Track infrastructure projects across all states and union territories"
    }
  ];

  const statsData = [
    { label: "Projects Monitored", value: stats.projects, icon: <TrendingUp /> },
    { label: "Contractors Registered", value: stats.contractors, icon: <Users /> },
    { label: "₹ Crore Saved", value: stats.savings, icon: <CheckCircle /> },
    { label: "Active Users", value: stats.citizens, icon: <Users /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 mb-6">
                <Shield className="w-5 h-5 mr-2" />
                <span className="font-medium">Transforming Public Governance</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                AI-Powered <span className="text-blue-700">Transparency</span> Platform
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                SANKALP brings unprecedented transparency to public infrastructure projects using artificial intelligence and real-time analytics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/signin"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-blue-700 bg-white border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition-all duration-300"
                >
                  Sign In
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  {statsData.map((stat, index) => (
                    <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                      <div className="flex items-center mb-2">
                        <div className="text-blue-600 mr-3">{stat.icon}</div>
                        <div className="text-3xl font-bold text-gray-900">{stat.value.toLocaleString()}</div>
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced technology stack designed specifically for public infrastructure transparency
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="relative bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:-translate-y-2">
                  <div className="text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join the Transparency Revolution
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Be part of the movement that's transforming how public infrastructure is monitored and managed.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center justify-center px-10 py-4 text-lg font-medium text-blue-700 bg-white rounded-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Create Your Account
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;