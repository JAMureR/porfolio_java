
import React, { useState } from 'react';
import { Card } from '../shared/Card';
import { ChevronLeft, Share2, TrendingUp, Info, BrainCircuit, Activity, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { analyzeWorkoutPaste } from '../../services/geminiService';

export const WorkoutSessionDetail: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiReport, setAiReport] = useState<string | null>(null);

  // Mock de datos de sesión (En una app real vendrían de un servicio por ID)
  const session = {
    name: 'PUSH DAY: HIPERTROFIA MÁXIMA',
    date: '12 MAYO 2025',
    duration: '85 min',
    volume: '12,450 kg',
    exercises: [
      { name: 'Press de Banca', sets: 4, reps: '8-10', weight: '100kg', rir: 1 },
      { name: 'Press Militar', sets: 3, reps: '10-12', weight: '60kg', rir: 2 },
      { name: 'Aperturas Polea', sets: 3, reps: '15', weight: '15kg', rir: 0 },
    ]
  };

  const handleAIAnalysis = async () => {
    setIsAnalyzing(true);
    
    // Convertimos los datos de la sesión a un formato legible para la IA
    const sessionDataString = `
      Sesión: ${session.name}
      Duración: ${session.duration}
      Volumen Total: ${session.volume}
      Ejercicios realizados:
      ${session.exercises.map(ex => `- ${ex.name}: ${ex.sets} series de ${ex.reps} con ${ex.weight} (RIR: ${ex.rir})`).join('\n')}
    `;

    const result = await analyzeWorkoutPaste(sessionDataString);
    setAiReport(result || null);
    setIsAnalyzing(false);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 animate-fadeIn">
      <div className="flex items-center gap-4 mb-4">
        <Link to="/workouts" className="text-gray-500 hover:text-yellow-500 transition-colors"><ChevronLeft size={32}/></Link>
        <div>
          <h1 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">DETALLES DE <span className="text-yellow-500">SESIÓN</span></h1>
          <p className="text-gray-500 font-black text-xs uppercase tracking-[0.3em] mt-1">{session.date} • {session.duration}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card title={session.name}>
            <div className="space-y-4">
              {session.exercises.map((ex, i) => (
                <div key={i} className="bg-black p-5 border border-gray-800 flex justify-between items-center group hover:border-yellow-500 transition-all shadow-inner">
                  <div>
                    <h4 className="font-black text-xl text-white uppercase italic flex items-center gap-2">
                      <Zap size={16} className="text-yellow-500" /> {ex.name}
                    </h4>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">
                      {ex.sets} SERIES <span className="mx-2 text-gray-800">|</span> {ex.reps} REPETICIONES
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-white">{ex.weight}</p>
                    <div className="flex items-center justify-end gap-1">
                      <span className="text-[10px] text-gray-600 font-black uppercase">Esfuerzo RIR:</span>
                      <span className={`text-xs font-black ${ex.rir <= 1 ? 'text-red-500' : 'text-yellow-500'}`}>{ex.rir}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* NUEVO APARTADO DE IA AUTOMATIZADO */}
          <Card title="INTELIGENCIA DE CAMPAÑA" className="bg-gradient-to-br from-[#111] to-[#080808] border-yellow-600">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-500 p-3 text-black">
                  <BrainCircuit size={32} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white italic uppercase leading-none">Analista Táctico Gemini 3</h3>
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">Sugerencias basadas en tendencias 2025</p>
                </div>
              </div>

              {!aiReport ? (
                <div className="py-6 border-y border-gray-800">
                  <p className="text-gray-400 text-sm italic mb-6 leading-relaxed">
                    Nuestra IA analizará tu selección de ejercicios, la gestión de la fatiga (RIR) y el volumen total para optimizar tu próximo entrenamiento.
                  </p>
                  <button 
                    onClick={handleAIAnalysis}
                    disabled={isAnalyzing}
                    className="w-full bg-yellow-500 text-black font-black py-4 uppercase italic tracking-tighter text-lg hover:bg-yellow-400 transition-all flex items-center justify-center gap-3 shadow-[0_5px_15px_rgba(255,193,7,0.2)] disabled:opacity-50"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-5 h-5 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                        PROCESANDO MÉTRICAS...
                      </>
                    ) : (
                      <>INICIAR ANÁLISIS DE COMBATE</>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-6 animate-fadeIn">
                  <div className="bg-gray-900/50 p-6 border-l-4 border-yellow-500 font-medium italic text-gray-200 leading-relaxed text-lg shadow-xl prose prose-invert max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: aiReport.replace(/\n/g, '<br/>') }} />
                  </div>
                  <button 
                    onClick={() => setAiReport(null)}
                    className="text-gray-600 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors"
                  >
                    [ REGENERAR INFORME ]
                  </button>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="MÉTRICAS CLAVE">
            <div className="space-y-8">
              <Metric label="Volumen Total" value={session.volume} sub="Tonelaje desplazado" icon={<TrendingUp size={20}/>}/>
              <Metric label="Intensidad Media" value="82%" sub="Basado en RIR" icon={<Activity size={20}/>}/>
              <Metric label="Efectividad" value="ALTA" sub="Rango de hipertrofia" icon={<Zap size={20}/>}/>
            </div>
            <button className="w-full mt-10 bg-gray-900 border border-gray-800 text-gray-400 font-black py-4 uppercase text-xs tracking-[0.2em] hover:text-white hover:border-white transition-all flex items-center justify-center gap-3">
              <Share2 size={16}/> EXPEDIR INFORME
            </button>
          </Card>

          <Card className="bg-yellow-500 text-black p-4 text-center">
            <p className="font-black italic text-sm uppercase">Nota del Instructor</p>
            <p className="text-[10px] font-bold mt-1 uppercase">"El dolor es temporal, los resultados en IRONFORGE son para siempre."</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Metric: React.FC<{label: string, value: string, sub: string, icon: React.ReactNode}> = ({label, value, sub, icon}) => (
  <div className="flex items-center gap-5 group">
    <div className="p-4 bg-gray-900 text-yellow-500 border border-gray-800 group-hover:border-yellow-500 transition-colors shadow-lg">{icon}</div>
    <div>
      <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">{label}</p>
      <p className="text-3xl font-black text-white italic tracking-tighter leading-none my-1">{value}</p>
      <p className="text-[9px] text-gray-600 font-bold uppercase">{sub}</p>
    </div>
  </div>
);
