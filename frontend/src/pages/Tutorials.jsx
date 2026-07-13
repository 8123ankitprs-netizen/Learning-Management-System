import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Play, BookOpen, Clock, Tag, Sparkles, HelpCircle, Layers, MonitorPlay } from 'lucide-react';

const Tutorials = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const [selectedTag, setSelectedTag] = useState('All');

  const tutorials = [
    {
      id: 1,
      title: 'React JS V19 Masterclass: Zero to Hero',
      description: 'Learn modern React hooks, state management with Context API, and integration with Tailwind CSS. Includes 3 hands-on projects.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop',
      lectures: 14,
      duration: '4.5 hrs',
      level: 'Beginner',
      tags: ['React', 'Frontend', 'JavaScript'],
      youtubeMockUrl: 'https://www.youtube.com'
    },
    {
      id: 2,
      title: 'Node.js & Express REST APIs Backend Architecture',
      description: 'Build secure, scalable RESTful services using Express, connect to MongoDB Atlas, and implement token-based JWT sessions.',
      image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=600&auto=format&fit=crop',
      lectures: 10,
      duration: '3.8 hrs',
      level: 'Intermediate',
      tags: ['Node', 'Express', 'Backend'],
      youtubeMockUrl: 'https://www.youtube.com'
    },
    {
      id: 3,
      title: 'Python for Task Automation & Data Analysis',
      description: 'Write robust automation scripts, parse Excel/JSON data streams, and use Beautiful Soup to scrape web pages.',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=600&auto=format&fit=crop',
      lectures: 16,
      duration: '5.2 hrs',
      level: 'Beginner',
      tags: ['Python', 'Automation', 'Scripting'],
      youtubeMockUrl: 'https://www.youtube.com'
    },
    {
      id: 4,
      title: 'CSS Grid & Flexbox Layout Systems',
      description: 'Master advanced layouts, responsive media queries, grid positioning, and alignment templates for modern web design.',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop',
      lectures: 8,
      duration: '2.4 hrs',
      level: 'Beginner',
      tags: ['CSS', 'HTML', 'Frontend'],
      youtubeMockUrl: 'https://www.youtube.com'
    },
    {
      id: 5,
      title: 'Git, GitHub, and Team Collaboration Workflows',
      description: 'Learn standard branch mechanics, merge request protocols, tag controls, and pull request reviews in a production environment.',
      image: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?q=80&w=600&auto=format&fit=crop',
      lectures: 6,
      duration: '1.5 hrs',
      level: 'Beginner',
      tags: ['Git', 'GitHub', 'DevOps'],
      youtubeMockUrl: 'https://www.youtube.com'
    }
  ];

  const handleSearchChange = (val) => {
    setSearchParams((prev) => {
      if (val) prev.set('search', val);
      else prev.delete('search');
      return prev;
    });
  };

  // Filter logic based on tags and search keyword
  const filtered = tutorials.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'All' || t.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const allTags = ['All', 'React', 'Node', 'Python', 'CSS', 'Git'];

  return (
    <div className="bg-slate-50 dark:bg-[#070b13] text-gray-905 dark:text-slate-100 min-h-screen py-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Glowing Catalog Header Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-205 dark:border-slate-805/70 shadow-lg mb-10 p-6 md:p-8 bg-gradient-to-r from-primary-500/10 via-purple-500/5 to-transparent dark:from-primary-950/20 dark:via-purple-950/10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-35"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-900/40 bg-purple-50 dark:bg-purple-950/20 text-purple-650 dark:text-purple-400 text-[10px] font-extrabold uppercase tracking-widest mb-3 animate-pulse">
                <Sparkles className="h-3.5 w-3.5" /> Hands-on Guides
              </span>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-905 dark:text-white leading-none">
                Free Developer Tutorials
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
                Upgrade your coding credentials with step-by-step practical walk-through guides.
              </p>
            </div>
            
            {/* Real-time stats indicators */}
            <div className="flex gap-4">
              <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur border border-slate-205 dark:border-slate-800 px-5 py-3 rounded-2xl text-center shadow-sm">
                <span className="block text-xl font-black text-slate-900 dark:text-white">{tutorials.length}</span>
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Tutorials</span>
              </div>
              <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur border border-slate-205 dark:border-slate-800 px-5 py-3 rounded-2xl text-center shadow-sm">
                <span className="block text-xl font-black text-slate-900 dark:text-white">56+</span>
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Lectures</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Input and Filters layout */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          {/* Tag Filters list */}
          <div className="flex flex-wrap gap-2 order-2 md:order-1">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer border active:scale-95 ${
                  selectedTag === tag 
                    ? 'bg-primary-50 dark:bg-primary-950/20 text-[#f26e56] border-[#f26e56]' 
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          
          {/* Search Box */}
          <div className="relative w-full md:w-80 order-1 md:order-2 group/search">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4.5 w-4.5 text-slate-405 group-focus-within/search:text-primary-500 transition-colors" />
            </div>
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search tutorials by name..."
              className="w-full pl-10 pr-4 py-2.5 border border-slate-205 dark:border-slate-805 rounded-2xl bg-white dark:bg-slate-900 text-sm font-semibold placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Tutorials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((t) => (
            <div key={t.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-805/70 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group">
              
              {/* Image & floating level badge */}
              <div className="h-44 bg-slate-950 relative overflow-hidden">
                <img 
                  src={t.image} 
                  alt={t.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                
                {/* Floating level capsule badge */}
                <div className="absolute top-3.5 left-3.5 z-10 px-2.5 py-1 bg-black/60 dark:bg-slate-900/80 backdrop-blur-md text-white border border-white/10 dark:border-slate-800 rounded-full text-[9px] font-black tracking-widest uppercase">
                  {t.level}
                </div>

                <div className="absolute inset-0 bg-black/45 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Play className="h-5 w-5 fill-current ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Content block */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex gap-1.5 flex-wrap mb-3.5">
                  {t.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-0.5 rounded-full bg-slate-50 dark:bg-slate-850 text-[9px] font-black text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-805 flex items-center gap-1 uppercase tracking-widest">
                      <Tag className="h-2.5 w-2.5 text-primary-500" /> {tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-extrabold text-slate-905 dark:text-white text-base mb-2 group-hover:text-primary-505 dark:group-hover:text-primary-400 transition-colors leading-snug">
                  {t.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs mb-5 leading-relaxed line-clamp-3 font-semibold">
                  {t.description}
                </p>

                {/* Footer specs */}
                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-805/65 flex justify-between items-center text-[11px] text-slate-450 dark:text-slate-500 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5"><MonitorPlay className="h-4 w-4 text-primary-500" /> {t.lectures} lectures</span>
                  <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary-500" /> {t.duration}</span>
                </div>
                
                {/* Visual action button */}
                <a 
                  href={t.youtubeMockUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 w-full bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 text-white font-extrabold py-2.5 rounded-xl text-center text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:scale-103 active:scale-95 uppercase tracking-wide"
                >
                  <Play className="h-3.5 w-3.5 fill-current" /> Start Watching
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Tutorials;
