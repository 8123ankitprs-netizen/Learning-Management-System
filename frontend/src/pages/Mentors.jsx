import React from 'react';
import { Users, Award, BookOpen, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Mentors = () => {
  const mentors = [
    {
      name: 'Ankit Prasad',
      role: 'Principal QA & DevOps Architect',
      specialties: ['Selenium Automation', 'CI/CD Pipelines', 'Linux Administration'],
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop',
      bio: 'Ankit has over 12 years of experience leading engineering teams and designing scalable QA automation gates. He leads web engineering classes at SkillCraft.'
    },
    {
      name: 'Feyaz Kumar',
      role: 'Lead Full-Stack Instructor',
      specialties: ['React SPA Engineering', 'Node.js/Express REST APIs', 'NoSQL Modeling'],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop',
      bio: 'Feyaz is a full-stack engineering educator passionate about structured JS applications. He is known for clear explanations of asynchronous Node concepts.'
    },
    {
      name: 'Himanshu Kumar',
      role: 'Database Design Expert',
      specialties: ['SQL Optimizations', 'PostgreSQL Queries', 'MongoDB Indexing'],
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&auto=format&fit=crop',
      bio: 'Himanshu has managed large-scale databases for top fintech companies. He teaches data structure models and query optimization at SkillCraft.'
    },
    {
      name: 'Deepak Shroti',
      role: 'AI & Cloud Infrastructure Lead',
      specialties: ['AWS Compute & IAM', 'TensorFlow Models', 'OS Processes'],
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&auto=format&fit=crop',
      bio: 'Deepak specializes in deep learning neural networks and cloud resource security. He teaches our Cloud Computing and AI bootcamps.'
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-16 px-4 transition-colors duration-200">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 mb-4 border border-primary-100 dark:border-primary-900/30">
            <Users className="h-3.5 w-3.5" /> Platform Faculty
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 sm:text-5xl">
            Our Mentors
          </h1>
          <p className="text-slate-550 dark:text-slate-400 text-lg leading-relaxed max-w-xl mx-auto">
            Learn directly from active practitioners who bring production workflows, code reviews, and industry experience into the curriculum.
          </p>
        </div>

        {/* Mentors Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {mentors.map((m, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-6">
              
              {/* Profile Pic */}
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 dark:border-slate-800 flex-shrink-0 mx-auto sm:mx-0">
                <img src={m.avatar} alt={m.name} className="w-full h-full object-cover" />
              </div>

              {/* Text */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-0.5 text-center sm:text-left">{m.name}</h3>
                  <div className="text-xs text-primary-600 dark:text-primary-400 font-bold mb-3 text-center sm:text-left">{m.role}</div>
                  <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed mb-4 text-center sm:text-left">
                    {m.bio}
                  </p>
                </div>

                {/* Specialties tags */}
                <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                  {m.specialties.map((spec, sIdx) => (
                    <span key={sIdx} className="px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="bg-gradient-to-r from-primary-600/10 via-indigo-600/5 to-transparent border border-primary-500/20 rounded-3xl p-8 text-center max-w-3xl mx-auto">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center justify-center gap-1.5">
            <Award className="h-5 w-5 text-primary-500" /> Interactive Learning Experience
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto leading-relaxed">
            Our instructors hold regular QA office hours. Buy any course today and interact directly with them through active coding comments boards.
          </p>
          <div className="flex justify-center gap-3">
            <Link to="/courses" className="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white font-bold text-xs rounded-lg shadow transition-all">
              Start Learning
            </Link>
            <Link to="/contact" className="px-4 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-350 font-bold text-xs rounded-lg transition-all">
              Ask a Question
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Mentors;
