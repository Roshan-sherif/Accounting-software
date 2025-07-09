import React, { useState } from 'react';
import { FaLock, FaUser, FaBuilding, FaEye, FaEyeSlash } from 'react-icons/fa';
import './login.css';
import axios from 'axios';

const ACSOFTLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    try{
        const responce=axios.post('http://localhost:5000/login/', {email,password})

    }catch(err){

    }
    console.log({ email, password, company, rememberMe });
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="acs-login-container">
      <div className="acs-login-card">
        {/* Header */}
        <div className="acs-login-header">
          <div className="acs-logo-icon">
            <FaLock className="acs-lock-icon" />
          </div>
          <h1>ACSOFT</h1>
          <p>Accounting Software</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="acs-login-form">
          <div className="acs-form-group">
          </div>

          <div className="acs-form-group">
            <label htmlFor="email">Email</label>
            <div className="acs-input-wrapper">
              <FaUser className="acs-input-icon" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="acs-form-group">
            <label htmlFor="password">Password</label>
            <div className="acs-input-wrapper">
              <FaLock className="acs-input-icon" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="acs-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="acs-options-row">
            <div className="acs-remember-me">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <a href="#" className="acs-forgot-password">Forgot password?</a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`acs-login-button ${isLoading ? 'acs-loading' : ''}`}
          >
            {isLoading ? (
              <>
                <span className="acs-spinner"></span>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="acs-login-footer">
          <p>© {new Date().getFullYear()} ACSOFT Accounting Software. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default ACSOFTLogin;