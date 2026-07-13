import React from 'react';
import { Scale, Users, ShieldAlert, Award } from 'lucide-react';

const Terms = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-16 px-4 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 mb-4 border border-primary-100 dark:border-primary-900/30">
            <Scale className="h-3.5 w-3.5" /> Platform Governance
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 sm:text-5xl">
            Terms of Service
          </h1>
          <p className="text-slate-550 dark:text-slate-400 text-lg max-w-xl mx-auto">
            Agreement governing user code sandbox access, study catalog permissions, and certificate integrity.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 mb-8 shadow-sm space-y-8">
          
          <div className="flex gap-4 items-start">
            <div className="p-2.5 bg-purple-500/10 rounded-lg border border-purple-500/20 text-purple-650 dark:text-purple-400 flex-shrink-0">
              <Users className="h-5.5 w-5.5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">1. Account Eligibility</h3>
              <p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
                By registering on SkillCraft, you agree to create a single student or instructor profile. You are responsible for keeping your session tokens secure. Sharing account credentials or copying other students' study progress is strictly prohibited.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="p-2.5 bg-red-500/10 rounded-lg border border-red-500/20 text-red-555 dark:text-red-400 flex-shrink-0">
              <ShieldAlert className="h-5.5 w-5.5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">2. Acceptable Platform Use</h3>
              <p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
                Users may not upload malicious script binaries, target APIs with request floods exceeding rate-limiting settings (100 calls per 15 mins), or scrape courses data. Violators' IP addresses will be blacklisted and accounts terminated immediately.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="p-2.5 bg-amber-500/10 rounded-lg border border-amber-500/20 text-amber-600 dark:text-amber-400 flex-shrink-0">
              <Award className="h-5.5 w-5.5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">3. Certificate Honesty Policy</h3>
              <p className="text-sm text-slate-650 dark:text-slate-350 leading-relaxed">
                Completion certificates are issued automatically when a student logs 100% curriculum progress. Artificially completing lessons via automated script injection is considered a violation of academic integrity and results in certificate voiding.
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

export default Terms;
