import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Check, 
  Leaf, 
  ShieldCheck, 
  ArrowRight,
  PackageCheck
} from 'lucide-react';
import { mockHealthPlateFoods } from '../data/mockData';

interface FoodsWaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FoodsWaitlistModal: React.FC<FoodsWaitlistModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setJoined(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1F291B]/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E8E6E0] flex flex-col">
        
        <div className="p-6 border-b border-[#E8E6E0] flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#7AA95C] uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Future Brand Ecosystem</span>
            </div>
            <h2 className="text-2xl font-bold text-[#1F291B]">HealthPlate Foods</h2>
          </div>
          <button
            onClick={() => {
              setJoined(false);
              onClose();
            }}
            className="p-2 text-[#6B7264] hover:text-[#1F291B] hover:bg-[#F5F5F0] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 flex-1">
          <div className="space-y-2">
            <p className="text-sm text-[#4A5043] leading-relaxed">
              We are developing an in-house line of pure, unadulterated whole foods priced affordably. Zero artificial emulsifiers, zero seed-oil dilutions, single-origin integrity.
            </p>
          </div>

          {/* Sample Products */}
          <div className="space-y-3">
            {mockHealthPlateFoods.map((prod) => (
              <div
                key={prod.id}
                className="p-4 rounded-2xl bg-[#FDFCF8] border border-[#E8E6E0] flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-[#1F291B]">{prod.name}</h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D9E9D3]/50 text-[#1F291B] border border-[#7AA95C]/20">
                      {prod.badge}
                    </span>
                  </div>
                  <p className="text-xs text-[#4A5043]">{prod.description}</p>
                  <p className="text-[11px] font-mono font-bold text-[#7AA95C]">{prod.price}</p>
                </div>
                <span className="text-[11px] font-semibold text-[#6B7264] shrink-0 bg-white px-2.5 py-1 rounded-full border border-[#E8E6E0]">
                  {prod.status}
                </span>
              </div>
            ))}
          </div>

          {/* Early Access / Waitlist Form */}
          <div className="p-5 rounded-2xl bg-[#D9E9D3]/40 border border-[#7AA95C]/30 space-y-3">
            {joined ? (
              <div className="text-center py-3 space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#7AA95C] text-white flex items-center justify-center mx-auto shadow-sm shadow-[#7AA95C]/30">
                  <Check className="w-5 h-5 stroke-[3]" />
                </div>
                <h4 className="font-bold text-sm text-[#1F291B]">You're on the early sampler list!</h4>
                <p className="text-xs text-[#4A5043]">
                  We will notify {email} when the first batch of sprouted grains & cold-pressed oils is ready to ship with exclusive member pricing.
                </p>
              </div>
            ) : (
              <div>
                <h4 className="font-bold text-sm text-[#1F291B] mb-1">
                  Join the Early Sampler Waitlist
                </h4>
                <p className="text-xs text-[#4A5043] mb-3">
                  Get complimentary tasting packs and 20% off your first whole food pantry order.
                </p>
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 px-4 py-2.5 rounded-full border border-[#E8E6E0] bg-white text-xs focus:outline-none focus:border-[#7AA95C]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#7AA95C] hover:bg-[#6A964D] text-white text-xs font-bold rounded-full flex items-center gap-1.5 cursor-pointer shadow-sm shadow-[#7AA95C]/20 transition-all"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}
          </div>

        </div>

        <div className="p-4 border-t border-[#E8E6E0] bg-[#FDFCF8] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#1F291B] hover:bg-[#343F2F] text-white text-xs font-bold rounded-full cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
