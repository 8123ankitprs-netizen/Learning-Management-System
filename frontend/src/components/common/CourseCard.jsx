import React, { useState, useRef, useContext } from 'react';
import { Star, Clock, BookOpen, Check, Heart, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useEnrollmentsQuery } from '../../features/enrollments/hooks/useEnrollmentsQuery';

const CourseCard = ({ course }) => {
  const { id, _id, title, description, category, instructor, price, hours, modules, imagePlaceholder, thumbnailUrl } = course;
  const courseId = _id || id;

  const { user } = useContext(AuthContext);
  const { data: enrollments = [] } = useEnrollmentsQuery({ enabled: !!user });
  
  const [popoverAlign, setPopoverAlign] = useState('right');
  const cardRef = useRef(null);

  const isEnrolled = enrollments.some(
    (e) => (e.course?._id || e.course?.id || e.course) === courseId
  );

  const handleMouseEnter = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      // If there's less than 340px of space on the right, show popover on the left
      if (screenWidth - rect.right < 340) {
        setPopoverAlign('left');
      } else {
        setPopoverAlign('right');
      }
    }
  };

  // Mock data calculations for premium aesthetics
  const hoursCount = hours || (12 + (title.charCodeAt(0) % 25));
  const updatedDate = new Date(course.updatedAt || Date.now()).toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  const ratingStars = 4.5 + (title.charCodeAt(0) % 6) * 0.1;
  const reviewCount = 85 + (title.charCodeAt(0) % 350);

  const categoryName = category && typeof category === 'object' ? category.name : category;

  return (
    <div 
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      className="relative group flex flex-col h-full"
    >
      <Link 
        to={`/course/${courseId}`} 
        className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-805/70 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col h-full overflow-hidden"
      >
        {/* Course Thumbnail & Floating Glassmorphic Category Capsule */}
        <div className="h-44 bg-slate-100 dark:bg-slate-950 w-full relative overflow-hidden flex items-center justify-center">
          
          {/* Glassmorphic Category Badge floating on thumbnail */}
          <div className="absolute top-3.5 left-3.5 z-10 px-2.5 py-1 bg-black/60 dark:bg-slate-900/80 backdrop-blur-md text-white border border-white/10 dark:border-slate-800 rounded-full text-[9px] font-black tracking-widest uppercase">
            {categoryName}
          </div>

          {thumbnailUrl && (thumbnailUrl.startsWith('/') || thumbnailUrl.startsWith('http')) ? (
            <img 
              src={thumbnailUrl} 
              alt={title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className={`absolute inset-0 ${imagePlaceholder || 'bg-primary-100'} group-hover:scale-105 transition-transform duration-500`}></div>
          )}
        </div>
        
        {/* Course Details Container */}
        <div className="p-5 flex-1 flex flex-col bg-white dark:bg-slate-900">
          
          {/* Title */}
          <h3 className="text-base font-extrabold text-slate-905 dark:text-white mb-1.5 line-clamp-2 leading-snug group-hover:text-primary-505 dark:group-hover:text-primary-400 transition-colors">
            {title}
          </h3>

          {/* Premium Rating Indicator */}
          <div className="flex items-center gap-1.5 mb-4">
            <span className="text-xs font-black text-amber-500">{ratingStars.toFixed(1)}</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-3 w-3 ${
                    i < Math.floor(ratingStars) 
                      ? 'text-amber-500 fill-amber-500' 
                      : 'text-slate-200 dark:text-slate-700'
                  }`} 
                />
              ))}
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-550 font-bold">({reviewCount})</span>
          </div>
          
          {/* Course Meta (Hours & Modules) */}
          <div className="flex items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400 mb-4 mt-auto font-medium">
            {hoursCount && (
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 opacity-80" /> {hoursCount} hours
              </span>
            )}
            {modules && (
              <span className="flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5 opacity-80" /> {modules} Modules
              </span>
            )}
          </div>
   
          {/* Footer: Price & Arrow indicator */}
          <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-805/65 pt-3.5 mt-auto">
            <div className="font-black text-lg text-[#f26e56] dark:text-[#f26e56]/90">
              {price === 0 ? 'Free' : `₹${price.toLocaleString('en-IN')}`}
            </div>
            <div className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest text-primary-500 group-hover:text-primary-400 transition-colors">
              <span>Details</span>
              <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>

      {/* Udemy-Style Floating Popover Tooltip */}
      <div 
        className={`absolute hidden lg:group-hover:block w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-5 z-50 pointer-events-auto transition-all duration-200 ${
          popoverAlign === 'right' 
            ? 'left-full top-0 ml-4 before:content-[\'\'] before:absolute before:top-8 before:-left-2 before:w-4 before:h-4 before:bg-white dark:before:bg-slate-900 before:border-l before:border-b before:border-slate-200 dark:before:border-slate-800 before:rotate-45' 
            : 'right-full top-0 mr-4 before:content-[\'\'] before:absolute before:top-8 before:-right-2 before:w-4 before:h-4 before:bg-white dark:before:bg-slate-900 before:border-r before:border-t before:border-slate-200 dark:before:border-slate-800 before:rotate-45'
        }`}
      >
        {/* Popover Header Title */}
        <h4 className="font-extrabold text-sm text-slate-900 dark:text-white mb-2 leading-snug">
          {title}
        </h4>

        {/* Popover Badges */}
        <div className="flex gap-2 mb-3">
          {price > 2500 ? (
            <span className="text-[9px] font-black px-2 py-0.5 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 rounded-full uppercase tracking-wider border border-purple-100 dark:border-purple-900/40">
              Premium
            </span>
          ) : (
            <span className="text-[9px] font-black px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full uppercase tracking-wider border border-emerald-100 dark:border-emerald-900/40">
              Bestseller
            </span>
          )}
          <span className="text-[9px] font-black px-2 py-0.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-full uppercase tracking-wider border border-blue-100 dark:border-blue-900/40">
            All Levels
          </span>
        </div>

        {/* Updated metadata */}
        <div className="text-[10px] text-slate-450 dark:text-slate-500 font-bold space-y-0.5 mb-3">
          <div>Updated <span className="text-slate-705 dark:text-slate-350">{updatedDate}</span></div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span>{hoursCount} total hours</span>
            <span>•</span>
            <span>Subtitles Included</span>
          </div>
        </div>

        {/* Short Hook */}
        <p className="text-xs text-slate-600 dark:text-slate-400 mb-3.5 leading-relaxed line-clamp-3 font-medium">
          {description}
        </p>

        {/* Learning Objectives list */}
        <div className="space-y-2 mb-4">
          <div className="text-[10px] font-extrabold text-slate-800 dark:text-slate-300 uppercase tracking-widest">What you'll learn:</div>
          <ul className="space-y-1.5">
            <li className="flex items-start gap-2 text-[11.5px] text-slate-650 dark:text-slate-400 font-semibold leading-normal">
              <Check className="h-3.5 w-3.5 text-emerald-605 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Master key blocks of {title.split(' ')[0] || 'programming'}.</span>
            </li>
            <li className="flex items-start gap-2 text-[11.5px] text-slate-650 dark:text-slate-400 font-semibold leading-normal">
              <Check className="h-3.5 w-3.5 text-emerald-605 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Build real-world projects for your professional portfolio.</span>
            </li>
            <li className="flex items-start gap-2 text-[11.5px] text-slate-650 dark:text-slate-400 font-semibold leading-normal">
              <Check className="h-3.5 w-3.5 text-emerald-605 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
              <span>Learn professional best practices & clean code architecture.</span>
            </li>
          </ul>
        </div>

        {/* Action Button & Wishlist Link */}
        <div className="flex gap-2 mt-auto pt-3.5 border-t border-slate-100 dark:border-slate-805/65">
          {isEnrolled ? (
            <Link 
              to={`/course/${courseId}`}
              className="flex-1 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-extrabold uppercase tracking-wide text-center shadow-md active:scale-95 transition-all cursor-pointer"
            >
              Go to Course
            </Link>
          ) : (
            <Link 
              to={`/course/${courseId}`}
              className="flex-1 py-2 bg-gradient-to-r from-[#f26e56] to-[#e0533c] hover:from-[#e0533c] hover:to-[#c63d27] text-white rounded-xl text-xs font-extrabold uppercase tracking-wide text-center shadow-md active:scale-95 transition-all cursor-pointer"
            >
              Enroll Now
            </Link>
          )}
          <button 
            type="button"
            className="p-2 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-xl hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer"
            title="Wishlist"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
