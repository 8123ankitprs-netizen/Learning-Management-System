import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { BookOpen, Mail, Lock, Shield } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import api from '../config/axios';

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Local state for the login options
  const [email, setEmail] = useState(''); // Serves as the identifier input (email or phone)
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [tempOtp, setTempOtp] = useState(''); // Developer helper for auto-reading OTP
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check URL query parameters for mobile registration auto-fill & auto-OTP request
  useEffect(() => {
    const phoneParam = searchParams.get('phone');
    if (phoneParam) {
      setEmail(phoneParam);
      
      const autoRequestOtp = async () => {
        setError('');
        setLoading(true);
        try {
          const response = await api.post('/auth/request-otp', { phone: phoneParam });
          if (response.data.success) {
            setOtpSent(true);
            setTempOtp(response.data.otp);
          }
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to send OTP to registered mobile number.');
        } finally {
          setLoading(false);
        }
      };

      autoRequestOtp();
    }
  }, [searchParams]);

  // Helper to determine if identifier is email or phone number
  const getIdentifierPayload = (val) => {
    const cleanVal = val.trim();
    const isPhone = /^[0-9]+$/.test(cleanVal);
    return isPhone ? { phone: cleanVal } : { email: cleanVal };
  };



  // Standard Password Login for Admin
  const handlePasswordLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.success) {
        const { token, ...userData } = response.data;
        login(userData, token);
        
        if (userData.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid admin credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // User Step 1: Request OTP
  const handleRequestOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = getIdentifierPayload(email);
      const response = await api.post('/auth/request-otp', payload);
      if (response.data.success) {
        setOtpSent(true);
        setTempOtp(response.data.otp);
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Failed to send OTP. Please check your credentials.';
      setError(errMsg);

      // Auto-redirect unregistered mobile users to sign up page
      if (errMsg.toLowerCase().includes('not registered') || err.response?.status === 404) {
        const cleanPhone = email.replace(/[^0-9]/g, '');
        if (cleanPhone.length === 10) {
          setError('Mobile number not registered. Redirecting to signup page...');
          setTimeout(() => {
            navigate(`/register?phone=${cleanPhone}`);
          }, 1500);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // User Step 2: Verify OTP
  const handleVerifyOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = { ...getIdentifierPayload(email), otp };
      const response = await api.post('/auth/verify-otp', payload);
      if (response.data.success) {
        const { token, ...userData } = response.data;
        login(userData, token);
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <BookOpen className="h-12 w-12 text-primary-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
            register a new student account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm sm:rounded-xl border border-gray-100 sm:px-10">
          
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* DYNAMIC FORM FLOW BASED ON EMAIL/PHONE */}
          {email.trim().toLowerCase() === 'admin@skillcraft.com' ? (
            /* ADMIN FLOW: Standard Password Sign-in */
            <form className="space-y-6" onSubmit={handlePasswordLoginSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-purple-500" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setOtpSent(false);
                      setTempOtp('');
                    }}
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm font-medium"
                    placeholder="admin@skillcraft.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                    Administrator Password
                  </label>
                  <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded uppercase tracking-wider">
                    Password Protected
                  </span>
                </div>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    placeholder="Enter admin password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
                  ) : (
                    'Verify & Log In (Admin)'
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* USER FLOW: Easy passwordless OTP Login (Supports Email / Mobile Number) */
            <form className="space-y-6" onSubmit={otpSent ? handleVerifyOtpSubmit : handleRequestOtpSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Email address or Mobile number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={otpSent}
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Email address or 10-digit mobile"
                  />
                </div>
              </div>

              {otpSent && (
                <div className="animate-fadeIn space-y-4">
                  <div>
                    <label htmlFor="otp" className="block text-sm font-semibold text-gray-700">
                      Enter 6-Digit Code (OTP)
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="otp"
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        maxLength={6}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm tracking-widest text-center font-extrabold text-lg text-gray-900"
                        placeholder="******"
                      />
                    </div>
                  </div>

                  {/* Dev Sandbox OTP Simulator Banner */}
                  {tempOtp && (
                    <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/60 text-purple-700 dark:text-purple-400 p-3 rounded-lg text-xs font-mono">
                      <div className="flex items-center gap-1 font-bold mb-1">
                        <Shield className="h-3.5 w-3.5" /> OTP SIMULATION CONSOLE
                      </div>
                      <div>Copy OTP: <span className="font-extrabold text-sm text-purple-950 dark:text-purple-300 select-all">{tempOtp}</span></div>
                    </div>
                  )}

                  <div className="text-right">
                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false);
                        setOtp('');
                        setTempOtp('');
                      }}
                      className="text-xs font-bold text-primary-600 hover:text-primary-500 cursor-pointer"
                    >
                      Change Input / Get New Code
                    </button>
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="h-5 w-5 border-2 border-white border-t-transparent animate-spin rounded-full"></div>
                  ) : otpSent ? (
                    'Verify & Log In'
                  ) : (
                    'Request OTP Code'
                  )}
                </button>
              </div>
            </form>
          )}


        </div>
      </div>
    </div>
  );
};

export default Login;
