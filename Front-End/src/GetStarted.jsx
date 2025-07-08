import React from 'react';
import './LandingPage.css';
import Button from './Button';

const GetStarted = ({ onSignIn }) => (
  <div className="landing-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '16px 0' }}>
    {/* Background and overlay (less dimmed than home) */}
    <div
      className="hero-background"
      style={{
        background: "url('/images/bg.png') center/cover no-repeat fixed",
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', zIndex: -1 }}></div>
    </div>
    <div className="glass-card" style={{ width: 650, height: 480, maxWidth: '95vw', maxHeight: '90vh', display: 'flex', flexDirection: 'row', padding: 0, zIndex: 1, boxShadow: '0 0 0 2px #fff, 0 8px 32px rgba(0,0,0,0.1)', borderRadius: 32, gap: 0 }}>
      {/* Left: Salah photo */}
      <div className="signin-image-panel" style={{ flex: 1, borderRadius: '32px 0 0 32px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.32)', position: 'relative', minWidth: 0 }}>
        <img src="/images/salah-faceoff.jpg" alt="Salah" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85) contrast(1.1)' }} />
      </div>
      {/* Right: Form */}
      <div className="signin-form-panel" style={{ flex: 1.2, padding: '24px 24px 24px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', background: 'rgba(255,255,255,0.85)', borderRadius: '0 32px 32px 0', boxShadow: '0 2px 24px rgba(0,0,0,0.10)', minWidth: 0, overflow: 'auto' }}>
        <h2 style={{ color: '#111', fontWeight: 800, fontSize: '2rem', marginBottom: 12, marginTop: 0, wordBreak: 'break-word', lineHeight: 1.1 }}>Get Started</h2>
        <div style={{ color: '#444', fontSize: '1rem', marginBottom: 14, wordBreak: 'break-word' }}>Create your account</div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
          <button type="button" className="social-btn" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#fff', border: '1px solid #eee', borderRadius: 10, padding: '10px 0', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', minWidth: 90 }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" style={{ width: 20, height: 20 }} /> Google
          </button>
          <button type="button" className="social-btn" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#fff', border: '1px solid #eee', borderRadius: 10, padding: '10px 0', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', minWidth: 90 }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" style={{ width: 20, height: 20 }} /> Apple ID
          </button>
        </div>
        <div style={{ textAlign: 'center', color: '#888', fontSize: '1rem', marginBottom: 12 }}>Or continue with email address</div>
        <form style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: 10, color: '#aaa', fontSize: 16 }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="#aaa" d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-2.67 0-8 1.34-8 4v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2c0-2.66-5.33-4-8-4Z"/></svg>
            </span>
            <input type="text" placeholder="Name" style={{ padding: '10px 14px 10px 38px', borderRadius: 8, border: '1px solid #ddd', marginBottom: 0, fontSize: '1rem', background: 'rgba(255,255,255,0.95)', color: '#222', outline: 'none', width: '100%' }} />
          </div>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: 10, color: '#aaa', fontSize: 16 }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="#aaa" d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11Zm2.5-.5a.5.5 0 0 0-.5.5v.379l8 5.333 8-5.333V6.5a.5.5 0 0 0-.5-.5h-15Zm16 2.197-7.51 5.008a1 1 0 0 1-1.09 0L3.5 8.197V17.5a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5V8.197Z"/></svg>
            </span>
            <input type="email" placeholder="Email address" style={{ padding: '10px 14px 10px 38px', borderRadius: 8, border: '1px solid #ddd', marginBottom: 0, fontSize: '1rem', background: 'rgba(255,255,255,0.95)', color: '#222', outline: 'none', width: '100%' }} />
          </div>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: 10, color: '#aaa', fontSize: 16 }}>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="#aaa" d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm-6-2a6 6 0 1 1 12 0v1.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 16.5V15Z"/></svg>
            </span>
            <input type="password" placeholder="Password" style={{ padding: '10px 14px 10px 38px', borderRadius: 8, border: '1px solid #ddd', marginBottom: 0, fontSize: '1rem', background: 'rgba(255,255,255,0.95)', color: '#222', outline: 'none', width: '100%' }} />
          </div>
          <Button type="submit">Create Account</Button>
          <div style={{ marginTop: 12, textAlign: 'center', fontSize: '1rem', color: '#444', fontWeight: 500 }}>
            Already have an account?{' '}
            <span style={{ color: '#1976ff', fontWeight: 700, cursor: 'pointer' }} onClick={onSignIn}>Sign in</span>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default GetStarted; 