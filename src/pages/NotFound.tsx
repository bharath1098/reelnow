import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      <div className="text-center relative z-10">
        <div className="mb-8">
          <span className="text-8xl md:text-9xl font-display font-bold gradient-text">404</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-display font-bold text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-white/60 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-semibold rounded-full flex items-center gap-2 hover:shadow-lg hover:shadow-cyan-500/30 transition-all hover:scale-105"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 glass text-white font-semibold rounded-full flex items-center gap-2 hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
