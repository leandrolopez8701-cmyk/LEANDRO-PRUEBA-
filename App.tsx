import React, { useState, useEffect } from 'react';
import { generateFact } from './services/geminiService';
import { CategorySelector } from './components/CategorySelector';
import { FactDisplay } from './components/FactDisplay';
import { Category, FactData } from './types';
import { BrainCircuit, RefreshCw } from 'lucide-react';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.RANDOM);
  const [currentFact, setCurrentFact] = useState<FactData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFact = async (category: Category) => {
    setLoading(true);
    setError(null);
    try {
      const fact = await generateFact(category);
      setCurrentFact(fact);
    } catch (err: any) {
      setError(err.message || "Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchFact(Category.RANDOM);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    fetchFact(category);
  };

  const handleNextFact = () => {
    fetchFact(selectedCategory);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-slate-100 text-slate-800 font-sans selection:bg-teal-200 selection:text-teal-900">
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-teal-600 p-1.5 rounded-lg text-white">
              <BrainCircuit size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">Curio</h1>
          </div>
          <div className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Potenciado por Gemini 2.5
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-32 px-4 max-w-5xl mx-auto flex flex-col items-center">
        
        <div className="text-center mb-10 max-w-lg">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
            Aprende algo nuevo <span className="text-teal-600">cada día</span>
          </h2>
          <p className="text-slate-500 text-lg">
            Explora el mundo a través de datos breves y verificados.
          </p>
        </div>

        <CategorySelector 
          selectedCategory={selectedCategory} 
          onSelect={handleCategoryChange} 
          disabled={loading}
        />

        {error && (
          <div className="w-full max-w-2xl bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-center text-sm">
            {error}
            <button 
              onClick={() => setError(null)} 
              className="ml-2 underline hover:text-red-800"
            >
              Ignorar
            </button>
          </div>
        )}

        <FactDisplay fact={currentFact} isLoading={loading} />

      </main>

      {/* Floating Action Button for Mobile / Sticky Footer for Desktop */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center px-4 z-20 pointer-events-none">
        <button
          onClick={handleNextFact}
          disabled={loading}
          className="pointer-events-auto shadow-2xl shadow-teal-900/20 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-lg py-4 px-8 rounded-full flex items-center gap-3 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:scale-100"
        >
          <RefreshCw size={24} className={`${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Generando...' : 'Siguiente Dato'}
        </button>
      </div>

    </div>
  );
};

export default App;