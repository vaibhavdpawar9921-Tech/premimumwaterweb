import React, { useState } from 'react';
import { Lock, ShieldCheck, User, KeyRound, AlertCircle, ArrowRight, X, Sparkles } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { BrandLogo } from '../common/BrandLogo';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAdminData();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await login(username, password);
      if (res.success) {
        onClose();
      } else {
        setError(res.message || 'Invalid administrator credentials');
      }
    } catch {
      setError('An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('royal2025');
    setError(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071D3A]/75 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-[0_20px_60px_rgba(11,45,92,0.25)] border border-[#D9E8F0] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Deep Royal Blue Header */}
        <div className="bg-[#0B2D5C] text-white p-6 sm:p-7 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-radial from-[#00A8C6]/20 via-transparent to-transparent pointer-events-none" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#BFD4E3] hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">
              Internal Portal
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
            Admin Authentication
          </h3>
          <p className="text-xs text-[#E8F9FC] mt-1">
            Access Royal Premium Water central dashboard & catalogue management.
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-7 space-y-5">
          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1.5">
                Admin Username / Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#536579]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. admin"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-[#D9E8F0] bg-white text-[#102033] placeholder:text-[#8799A8] focus:border-[#00A8C6] focus:outline-hidden focus:ring-2 focus:ring-[#00A8C6]/20 min-h-[44px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102033] uppercase tracking-wider mb-1.5">
                Security Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#536579]">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-[#D9E8F0] bg-white text-[#102033] placeholder:text-[#8799A8] focus:border-[#00A8C6] focus:outline-hidden focus:ring-2 focus:ring-[#00A8C6]/20 min-h-[44px]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0B2D5C] hover:bg-[#1557A6] text-white font-bold text-sm shadow-[0_10px_20px_rgba(11,45,92,0.12)] transition-all cursor-pointer min-h-[44px]"
            >
              <Lock className="w-4 h-4" />
              <span>{loading ? 'Authenticating...' : 'Enter Admin Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Helper */}
          <div className="pt-3 border-t border-[#D9E8F0]">
            <button
              type="button"
              onClick={handleFillDemo}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[#E8F9FC] border border-[#00A8C6]/30 text-xs text-[#0B2D5C] hover:bg-[#d6f4f9] transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00A8C6]" />
                <div>
                  <span className="font-bold block">Quick Demo Login</span>
                  <span className="text-[11px] text-[#536579]">
                    Auto-fill: <strong>admin</strong> / <strong>royal2025</strong>
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-bold text-[#1557A6] underline">
                Auto-fill
              </span>
            </button>
          </div>
        </div>

        {/* Footer Note */}
        <div className="px-6 py-3 bg-[#F5FAFC] border-t border-[#D9E8F0] text-center text-[11px] text-[#536579]">
          <span>Protected Area • Royal Premium Water Management</span>
        </div>
      </div>
    </div>
  );
};
