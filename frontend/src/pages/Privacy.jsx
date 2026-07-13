import React from 'react';
import { Shield, Eye, Lock, FileText } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-16 px-4 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 mb-4 border border-primary-100 dark:border-primary-900/30">
            <Shield className="h-3.5 w-3.5" /> Security Center
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-slate-550 dark:text-slate-400 text-lg max-w-xl mx-auto">
            Your privacy is highly valued. Read how we protect and manage your database session credentials.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 mb-8 shadow-sm space-y-8">
          
          <div className="flex gap-4 items-start">
            <div className="p-2.5 bg-blue-500/10 rounded-lg border border-blue-500/20 text-blue-600 dark:text-blue-400 flex-shrink-0">
              <Eye className="h-5.5 w-5.5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">1. Data We Collect</h3>
              <p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
                We collect your email, name, phone, age, gender, and bio information when you register or edit your profile. We also record progress details (such as completed lessons and video status) to trace your course metrics on your student dashboard.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="p-2.5 bg-purple-500/10 rounded-lg border border-purple-500/20 text-purple-650 dark:text-purple-400 flex-shrink-0">
              <Lock className="h-5.5 w-5.5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">2. Data Security & Storage</h3>
              <p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
                All passwords are cryptographically hashed using `bcrypt` and salt factors before database storage. We transmit session tokens exclusively using Bearer schema request headers. We enforce rate limiting (100 requests per 15 minutes) and API filters to prevent automated database scraping attempts.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="p-2.5 bg-green-500/10 rounded-lg border border-green-500/20 text-green-650 dark:text-green-400 flex-shrink-0">
              <FileText className="h-5.5 w-5.5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">3. Cookies & Local Session</h3>
              <p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
                We use browser `localStorage` variables (such as `skillhub_user` and `skillhub_token`) to maintain authentication status locally. This avoids credentials leakage over unsecured cookies and keeps page loads instantaneous.
              </p>
            </div>
          </div>

        </div>

        <div className="text-center text-xs text-slate-450 dark:text-slate-400">
          Last updated: July 2026. For inquiries, contact us at <a href="mailto:support@skillcraft.com" className="text-primary-600 dark:text-primary-400 font-semibold underline">support@skillcraft.com</a>
        </div>

      </div>
    </div>
  );
};

export default Privacy;
