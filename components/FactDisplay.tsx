import React from 'react';
import { FactData } from '../types';
import { ExternalLink, Quote, Share2, Copy, Check } from 'lucide-react';

interface FactDisplayProps {
  fact: FactData | null;
  isLoading: boolean;
}

export const FactDisplay: React.FC<FactDisplayProps> = ({ fact, isLoading }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (fact) {
      navigator.clipboard.writeText(fact.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 min-h-[300px] flex flex-col items-center justify-center animate-pulse">
        <div className="w-16 h-16 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-6"></div>
        <div className="h-4 bg-slate-100 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-slate-100 rounded w-1/2"></div>
        <p className="mt-6 text-slate-400 text-sm animate-bounce">Consultando la base de conocimiento...</p>
      </div>
    );
  }

  if (!fact) {
    return (
      <div className="w-full max-w-2xl bg-white/50 border-2 border-dashed border-slate-300 rounded-3xl p-12 text-center">
        <p className="text-slate-500 text-lg">Selecciona una categoría para descubrir algo nuevo.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 ease-out transform translate-y-0 opacity-100">
      <div className="bg-teal-600 h-2 w-full"></div>
      <div className="p-8 md:p-10">
        <div className="flex justify-between items-start mb-6">
          <Quote className="text-teal-100 fill-current rotate-180" size={48} />
          <span className="bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {fact.category}
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-medium text-slate-800 leading-relaxed mb-8">
          {fact.text}
        </h2>

        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 border-t border-slate-100 pt-6">
            
          {/* Sources Section */}
          <div className="flex-1 w-full">
            {fact.sources.length > 0 ? (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Fuentes verificadas</p>
                <div className="flex flex-wrap gap-2">
                  {fact.sources.map((source, idx) => (
                    <a
                      key={idx}
                      href={source.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-teal-600 bg-teal-50 hover:bg-teal-100 px-2 py-1 rounded transition-colors truncate max-w-[200px]"
                    >
                      <ExternalLink size={10} />
                      <span className="truncate">{source.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            ) : (
               <p className="text-xs text-slate-400 italic">Generado con conocimientos generales de IA</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 shrink-0">
             <button
              onClick={handleCopy}
              className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors"
              title="Copiar texto"
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>
            <button
              className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-full transition-colors"
              title="Compartir (Simulado)"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Dato Curioso de Curio',
                    text: fact.text,
                    url: window.location.href
                  }).catch(() => {});
                }
              }}
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};