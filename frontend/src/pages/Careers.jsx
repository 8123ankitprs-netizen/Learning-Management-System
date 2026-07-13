import React from 'react';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Careers = () => {
  const jobs = [
    {
      title: 'Senior QA Automation Engineer',
      type: 'Full-time',
      location: 'Remote (India)',
      team: 'Engineering',
      desc: 'Lead the design of end-to-end testing models, writing automated browser test scripts with Cypress, and configuring database integration gates.'
    },
    {
      title: 'Full-Stack Curriculum Author (React / Node.js)',
      type: 'Part-time / Contract',
      location: 'Hybrid (Delhi/Bengaluru)',
      team: 'Content & Faculty',
      desc: 'Author technical course modules on modern single-page-apps, telemetry logging setups, REST API security guidelines, and Mongoose modeling.'
    },
    {
      title: 'Developer Relations Coordinator',
      type: 'Full-time',
      location: 'Remote',
      team: 'Community',
      desc: 'Moderate community note boards, interact with students on Discord, write technical tutorial blogs, and manage product feedback loops.'
    }
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-16 px-4 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 mb-4 border border-primary-100 dark:border-primary-900/30">
            <Briefcase className="h-3.5 w-3.5" /> Join Our Team
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 sm:text-5xl">
            Work at SkillCraft
          </h1>
          <p className="text-slate-550 dark:text-slate-400 text-lg leading-relaxed max-w-xl mx-auto">
            Help us build the future of project-centered technical education. We're looking for passionate devs and curriculum authors.
          </p>
        </div>

        {/* Jobs List */}
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Open Roles ({jobs.length})</h2>
        <div className="space-y-6 mb-12">
          {jobs.map((job, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:border-primary-550/35 transition-all group">
              <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary-550 transition-colors">{job.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-slate-450 dark:text-slate-400 mt-1 font-medium">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {job.type}</span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500 dark:text-slate-450 font-bold uppercase tracking-wider">
                  {job.team}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed mb-4">
                {job.desc}
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-1 text-xs font-bold text-primary-600 dark:text-primary-400 hover:text-primary-500 group"
              >
                Apply for this role <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-center">
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">Don't see a matching position?</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 max-w-sm mx-auto leading-relaxed">
            We are always looking for freelance instructors to write coding curriculums or record video preview modules.
          </p>
          <Link to="/contact" className="px-4 py-2 bg-[#0c1426] hover:bg-[#121c33] border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors">
            Get in touch
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Careers;
