import React from 'react';
import './LandingPage.css';
import Button from './Button';

const SignIn = ({ onGetStarted }) => (
  <div className="landing-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '16px 0' }}>
    {/* Background */}
    <div
      className="hero-background"
      style={{
        background: "url('/images/black bgggg.jpg') center/cover no-repeat fixed",
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0
      }}
    />
    <div className="glass-card" style={{ 
      width: 650, 
      height: 480, 
      maxWidth: '95vw', 
      maxHeight: '90vh', 
      display: 'flex', 
      flexDirection: 'row', 
      padding: 0, 
      zIndex: 1, 
      boxShadow: '0 0 0 1px rgba(255,255,255,0.1)', 
      borderRadius: 32, 
      gap: 0,
      background: '#181818'
    }}>
      {/* Left: Haaland photo */}
      <div className="signin-image-panel" style={{ 
        flex: 1, 
        borderRadius: '32px 0 0 32px', 
        overflow: 'hidden', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'relative', 
        minWidth: 0 
      }}>
        <img src="/images/haaland-faceoff.jpg" alt="Haaland" style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'cover'
        }} />
      </div>
      {/* Right: Form */}
      <div className="signin-form-panel" style={{ 
        flex: 1.2, 
        padding: '24px 24px 24px 24px', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        position: 'relative', 
        background: '#111', 
        borderRadius: '0 32px 32px 0', 
        boxShadow: '0 2px 24px rgba(0,0,0,0.20)', 
        minWidth: 0, 
        overflow: 'auto' 
      }}>
        <h2 style={{ 
          color: '#fff', 
          fontWeight: 800, 
          fontSize: '2.5rem', 
          marginBottom: 12, 
          marginTop: 0, 
          wordBreak: 'break-word', 
          lineHeight: 1.1,
          fontFamily: 'Neue Plak Condensed'
        }}>Sign in</h2>
        <div style={{ color: '#999', fontSize: '1.1rem', marginBottom: 14, wordBreak: 'break-word' }}>Sign in with Open account</div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
          <button type="button" className="social-btn hover-scale smooth-transition" style={{ 
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: 8, 
            background: 'rgba(255,255,255,0.1)', 
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)', 
            borderRadius: 16, 
            padding: '12px 0', 
            fontWeight: 600, 
            fontSize: '1rem', 
            cursor: 'pointer', 
            minWidth: 90,
            color: '#fff',
            transition: 'all 0.3s ease-in-out'
          }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" style={{ width: 20, height: 20 }} /> Google
          </button>
          <button type="button" className="social-btn hover-scale smooth-transition" style={{ 
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: 8, 
            background: 'rgba(255,255,255,0.1)', 
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)', 
            borderRadius: 16, 
            padding: '12px 0', 
            fontWeight: 600, 
            fontSize: '1rem', 
            cursor: 'pointer', 
            minWidth: 90,
            color: '#fff',
            transition: 'all 0.3s ease-in-out'
          }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" style={{ width: 20, height: 20, filter: 'invert(1)' }} /> Apple ID
          </button>
        </div>
        <div style={{ textAlign: 'center', color: '#666', fontSize: '1rem', marginBottom: 12 }}>Or continue with email address</div>
        <form style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: 10, color: '#666', fontSize: 16 }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="#666" d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11Zm2.5-.5a.5.5 0 0 0-.5.5v.379l8 5.333 8-5.333V6.5a.5.5 0 0 0-.5-.5h-15Zm16 2.197-7.51 5.008a1 1 0 0 1-1.09 0L3.5 8.197V17.5a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5V8.197Z"/></svg>
            </span>
            <input type="email" placeholder="Email address" style={{ 
              padding: '12px 14px 12px 38px', 
              borderRadius: 16, 
              border: '1px solid rgba(255,255,255,0.1)', 
              marginBottom: 0, 
              fontSize: '1rem', 
              background: 'rgba(255,255,255,0.05)', 
              color: '#fff', 
              outline: 'none', 
              width: '100%',
              transition: 'all 0.3s ease-in-out'
            }} />
          </div>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: 10, color: '#666', fontSize: 16 }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="#666" d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm-6-2a6 6 0 1 1 12 0v1.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 16.5V15Z"/></svg>
            </span>
            <input type="password" placeholder="Password" style={{ 
              padding: '12px 14px 12px 38px', 
              borderRadius: 16, 
              border: '1px solid rgba(255,255,255,0.1)', 
              marginBottom: 0, 
              fontSize: '1rem', 
              background: 'rgba(255,255,255,0.05)', 
              color: '#fff', 
              outline: 'none', 
              width: '100%',
              transition: 'all 0.3s ease-in-out'
            }} />
          </div>
          <button 
            type="submit" 
            className="hover-scale smooth-transition"
            style={{
              width: '100%',
              padding: '12px',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 16,
              color: 'white',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease-in-out',
              marginTop: '8px'
            }}
          >
            Sign In
          </button>
          <div style={{ marginTop: 12, textAlign: 'center', fontSize: '1rem', color: '#999', fontWeight: 500 }}>
            Don&apos;t have an account?{' '}
            <span style={{ color: '#fff', fontWeight: 700, cursor: 'pointer' }} onClick={onGetStarted}>Sign up</span>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default SignIn; 