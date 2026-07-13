import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Shield, 
  CheckCircle2, 
  AlertCircle, 
  Edit, 
  BookOpen, 
  Calendar, 
  Phone, 
  Trophy, 
  Smile, 
  Sparkles,
  Camera,
  Activity,
  Heart
} from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { useEnrollmentsQuery } from '../features/enrollments/hooks/useEnrollmentsQuery';
import api from '../config/axios';

const Profile = () => {
  const { user, loading, updateUserLocal } = useContext(AuthContext);
  const { data: enrollments = [] } = useEnrollmentsQuery();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    phone: '',
    age: '',
    gender: ''
  });

  // Helper to extract phone prefix from dummy email if user.phone is not populated
  const getDisplayPhone = (u) => {
    if (u?.phone) return u.phone;
    if (u?.email && u.email.endsWith('@skillcraft.com')) {
      const prefix = u.email.split('@')[0];
      if (/^[0-9]+$/.test(prefix)) {
        return prefix;
      }
    }
    return '';
  };

  useEffect(() => {
    // Redirect if user logs out
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.name ? user.name.split(' ')[0] : '',
        lastName: user.name ? user.name.split(' ').slice(1).join(' ') : '',
        bio: user.bio || '',
        phone: getDisplayPhone(user),
        age: user.age || '',
        gender: user.gender || ''
      });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-[#070b13]">
        <div className="h-10 w-10 border-4 border-primary-500 border-t-transparent animate-spin rounded-full"></div>
        <p className="mt-4 text-xs font-bold font-mono tracking-widest text-slate-500 uppercase">LOADING IDENTITY PORTS...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Stats calculation
  const validEnrollments = enrollments.filter(e => e.course);
  const completedCourses = validEnrollments.filter(e => e.progressPercent === 100).length;
  const activeCourses = validEnrollments.length - completedCourses;

  // Get user initials (e.g., "John Doe" -> "JD")
  const getInitials = (name = '') => {
    return name
      .split(' ')
      .filter(Boolean)
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleReset = () => {
    if (user) {
      setFormData({
        firstName: user.name ? user.name.split(' ')[0] : '',
        lastName: user.name ? user.name.split(' ').slice(1).join(' ') : '',
        bio: user.bio || '',
        phone: getDisplayPhone(user),
        age: user.age || '',
        gender: user.gender || ''
      });
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileData = new FormData();
    fileData.append('image', file);

    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await api.post('/uploads/avatar', fileData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data?.success) {
        const avatarUrl = response.data.url;
        await api.put('/auth/update', { profileImage: avatarUrl });
        updateUserLocal({ profileImage: avatarUrl });
        setSuccessMessage('Profile photo updated successfully!');
        setTimeout(() => setSuccessMessage(''), 5000);
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to upload photo. Please try again.');
    }
  };

  const handleRemoveAvatar = async () => {
    if (window.confirm('Are you sure you want to remove your profile photo?')) {
      setSuccessMessage('');
      setErrorMessage('');
      try {
        await api.put('/auth/update', { profileImage: 'default.jpg' });
        updateUserLocal({ profileImage: 'default.jpg' });
        setSuccessMessage('Profile photo removed.');
        setTimeout(() => setSuccessMessage(''), 5000);
      } catch (err) {
        setErrorMessage('Failed to remove photo. Please try again.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const response = await api.put('/auth/update', {
        name: fullName,
        bio: formData.bio,
        age: formData.age ? Number(formData.age) : null,
        gender: formData.gender || null
      });

      if (response.data?.success) {
        updateUserLocal({ 
          name: fullName, 
          bio: formData.bio,
          age: formData.age ? Number(formData.age) : null,
          gender: formData.gender || null
        });
        setSuccessMessage('Profile information updated successfully!');
        setIsEditing(false);
        setTimeout(() => setSuccessMessage(''), 5000);
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-[#070b13] text-gray-900 dark:text-slate-100 min-h-screen py-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Glowing Header Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-805/70 shadow-lg mb-10 p-6 md:p-8 bg-gradient-to-r from-primary-500/10 via-indigo-500/5 to-transparent dark:from-primary-950/20 dark:via-indigo-950/10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-35"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#f26e56]/20 bg-[#f26e56]/10 text-[#f26e56] text-[10px] font-extrabold uppercase tracking-widest mb-3">
                <Sparkles className="h-3.5 w-3.5" /> Dashboard Hub
              </span>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
                Welcome back, {user?.name.split(' ')[0]}!
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">
                Manage your credentials, academic settings, and learning profile card.
              </p>
            </div>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm text-xs font-extrabold tracking-wide uppercase transition-all hover:scale-105 active:scale-95 cursor-pointer text-primary-500"
              >
                <Edit className="h-4 w-4" /> Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Premium Bio & Stats Widget (33% Width) */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-805/70 shadow-lg p-6 relative overflow-hidden transition-all duration-300 hover:shadow-xl group/card">
            
            {/* Header BG Accent */}
            <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-r from-primary-500 to-indigo-650 opacity-90 dark:opacity-40"></div>

            {/* Profile Avatar & Initials with dynamic glowing ring */}
            <div className="relative flex flex-col items-center mt-10 mb-4 z-10">
              <div className="relative p-1 rounded-full bg-gradient-to-tr from-primary-500 to-indigo-500 animate-pulse duration-300 shadow-md">
                {user?.profileImage && user.profileImage !== 'default.jpg' ? (
                  <img 
                    src={user.profileImage} 
                    alt={user.name} 
                    className="h-28 w-28 rounded-full object-cover border-4 border-white dark:border-slate-900 shadow-sm"
                  />
                ) : (
                  <div className="h-28 w-28 rounded-full bg-gradient-to-tr from-slate-100 to-slate-205 dark:from-slate-800 dark:to-slate-850 border-4 border-white dark:border-slate-900 shadow-sm flex items-center justify-center text-3xl font-extrabold text-primary-600 dark:text-primary-400 uppercase">
                    {getInitials(user?.name)}
                  </div>
                )}
                <label className="absolute bottom-1 right-1 h-8 w-8 bg-primary-600 hover:bg-primary-500 text-white rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 shadow cursor-pointer transition-transform hover:scale-110 active:scale-90">
                  <Camera className="h-4 w-4" />
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                </label>
              </div>
              
              {user?.profileImage && user.profileImage !== 'default.jpg' && (
                <button 
                  onClick={handleRemoveAvatar}
                  className="mt-3.5 text-[10px] font-extrabold text-red-500 dark:text-red-400 uppercase tracking-widest hover:underline cursor-pointer"
                >
                  Remove Photo
                </button>
              )}
            </div>

            {/* User Metadata */}
            <div className="text-center mb-6 relative z-10">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">{user?.name}</h2>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#f26e56] bg-[#f26e56]/10 px-3 py-1 rounded-full inline-block mt-2 border border-[#f26e56]/10">
                {user?.role === 'student' ? 'Learner / Student' : user?.role} Account
              </span>
            </div>

            {/* User Statistics Grid (Highly visual glass cards) */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100 dark:border-slate-805/65">
              <div className="bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/30 p-4 rounded-2xl text-center shadow-sm relative group hover:scale-[1.03] transition-all">
                <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-emerald-500"></div>
                <Trophy className="h-5 w-5 text-emerald-600 dark:text-emerald-450 mx-auto mb-1.5" />
                <span className="block text-2xl font-black text-slate-900 dark:text-white">{completedCourses}</span>
                <span className="text-[9px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mt-0.5">Completed</span>
              </div>
              <div className="bg-blue-50/40 dark:bg-blue-950/10 border border-blue-100 dark:border-blue-900/30 p-4 rounded-2xl text-center shadow-sm relative group hover:scale-[1.03] transition-all">
                <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-500 animate-ping"></div>
                <Activity className="h-5 w-5 text-blue-600 dark:text-blue-450 mx-auto mb-1.5" />
                <span className="block text-2xl font-black text-slate-900 dark:text-white">{activeCourses}</span>
                <span className="text-[9px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mt-0.5">In Progress</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: User Profile Details (67% Width) */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-805/70 shadow-lg p-6 md:p-8 relative">
            
            {/* Form & details Alert banners */}
            {successMessage && (
              <div className="mb-6 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 text-green-605 dark:text-green-450 px-4 py-3.5 rounded-2xl text-sm flex items-center gap-2 font-medium">
                <CheckCircle2 className="h-4.5 w-4.5 text-green-500" />
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="mb-6 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 text-red-650 dark:text-red-400 px-4 py-3.5 rounded-2xl text-sm flex items-center gap-2 font-medium">
                <AlertCircle className="h-4.5 w-4.5 text-red-500" />
                {errorMessage}
              </div>
            )}

            {!isEditing ? (
              /* PREMIUM CREATIVE READ-ONLY VIEW */
              <div className="space-y-6">
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-805/65">
                  <h3 className="text-lg font-extrabold text-slate-905 dark:text-white uppercase tracking-wider">Account Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="bg-slate-50/50 dark:bg-[#0b1222]/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-950/50 transition-colors shadow-sm">
                    <span className="block text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">First Name</span>
                    <span className="text-base font-extrabold text-slate-900 dark:text-white">{formData.firstName || '—'}</span>
                  </div>
                  {/* Last Name */}
                  <div className="bg-slate-50/50 dark:bg-[#0b1222]/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-950/50 transition-colors shadow-sm">
                    <span className="block text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Last Name</span>
                    <span className="text-base font-extrabold text-slate-900 dark:text-white">{formData.lastName || '—'}</span>
                  </div>
                </div>

                {/* Mobile/Email identifier */}
                <div className="bg-slate-50/50 dark:bg-[#0b1222]/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-950/50 transition-colors shadow-sm">
                  <span className="block text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                    {getDisplayPhone(user) ? 'Registered Mobile Number' : 'Email Address'}
                  </span>
                  <span className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                    {getDisplayPhone(user) ? (
                      <>
                        <Phone className="h-4.5 w-4.5 text-[#f26e56]" />
                        {getDisplayPhone(user)}
                      </>
                    ) : (
                      <>
                        <Mail className="h-4.5 w-4.5 text-[#f26e56]" />
                        {user?.email || '—'}
                      </>
                    )}
                  </span>
                </div>

                {/* Age & Gender Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Age */}
                  <div className="bg-slate-50/50 dark:bg-[#0b1222]/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-950/50 transition-colors shadow-sm">
                    <span className="block text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Age</span>
                    <span className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                      <Calendar className="h-4.5 w-4.5 text-primary-500" />
                      {formData.age ? `${formData.age} Years` : 'Not specified'}
                    </span>
                  </div>
                  {/* Gender */}
                  <div className="bg-slate-50/50 dark:bg-[#0b1222]/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-950/50 transition-colors shadow-sm">
                    <span className="block text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">Gender</span>
                    <span className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                      <Smile className="h-4.5 w-4.5 text-primary-500" />
                      {formData.gender || 'Not specified'}
                    </span>
                  </div>
                </div>

                {/* Bio Block with quote styling */}
                <div className="bg-slate-50/55 dark:bg-[#0b1222]/30 p-5 rounded-2xl border border-slate-105 dark:border-slate-800/80 relative overflow-hidden group shadow-sm">
                  <div className="absolute -bottom-6 -right-6 text-slate-100 dark:text-slate-800/25 opacity-70 group-hover:scale-110 transition-transform select-none pointer-events-none">
                    <Sparkles className="h-24 w-24" />
                  </div>
                  <span className="block text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2 relative z-10">Bio / About Me</span>
                  <p className="text-sm text-slate-700 dark:text-slate-350 leading-relaxed font-semibold italic relative z-10 whitespace-pre-line">
                    "{formData.bio || 'Write a few words about your learning goals and professional timeline.'}"
                  </p>
                </div>

              </div>
            ) : (
              /* PREMIUM CREATIVE EDIT MODE FORM */
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-805/65">
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Edit Credentials</h3>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Settings Form</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name Input */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase mb-1.5">First Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.firstName} 
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="block w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-955 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm font-semibold shadow-sm" 
                    />
                  </div>
                  {/* Last Name Input */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase mb-1.5">Last Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.lastName} 
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="block w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-955 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm font-semibold shadow-sm" 
                    />
                  </div>
                </div>

                {/* Age & Gender select block side by side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Age */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase mb-1.5">Age</label>
                    <input 
                      type="number" 
                      min={1} 
                      max={120}
                      value={formData.age} 
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="block w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-955 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm font-semibold shadow-sm" 
                    />
                  </div>
                  {/* Gender Select dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase mb-1.5">Gender</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="block w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-955 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm font-semibold shadow-sm"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                {/* Disabled Mobile Number */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase mb-1.5">
                    {getDisplayPhone(user) ? 'Mobile Number' : 'Email Address'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      {getDisplayPhone(user) ? (
                        <Phone className="h-4.5 w-4.5 text-slate-400 dark:text-slate-500" />
                      ) : (
                        <Mail className="h-4.5 w-4.5 text-slate-400 dark:text-slate-500" />
                      )}
                    </div>
                    <input 
                      type="text" 
                      value={getDisplayPhone(user) || user?.email || ''} 
                      disabled
                      className="block w-full pl-11 pr-4 py-2.5 border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950/40 rounded-xl text-slate-450 dark:text-slate-500 text-sm cursor-not-allowed font-semibold shadow-sm" 
                    />
                  </div>
                  <p className="mt-1 text-[10px] text-gray-400 dark:text-slate-550">
                    {getDisplayPhone(user) 
                      ? 'Contact support to change your mobile number.' 
                      : 'Email registration accounts are read-only. Contact support to change.'}
                  </p>
                </div>

                {/* Bio text field */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300 uppercase mb-1.5">Bio</label>
                  <textarea 
                    rows={4} 
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="block w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-955 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all text-sm font-semibold shadow-sm" 
                    placeholder="Write a brief intro..."
                  ></textarea>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3.5 pt-6 border-t border-slate-100 dark:border-slate-805/65">
                  <button 
                    type="button" 
                    onClick={() => {
                      handleReset();
                      setIsEditing(false);
                    }}
                    className="px-5 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-extrabold uppercase tracking-wide text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors shadow-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-5 py-2.5 bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-500 hover:to-blue-500 border border-transparent rounded-xl shadow-md text-xs font-extrabold uppercase tracking-wide text-white cursor-pointer hover:scale-105 active:scale-95 transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;
