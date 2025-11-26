import React from 'react';
import { Category } from '../types';
import { Sparkles, FlaskConical, Hourglass, Leaf, Cpu, Rocket, Palette } from 'lucide-react';

interface CategorySelectorProps {
  selectedCategory: Category;
  onSelect: (category: Category) => void;
  disabled: boolean;
}

const icons: Record<Category, React.ReactNode> = {
  [Category.RANDOM]: <Sparkles size={16} />,
  [Category.SCIENCE]: <FlaskConical size={16} />,
  [Category.HISTORY]: <Hourglass size={16} />,
  [Category.NATURE]: <Leaf size={16} />,
  [Category.TECH]: <Cpu size={16} />,
  [Category.SPACE]: <Rocket size={16} />,
  [Category.ART]: <Palette size={16} />,
};

export const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, onSelect, disabled }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {Object.values(Category).map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          disabled={disabled}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
            ${selectedCategory === cat 
              ? 'bg-teal-600 text-white shadow-md scale-105' 
              : 'bg-white text-slate-600 hover:bg-teal-50 hover:text-teal-700 shadow-sm border border-slate-200'}
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          {icons[cat]}
          {cat}
        </button>
      ))}
    </div>
  );
};