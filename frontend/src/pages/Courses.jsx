import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Database, 
  Code, 
  Server, 
  TrendingUp, 
  Palette, 
  ChevronRight, 
  X,
  Sparkles,
  BookOpen,
  Award,
  Globe
} from 'lucide-react';
import CourseCard from '../components/common/CourseCard';
import { useCoursesQuery, useCategoriesQuery } from '../features/courses/hooks/useCoursesQuery';

const Courses = () => {
  const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search));
  const [activeSearchParams, setActiveSearchParams] = useSearchParams();
  const searchTerm = activeSearchParams.get('search') || '';
  const urlCategoryName = activeSearchParams.get('category') || '';
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Query actual categories first
  const { data: categories = [], isLoading: loadingCategories } = useCategoriesQuery();

  // Find ID matching category name from URL params if present
  React.useEffect(() => {
    if (urlCategoryName && categories.length > 0) {
      const found = categories.find(
        c => c.name.toLowerCase() === urlCategoryName.toLowerCase() || c._id === urlCategoryName
      );
      if (found) {
        setSelectedCategory(found._id);
      } else {
        setSelectedCategory('All');
      }
    } else if (!urlCategoryName) {
      setSelectedCategory('All');
    }
  }, [urlCategoryName, categories]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setActiveSearchParams((prev) => {
      if (catId !== 'All') {
        const found = categories.find(c => c._id === catId);
        if (found) prev.set('category', found.name);
      } else {
        prev.delete('category');
      }
      return prev;
    });
  };

  const handleSearchChange = (value) => {
    setActiveSearchParams((prev) => {
      if (value) {
        prev.set('search', value);
      } else {
        prev.delete('search');
      }
      return prev;
    });
  };

  // Build filters object to pass to backend API
  const filters = {};
  if (searchTerm) filters.search = searchTerm;
  if (selectedCategory !== 'All') filters.category = selectedCategory;

  // Query actual backend courses
  const { data: courses = [], isLoading: loadingCourses } = useCoursesQuery(filters);

  // Icon selector based on category name
  const getCategoryIcon = (name) => {
    const lowercaseName = name.toLowerCase();
    if (lowercaseName.includes('data') || lowercaseName.includes('analytics')) {
      return <Database className="h-4.5 w-4.5" />;
    }
    if (lowercaseName.includes('software') || lowercaseName.includes('development') || lowercaseName.includes('coding') || lowercaseName.includes('dev')) {
      return <Code className="h-4.5 w-4.5" />;
    }
    if (lowercaseName.includes('cloud') || lowercaseName.includes('devops')) {
      return <Server className="h-4.5 w-4.5" />;
    }
    if (lowercaseName.includes('business') || lowercaseName.includes('marketing') || lowercaseName.includes('finance')) {
      return <TrendingUp className="h-4.5 w-4.5" />;
    }
    return <Palette className="h-4.5 w-4.5" />;
  };

  return (
    <div className="bg-slate-50 dark:bg-[#070b13] min-h-screen py-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Glowing Catalog Header Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-805/70 shadow-lg mb-10 p-6 md:p-8 bg-gradient-to-r from-primary-500/10 via-purple-500/5 to-transparent dark:from-primary-950/20 dark:via-purple-950/10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-35"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-900/40 bg-purple-50 dark:bg-purple-950/20 text-purple-650 dark:text-purple-400 text-[10px] font-extrabold uppercase tracking-widest mb-3 animate-pulse">
                <Sparkles className="h-3.5 w-3.5" /> Course Catalog
              </span>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
                Explore Specialized Programs
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
                Choose your industry path, filters options, and advance your professional skills.
              </p>
            </div>
            
            {/* Real-time stats indicators */}
            <div className="flex gap-4">
              <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur border border-slate-200 dark:border-slate-800 px-5 py-3 rounded-2xl text-center shadow-sm">
                <span className="block text-xl font-black text-slate-900 dark:text-white">{courses.length}</span>
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Programs</span>
              </div>
              <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur border border-slate-200 dark:border-slate-800 px-5 py-3 rounded-2xl text-center shadow-sm">
                <span className="block text-xl font-black text-slate-900 dark:text-white">{categories.length}</span>
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Tracks</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* Creative Sidebar Filters (Vertical premium list) */}
          <aside className="w-full md:w-72 flex-shrink-0">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-805/70 shadow-md">
              <div className="flex items-center justify-between font-extrabold text-slate-900 dark:text-white text-sm mb-5 pb-4 border-b border-slate-100 dark:border-slate-805/65">
                <div className="flex items-center gap-2">
                  <Filter className="h-4.5 w-4.5 text-primary-500" /> 
                  <span>Filters</span>
                </div>
                {(selectedCategory !== 'All' || searchTerm) && (
                  <button 
                    onClick={() => { handleCategoryChange('All'); handleSearchChange(''); }}
                    className="text-[10px] font-extrabold tracking-wider text-red-500 uppercase hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>
              
              {/* Category Filter Group */}
              <div>
                <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Category Track</h3>
                {loadingCategories ? (
                  <div className="flex justify-center py-4">
                    <div className="h-5 w-5 border-2 border-primary-500 border-t-transparent animate-spin rounded-full"></div>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {/* ALL CATEGORIES */}
                    <button
                      onClick={() => handleCategoryChange('All')}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-xs cursor-pointer transition-all active:scale-[0.98] ${
                        selectedCategory === 'All'
                          ? 'bg-primary-50 dark:bg-primary-950/20 text-[#f26e56] border-l-4 border-[#f26e56]'
                          : 'bg-transparent text-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Globe className="h-4.5 w-4.5" />
                        <span>All Categories</span>
                      </div>
                      <ChevronRight className="h-3.5 w-3.5 opacity-60" />
                    </button>

                    {/* DYNAMIC CATEGORY BUTTONS */}
                    {categories.map((cat) => {
                      const isActive = selectedCategory === cat._id;
                      return (
                        <button
                          key={cat._id}
                          onClick={() => handleCategoryChange(cat._id)}
                          className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-xs cursor-pointer transition-all active:scale-[0.98] ${
                            isActive
                              ? 'bg-primary-50 dark:bg-primary-950/20 text-[#f26e56] border-l-4 border-[#f26e56]'
                              : 'bg-transparent text-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            {getCategoryIcon(cat.name)}
                            <span>{cat.name}</span>
                          </div>
                          <ChevronRight className="h-3.5 w-3.5 opacity-60" />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content (Search + Grid) */}
          <main className="flex-1 w-full">
            {/* Premium Search Bar */}
            <div className="mb-8 flex gap-4">
              <div className="relative flex-1 group/search">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400 dark:text-slate-500 group-focus-within/search:text-primary-500 transition-colors" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="block w-full pl-11 pr-10 py-3.5 border border-slate-200 dark:border-slate-805 rounded-2xl bg-white dark:bg-slate-900 text-slate-905 dark:text-white shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-sm font-semibold transition-all"
                  placeholder="Search by course title, keyword, or instructor..."
                />
                {searchTerm && (
                  <button 
                    onClick={() => handleSearchChange('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-655"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Courses Grid View */}
            {loadingCourses ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-805/70 rounded-3xl shadow-sm">
                <div className="h-8 w-8 border-4 border-primary-500 border-t-transparent animate-spin rounded-full"></div>
                <p className="mt-3.5 text-[10px] font-bold font-mono tracking-widest text-slate-400 uppercase">FETCHING ACTIVE BOOTCAMPS...</p>
              </div>
            ) : courses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <CourseCard key={course._id || course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-805/70 shadow-sm">
                <div className="h-12 w-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-slate-405 dark:text-slate-500" />
                </div>
                <p className="text-sm font-extrabold text-slate-900 dark:text-white">No courses match your active criteria.</p>
                <p className="text-xs text-slate-400 mt-1.5 max-w-xs mx-auto">Try refining your search keyword or change the category filter on the sidebar.</p>
                <button 
                  onClick={() => { handleSearchChange(''); handleCategoryChange('All'); }}
                  className="mt-5 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 text-white rounded-xl text-xs font-extrabold tracking-wide uppercase transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                >
                  Reset Filters
                </button>
              </div>
            )}
            
          </main>
        </div>
      </div>
    </div>
  );
};

export default Courses;
