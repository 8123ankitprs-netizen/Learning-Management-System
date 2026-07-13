import React from 'react';
import { BookOpen, Sparkles, ShieldCheck, Heart, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-16 px-4 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 mb-4 border border-primary-100 dark:border-primary-900/30">
            <Sparkles className="h-3.5 w-3.5" /> Our Journey
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 sm:text-5xl">
            About SkillCraft
          </h1>
          <p className="text-slate-550 dark:text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            We are dedicated to bridging the gap between theoretical computer science and production-grade engineering practices.
          </p>
        </div>

        {/* Our Mission */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 mb-12 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <BookOpen className="h-5.5 w-5.5 text-primary-500" /> Our Mission
          </h2>
          <p className="text-slate-650 dark:text-slate-300 leading-relaxed mb-4">
            Traditional tutorials teach you syntax, but they rarely teach you architecture. At SkillCraft, we design courses that put you inside real-world telemetry registries, QA automation suites, and secure API designs.
          </p>
          <p className="text-slate-650 dark:text-slate-300 leading-relaxed">
            Our modules are authored by experienced industry mentors and faculty who understand the demands of modern web ecosystems, database scalability, and system administration controls.
          </p>
        </div>

        {/* Core Values */}
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="p-2.5 bg-purple-500/10 rounded-lg border border-purple-500/20 text-purple-650 dark:text-purple-400 w-fit mb-4">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Production-grade Quality</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We focus on practical, industry-aligned curriculums, checking telemetry, writing robust unit tests, and verifying secure inputs.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="p-2.5 bg-red-500/10 rounded-lg border border-red-500/20 text-red-550 dark:text-red-400 w-fit mb-4">
              <Heart className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Student Centricity</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              We design features like offline notes, cert downloads, and customizable profile settings that align with students' learning workflows.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="p-2.5 bg-green-500/10 rounded-lg border border-green-500/20 text-green-650 dark:text-green-400 w-fit mb-4">
              <Award className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Lifetime Learning</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              No subscription fatigue. Buy once, study at your own pace, get certified, and access course upgrades forever.
            </p>
          </div>

        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-primary-600/15 via-indigo-600/5 to-transparent border border-primary-500/25 rounded-3xl p-8 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Ready to master modern tech skills?</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">
            Browse our catalog of 22+ professional courses spanning programming, database engineering, cloud deployments, and creative design.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/courses" className="px-5 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs rounded-xl shadow transition-all">
              Browse Courses
            </Link>
            <Link to="/contact" className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-350 font-bold text-xs rounded-xl transition-all">
              Contact Us
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
