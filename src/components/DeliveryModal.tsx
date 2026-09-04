import React, { useState } from 'react';
import { 
  X, 
  Truck, 
  Clock, 
  Star, 
  ShieldCheck, 
  Tag, 
  ArrowRight, 
  Filter, 
  BadgePercent 
} from 'lucide-react';
import { mockDeliveryPartners } from '../data/mockData';

interface DeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeliveryModal: React.FC<DeliveryModalProps> = ({ isOpen, onClose }) => {
  const [selectedTag, setSelectedTag] = useState('All');
  const [claimedCode, setClaimedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const filterTags = ['All', 'High Protein', 'Gluten-Free', 'Vegan', 'Low Sodium', 'Mediterranean'];

  const filtered = mockDeliveryPartners.filter((p) => {
    if (selectedTag === 'All') return true;
    return p.dietaryFocus.includes(selectedTag);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1F291B]/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E8E6E0] flex flex-col">
        
        <div className="p-6 border-b border-[#E8E6E0] flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#7AA95C] uppercase tracking-wider">
              <Truck className="w-4 h-4" />
              <span>Healthy Food Delivery</span>
            </div>
            <h2 className="text-2xl font-bold text-[#1F291B]">Vetted Local Healthy Kitchens</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#6B7264] hover:text-[#1F291B] hover:bg-[#F5F5F0] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 flex-1">
          <div className="p-4 rounded-2xl bg-[#D9E9D3]/40 border border-[#7AA95C]/30 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-[#7AA95C] flex items-center justify-center font-bold border border-[#E8E6E0]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#1F291B]">The HealthPlate Standard</p>
                <p className="text-[#4A5043]">All kitchens undergo nutritional verification for trans fats, sodium caps, and whole food sourcing.</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-white text-[#1F291B] border border-[#E8E6E0] rounded-full text-xs font-bold font-mono">
              100% Label Accuracy
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-[#6B7264] shrink-0">Filter:</span>
            {filterTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-[#1F291B] text-white'
                    : 'bg-[#F5F5F0] text-[#4A5043] hover:bg-[#E8E6E0]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Kitchens List */}
          <div className="space-y-4">
            {filtered.map((partner) => (
              <div
                key={partner.id}
                className="p-5 rounded-2xl bg-[#FDFCF8] border border-[#E8E6E0] hover:border-[#7AA95C] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-lg font-bold text-[#1F291B]">{partner.name}</h3>
                    <div className="flex items-center gap-1 text-xs font-bold text-[#8C6D1F]">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{partner.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#4A5043]">{partner.tagline}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {partner.dietaryFocus.map((f) => (
                      <span key={f} className="px-2 py-0.5 rounded-full bg-white border border-[#E8E6E0] text-[10px] font-bold text-[#1F291B]">
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-[#6B7264] pt-1 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {partner.deliveryTime}
                    </span>
                    <span>Min: {partner.minimumOrder}</span>
                    <span className="text-[#7AA95C] font-bold flex items-center gap-1 font-sans">
                      <BadgePercent className="w-3.5 h-3.5" />
                      {partner.discount}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col sm:items-end gap-2">
                  <button
                    onClick={() => setClaimedCode(partner.id)}
                    className="px-4 py-2.5 bg-[#7AA95C] hover:bg-[#6A964D] text-white text-xs font-bold rounded-full shadow-sm shadow-[#7AA95C]/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{claimedCode === partner.id ? 'Perk Code: HP2026' : 'Order with HealthPlate Perk'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] text-[#6B7264]">Direct integration enabled</span>
                </div>
              </div>
            ))}
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
