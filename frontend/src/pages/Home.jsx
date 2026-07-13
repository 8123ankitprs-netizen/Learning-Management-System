import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Database, 
  Code, 
  Server, 
  TrendingUp, 
  Palette, 
  ArrowDownRight, 
  ArrowUpRight, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Calendar,
  Clock,
  Search,
  CheckCircle,
  HelpCircle,
  Plus,
  Minus,
  Quote,
  Star
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import CourseCard from '../components/common/CourseCard';
import { useCoursesQuery } from '../features/courses/hooks/useCoursesQuery';
import api from '../config/axios';

const Home = () => {
  const navigate = useNavigate();
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroSearch, setHeroSearch] = useState('');
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Query backend for courses
  const { data: courses = [], isLoading: loadingCourses } = useCoursesQuery();
  
  // Query backend for categories
  const { data: categories = [], isLoading: loadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.get('/categories');
      return response.data.data;
    }
  });

  // Set default active category once loaded
  useEffect(() => {
    if (categories.length > 0 && !activeCategoryId) {
      setActiveCategoryId(categories[0]._id);
    }
  }, [categories, activeCategoryId]);

  // Banners data
  const slides = [
    {
      id: 1,
      title: 'COMMUNICATION SKILLS',
      subtitle: 'FOR BANKING PROFESSIONALS',
      date: '10TH JULY 2026, FRIDAY',
      time: '05:00 PM - 06:00 PM',
      instructorName: 'VRINDA GUPTA',
      instructorTitle: '10+ YEARS OF EXPERIENCE | TRAINED 1000+ LEARNERS',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
      bgImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
      bgOverlay: 'from-[#1e1b18]/95 via-[#1a1410]/85 to-[#0b0c10]/95',
      titleColor: 'text-[#f26e56]',
      subtitleColor: 'text-white',
      badge: 'LIVE WORKSHOP',
      badgeStyle: 'bg-primary-500/10 border-primary-500/30 text-[#f26e56]',
      instructorTag: 'bg-primary-500/10 border-primary-500/25 text-primary-300',
      mrp: '₹4,999',
      price: '₹4,249',
      offerDeadline: 'Last date for discount is 20 July'
    },
    {
      id: 2,
      title: 'FULL STACK DEVELOPER',
      subtitle: 'BUILD PRODUCTION GRADE WEB APPS',
      date: '12TH JULY 2026, SUNDAY',
      time: '10:00 AM - 12:00 PM',
      instructorName: 'ANKIT PRASAD',
      instructorTitle: 'LEAD DEVELOPER AT TECHCORP | TOP RATED INSTRUCTOR',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop',
      bgImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop',
      bgOverlay: 'from-[#0b132b]/95 via-[#1c2541]/85 to-[#0b0c10]/95',
      titleColor: 'text-blue-400',
      subtitleColor: 'text-white',
      badge: 'DEVELOPER BOOTCAMP',
      badgeStyle: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
      instructorTag: 'bg-blue-500/10 border-blue-500/25 text-blue-300',
      mrp: '₹14,999',
      price: '₹12,749',
      offerDeadline: 'Last date for discount is 20 July'
    },
    {
      id: 3,
      title: 'DATA SCIENCE & GEN AI',
      subtitle: 'ACCELERATE CAREER WITH SMART SYSTEMS',
      date: '15TH JULY 2026, WEDNESDAY',
      time: '03:00 PM - 05:00 PM',
      instructorName: 'FEYAZ KUMAR',
      instructorTitle: 'SENIOR DATA SCIENTIST | AI SOLUTIONS ARCHITECT',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      bgImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      bgOverlay: 'from-[#1d1135]/95 via-[#2b1055]/85 to-[#0b0c10]/95',
      titleColor: 'text-purple-400',
      subtitleColor: 'text-white',
      badge: 'AI SPECIALIZATION',
      badgeStyle: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
      instructorTag: 'bg-purple-500/10 border-purple-500/25 text-purple-300',
      mrp: '₹19,999',
      price: '₹16,999',
      offerDeadline: 'Last date for discount is 20 July'
    }
  ];

  // Testimonials list
  const testimonials = [
    {
      name: 'Rohan Sharma',
      role: 'Full Stack Engineer at Amazon',
      text: 'SkillCraft completely changed my career timeline. The lessons are direct, visual, and focused on building real products. I completed the Full Stack Bootcamp and cleared my interview within months!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
      stars: 5
    },
    {
      name: 'Aishwarya Roy',
      role: 'Data Scientist at Accenture',
      text: 'The Generative AI and Data Science modules are top-notch. I love the progress checking system—being able to see how much I completed motivated me to finish the program and download my certificate.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
      stars: 5
    },
    {
      name: 'Vikram Singh',
      role: 'Associate Banker at HDFC',
      text: 'The banking communication program is structured beautifully. The live workshops are extremely interactive, and the instructors make complex transaction structures feel very simple.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
      stars: 5
    }
  ];

  // FAQ list
  const faqs = [
    {
      q: 'What is SkillCraft and how does it work?',
      a: 'SkillCraft is a premier mentor-led learning platform. We offer specialized bootcamps in Coding, Data Science, DevOps, and Banking. Students enroll in tracks, follow video lessons under 20 minutes, check off completed lectures, and trace overall progress directly.'
    },
    {
      q: 'How do I generate and download my certificate?',
      a: 'Once you complete 100% of the lessons in a course, a "Download Certificate" action button automatically unlocks on your Course Details page and Dashboard. You can print or download your verified diploma instantly.'
    },
    {
      q: 'Can I cancel my enrollment at any time?',
      a: 'Yes, absolutely! On your Course Details page or Dashboard, you can click "Cancel Enrollment" to release the seat. This gives you full control over your active learning queue.'
    },
    {
      q: 'Are these courses self-paced or live?',
      a: 'We offer a hybrid approach! Our core bootcamps are fully self-paced with production-grade curriculum, supplemented by live interactive workshops hosted by elite faculty mentors.'
    }
  ];

  // Banners slider autoplay effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const getSlideLink = (slideTitle) => {
    const titleLower = slideTitle.toLowerCase();
    const match = courses.find(c => {
      const courseTitle = c.title.toLowerCase();
      if (titleLower.includes('full stack') && (courseTitle.includes('full-stack') || courseTitle.includes('web development'))) {
        return true;
      }
      if (titleLower.includes('data science') && (courseTitle.includes('data science') || courseTitle.includes('artificial intelligence') || courseTitle.includes('machine learning'))) {
        return true;
      }
      if (titleLower.includes('communication') && (courseTitle.includes('business') || courseTitle.includes('marketing') || courseTitle.includes('project') || courseTitle.includes('seo'))) {
        return true;
      }
      return false;
    });
    return match ? `/course/${match._id || match.id}` : '/courses';
  };

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/courses?search=${encodeURIComponent(heroSearch)}`);
    }
  };

  const selectSuggestedSearch = (keyword) => {
    navigate(`/courses?search=${encodeURIComponent(keyword)}`);
  };

  const getCategoryIcon = (name) => {
    const lowercaseName = name.toLowerCase();
    if (lowercaseName.includes('data') || lowercaseName.includes('analytics')) {
      return <Database className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
    }
    if (lowercaseName.includes('software') || lowercaseName.includes('development') || lowercaseName.includes('coding') || lowercaseName.includes('dev')) {
      return <Code className="h-5 w-5 text-blue-650 dark:text-blue-405" />;
    }
    if (lowercaseName.includes('cloud') || lowercaseName.includes('devops')) {
      return <Server className="h-5 w-5 text-indigo-650 dark:text-indigo-405" />;
    }
    if (lowercaseName.includes('business') || lowercaseName.includes('marketing') || lowercaseName.includes('finance')) {
      return <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />;
    }
    return <Palette className="h-5 w-5 text-rose-650 dark:text-rose-405" />;
  };

  const activeCategory = categories.find(c => c._id === activeCategoryId);
  const filteredCourses = courses.filter((course) => {
    const courseCatId = course.category?._id || course.category;
    return courseCatId === activeCategoryId;
  });

  const scrollCategories = () => {
    const container = document.getElementById('categories-container');
    if (container) {
      container.scrollBy({ left: 220, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#070b13] text-gray-900 dark:text-slate-100 font-sans antialiased transition-colors duration-200">
      
      {/* 1. HERO CAROUSEL: Interactive Promotional Banners Slider */}
      <section className="relative w-full overflow-hidden bg-white dark:bg-[#070b13] py-0 border-b border-slate-250/20 transition-colors">
        <div className="w-full relative group/slider">
          <div className="relative h-[320px] md:h-[220px] rounded-none overflow-hidden shadow-lg">
            
            {/* Left Manual Nav */}
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 bg-slate-900/60 dark:bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-slate-950 dark:hover:bg-black border border-slate-700/60 shadow-md cursor-pointer transition-all active:scale-90 opacity-0 group-hover/slider:opacity-100 duration-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Right Manual Nav */}
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 bg-slate-900/60 dark:bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-slate-950 dark:hover:bg-black border border-slate-700/60 shadow-md cursor-pointer transition-all active:scale-90 opacity-0 group-hover/slider:opacity-100 duration-300"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {slides.map((slide, index) => {
              const isActive = index === currentSlide;
              const targetLink = getSlideLink(slide.title);
              
              return (
                <Link
                  to={targetLink}
                  key={slide.id}
                  className={`absolute inset-0 w-full h-full flex items-center transition-all duration-700 ease-in-out cursor-pointer hover:brightness-[1.02] ${
                    isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                  style={{
                    backgroundImage: `url(${slide.bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  {/* Thematic dark overlay layer */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgOverlay} z-0`}></div>

                  {/* Inner spacious container matching 7xl navbar alignment */}
                  <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                    {/* Left Side: Badge and Title */}
                    <div className="flex-1 text-center md:text-left space-y-2">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[9px] font-black tracking-widest uppercase ${slide.badgeStyle}`}>
                        <Sparkles className="h-3 w-3 animate-spin duration-700" /> {slide.badge}
                      </span>
                      <div>
                        <h3 className={`text-xl md:text-2xl font-black tracking-tight leading-none ${slide.titleColor}`}>
                          {slide.title}
                        </h3>
                        <p className={`text-xs md:text-sm font-bold mt-1 ${slide.subtitleColor}`}>
                          {slide.subtitle}
                        </p>
                        
                        {/* Interactive Price & Discount info badge block */}
                        <div className="flex flex-wrap gap-2.5 items-center justify-center md:justify-start mt-2">
                          <span className="px-2 py-0.5 rounded-lg bg-[#f26e56]/15 border border-[#f26e56]/30 text-[#f26e56] text-[9px] font-black uppercase tracking-wider">
                            Special 15% OFF
                          </span>
                          <span className="text-xs text-slate-300 font-bold">
                            MRP <span className="line-through text-slate-400">{slide.mrp}</span> ➔ <span className="text-[#f26e56] font-extrabold text-sm">{slide.price}</span>
                          </span>
                          <span className="text-[10.5px] text-slate-400 font-bold italic">
                            ({slide.offerDeadline})
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Center: Date & Time details */}
                    <div className="flex-shrink-0 text-center my-3 md:my-0 px-5 md:border-x border-slate-550/30 space-y-1.5 font-mono">
                      <div>
                        <span className="block text-[8px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest">Date</span>
                        <span className="text-xs font-bold text-white flex items-center gap-1.5 justify-center mt-0.5">
                          <Calendar className="h-3.5 w-3.5 text-[#f26e56]" />
                          {slide.date}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[8px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-widest">Time</span>
                        <span className="text-xs font-bold text-white flex items-center gap-1.5 justify-center mt-0.5">
                          <Clock className="h-3.5 w-3.5 text-[#f26e56]" />
                          {slide.time}
                        </span>
                      </div>
                    </div>

                    {/* Right Side: Interactive Call to Action */}
                    <div className="flex-grow flex items-center gap-4 justify-center md:justify-end">
                      <div className="hidden lg:flex h-11 w-11 rounded-2xl bg-white/10 backdrop-blur border border-white/20 items-center justify-center text-white shadow-sm">
                        {getCategoryIcon(slide.title)}
                      </div>
                      <div className="px-5 py-2.5 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all">
                        Enroll Now »
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* Slider dots indicator located below the section bottom border line */}
      <div className="flex justify-center gap-1.5 py-3.5 bg-slate-50 dark:bg-[#070b13] transition-colors border-b border-slate-200/50 dark:border-slate-805/45">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 w-1.5 rounded-full transition-all cursor-pointer ${
              index === currentSlide ? 'bg-[#f26e56] w-3.5' : 'bg-slate-300 dark:bg-slate-750'
            }`}
          />
        ))}
      </div>

      {/* 2. DYNAMIC INTERACTIVE HERO SECTION (Mesh Grid & Search Finder) */}
      <section className="relative overflow-hidden bg-slate-50 dark:bg-[#070b13] py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200 dark:border-slate-805/70 transition-colors">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-50 dark:opacity-35"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[550px] h-[320px] bg-[#f26e56]/5 dark:bg-primary-500/10 rounded-full blur-[110px] pointer-events-none"></div>

        <div className="relative max-w-4xl mx-auto text-center space-y-6 z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
            Learn Skills That <span className="text-[#f26e56]">Matter</span>
          </h2>
          <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-lg mx-auto font-semibold leading-relaxed">
            Gain production-grade software development, devops, and artificial intelligence experience with our accredited modules.
          </p>

          {/* Interactive Search Bar directly in Hero */}
          <form onSubmit={handleHeroSearch} className="max-w-md mx-auto relative group/search mt-4">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4.5 w-4.5 text-slate-400 group-focus-within/search:text-primary-500 transition-colors" />
            </div>
            <input 
              type="text" 
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
              placeholder="Find your favorite tech bootcamp..." 
              className="w-full pl-11 pr-24 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-white"
            />
            <button 
              type="submit"
              className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 text-white rounded-xl text-xs font-extrabold uppercase tracking-wide cursor-pointer transition-colors"
            >
              Search
            </button>
          </form>

          {/* Sugggested/Popular Tags */}
          <div className="flex flex-wrap justify-center gap-2 text-xs font-semibold text-slate-400 dark:text-slate-500 mt-2">
            <span>Popular:</span>
            {['Full-Stack', 'Data Science', 'DevOps', 'Communication'].map((tag) => (
              <button 
                key={tag}
                onClick={() => selectSuggestedSearch(tag)}
                className="text-slate-600 dark:text-slate-400 hover:text-primary-500 underline cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 3. MENTOR-LED COURSES (HIGH-END CATEGORY TABS GRID) */}
      <section id="courses-section" className="bg-white dark:bg-[#070b13] py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-12 flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary-200/40 dark:border-primary-900/30 bg-primary-50 dark:bg-primary-950/20 text-[#f26e56] text-[10px] font-extrabold uppercase tracking-widest mb-3">
              <Sparkles className="h-3.5 w-3.5" /> Course Catalog
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-3">
              Browse Mentor-Led Tracks
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto font-semibold">
              Filter by industry domain and select courses to register and trace module lessons.
            </p>
          </div>

          {/* Categories Tab Selector Row */}
          <div className="relative mb-10 flex items-center">
            <div 
              id="categories-container"
              className="flex items-center gap-3 overflow-x-auto scrollbar-none pb-2 flex-grow pr-12"
            >
              {categories.map((cat) => {
                const isActive = cat._id === activeCategoryId;
                return (
                  <button
                    key={cat._id}
                    onClick={() => setActiveCategoryId(cat._id)}
                    className={`flex items-center gap-2.5 px-4.5 py-3 border rounded-2xl font-extrabold text-xs whitespace-nowrap cursor-pointer transition-all active:scale-[0.98] ${
                      isActive 
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/20 text-[#f26e56] shadow-sm'
                        : 'border-slate-200 dark:border-slate-805 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850'
                    }`}
                  >
                    {getCategoryIcon(cat.name)}
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={scrollCategories}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-9 w-9 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-805 rounded-full flex items-center justify-center shadow hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
            >
              <ChevronRight className="h-4.5 w-4.5 text-slate-500" />
            </button>
          </div>

          {/* Courses Grid View */}
          {loadingCourses || loadingCategories ? (
            <div className="flex justify-center py-12">
              <div className="h-8 w-8 border-4 border-primary-500 border-t-transparent animate-spin rounded-full"></div>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center text-slate-500 dark:text-slate-455 py-12 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-805/70 rounded-3xl">
              <p className="text-sm font-bold">No programs loaded in this category yet.</p>
              <p className="text-xs text-slate-400 mt-1 font-semibold">Try switching filters or check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course._id || course.id} course={course} />
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 4. INTERACTIVE TESTIMONIALS SLIDER SECTION */}
      <section className="bg-slate-50 dark:bg-[#090e19] border-t border-b border-slate-200 dark:border-slate-905 py-20 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] font-black tracking-widest text-[#f26e56] bg-[#f26e56]/10 border border-[#f26e56]/10 px-3 py-1 rounded-full uppercase">
              Success Stories
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-3">
              Trusted by 10,000+ Students
            </h2>
          </div>

          {/* Interactive Testimonial Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-805/70 rounded-3xl p-6 md:p-8 shadow-md relative min-h-[220px] transition-all duration-300">
            <div className="absolute top-6 right-6 text-slate-105 dark:text-slate-800/40">
              <Quote className="h-10 w-10 rotate-180" />
            </div>

            <div className="flex items-center gap-1.5 mb-4">
              {[...Array(testimonials[activeTestimonial].stars)].map((_, i) => (
                <Star key={i} className="h-4.5 w-4.5 text-amber-500 fill-amber-500" />
              ))}
            </div>

            <p className="text-sm md:text-base text-slate-655 dark:text-slate-300 italic font-semibold leading-relaxed mb-6">
              "{testimonials[activeTestimonial].text}"
            </p>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-805/65">
              <div className="flex items-center gap-3">
                <img 
                  src={testimonials[activeTestimonial].avatar} 
                  alt={testimonials[activeTestimonial].name} 
                  className="h-10 w-10 rounded-full object-cover border border-slate-200 shadow-sm"
                />
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white leading-none">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block mt-1">
                    {testimonials[activeTestimonial].role}
                  </span>
                </div>
              </div>

              {/* Slider Toggle Controls */}
              <div className="flex gap-2">
                <button 
                  onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  className="p-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer active:scale-90 transition-transform"
                >
                  <ChevronLeft className="h-4.5 w-4.5" />
                </button>
                <button 
                  onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                  className="p-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer active:scale-90 transition-transform"
                >
                  <ChevronRight className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE FAQ ACCORDION SECTION */}
      <section className="bg-white dark:bg-[#070b13] py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-900/40 bg-purple-50 dark:bg-purple-950/20 text-purple-650 dark:text-purple-400 text-[10px] font-extrabold uppercase tracking-widest mb-3">
              <HelpCircle className="h-3.5 w-3.5" /> Frequently Asked
            </span>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-3">
              Got Questions?
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold">
              Find answers to the most common queries about enrollment, credentials, and curriculum.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="border border-slate-200 dark:border-slate-805/70 rounded-2xl overflow-hidden shadow-sm transition-all bg-white dark:bg-slate-900/40"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-extrabold text-sm text-slate-900 dark:text-slate-205 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-850/30 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <Minus className="h-4 w-4 text-[#f26e56] flex-shrink-0" />
                    ) : (
                      <Plus className="h-4 w-4 text-[#f26e56] flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-805/45 text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
