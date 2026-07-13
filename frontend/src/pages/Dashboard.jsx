import React, { useContext, useEffect } from 'react';
import { BookOpen, Clock, PlayCircle, Award, Edit } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useEnrollmentsQuery, useCancelEnrollmentMutation } from '../features/enrollments/hooks/useEnrollmentsQuery';

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetch enrolled courses from backend API (unconditionally at the top)
  const { data: enrollments = [], isLoading } = useEnrollmentsQuery();
  const cancelMutation = useCancelEnrollmentMutation();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div className="text-center py-20 dark:text-white">Loading dashboard...</div>;
  }

  if (!user) {
    return null;
  }

  const handlePrintCertificate = (course, enrollment) => {
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

  const handleCancelEnrollment = async (enrollmentId) => {
    if (window.confirm('Are you sure you want to cancel your enrollment in this course? All your progress will be permanently deleted.')) {
      try {
        await cancelMutation.mutateAsync(enrollmentId);
      } catch (err) {
        alert('Failed to cancel enrollment. Please try again.');
      }
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100 min-h-screen py-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Learning</h1>
            <p className="text-gray-600 dark:text-slate-350 flex items-center flex-wrap gap-1.5">
              Welcome back, <span className="font-semibold text-gray-800 dark:text-white">{user?.name || 'Learner'}</span>
              <Link 
                to="/profile" 
                className="inline-flex items-center justify-center p-1 rounded-lg text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-slate-800 transition-colors"
                title="Edit Profile"
              >
                <Edit className="h-3.5 w-3.5" />
              </Link>
              ! Pick up where you left off.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white dark:bg-slate-900 px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-800 shadow-sm text-center">
              <span className="block text-2xl font-bold text-primary-600 dark:text-primary-400">
                {enrollments.length}
              </span>
              <span className="text-xs text-gray-500 dark:text-slate-400 uppercase font-semibold">Enrolled</span>
            </div>
          </div>
        </div>

        {/* Course Grid for In Progress */}
        {isLoading ? (
          <div className="text-center py-12 text-gray-500 dark:text-slate-400">Loading enrolled courses...</div>
        ) : enrollments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((enrollment) => {
              const course = enrollment.course;
              if (!course) return null;
              
              return (
                <div key={enrollment._id} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] dark:hover:shadow-indigo-950/25 transition-all duration-300 ease-out flex flex-col">
                  {/* Thumbnail Cover Image */}
                  <div className="h-44 bg-gray-900 w-full relative overflow-hidden">
                    {course.thumbnailUrl ? (
                      <img 
                        src={course.thumbnailUrl} 
                        alt={course.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary-100 dark:bg-slate-800 flex items-center justify-center">
                        <BookOpen className="h-10 w-10 text-primary-500" />
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-500 dark:text-slate-400 text-sm mb-4">
                      Faculty- {course.instructor?.name || 'Instructor'}
                    </p>
                    
                    {/* Visual Progress Bar */}
                    <div className="mb-4 mt-auto">
                      <div className="flex justify-between text-xs text-gray-500 dark:text-slate-400 font-semibold mb-1.5">
                        <span>Progress</span>
                        <span>{enrollment.progressPercent || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-primary-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${enrollment.progressPercent || 0}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex justify-between items-center text-xs gap-3">
                      <button 
                        onClick={() => handleCancelEnrollment(enrollment._id)}
                        className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 font-semibold cursor-pointer transition-colors"
                      >
                        Cancel Enrollment
                      </button>
                      
                      {enrollment.progressPercent === 100 ? (
                        <div className="flex items-center gap-3">
                          <Link 
                            to={`/course/${course._id || course.id}`}
                            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <PlayCircle className="h-4 w-4" /> Review
                          </Link>
                          <button 
                            onClick={() => handlePrintCertificate(course, enrollment)}
                            className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow hover:scale-105 active:scale-95 transition-all cursor-pointer text-xs"
                          >
                            <Award className="h-3.5 w-3.5" /> Certificate
                          </button>
                        </div>
                      ) : (
                        <Link 
                          to={`/course/${course._id || course.id}`}
                          className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <PlayCircle className="h-4 w-4" /> Continue
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">You haven't enrolled in any courses yet</h3>
            <p className="text-gray-500 dark:text-slate-400 mb-6">Explore our catalog of professional courses and begin your learning journey today.</p>
            <Link 
              to="/courses" 
              className="px-6 py-2.5 bg-primary-600 hover:bg-primary-500 text-white font-medium rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Browse Courses
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
