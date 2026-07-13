import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, Moon, Sun, ChevronDown, Edit } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [showLearningDropdown, setShowLearningDropdown] = useState(false);
  const [showTutorialsDropdown, setShowTutorialsDropdown] = useState(false);

  const triggerSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      triggerSearch();
    }
  };

  return (
    <nav className="bg-white dark:bg-[#0f1219] text-gray-900 dark:text-white border-b border-gray-100 dark:border-slate-800/80 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Header Row */}
        <div className="flex justify-between items-center h-16">
          
          {/* Logo & Navigation Links */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center mr-2">
              <img 
                src="/logo.png" 
                alt="SkillCraft Logo" 
                className="h-14 w-auto object-contain transition-all duration-300 dark:invert dark:brightness-125" 
              />
            </Link>
            
            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-5 text-sm font-medium">
              <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-gray-600 dark:text-slate-200">Home</Link>
              <Link to="/courses" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-gray-600 dark:text-slate-200">Courses</Link>
              <Link to="/tutorials" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-gray-600 dark:text-slate-200">Tutorials</Link>
              <Link to="/blog" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-gray-600 dark:text-slate-200">Blog</Link>
              <Link to="/notes" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-gray-600 dark:text-slate-200">Notes</Link>
              <Link to="/contact" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-gray-600 dark:text-slate-200">Contact</Link>
            </div>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-xs mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="block w-full pl-3 pr-10 py-1.5 border border-gray-200 dark:border-slate-700 rounded-lg leading-5 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors duration-200"
                placeholder="Search..."
              />
              <button 
                onClick={triggerSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-450 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer"
                title="Search"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* User Profile / Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className="p-2 border border-gray-200 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-900 rounded-lg text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors"
              title="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>

            {user ? (
              <>
                <div className="flex items-center gap-4">
                  {user.role === 'admin' && (
                    <Link to="/admin" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-bold text-sm transition-colors">
                      Admin Panel
                    </Link>
                  )}
                  <Link to="/dashboard" className="text-gray-600 dark:text-slate-350 hover:text-primary-605 dark:hover:text-white font-medium text-sm transition-colors">
                    My Learning
                  </Link>
                </div>
                <div className="flex items-center gap-3 border-l border-gray-200 dark:border-slate-800 pl-4">
                  {/* User Name */}
                  <span className="hidden sm:inline text-xs font-semibold text-gray-700 dark:text-slate-300">
                    {user.name}
                  </span>

                  {/* User Initials Circle DP */}
                  <Link to="/profile" className="flex-shrink-0 transition-transform hover:scale-105">
                    <img 
                      src={user.profileImage && user.profileImage !== 'default.jpg' ? user.profileImage : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}&backgroundColor=0284c7`} 
                      alt={user.name} 
                      className="h-8 w-8 rounded-full border border-gray-250 dark:border-slate-700 object-cover"
                    />
                  </Link>
                  <button onClick={logout} className="text-xs font-medium text-gray-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-white font-medium text-sm transition-colors">
                  Log in
                </Link>
                <Link to="/register" className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm">
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button 
              onClick={toggleTheme} 
              className="p-1.5 rounded-lg text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-900 cursor-pointer transition-colors"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            <button className="text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white focus:outline-none p-1.5">
              <Menu className="h-6 w-6" />
            </button>
          </div>

        </div>

        {/* Sub-Navigation Row */}
        <div className="flex items-center space-x-6 py-2 border-t border-gray-100 dark:border-slate-800/40 text-xs font-semibold text-gray-500 dark:text-slate-400">
          <div className="relative">
            <button 
              onClick={() => {
                setShowLearningDropdown(!showLearningDropdown);
                setShowTutorialsDropdown(false);
              }} 
              className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer focus:outline-none"
            >
              Start Learning <ChevronDown className="h-3 w-3" />
            </button>
            {showLearningDropdown && (
              <div className="absolute left-0 mt-2 w-40 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg shadow-xl z-50 text-gray-700 dark:text-slate-200">
                <Link to="/courses?category=Web%20%26%20App%20Development" onClick={() => setShowLearningDropdown(false)} className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-t-lg">Programming</Link>
                <Link to="/courses?category=Web%20%26%20App%20Development" onClick={() => setShowLearningDropdown(false)} className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Web Dev</Link>
                <Link to="/courses?category=Data%20Science%20%26%20AI" onClick={() => setShowLearningDropdown(false)} className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-b-lg">Data Science</Link>
              </div>
            )}
          </div>

          <div className="relative">
            <button 
              onClick={() => {
                setShowTutorialsDropdown(!showTutorialsDropdown);
                setShowLearningDropdown(false);
              }} 
              className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer focus:outline-none"
            >
              Tutorials <ChevronDown className="h-3 w-3" />
            </button>
            {showTutorialsDropdown && (
              <div className="absolute left-0 mt-2 w-40 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg shadow-xl z-50 text-gray-700 dark:text-slate-200">
                <Link to="/tutorials?search=React" onClick={() => setShowTutorialsDropdown(false)} className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-t-lg">React JS</Link>
                <Link to="/tutorials?search=Node" onClick={() => setShowTutorialsDropdown(false)} className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Node JS</Link>
                <Link to="/tutorials?search=Python" onClick={() => setShowTutorialsDropdown(false)} className="block px-4 py-2 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-b-lg">Python</Link>
              </div>
            )}
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
