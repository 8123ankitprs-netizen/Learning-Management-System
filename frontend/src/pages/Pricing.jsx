import React from 'react';
import { Check, Shield, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-16 px-4 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 mb-4 border border-primary-100 dark:border-primary-900/30">
            <Zap className="h-3.5 w-3.5" /> Pricing Options
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 sm:text-5xl">
            Flexible Plans for Every Learner
          </h1>
          <p className="max-w-2xl mx-auto text-slate-550 dark:text-slate-400 text-lg">
            Invest in your engineering future with our curated production-grade courses. No monthly subscriptions, just lifetime skill upgrades.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Plan 1: Free preview */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <h3 className="text-xl font-bold text-slate-905 dark:text-white mb-2">Free Starter</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Explore the fundamentals before committing.</p>
              <div className="flex items-baseline mb-8">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">₹0</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm ml-2">/ lifetime access</span>
              </div>
              <ul className="space-y-4 text-sm text-slate-650 dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <Check className="h-4.5 w-4.5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span>Access all free previews of any course</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4.5 w-4.5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span>Public tutorials library</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4.5 w-4.5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span>Community notes space (V1)</span>
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <Link 
                to="/register" 
                className="block text-center py-3 px-6 rounded-xl font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
              >
                Sign Up Free
              </Link>
            </div>
          </div>

          {/* Plan 2: Pro (Best Value) */}
          <div className="bg-white dark:bg-slate-900 border-2 border-primary-500 rounded-2xl p-8 flex flex-col justify-between shadow-lg relative transform hover:scale-[1.02] transition-transform">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-500 text-white text-xs font-bold rounded-full uppercase tracking-wider shadow">
              Most Popular
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-slate-905 dark:text-white">Single Course</h3>
                <span className="p-1 bg-amber-500/10 text-amber-550 dark:text-amber-400 rounded-lg"><Star className="h-4 w-4 fill-amber-500/30" /></span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Choose any single premium course path.</p>
              <div className="flex items-baseline mb-8">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">₹1,999 - ₹4,999</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm ml-2">/ course</span>
              </div>
              <ul className="space-y-4 text-sm text-slate-650 dark:text-slate-300 font-medium">
                <li className="flex items-start gap-2.5">
                  <Check className="h-4.5 w-4.5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span>Complete access to all course lectures (15 lessons)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4.5 w-4.5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span>Official printable completion certificate</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4.5 w-4.5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span>Coding sandbox notes & progress saving</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4.5 w-4.5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span>Instructor feedback loops</span>
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <Link 
                to="/courses" 
                className="block text-center py-3 px-6 rounded-xl font-semibold bg-primary-600 hover:bg-primary-500 text-white shadow-md shadow-primary-500/10 hover:shadow-lg transition-all"
              >
                Browse Catalog
              </Link>
            </div>
          </div>

          {/* Plan 3: Unlimited/Enterprise */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
            <div>
              <h3 className="text-xl font-bold text-slate-905 dark:text-white mb-2">Team Enterprise</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Bulk seats and telemetry metrics for teams.</p>
              <div className="flex items-baseline mb-8">
                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">Custom</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm ml-2">/ year</span>
              </div>
              <ul className="space-y-4 text-sm text-slate-650 dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <Check className="h-4.5 w-4.5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span>All 22+ professional courses access</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4.5 w-4.5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span>Admin control panel telemetry dashboard</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4.5 w-4.5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span>SLA uptime and priority support</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="h-4.5 w-4.5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span>Enterprise single-sign-on (SSO)</span>
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <Link 
                to="/contact" 
                className="block text-center py-3 px-6 rounded-xl font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>

        </div>

        {/* Security / FAQ banner */}
        <div className="mt-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <div className="p-3 bg-green-500/10 rounded-full border border-green-500/20 text-green-600 dark:text-green-400">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-0.5">Secure Payments & Lifetime Assurance</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We encrypt all checkout transactions. Once you purchase any course, it remains in your dashboard forever with free content updates, notes integration, and certificate retrieval tools.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Pricing;
