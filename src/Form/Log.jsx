import React, { useState } from 'react';
import { Mail, User, Lock, Eye, EyeOff, Loader2, CheckCircle, ArrowLeft, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Cartoon from '../assets/cartoon.png';

export default function Log() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [passwordWarning, setPasswordWarning] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    phone: '',
    agreeToTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Check password requirements
    if (name === "password") {
      const regex = /^(?=.*[A-Za-z])(?=.*[\d\W]).+$/;
      if (value.length < 8) {
        setPasswordWarning("Password must be at least 8 characters long.");
      } else if (!regex.test(value)) {
        setPasswordWarning("Password must include at least one letter and one number or symbol.");
      } else {
        setPasswordWarning("");
      }
    }
  };

  const handleSubmit = async () => {
    // Reset error message
    setErrorMessage("");

    // Validation
    if (!formData.firstname || !formData.lastname || !formData.email || !formData.password || formData.phone) {
      alert('Please fill in all fields');
      return;
    }

    if (passwordWarning) {
      alert(passwordWarning);
      return;
    }

    if (!formData.agreeToTerms) {
      alert('Please agree to terms and conditions');
      return;
    }

    // Start loading
    setIsLoading(true);

    try {
      // Make API call
      const response = await fetch('https://foodvault-36sx.onrender.com/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstname,
          lastName: formData.lastname,
          password: formData.password,
          phone: formData.phone
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Success
        console.log('Registration successful:', data);
        setIsLoading(false);
        setShowSuccess(true);

        // Store token if provided
        if (data.token) {
          localStorage.setItem('authToken', data.token);
        }

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate('/user');
        }, 2000);
      } else {
        // Error from API
        setIsLoading(false);
        setErrorMessage(data.message || 'Registration failed. Please try again.');
        alert(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      // Network or other errors
      setIsLoading(false);
      setErrorMessage('Network error. Please check your connection and try again.');
      console.error('Registration error:', error);
      alert('Network error. Please check your connection and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 gap-8">

        {/* Left Side - Form */}
        <div className="p-8 md:p-12">
          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl font-black text-gray-800">
                FoodVault
              </span>
            </div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <p className="text-gray-600">Create account with easy steps</p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-700 text-sm font-semibold">{errorMessage}</p>
            </div>
          )}

          {/* Form */}
          <div className="space-y-4">
            {/* First Name */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Last Name */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Phone className="w-5 h-5" />
              </div>
              <input
                type="string"
                min={11}
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
                className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Password Warning */}
            {passwordWarning && (
              <p className="text-red-600 text-sm">{passwordWarning}</p>
            )}

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                disabled={isLoading}
                className="mt-1 w-4 h-4 accent-green-500 cursor-pointer disabled:cursor-not-allowed"
              />
              <label className="text-sm text-gray-600">
                Agree to the{' '}
                <a href="#" className="text-green-700 hover:underline">
                  terms of services
                </a>{' '}
                and{' '}
                <a href="#" className="text-green-700 hover:underline">
                  privacy policy
                </a>
              </label>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 text-lg rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                'Register'
              )}
            </button>

            <div className="flex justify-center mt-6">
              <a href="/">
                <button className="bg-transparent text-sm text-green-800 flex items-center gap-1 hover:underline">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </button>
              </a>
            </div>

            {/* Success */}
            {showSuccess && (
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl animate-fade-in">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Registration completed! Redirecting to dashboard...</span>
              </div>
            )}
          </div>

          {/* Already Have Account */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a href="/sign" className="text-emerald-600 font-semibold hover:text-green-700 hover:underline">
                Sign in here
              </a>
            </p>
          </div>

          {/* Footer Text */}
          <p className="text-xs text-gray-500 text-center mt-6 leading-relaxed">
            By clicking Register, or Sign Up, you agree to FoodVault{' '}
            <a href="#" className="text-green-700 hover:underline">Privacy Policy</a> and{' '}
            <a href="#" className="text-green-700 hover:underline">Terms of Service</a>. 
            You also agree to receive marketing communications from us.
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:flex items-center justify-center bg-linear-to-br from-white to-white p-8">
          <img
            src={Cartoon}
            alt="Farmer with tomatoes"
            className="w-full h-auto max-h-full object-contain rounded-2xl"
          />
        </div>

      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
    </div>
  );
}