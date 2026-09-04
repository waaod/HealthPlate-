import React, { useState } from 'react';
import { 
  X, 
  HeartPulse, 
  Star, 
  Calendar, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Award, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { mockNutritionists } from '../data/mockData';
import { Nutritionist } from '../types';

interface NutritionistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NutritionistModal: React.FC<NutritionistModalProps> = ({ isOpen, onClose }) => {
  const [selectedNutritionist, setSelectedNutritionist] = useState<Nutritionist | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleBook = (nut: Nutritionist) => {
    setSelectedNutritionist(nut);
    setBookingConfirmed(true);
    setTimeout(() => {
      // Auto reset or user dismisses
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1F291B]/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E8E6E0] flex flex-col">
        
        <div className="p-6 border-b border-[#E8E6E0] flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#7AA95C] uppercase tracking-wider">
              <HeartPulse className="w-4 h-4" />
              <span>Accredited Clinical Dietitians</span>
            </div>
            <h2 className="text-2xl font-bold text-[#1F291B]">Talk to a Nutritionist</h2>
          </div>
          <button
            onClick={() => {
              setBookingConfirmed(false);
              onClose();
            }}
            className="p-2 text-[#6B7264] hover:text-[#1F291B] hover:bg-[#F5F5F0] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 flex-1">
          
          {bookingConfirmed && selectedNutritionist ? (
            <div className="p-6 rounded-2xl bg-[#D9E9D3]/40 border border-[#7AA95C]/30 text-center space-y-3 animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-[#7AA95C] text-white flex items-center justify-center mx-auto shadow-sm shadow-[#7AA95C]/30">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="text-xl font-bold text-[#1F291B]">Consultation Request Sent!</h3>
              <p className="text-sm text-[#4A5043] max-w-md mx-auto">
                Your 1-on-1 session with <strong>{selectedNutritionist.name}</strong> has been scheduled for <strong>{selectedNutritionist.availableSlot}</strong>. Check your email for intake forms and video access.
              </p>
              <button
                onClick={() => setBookingConfirmed(false)}
                className="mt-3 px-6 py-2 bg-[#1F291B] hover:bg-[#343F2F] text-white text-xs font-bold rounded-full cursor-pointer transition-colors"
              >
                Back to Nutritionist List
              </button>
            </div>
          ) : (
            <>
              <div className="p-4 rounded-2xl bg-[#FDFCF8] border border-[#E8E6E0] text-xs text-[#4A5043] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#7AA95C] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-[#1F291B]">Strict Clinical Standards</p>
                  <p>Every practitioner on HealthPlate holds an accredited master’s or doctoral credential, state licensure (RD / RDN), and subscribes to our anti-fad, affordability-first philosophy.</p>
                </div>
              </div>

              <div className="space-y-4">
                {mockNutritionists.map((nut) => (
                  <div
                    key={nut.id}
                    className="p-5 rounded-2xl bg-[#FDFCF8] border border-[#E8E6E0] hover:border-[#7AA95C] transition-all flex flex-col sm:flex-row gap-5 items-start"
                  >
                    <img
                      src={nut.avatar}
                      alt={nut.name}
                      className="w-18 h-18 rounded-2xl object-cover border-2 border-white shadow-sm shrink-0"
                    />

                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <h3 className="text-lg font-bold text-[#1F291B]">{nut.name}</h3>
                          <p className="text-xs font-bold text-[#7AA95C]">{nut.title}</p>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold text-[#8C6D1F] bg-white px-2 py-0.5 rounded-full border border-[#E8E6E0]">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{nut.rating} ({nut.reviewsCount} reviews)</span>
                        </div>
                      </div>

                      <p className="text-xs text-[#4A5043] leading-relaxed">{nut.bio}</p>

                      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="space-y-0.5">
                          <span className="text-[11px] text-[#6B7264] block">Specialty Focus:</span>
                          <span className="font-bold text-[#1F291B]">{nut.specialty}</span>
                        </div>

                        <div className="text-right">
                          <span className="font-mono font-bold text-xs text-[#1F291B] block">
                            {nut.pricePerSession}
                          </span>
                          <span className="text-[10px] text-[#7AA95C] font-bold">Next: {nut.availableSlot}</span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          onClick={() => handleBook(nut)}
                          className="w-full sm:w-auto px-5 py-2.5 bg-[#7AA95C] hover:bg-[#6A964D] text-white text-xs font-bold rounded-full shadow-sm shadow-[#7AA95C]/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Book Initial 45-min Session</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

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
