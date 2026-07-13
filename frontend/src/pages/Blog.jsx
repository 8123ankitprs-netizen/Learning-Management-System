import React, { useState } from 'react';
import { Clock, ArrowRight, User, Search, Sparkles, Heart, Share2, X, Eye, ThumbsUp, Calendar } from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedPosts, setLikedPosts] = useState({});
  const [likesCount, setLikesCount] = useState({
    1: 42,
    2: 128,
    3: 84,
    100: 245 // Featured post
  });
  const [activePost, setActivePost] = useState(null);

  const featuredPost = {
    id: 100,
    title: 'How to Build a Modern SaaS Stack in 2026',
    excerpt: 'Building a startup MVP doesn\'t have to be slow. We look at the top backend frameworks, serverless databases, edge compute options, and design libraries to launch your next project in days rather than months.',
    content: `Building a modern Software-as-a-Service (SaaS) product in 2026 is faster and more exciting than ever. The developer ecosystem has converged on high-performance frameworks, edge networks, and serverless infrastructure that scale effortlessly.

Key Technology Pillars for 2026:
1. Framework: Next.js 16 or Vite + React 19 for seamless server/client transitions.
2. Database: PostgreSQL with Prisma ORM, utilizing serverless connection pools like Neon or Supabase.
3. Auth: NextAuth or Clerk for secure session handling and passwordless social integration.
4. Deployment: Vercel or Netlify deploying to edge nodes globally for sub-millisecond response times.

In this comprehensive guide, we map out the blueprint to assemble these pieces, configure CI/CD delivery pipelines, and construct a robust payment gateway integration using Stripe.`,
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop',
    category: 'SaaS Stack',
    date: 'July 5, 2026',
    readTime: '10 min read',
    author: 'Feyaz Kumar'
  };

  const posts = [
    {
      id: 1,
      title: 'Mastering React 19: What Developers Need to Know',
      excerpt: 'React 19 introduces major updates including Server Components, Actions API, and the new React Compiler. Let\'s explore how these changes improve performance.',
      content: `React 19 is officially here, and it brings a wave of game-changing features that redefine how we build modern web applications. At the top of the list is the React Compiler (formerly React Forget), which automatically memoizes your components and hooks, eliminating the need for manual useMemo and useCallback optimization.

Additionally, the introduction of Server Components allows components to render on the server, drastically reducing the JavaScript bundle size sent to the client. The new Actions API simplifies form submissions and asynchronous operations, handling pending states, error boundaries, and optimistic updates automatically.

In this deep dive, we will walk you through setting up a React 19 project from scratch, using the new use() hook to handle promises and context, and adapting your state patterns to take full advantage of these compiler updates.`,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop',
      category: 'Web Development',
      date: 'July 2, 2026',
      readTime: '6 min read',
      author: 'Ankit Prasad'
    },
    {
      id: 2,
      title: 'The Rise of Agentic AI in Modern Software Engineering',
      excerpt: 'How AI coding assistants and autonomous workflows are revolutionizing the way junior and senior engineers build production codebases.',
      content: `Agentic AI agents are no longer just completion scripts inside the IDE. In 2026, autonomous software agents plan features, fix linting bugs, write and execute unit tests, and resolve security issues concurrently.

Understanding this shift is vital for all software engineers:
- AI acts as an accelerator, automating repetitive scaffolding tasks.
- Developer focus shifts to system design, review, and verification.
- Team dynamics change as agents handle tier-1 bug backlogs.

We will analyze the main frameworks powering agentic AI, prompt chains, and how to write tools that allow agents to operate safely and effectively inside code repositories.`,
      image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=800&auto=format&fit=crop',
      category: 'Artificial Intelligence',
      date: 'June 28, 2026',
      readTime: '8 min read',
      author: 'Himanshu Kumar'
    },
    {
      id: 3,
      title: 'A Guide to Secure JWT Authentication in Express.js',
      excerpt: 'Best practices for storing access tokens, setting up secure cookies, handling refresh token rotation, and preventing cross-site scripting vulnerabilities.',
      content: `Security is paramount when configuring authorization states for your APIs. While JWTs are ubiquitous, storing them insecurely leaves your application vulnerable to XSS and CSRF exploits.

This guide provides the absolute best practices:
1. Never store access tokens in localStorage. Keep them in memory.
2. Send Refresh Tokens inside HttpOnly, Secure, and SameSite=Strict cookies.
3. Implement short expiry times for Access Tokens (e.g., 15 minutes).
4. Rotate Refresh Tokens on every token exchange request.

We will provide express middleware templates to structure token verification, set secure cookies, and handle automatic refresh cycles when client sessions expire.`,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
      category: 'Cybersecurity',
      date: 'June 15, 2026',
      readTime: '5 min read',
      author: 'Deepak Shroti'
    }
  ];

  const handleLike = (postId, e) => {
    e.stopPropagation(); // Avoid triggering card click
    const isLiked = likedPosts[postId];
    setLikedPosts((prev) => ({ ...prev, [postId]: !isLiked }));
    setLikesCount((prev) => ({
      ...prev,
      [postId]: isLiked ? prev[postId] - 1 : prev[postId] + 1
    }));
  };

  const handleShare = (post, e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href
      }).catch(() => {});
    } else {
      alert(`Copied link to clipboard: "${post.title}"`);
    }
  };

  const categories = ['All', 'Web Development', 'Artificial Intelligence', 'Cybersecurity', 'SaaS Stack'];

  // Filter posts based on selected category and search string
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 dark:bg-[#070b13] text-slate-900 dark:text-slate-100 min-h-screen py-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Glowing Catalog Header Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-205 dark:border-slate-805/70 shadow-lg mb-10 p-6 md:p-8 bg-gradient-to-r from-primary-500/10 via-purple-500/5 to-transparent dark:from-primary-950/20 dark:via-purple-950/10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-35"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#f26e56]/20 bg-[#f26e56]/5 text-[#f26e56] text-[10px] font-extrabold uppercase tracking-widest mb-3 animate-pulse">
                <Sparkles className="h-3.5 w-3.5" /> SkillCraft Insights
              </span>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-905 dark:text-white leading-none">
                SkillCraft Developer Blog
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
                Insights, tutorials, and deep dives written by our expert faculty.
              </p>
            </div>
            
            {/* Real-time stats indicators */}
            <div className="flex gap-4">
              <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur border border-slate-205 dark:border-slate-800 px-5 py-3 rounded-2xl text-center shadow-sm">
                <span className="block text-xl font-black text-slate-900 dark:text-white">{posts.length + 1}</span>
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-505 uppercase tracking-widest">Articles</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Input and Filters layout */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          {/* Category Pill Filters */}
          <div className="flex flex-wrap gap-2 order-2 md:order-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer border active:scale-95 ${
                  selectedCategory === cat 
                    ? 'bg-primary-50 dark:bg-primary-950/20 text-[#f26e56] border-[#f26e56]' 
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
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
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles by title..."
              className="w-full pl-10 pr-4 py-2.5 border border-slate-205 dark:border-slate-805 rounded-2xl bg-white dark:bg-slate-900 text-sm font-semibold placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Featured Post (Visible only if searching matches or selectedCategory matches SaaS Stack/All) */}
        {(selectedCategory === 'All' || selectedCategory === 'SaaS Stack') && 
         featuredPost.title.toLowerCase().includes(searchTerm.toLowerCase()) && (
          <div 
            onClick={() => setActivePost(featuredPost)}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-805/70 overflow-hidden mb-12 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 grid grid-cols-1 lg:grid-cols-2 cursor-pointer group"
          >
            <div className="h-64 sm:h-80 lg:h-full relative overflow-hidden">
              <img 
                src={featuredPost.image} 
                alt="Featured Post" 
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-[#f26e56] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md">
                Featured Article
              </span>
            </div>
            <div className="p-8 sm:p-10 flex flex-col justify-center">
              <span className="text-[10px] font-black text-primary-505 dark:text-primary-400 uppercase tracking-widest mb-3 block">
                {featuredPost.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-905 dark:text-white mb-4 group-hover:text-primary-500 transition-colors leading-tight">
                {featuredPost.title}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed font-medium">
                {featuredPost.excerpt}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-6 border-t border-slate-100 dark:border-slate-805/65">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#f26e56]/10 text-[#f26e56] flex items-center justify-center font-black text-sm uppercase">
                    {featuredPost.author[0]}
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-800 dark:text-slate-350">Faculty- {featuredPost.author}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">{featuredPost.date}</span>
                  </div>
                </div>
                
                {/* Actions row */}
                <div className="flex items-center gap-3 text-slate-500">
                  <button 
                    onClick={(e) => handleLike(featuredPost.id, e)}
                    className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                      likedPosts[featuredPost.id] 
                        ? 'bg-red-50 dark:bg-red-950/20 text-red-500 border-red-200' 
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${likedPosts[featuredPost.id] ? 'fill-current' : ''}`} />
                    <span>{likesCount[featuredPost.id]}</span>
                  </button>

                  <button 
                    onClick={(e) => handleShare(featuredPost, e)}
                    className="p-2 border border-slate-200 dark:border-slate-800 rounded-full hover:bg-slate-50 dark:hover:bg-slate-850 hover:text-primary-500 transition-colors cursor-pointer"
                    title="Share Article"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article 
              key={post.id} 
              onClick={() => setActivePost(post)}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-805/70 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group cursor-pointer"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-black/60 dark:bg-slate-950/80 backdrop-blur-md text-white border border-white/10 dark:border-slate-800 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                  {post.category}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-[10px] text-slate-400 font-extrabold uppercase mb-3">
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-[#f26e56]" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-[#f26e56]" /> {post.readTime}</span>
                </div>
                <h3 className="text-base font-extrabold text-slate-905 dark:text-white mb-2.5 group-hover:text-primary-505 dark:group-hover:text-primary-400 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs mb-5 leading-relaxed line-clamp-3 font-semibold">
                  {post.excerpt}
                </p>

                {/* Footer metadata & interactivity */}
                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-805/65 flex items-center justify-between gap-3">
                  <span className="font-bold text-xs text-slate-700 dark:text-slate-350 flex items-center gap-1.5">
                    <User className="h-4 w-4 text-primary-505" /> Faculty- {post.author.split(' ')[0]}
                  </span>
                  
                  {/* Hearts action button */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={(e) => handleLike(post.id, e)}
                      className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                        likedPosts[post.id] 
                          ? 'bg-red-50 dark:bg-red-950/20 text-red-500 border-red-200' 
                          : 'bg-slate-50 dark:bg-slate-850 border-slate-100 dark:border-slate-800 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`h-3.5 w-3.5 ${likedPosts[post.id] ? 'fill-current' : ''}`} />
                      <span>{likesCount[post.id]}</span>
                    </button>
                    
                    <button 
                      onClick={(e) => handleShare(post, e)}
                      className="p-1.5 bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-800 hover:text-primary-500 transition-colors cursor-pointer"
                      title="Share Article"
                    >
                      <Share2 className="h-3.5 w-3.5 text-slate-450" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-205 dark:border-slate-805/70 shadow-sm">
            <div className="h-12 w-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-6 w-6 text-slate-400" />
            </div>
            <p className="text-sm font-extrabold text-slate-900 dark:text-white">No articles matched your criteria.</p>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">Try typing another keyword or reset the category filters above.</p>
          </div>
        )}

      </div>

      {/* FULL POST DETAIL INTERACTIVE OVERLAY MODAL */}
      {activePost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative">
            
            {/* Header Sticky Action Bar */}
            <div className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-150 dark:border-slate-805 px-6 py-4 flex items-center justify-between z-20">
              <span className="px-3 py-1 bg-slate-50 dark:bg-slate-850 text-slate-500 dark:text-slate-400 rounded-full text-[9px] font-black uppercase tracking-wider">
                {activePost.category}
              </span>
              <button 
                onClick={() => setActivePost(null)}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer text-slate-400 hover:text-slate-655"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Banner Cover Image */}
            <div className="h-60 sm:h-72 w-full relative">
              <img 
                src={activePost.image} 
                alt={activePost.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-xl sm:text-3xl font-black text-white leading-tight">
                  {activePost.title}
                </h2>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Meta details */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-805/75 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-slate-800 text-primary-600 dark:text-primary-400 flex items-center justify-center font-black uppercase text-sm">
                    {activePost.author[0]}
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-800 dark:text-slate-205">Faculty- {activePost.author}</span>
                    <span className="text-[10px] text-slate-405 font-bold uppercase">{activePost.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-slate-455 text-xs font-bold">
                  <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-[#f26e56]" /> {activePost.readTime}</span>
                  <button 
                    onClick={(e) => handleLike(activePost.id, e)}
                    className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border transition-all cursor-pointer ${
                      likedPosts[activePost.id] 
                        ? 'bg-red-50 dark:bg-red-950/20 text-red-500 border-red-200' 
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${likedPosts[activePost.id] ? 'fill-current' : ''}`} />
                    <span>{likesCount[activePost.id]} likes</span>
                  </button>
                </div>
              </div>

              {/* Core Text body */}
              <p className="text-slate-655 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line font-medium">
                {activePost.content || activePost.excerpt}
              </p>

              {/* Close Button CTA footer */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-805/75 flex justify-end gap-3">
                <button
                  onClick={(e) => handleShare(activePost, e)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-805 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="h-4 w-4" /> Share Article
                </button>
                <button
                  onClick={() => setActivePost(null)}
                  className="px-5 py-2 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow active:scale-95 transition-all"
                >
                  Close Article
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Blog;
