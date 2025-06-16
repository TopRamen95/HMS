import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

function Login() {
  const [uid, setUid] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const formRef = useRef(null);
  const titleRef = useRef(null);
  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

    tl.fromTo(formRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0 })
      .fromTo(titleRef.current, { y: -20, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.5")
      .fromTo(inputRef.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1 }, "-=0.5")
      .fromTo(buttonRef.current, { x: 100, opacity: 0 }, { x: 0, opacity: 1 }, "-=0.5");
  }, []);

  const handleLogin = async () => {
    setError('');

    if (!uid.trim()) {
      setError('Please enter your UID');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: uid.trim() }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Login failed');
        return;
      }

      const data = await response.json();

      switch (data.role?.toLowerCase()) {
        case 'admin':
          navigate('/admin');
          break;
        case 'doctor':
          navigate('/doctor');
          break;
        case 'staff':
          navigate('/staff');
          break;
        case 'patient':
          navigate('/patient');
          break;
        default:
          setError('Unknown role');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-cyan-400">
      <div ref={formRef} className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-blue-200">
        <h2 ref={titleRef} className="text-3xl font-extrabold text-center text-blue-700 mb-8 font-cloudcure">
          CloudCure
        </h2>

        <input
          ref={inputRef}
          type="text"
          placeholder="Enter your UID"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          className="w-full px-5 py-3 mb-5 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
        />

        <button
          ref={buttonRef}
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-blue-600 to-sky-500 text-white py-3 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-sky-600 transition duration-300 shadow-lg"
        >
          Login
        </button>

        {error && (
          <p className="text-red-500 text-sm mt-4 text-center animate-pulse">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
