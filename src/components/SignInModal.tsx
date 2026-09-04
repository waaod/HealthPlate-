import React, { useState } from 'react';
import { X, Lock, Mail, ArrowRight, Check } from 'lucide-react';
import { Logo } from './Logo';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignInSuccess: (name: string) => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose, onSignInSuccess }) => {
  const [email, setEmail] = useState('alex.rivera@example.com');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('Alex Rivera');
  const [signedIn, setSignedIn] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignedIn(true);
    setTimeout(() => {
      onSignInSuccess(name);
      setSignedIn(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F291B]/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-[#E8E6E0] p-6 sm:p-8 space-y-6">
        
        <div className="flex items-center justify-between">
          <Logo size="sm" />
          <button
            onClick={onClose}
            className="p-1.5 text-[#6B7264] hover:text-[#1F291B] hover:bg-[#F5F5F0] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-bold font-display text-[#1F291B]">Welcome Back to HealthPlate</h2>
          <p className="text-xs text-[#4A5043] mt-1">
            Access your saved meal plans, personalized macro targets, and grocery lists.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1F291B]">Your Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full border border-[#E8E6E0] bg-[#FDFCF8] text-xs focus:outline-none focus:border-[#7AA95C]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#1F291B]">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full border border-[#E8E6E0] bg-[#FDFCF8] text-xs focus:outline-none focus:border-[#7AA95C]"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-[#1F291B]">Password</label>
              <a href="#reset" onClick={(e) => e.preventDefault()} className="text-[#7AA95C] hover:underline text-[11px]">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-full border border-[#E8E6E0] bg-[#FDFCF8] text-xs focus:outline-none focus:border-[#7AA95C]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#7AA95C] hover:bg-[#6A964D] text-white text-xs font-bold rounded-full transition-all shadow-sm shadow-[#7AA95C]/20 flex items-center justify-center gap-1.5 cursor-pointer mt-2"
          >
            {signedIn ? (
              <>
                <Check className="w-4 h-4" />
                <span>Signed In! Loading...</span>
              </>
            ) : (
              <>
                <span>Sign In to HealthPlate</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-[#6B7264]">
          Don't have an account yet?{' '}
          <button
            onClick={() => {
              onClose();
            }}
            className="text-[#7AA95C] font-bold hover:underline cursor-pointer"
          >
            Get started for free
          </button>
        </div>

      </div>
    </div>
  );
};
