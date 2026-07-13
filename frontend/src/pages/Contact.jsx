import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles, Copy, Check, ChevronDown, HelpCircle, MessageSquare, Bot, User, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCoursesQuery } from '../features/courses/hooks/useCoursesQuery';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // Fetch courses dynamically from TanStack Query
  const { data: courses = [] } = useCoursesQuery();

  // Chatbox State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'ai', text: 'Hi! I am the SkillCraft Assistant. How can I help you today? Please click one of the common issue tags below or type your query!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatOpen]);

  const faqs = [
    { 
      q: 'How long do I get access to course resources?', 
      a: 'You get lifetime access to all course resources, faculty study guides, revision materials, and video lectures!' 
    },
    { 
      q: 'Can I get a refund if I cancel an enrollment?', 
      a: 'Yes, we offer a 100% money-back guarantee within 7 days of enrollment if you are not satisfied.' 
    },
    { 
      q: 'How do I get my certification of completion?', 
      a: 'Once you complete 100% of the course modules, the certificate generation link unlocks automatically on your dashboard.' 
    },
    { 
      q: 'Are the revision guides free to download?', 
      a: 'Yes! All preconfigured study materials and interactive notepad files are completely free for registered students.' 
    }
  ];

  const automatedReplies = [
    {
      keywords: ['otp', 'verification', 'login otp', 'code'],
      response: 'If you are not receiving the OTP, please ensure you enter a valid 10-digit mobile number. Our backend seeds the OTP instantly in the development console logs (e.g., "✉️ OTP for 8595980268: XXXXXX"). If you are checking local logs, please open the backend server terminal console.'
    },
    {
      keywords: ['progress', 'checkbox', 'tick', 'percent', 'save'],
      response: 'To update your course progress instantly, click the lesson checkboxes in the curriculum list. If it does not reflect immediately, reload the page. Our system refetches enrollments dynamically on successful progress mutations.'
    },
    {
      keywords: ['certificate', 'cert', 'download cert', 'claim'],
      response: 'Once your course progress bar reaches 100%, the "Certificate" button will unlock on your Student Dashboard. You can print or download your certificate directly from there. We also added a "Review" link so you can access your course after completion.'
    },
    {
      keywords: ['admin', 'credentials', 'password', 'login'],
      response: 'Administrative console access is strictly restricted to authorized platform personnel. If you are an administrator and require credential recovery or access configurations updates, please coordinate directly with the IT infrastructure lead at [8123ankitprs@gmail.com](mailto:8123ankitprs@gmail.com).'
    },
    {
      keywords: ['corporate', 'team', 'company', 'licenses'],
      response: 'For corporate licensing, team seats packaging, and custom admin console analytics configurations, please contact our business relations team at [8123ankitprs@gmail.com](mailto:8123ankitprs@gmail.com).'
    },
    {
      keywords: ['notes', 'notepad', 'save notes', 'notebook'],
      response: 'You can write and save custom notes inside the Course Player. Click the Notes tab under the lesson video, type your learnings, and click Save. You can view all saved notes in the "My Notes" section in the Navbar.'
    }
  ];

  const quickQuestions = [
    { label: 'Browse Courses List', text: 'Please list all available courses on the platform.' },
    { label: 'OTP Not Received', text: 'I am not receiving the OTP on my mobile number.' },
    { label: 'Checkboxes Not Syncing', text: 'The course curriculum checkboxes are not saving my progress.' },
    { label: 'Certificate Download', text: 'How do I download my course completion certificate?' },
    { label: 'Corporate Team Licensing', text: 'How can my company request custom corporate licenses?' }
  ];

  const parseMarkdownLinks = (text) => {
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      const linkText = match[1];
      const linkUrl = match[2];

      if (linkUrl.startsWith('http') || linkUrl.startsWith('mailto:')) {
        parts.push(
          <a 
            key={match.index} 
            href={linkUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[#f26e56] dark:text-[#f26e56] hover:underline font-bold"
          >
            {linkText}
          </a>
        );
      } else {
        parts.push(
          <Link 
            key={match.index} 
            to={linkUrl} 
            className="text-[#f26e56] dark:text-[#f26e56] hover:underline font-bold"
          >
            {linkText}
          </Link>
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  const handleSendMessage = (messageText) => {
    if (!messageText.trim()) return;

    // User message
    const newMessages = [...chatMessages, { sender: 'user', text: messageText }];
    setChatMessages(newMessages);
    setChatInput('');

    // AI automated reply lookup
    setTimeout(() => {
      const normalizedText = messageText.toLowerCase();
      let matchedReply = null;

      // 1. Dynamic Course Matches!
      const isCourseQuery = ['course', 'courses', 'program', 'programs', 'list', 'catalog', 'syllabus', 'classes'].some(k => normalizedText.includes(k));
      
      let specificCourse = null;
      if (courses.length > 0) {
        specificCourse = courses.find(c => 
          normalizedText.includes(c.title.toLowerCase()) || 
          c.title.toLowerCase().split(' ').some(word => word.length > 3 && normalizedText.includes(word))
        );
      }

      if (specificCourse) {
        matchedReply = `📚 Course Details: **${specificCourse.title}**\n\n` +
          `• **Description:** ${specificCourse.description}\n` +
          `• **Duration:** ${specificCourse.hours} hours of learning\n` +
          `• **Price:** ₹${specificCourse.price.toLocaleString('en-IN')}\n\n` +
          `👉 **Enrollment Link:** [Enroll/Access Course](/course/${specificCourse._id || specificCourse.id})`;
      } else if (isCourseQuery && courses.length > 0) {
        matchedReply = `We currently offer the following professional programs:\n\n` +
          courses.map(c => `• **${c.title}** (₹${c.price.toLocaleString('en-IN')})\n  👉 [Enroll/View Details](/course/${c._id || c.id})`).join('\n\n') +
          `\n\nClick any link to proceed directly to the enrollment page!`;
      }

      // 2. Fallback to standard automated replies
      if (!matchedReply) {
        for (const reply of automatedReplies) {
          if (reply.keywords.some(keyword => normalizedText.includes(keyword))) {
            matchedReply = reply.response;
            break;
          }
        }
      }

      // 3. Final generic fallback
      if (!matchedReply) {
        matchedReply = `Thank you for your query! I have registered your support ticket under ID #SC-${Math.floor(1000 + Math.random() * 9000)}. Our support team will respond to your registered profile details shortly. You can also email us directly at [8123ankitprs@gmail.com](mailto:8123ankitprs@gmail.com).`;
      }

      setChatMessages(prev => [...prev, { sender: 'ai', text: matchedReply }]);
    }, 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', phone: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('support@skillcraft.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="bg-slate-50 dark:bg-[#070b13] text-slate-900 dark:text-slate-100 min-h-screen py-10 transition-colors duration-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Glowing Page Header Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800/70 shadow-lg mb-10 p-6 md:p-8 bg-gradient-to-r from-primary-500/10 via-purple-500/5 to-transparent dark:from-primary-950/20 dark:via-purple-950/10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-35"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#f26e56]/20 bg-[#f26e56]/5 text-[#f26e56] text-[10px] font-extrabold uppercase tracking-widest mb-3 animate-pulse">
                <Sparkles className="h-3.5 w-3.5" /> Support Center
              </span>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
                Get In Touch With SkillCraft
              </h1>
              <p className="text-sm text-slate-550 dark:text-slate-400 mt-2 font-medium">
                Have questions about courses, certifications, or custom team plans? We respond within 24 hours.
              </p>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur border border-slate-200 dark:border-slate-805 px-5 py-3 rounded-2xl text-center shadow-sm">
                <span className="block text-xl font-black text-slate-900 dark:text-white">24/7</span>
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Support Response</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDE: CREATIVE CHANNELS & FAQ ACCORDION (Lg-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-[#f26e56]" /> Contact Channels
            </h2>
            
            {/* Quick Contact Cards Grid */}
            <div className="grid grid-cols-1 gap-4">
              
              {/* Email Support Card */}
              <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4 hover:shadow-md transition-shadow group">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-primary-50 dark:bg-slate-950 flex items-center justify-center text-[#f26e56] border border-slate-100 dark:border-slate-800 group-hover:scale-105 transition-transform">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">Email Support</h4>
                    <p className="text-xs text-slate-550 dark:text-slate-400 mt-1 font-semibold">support@skillcraft.com</p>
                  </div>
                </div>
                <button 
                  onClick={copyEmailToClipboard}
                  className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-55 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-400 hover:text-slate-700"
                  title="Copy Email"
                >
                  {copiedEmail ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              {/* Call Support Card */}
              <a 
                href="tel:+919876543210"
                className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow group cursor-pointer"
              >
                <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-slate-950 flex items-center justify-center text-blue-500 border border-slate-100 dark:border-slate-800 group-hover:scale-105 transition-transform">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">Call Us directly</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">+91 98765 43210</p>
                </div>
              </a>

              {/* HQ Address Card */}
              <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow group">
                <div className="w-11 h-11 rounded-2xl bg-purple-50 dark:bg-slate-950 flex items-center justify-center text-purple-600 border border-slate-100 dark:border-slate-800 group-hover:scale-105 transition-transform">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">Headquarters</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">IT Tech Hub, Sector 62, Noida, UP - 201301</p>
                </div>
              </div>

            </div>

            {/* Interactive FAQs Accordion */}
            <div className="space-y-4 pt-4">
              <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-[#f26e56]" /> Quick Answers (FAQ)
              </h2>

              <div className="space-y-2.5">
                {faqs.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div 
                      key={idx} 
                      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-all"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full px-5 py-4 flex items-center justify-between text-left font-extrabold text-xs uppercase tracking-wider text-slate-805 dark:text-slate-200 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-805 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#f26e56]' : ''}`} />
                      </button>
                      <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-40 border-t border-slate-100 dark:border-slate-800' : 'max-h-0'}`}>
                        <p className="px-5 py-4 text-xs leading-relaxed text-slate-500 dark:text-slate-400 font-semibold bg-slate-50/50 dark:bg-slate-900/50">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: INTERACTIVE CONTACT MESSAGE FORM (Lg-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            
            <h2 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Send className="h-5 w-5 text-[#f26e56]" /> Send a Message
            </h2>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-md">
              
              {submitted && (
                <div className="mb-6 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/60 p-5 rounded-2xl flex items-start gap-3.5 animate-fadeIn">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-green-900 dark:text-green-400 text-sm uppercase tracking-wide">Message Sent Successfully!</h4>
                    <p className="text-xs text-green-700 dark:text-green-455 mt-1.5 leading-relaxed font-semibold">
                      Thank you for contacting SkillCraft. One of our support executives will call or message you back within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1.5 uppercase">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="block w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-955 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm font-semibold shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1.5 uppercase">Mobile Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Phone className="h-4.5 w-4.5 text-slate-400" />
                    </div>
                    <input 
                      type="tel" 
                      required
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/[^0-9]/g, '') })}
                      placeholder="Enter your 10-digit mobile number"
                      className="block w-full pl-10 pr-4 py-2.5 border border-slate-205 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-955 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm font-semibold shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 mb-1.5 uppercase">Message</label>
                  <textarea 
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe how we can support you (course queries, corporate packages, certifications)..."
                    className="block w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-955 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm font-semibold shadow-sm resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 text-white font-extrabold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow active:scale-95 transition-all"
                >
                  <Send className="h-4 w-4" /> Send Message
                </button>
              </form>
            </div>
            
            {/* Fine print block */}
            <div className="text-center pt-2">
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">
                © 2026 SkillCraft Academy & Techno Innovations. All rights reserved.
              </p>
            </div>
          </div>

        </div>

        {/* --- FLOATING AI CHATBOX FLOATER ELEMENTS --- */}

        {/* Floating Chat Trigger Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-tr from-purple-600 to-primary-600 hover:from-purple-550 hover:to-primary-550 text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20 hover:rotate-12"
          title="Chat with AI Support"
        >
          {isChatOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6 animate-pulse" />}
        </button>

        {/* Floating Chat Box Window */}
        {isChatOpen && (
          <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-fade-in-up flex flex-col max-h-[500px]">
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-purple-600 to-primary-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xs uppercase tracking-wide leading-tight">SkillCraft Support AI</h3>
                  <span className="text-[9px] text-green-300 font-bold tracking-widest uppercase flex items-center gap-1 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-450 animate-pulse"></span>
                    Instant Assistant
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Messages Logs */}
            <div className="p-4 flex-1 overflow-y-auto bg-slate-50/50 dark:bg-[#080d1a]/20 space-y-4 text-xs leading-relaxed max-h-[260px] scrollbar-thin">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                  <div className={`h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    msg.sender === 'user' ? 'bg-primary-500 text-white' : 'bg-purple-100 dark:bg-purple-900/40 text-purple-650 dark:text-purple-400 border border-purple-200 dark:border-purple-500/20'
                  }`}>
                    {msg.sender === 'user' ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                  </div>
                  <div className={`p-3 rounded-2xl whitespace-pre-wrap font-semibold shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-primary-600 text-white rounded-tr-none' 
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
                  }`}>
                    {parseMarkdownLinks(msg.text)}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Tags Options */}
            <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-850 bg-slate-50/20 overflow-x-auto">
              <span className="block text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Query Suggestion tags:</span>
              <div className="flex gap-2 pb-1 overflow-x-auto no-scrollbar scroll-smooth">
                {quickQuestions.map((qq, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(qq.text)}
                    className="px-2.5 py-1.5 bg-white hover:bg-slate-55 dark:bg-slate-850 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg text-[9px] font-bold text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-500/30 transition-all cursor-pointer shadow-sm flex-shrink-0"
                  >
                    {qq.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input form */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(chatInput);
              }}
              className="p-3 border-t border-slate-200 dark:border-slate-800 flex gap-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask me about OTP, courses list..."
                className="flex-1 px-3 py-2 border border-slate-205 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:border-primary-500 text-xs font-semibold"
              />
              <button
                type="submit"
                className="px-3.5 py-2 bg-gradient-to-tr from-purple-650 to-primary-650 hover:from-purple-600 hover:to-primary-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center cursor-pointer shadow active:scale-[0.98] transition-all"
              >
                Send
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default Contact;
