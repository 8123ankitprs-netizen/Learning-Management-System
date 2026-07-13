import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Play, 
  CheckCircle, 
  Clock, 
  Award, 
  MonitorPlay, 
  Share2, 
  Sparkles,
  BookOpen,
  ArrowLeft,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useCourseDetailsQuery } from '../features/courses/hooks/useCoursesQuery';
import { useEnrollMutation, useEnrollmentsQuery, useProgressQuery, useUpdateProgressMutation, useCancelEnrollmentMutation } from '../features/enrollments/hooks/useEnrollmentsQuery';
import { AuthContext } from '../context/AuthContext';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enrollError, setEnrollError] = useState('');
  const { user } = useContext(AuthContext);

  // Fetch course details from backend
  const { data: course, isLoading, isError } = useCourseDetailsQuery(id);
  
  // Fetch user's enrollments to check if already enrolled
  const { data: enrollments = [], refetch: refetchEnrollments } = useEnrollmentsQuery();
  const enrollment = enrollments.find(e => e.course?._id === id || e.course?.id === id);
  const isEnrolled = !!enrollment;

  // Fetch lesson progress if enrolled
  const { data: progressData, refetch: refetchProgress } = useProgressQuery(enrollment?._id);
  const completedLessons = progressData?.completedLessons || [];

  // Mutations
  const enrollMutation = useEnrollMutation();
  const updateProgressMutation = useUpdateProgressMutation();
  const cancelMutation = useCancelEnrollmentMutation();

  const handleEnroll = async () => {
    setEnrollError('');
    try {
      await enrollMutation.mutateAsync(id);
      refetchEnrollments();
    } catch (err) {
      setEnrollError(err.response?.data?.message || 'Enrollment failed. Please try again.');
    }
  };

  const handleCancelEnrollment = async (enrollmentId) => {
    if (window.confirm('Are you sure you want to cancel your enrollment? This will delete all your progress for this course.')) {
      try {
        await cancelMutation.mutateAsync(enrollmentId);
      } catch (err) {
        alert('Failed to cancel enrollment. Please try again.');
      }
    }
  };

  const handleToggleProgress = (lessonId, isCurrentlyCompleted) => {
    if (!isEnrolled) {
      alert('Please enroll in this course to save and trace your progress!');
      return;
    }
    updateProgressMutation.mutate({
      enrollmentId: enrollment._id,
      lessonId,
      isCompleted: !isCurrentlyCompleted,
      watchedDuration: 0
    }, {
      onSuccess: () => {
        refetchProgress();
        refetchEnrollments();
      }
    });
  };

  const handlePrintCertificate = () => {
    const printWindow = window.open('', '_blank', 'width=1000,height=700');
    if (!printWindow) {
      alert('Pop-up blocker is enabled! Please allow pop-ups to download your certificate.');
      return;
    }
    printWindow.document.write(`
      <html>
        <head>
          <title>Certificate of Completion - ${course.title}</title>
          <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Montserrat:wght@450;600&display=swap" rel="stylesheet">
          <style>
            body {
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              background: #f7f7f7;
              font-family: 'Montserrat', sans-serif;
            }
            .certificate-card {
              width: 850px;
              height: 580px;
              padding: 40px;
              text-align: center;
              border: 20px solid #d4af37;
              background: white;
              position: relative;
              box-sizing: border-box;
              box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            .certificate-card::before {
              content: '';
              position: absolute;
              top: 10px;
              left: 10px;
              right: 10px;
              bottom: 10px;
              border: 2px solid #d4af37;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              color: #1e293b;
              margin-bottom: 20px;
            }
            .title {
              font-family: 'Cinzel', serif;
              font-size: 38px;
              color: #d4af37;
              margin-top: 10px;
              margin-bottom: 5px;
            }
            .subtitle {
              font-size: 16px;
              text-transform: uppercase;
              letter-spacing: 2px;
              color: #64748b;
              margin-bottom: 30px;
            }
            .presented-to {
              font-size: 14px;
              font-style: italic;
              color: #64748b;
              margin-bottom: 10px;
            }
            .name {
              font-size: 32px;
              font-weight: 600;
              color: #0f172a;
              border-bottom: 2px solid #e2e8f0;
              display: inline-block;
              padding-bottom: 5px;
              margin-bottom: 20px;
              min-width: 300px;
            }
            .reason {
              font-size: 15px;
              color: #64748b;
              line-height: 1.6;
              margin-bottom: 40px;
              padding: 0 40px;
            }
            .course-title {
              font-weight: bold;
              color: #0f172a;
            }
            .footer-info {
              display: flex;
              justify-content: space-between;
              margin-top: 50px;
              padding: 0 60px;
            }
            .signature-block {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .signature-line {
              width: 180px;
              border-top: 1px solid #94a3b8;
              margin-top: 10px;
              padding-top: 5px;
              font-size: 12px;
              color: #64748b;
            }
            .signature-hand {
              font-family: 'Cinzel', serif;
              font-size: 18px;
              font-style: italic;
              color: #0f172a;
            }
          </style>
        </head>
        <body>
          <div class="certificate-card">
            <div class="logo">⭐ SKILLCRAFT</div>
            <div class="title">Certificate of Completion</div>
            <div class="subtitle">This is proudly presented to</div>
            <div class="presented-to">Presented To</div>
            <div class="name">${user?.name || 'Valued Learner'}</div>
            <div class="reason">
              for successfully completing the course <span class="course-title">"${course.title}"</span><br/>
              demonstrating commitment, excellence, and mastery of all required curriculum modules and practical tasks.
            </div>
            <div class="footer-info">
              <div class="signature-block">
                <div class="signature-hand">${course.instructor?.name || 'Instructor'}</div>
                <div class="signature-line">Course Instructor</div>
              </div>
              <div class="signature-block">
                <div class="signature-hand">SkillCraft Director</div>
                <div class="signature-line">Authorized Signatory</div>
              </div>
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const formatDuration = (seconds = 0) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')} mins`;
  };

  // Calculate total course lectures and duration dynamically
  const totalLectures = course?.modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 0;
  const totalSeconds = course?.modules?.reduce((acc, m) => {
    return acc + (m.lessons?.reduce((a, l) => a + (l.durationInSeconds || l.duration || 0), 0) || 0);
  }, 0) || 0;

  const formatTotalDuration = (sec) => {
    const hrs = Math.floor(sec / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    if (hrs > 0) return `${hrs}hr ${mins}min`;
    return `${mins}min`;
  };

  const completedPercent = totalLectures > 0 ? Math.round((completedLessons.length / totalLectures) * 100) : 0;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-[#070b13]">
        <div className="h-10 w-10 border-4 border-primary-500 border-t-transparent animate-spin rounded-full"></div>
        <p className="mt-4 text-xs font-bold font-mono tracking-widest text-slate-500 uppercase">FETCHING COURSE SPECIFICATIONS...</p>
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-[#070b13] text-red-500">
        <AlertCircle className="h-12 w-12 mb-4" />
        <p className="text-sm font-bold">Failed to load course details. Check your backend status.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-[#070b13] text-gray-900 dark:text-slate-100 min-h-screen transition-colors duration-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation back triggers */}
        <button 
          onClick={() => navigate('/courses')}
          className="inline-flex items-center gap-2 text-xs font-extrabold tracking-wider uppercase text-slate-500 hover:text-primary-500 transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Catalog
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Hero Details, Cert Banner, Curriculum Index (2/3 Width) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Main Header Glass Panel */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-805/70 p-6 md:p-8 shadow-md relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(242,110,86,0.06),transparent_60%)]"></div>
              
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary-250 dark:border-primary-900/40 bg-primary-50/50 dark:bg-primary-950/20 text-[#f26e56] text-[10px] font-extrabold uppercase tracking-widest mb-4">
                <GraduationCap className="h-3.5 w-3.5" /> Professional Bootcamp
              </span>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-905 dark:text-white leading-tight tracking-tight mb-4">
                {course.title}
              </h1>
              
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-350 leading-relaxed mb-6 font-medium">
                {course.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-5 text-xs text-slate-500 dark:text-slate-455 font-bold pt-4 border-t border-slate-100 dark:border-slate-805/65">
                <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-[#f26e56]" /> {formatTotalDuration(totalSeconds)} total duration</span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[#f26e56]" /> Certificate of completion included</span>
              </div>
            </div>

            {/* CREATIVE CERTIFICATION PHOTO BANNER (Replaces Instructor Details) */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-805/70 shadow-lg h-44 w-full group/banner">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop" 
                alt="SkillCraft Academic Banner" 
                className="w-full h-full object-cover group-hover/banner:scale-103 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-[#f26e56] uppercase">
                  <Sparkles className="h-4 w-4 animate-spin duration-1000" /> Verified Program
                </div>
                <h4 className="text-white font-black text-xl mt-1.5 tracking-tight">100% Industry Recognized Credentials</h4>
                <p className="text-slate-300 text-xs mt-1.5 font-medium max-w-xl">
                  Complete all curriculum modules, check off tasks, and instantly generate a director-signed graduation certificate.
                </p>
              </div>
            </div>

            {/* What you'll learn (Clean visual bullet list) */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-805/70 rounded-3xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-wider">What you'll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  `Master core algorithms & foundations of ${course.title.split(' ')[0] || 'the program'}.`,
                  'Design structural patterns and clean schema models.',
                  'Build production-ready projects for your professional resume.',
                  'Learn professional architecture patterns & industry rules.',
                  'Implement robust error checking and security practices.',
                  'Deploy solutions dynamically with production readiness.'
                ].map((text, idx) => (
                  <div key={idx} className="flex items-start gap-3 group/item">
                    <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                    <span className="text-sm text-slate-700 dark:text-slate-350 font-semibold">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Overall Course Progress Card (Visible only when enrolled) */}
            {isEnrolled && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-805/70 rounded-3xl p-6 md:p-8 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-black text-lg text-slate-900 dark:text-white uppercase tracking-wider">Your Progress</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">
                      You have completed {completedLessons.length} out of {totalLectures} lectures
                    </p>
                  </div>
                  <span className="text-3xl font-black text-[#f26e56]">
                    {completedPercent}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-primary-500 to-[#f26e56] h-full rounded-full transition-all duration-500"
                    style={{ width: `${completedPercent}%` }}
                  ></div>
                </div>

                {completedPercent === 100 && (
                  <div className="mt-5 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                    <div>
                      <p className="font-extrabold text-amber-900 dark:text-amber-400 text-sm">Congratulations! You graduated this course!</p>
                      <p className="text-xs text-amber-700 dark:text-amber-505 font-medium mt-1">Your verified certificate of completion is ready.</p>
                    </div>
                    <button 
                      onClick={handlePrintCertificate}
                      className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-605 text-white font-black rounded-xl text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      <Award className="h-4.5 w-4.5 inline-block mr-1.5 animate-bounce" /> Download Certificate
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Curriculum Accordion (Content Index) */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-wider">Course Curriculum</h2>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-bold">
                  {course.modules?.length || 0} Sections • {totalLectures} Lectures • {formatTotalDuration(totalSeconds)} Length
                </p>
              </div>
              
              <div className="border border-slate-200 dark:border-slate-850 rounded-3xl overflow-hidden shadow-sm bg-white dark:bg-slate-900">
                {course.modules && course.modules.length > 0 ? (
                  course.modules.map((mod) => {
                    const totalModuleLessons = mod.lessons?.length || 0;
                    const completedModuleLessons = mod.lessons?.filter(les => completedLessons.includes(les._id)).length || 0;
                    const modulePercent = totalModuleLessons > 0 ? Math.round((completedModuleLessons / totalModuleLessons) * 100) : 0;

                    return (
                      <div key={mod._id} className="border-b border-slate-200 dark:border-slate-850 last:border-0">
                        {/* Module Header */}
                        <div className="w-full px-6 py-4.5 bg-slate-50/70 dark:bg-slate-900/60 flex flex-col sm:flex-row sm:items-center justify-between text-left gap-4">
                          <span className="font-extrabold text-sm text-slate-900 dark:text-white">{mod.title}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-xs font-bold text-slate-400 dark:text-slate-500">{totalModuleLessons} lectures</span>
                            {isEnrolled && (
                              <div className="flex items-center gap-2 bg-white dark:bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-200 dark:border-slate-805">
                                <span className="text-[10px] font-black text-slate-500 dark:text-slate-400">
                                  {completedModuleLessons}/{totalModuleLessons} ({modulePercent}%)
                                </span>
                                <div className="w-14 bg-slate-200 dark:bg-slate-850 h-1.5 rounded-full overflow-hidden">
                                  <div 
                                    className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                                    style={{ width: `${modulePercent}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Lessons list */}
                        <div className="bg-white dark:bg-slate-900/10 px-6 py-2">
                          {mod.lessons && mod.lessons.length > 0 ? (
                            mod.lessons.map((les) => {
                              const isLessonCompleted = completedLessons.includes(les._id);
                              return (
                                <div 
                                   key={les._id} 
                                   onClick={() => handleToggleProgress(les._id, isLessonCompleted)}
                                   className="flex items-center justify-between py-3 border-b border-slate-50 dark:border-slate-900/35 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-850/50 px-2 rounded-xl transition-all cursor-pointer select-none group/lesson"
                                 >
                                   <div className="flex items-center gap-3">
                                     <input 
                                       type="checkbox" 
                                       checked={isLessonCompleted} 
                                       readOnly
                                       className="h-4.5 w-4.5 text-primary-600 focus:ring-primary-500 border-slate-300 dark:border-slate-700 rounded-lg cursor-pointer transition-all pointer-events-none"
                                     />
                                     <span className="text-slate-800 dark:text-slate-205 text-sm font-semibold group-hover/lesson:text-[#f26e56] transition-colors">
                                       {les.title}
                                      </span>
                                   </div>
                                   <div className="flex items-center gap-3">
                                     <span className="text-[11px] text-slate-400 dark:text-slate-500 font-bold">
                                       {formatDuration(les.durationInSeconds || les.duration)}
                                     </span>
                                     {les.isFreePreview && !isEnrolled && (
                                       <span className="text-[9px] text-[#f26e56] font-black uppercase bg-primary-50 dark:bg-primary-950/40 px-2.5 py-0.5 rounded-full border border-primary-200/30">Preview</span>
                                     )}
                                   </div>
                                 </div>
                              );
                            })
                          ) : (
                            <p className="text-xs text-slate-400 py-3 font-semibold">No lessons inside this module yet.</p>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center text-slate-400 py-8 font-semibold">No curriculum modules added yet.</p>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Pricing & Action Widget (1/3 Width) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-805/70 shadow-lg overflow-hidden z-10">
            
            {/* Thumbnail Preview Area */}
            <div className="aspect-video bg-slate-950 relative flex items-center justify-center cursor-pointer group/preview">
              {course.thumbnailUrl && (course.thumbnailUrl.startsWith('/') || course.thumbnailUrl.startsWith('http')) ? (
                <img 
                  src={course.thumbnailUrl} 
                  alt={course.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover/preview:scale-103 transition-transform duration-500"
                />
              ) : null}
              <div className="absolute inset-0 bg-slate-950/45 group-hover/preview:bg-slate-950/25 transition-colors"></div>
              <Play className="h-14 w-14 text-white opacity-95 group-hover/preview:scale-110 transition-transform relative z-10 filter drop-shadow" />
              <span className="absolute bottom-4 text-white text-[10px] font-black tracking-widest uppercase z-10 drop-shadow">Preview Course</span>
            </div>

            {/* Pricing details and actions list */}
            <div className="p-6">
              <div className="text-4xl font-black text-slate-905 dark:text-white mb-4">
                {course.price === 0 ? 'Free' : `₹${course.price.toLocaleString('en-IN')}`}
              </div>
              
              {enrollError && (
                <div className="mb-4 text-xs text-red-600 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 p-3.5 rounded-2xl font-bold flex items-center gap-2">
                  <AlertCircle className="h-4.5 w-4.5 flex-shrink-0" />
                  {enrollError}
                </div>
              )}

              {isEnrolled ? (
                <div className="space-y-4">
                  <div className="text-center text-xs font-black uppercase tracking-wider text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/15 py-2.5 rounded-xl border border-green-200/30">
                    Active Enrollment
                  </div>
                  
                  {/* Dynamic Progress indicator */}
                  <div className="bg-slate-50/50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-805/75 shadow-sm">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">
                      <span>Curriculum Status</span>
                      <span>{completedPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${completedPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {completedPercent === 100 ? (
                    <button 
                      onClick={handlePrintCertificate}
                      className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-extrabold py-3 rounded-2xl mb-2 transition-all shadow-md text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Award className="h-5 w-5 animate-bounce" /> Download Certificate
                    </button>
                  ) : (
                    <button 
                      onClick={() => navigate('/dashboard')}
                      className="w-full bg-green-600 hover:bg-green-500 text-white font-extrabold py-3 rounded-2xl mb-2 transition-colors shadow-sm text-sm uppercase tracking-wider cursor-pointer"
                    >
                      Go to Dashboard
                    </button>
                  )}
                  
                  <button 
                    onClick={() => handleCancelEnrollment(enrollment._id)}
                    className="w-full py-2.5 text-center text-xs text-red-500 dark:text-red-400 hover:text-red-600 hover:underline font-extrabold uppercase tracking-widest cursor-pointer transition-colors"
                  >
                    Cancel Enrollment
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleEnroll}
                  disabled={enrollMutation.isPending}
                  className="w-full bg-gradient-to-r from-[#f26e56] to-[#e0533c] hover:from-[#e0533c] hover:to-[#c63d27] text-white font-extrabold py-3.5 rounded-2xl mb-4 transition-all shadow-lg hover:shadow-primary-500/10 active:scale-95 text-sm uppercase tracking-wider disabled:opacity-50 cursor-pointer"
                >
                  {enrollMutation.isPending ? 'Enrolling...' : 'Enroll Now'}
                </button>
              )}

              {/* Course Includes Section */}
              <div className="border-t border-slate-100 dark:border-slate-805/65 pt-5 mt-5">
                <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-350 uppercase tracking-widest mb-3.5">This course includes:</h4>
                <ul className="space-y-3 text-xs text-slate-655 dark:text-slate-350 font-semibold">
                  <li className="flex items-center gap-2.5">
                    <BookOpen className="h-4 w-4 text-primary-500" /> {totalLectures} lectures
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Clock className="h-4 w-4 text-primary-500" /> {formatTotalDuration(totalSeconds)} total length
                  </li>
                  <li className="flex items-center gap-2.5">
                    <MonitorPlay className="h-4 w-4 text-primary-500" /> Access on mobile and desktop
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Award className="h-4 w-4 text-primary-500" /> Verified Certificate of completion
                  </li>
                </ul>
              </div>

              {/* Share Actions */}
              <div className="mt-5 border-t border-slate-100 dark:border-slate-805/65 pt-5">
                <button className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-850 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-extrabold uppercase tracking-wide text-slate-700 dark:text-slate-300 flex items-center justify-center gap-2 transition-colors cursor-pointer">
                  <Share2 className="h-4 w-4 text-slate-400" /> Share Course
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
