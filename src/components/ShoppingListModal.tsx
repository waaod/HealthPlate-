import React, { useState } from 'react';
import { 
  X, 
  ShoppingCart, 
  DollarSign, 
  Check, 
  Trash2, 
  Plus, 
  Copy, 
  Printer, 
  Share2, 
  Users, 
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { ShoppingItem } from '../types';
import { sampleShoppingList } from '../data/mockData';

interface ShoppingListModalProps {
  isOpen: boolean;
  onClose: () => void;
  householdSize: number;
  weeklyBudget: number;
}

export const ShoppingListModal: React.FC<ShoppingListModalProps> = ({
  isOpen,
  onClose,
  householdSize,
  weeklyBudget,
}) => {
  const [items, setItems] = useState<ShoppingItem[]>(sampleShoppingList);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<ShoppingItem['category']>('Produce');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const toggleCheck = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem: ShoppingItem = {
      id: `shop-${Date.now()}`,
      name: newItemName.trim(),
      category: newItemCategory,
      quantity: '1 unit',
      estimatedPrice: 2.99,
      checked: false,
    };

    setItems([...items, newItem]);
    setNewItemName('');
  };

  const totalEstimated = items.reduce((sum, item) => sum + item.estimatedPrice, 0);
  const categories: ShoppingItem['category'][] = [
    'Produce',
    'Grains & Pantry',
    'Proteins',
    'Dairy & Alternatives',
    'Spices & Oils',
  ];

  const handleCopyList = () => {
    const text = items
      .map((i) => `[${i.checked ? 'x' : ' '}] ${i.name} (${i.quantity}) - ~$${i.estimatedPrice.toFixed(2)}`)
      .join('\n');
    navigator.clipboard.writeText(`HealthPlate Smart Shopping List (${items.length} items):\n` + text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#1F291B]/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E8E6E0] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-[#E8E6E0] flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#7AA95C] uppercase tracking-wider">
              <ShoppingCart className="w-4 h-4" />
              <span>Aisle-Organized Smart Grocery List</span>
            </div>
            <h2 className="text-2xl font-bold text-[#1F291B]">Weekly Grocery Planner</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#6B7264] hover:text-[#1F291B] hover:bg-[#F5F5F0] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Budget vs Estimation Banner */}
        <div className="p-6 bg-[#FDFCF8] border-b border-[#E8E6E0]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white p-3.5 rounded-2xl border border-[#E8E6E0] shadow-2xs">
              <span className="text-[11px] font-semibold text-[#6B7264] block">Estimated Total</span>
              <span className="text-2xl font-extrabold text-[#1F291B] font-mono">
                ${totalEstimated.toFixed(2)}
              </span>
              <span className="text-[10px] text-[#7AA95C] font-bold block mt-0.5">
                {items.filter((i) => i.checked).length} of {items.length} items in cart
              </span>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-[#E8E6E0] shadow-2xs">
              <span className="text-[11px] font-semibold text-[#6B7264] block">Weekly Budget Limit</span>
              <span className="text-2xl font-extrabold text-[#7AA95C] font-mono">
                ${weeklyBudget}.00
              </span>
              <span className="text-[10px] text-[#4A5043] font-medium block mt-0.5">
                ${(weeklyBudget - totalEstimated).toFixed(2)} remaining under cap
              </span>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-[#E8E6E0] shadow-2xs">
              <span className="text-[11px] font-semibold text-[#6B7264] block">Household Size</span>
              <span className="text-2xl font-extrabold text-[#1F291B] font-mono flex items-center gap-1.5">
                <Users className="w-5 h-5 text-[#7AA95C]" />
                {householdSize} {householdSize === 1 ? 'person' : 'people'}
              </span>
              <span className="text-[10px] text-[#6B7264] font-medium block mt-0.5">
                Portions scaled accurately
              </span>
            </div>
          </div>
        </div>

        {/* Content by Category */}
        <div className="p-6 space-y-6 flex-1">
          
          {/* Add item form */}
          <form onSubmit={handleAddItem} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="Add another grocery item (e.g. Walnuts, Flaxseed)..."
              className="flex-1 px-4 py-2.5 rounded-full border border-[#E8E6E0] bg-[#FDFCF8] text-xs focus:outline-none focus:border-[#7AA95C]"
            />
            <select
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value as any)}
              className="px-4 py-2.5 rounded-full border border-[#E8E6E0] bg-[#FDFCF8] text-xs font-medium text-[#1F291B] cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#7AA95C] hover:bg-[#6A964D] text-white text-xs font-bold rounded-full flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-[#7AA95C]/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </form>

          {/* Grouped lists */}
          <div className="space-y-5">
            {categories.map((cat) => {
              const catItems = items.filter((i) => i.category === cat);
              if (catItems.length === 0) return null;

              return (
                <div key={cat} className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1F291B] flex items-center justify-between">
                    <span>{cat}</span>
                    <span className="text-[11px] font-mono text-[#6B7264]">
                      ${catItems.reduce((s, i) => s + i.estimatedPrice, 0).toFixed(2)}
                    </span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {catItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => toggleCheck(item.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          item.checked
                            ? 'bg-[#F5F5F0]/70 border-[#E8E6E0] opacity-60'
                            : 'bg-white border-[#E8E6E0] hover:border-[#7AA95C] shadow-2xs'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                              item.checked
                                ? 'bg-[#7AA95C] border-[#7AA95C] text-white'
                                : 'border-[#D5D2C8] bg-white'
                            }`}
                          >
                            {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <div>
                            <p className={`text-xs font-bold ${item.checked ? 'line-through text-[#6B7264]' : 'text-[#1F291B]'}`}>
                              {item.name}
                            </p>
                            <span className="text-[10px] text-[#6B7264]">{item.quantity}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[#1F291B]">
                            ${item.estimatedPrice.toFixed(2)}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeItem(item.id);
                            }}
                            className="text-[#9BA195] hover:text-red-500 p-1 cursor-pointer transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#E8E6E0] bg-[#FDFCF8] flex items-center justify-between">
          <button
            onClick={handleCopyList}
            className="px-4 py-2 bg-white hover:bg-[#F5F5F0] text-[#1F291B] text-xs font-bold rounded-full border border-[#E8E6E0] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5 text-[#7AA95C]" />
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Checklist'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#7AA95C] text-white text-xs font-bold rounded-full hover:bg-[#6A964D] cursor-pointer shadow-sm shadow-[#7AA95C]/20 transition-all"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
