
import React, { useEffect, useState } from 'react';
import { Card } from '../shared/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { TrendingUp, Activity, Award, Flame, BrainCircuit, Zap, Loader2, Target } from 'lucide-react';
import { getWorkoutSuggestions } from '../../services/geminiService';

// Datos de series por grupo muscular (Hipertrofia 2025)
const muscleVolumeData = [
  { muscle: 'Pecho', sets: 12 },
  { muscle: 'Espalda', sets: 15 },
  { muscle: 'Piernas', sets: 18 },
  { muscle: 'Hombros', sets: 10 },
  { muscle: 'Brazos', sets: 8 },
  { muscle: 'Core', sets: 6 },
];

export const Dashboard: React.FC = () => {
  const [aiTips, setAiTips] = useState<string>("");
  const [loadingAI, setLoadingAI] = useState(true);

  // Simulamos que obtenemos el último entrenamiento de la DB
  const lastWorkout = {
    title: "Push Day (Pecho/Hombro)",
    volume: "12,450 kg",
    exercises: "Press Banca, Press Militar, Cruces Polea",
    duration: "75 min",
    sets: 10
  };

  useEffect(() => {
    const fetchAITips = async () => {
      setLoadingAI(true);
      const summary = `Entrenamiento: ${lastWorkout.title}, Volumen: ${lastWorkout.volume}, Series: ${lastWorkout.sets}, Ejercicios: ${lastWorkout.exercises}`;
      const tips = await getWorkoutSuggestions(summary);
      setAiTips(tips || "");
      setLoadingAI(false);
    };

    fetchAITips();
  }, []);

  return (
    <div className="p-4 md:p-8 space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-4xl md:text-6xl font-black italic text-white leading-none tracking-tighter uppercase">
            ESTADO DE <span className="text-yellow-500">FORMA</span>
          </h1>
          <p className="text-gray-500 mt-2 font-bold tracking-widest uppercase text-xs">Análisis de volumen muscular en tiempo real.</p>
        </div>
        <div className="bg-yellow-500 text-black px-6 py-2 font-black text-xl italic flex items-center gap-2 shadow-[4px_4px_0px_rgba(255,255,255,0.2)]">
          <Flame size={24} /> RANGO: ÉLITE
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Entrenos/Mes" value="24" icon={<Activity className="text-yellow-500" />} change="+12%" />
        <StatCard title="Volumen Semanal" value="69 Series" icon={<Target className="text-yellow-500" />} change="+8.2%" />
        <StatCard title="Puntos Gym" value="1,250" icon={<Award className="text-yellow-500" />} change="+150" />
        <StatCard title="Frecuencia" value="5.5 d/s" icon={<Flame className="text-yellow-500" />} change="Estable" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Muscle Volume Chart */}
        <Card title="SERIES POR GRUPO MUSCULAR (SEMANAL)" className="lg:col-span-2 border-r-2 border-yellow-500">
          <div className="h-80 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={muscleVolumeData} layout="vertical" margin={{ left: 20, right: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="muscle" 
                  type="category" 
                  stroke="#666" 
                  fontSize={12} 
                  width={80}
                  tickLine={false} 
                  axisLine={false} 
                  className="font-black uppercase italic"
                />
                <Tooltip 
                  cursor={{ fill: '#111' }}
                  contentStyle={{ backgroundColor: '#000', border: '2px solid #FFC107', borderRadius: '0px' }}
                  itemStyle={{ color: '#FFC107', fontWeight: '900', textTransform: 'uppercase' }}
                />
                <Bar dataKey="sets" radius={[0, 2, 2, 0]}>
                  {muscleVolumeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.sets >= 12 ? '#FFC107' : '#333'} className="hover:opacity-80 transition-opacity cursor-pointer" />
                  ))}
                  <LabelList dataKey="sets" position="right" fill="#fff" className="font-black italic text-xs" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500"></div>
              <span className="text-[10px] text-gray-500 font-black uppercase">Volumen Óptimo (12+ series)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#333]"></div>
              <span className="text-[10px] text-gray-500 font-black uppercase">Mantenimiento</span>
            </div>
          </div>
        </Card>

        {/* IA ANALYSIS BASED ON REAL DATA */}
        <Card title="INFORME DE ÚLTIMA SESIÓN" className="relative overflow-hidden bg-gradient-to-br from-[#111] to-[#050505]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-500 p-2 text-black">
                <BrainCircuit size={24} />
              </div>
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">IA Analista Gemini 3</span>
            </div>
            {loadingAI && <Loader2 className="animate-spin text-yellow-500" size={20} />}
          </div>

          <div className="space-y-4">
            <div className="border-l-2 border-gray-800 pl-4 py-1">
              <p className="text-[9px] font-black text-gray-600 uppercase">Analizando sesión:</p>
              <p className="text-xs font-black text-white uppercase italic">{lastWorkout.title}</p>
            </div>

            {loadingAI ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-full h-1 bg-gray-900 relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-yellow-500 w-1/3 animate-[loading_1.5s_infinite]"></div>
                </div>
                <p className="text-[10px] font-black text-gray-700 uppercase animate-pulse">Procesando métricas de rendimiento...</p>
              </div>
            ) : (
              <div className="animate-fadeIn">
                <div className="text-gray-200 font-medium italic leading-relaxed text-sm bg-black/40 border border-gray-900 p-4 shadow-inner">
                  "{aiTips}"
                </div>
                <div className="mt-6">
                  <button className="w-full py-3 bg-yellow-500 text-black font-black uppercase text-xs hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 italic">
                    <Zap size={14} /> OPTIMIZAR PRÓXIMA CARGA
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <style>{`
            @keyframes loading {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(300%); }
            }
          `}</style>
        </Card>
      </div>

      {/* Recent Workouts List */}
      <Card title="HISTORIAL RECIENTE">
        <div className="space-y-4">
          <RecentWorkoutItem title={lastWorkout.title} date="Hoy, 10:30" duration={lastWorkout.duration} volume={lastWorkout.volume} active />
          <RecentWorkoutItem title="Leg Day (Fuerza)" date="Ayer, 18:00" duration="90 min" volume="15,200 kg" />
          <RecentWorkoutItem title="Pull Day (Espalda)" date="05 Oct, 17:15" duration="65 min" volume="8,900 kg" />
        </div>
      </Card>
    </div>
  );
};

const StatCard: React.FC<{ title: string, value: string, icon: React.ReactNode, change: string }> = ({ title, value, icon, change }) => (
  <Card className="hover:border-yellow-500 transition-all duration-300 group">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest group-hover:text-yellow-500 transition-colors">{title}</p>
        <p className="text-3xl font-black mt-1 text-white italic tracking-tighter leading-none">{value}</p>
        <p className={`text-[10px] mt-2 font-bold ${change.startsWith('+') ? 'text-green-500' : 'text-gray-600'}`}>
          {change} <span className="text-gray-800 uppercase">VS SEMANA ANTERIOR</span>
        </p>
      </div>
      <div className="p-3 bg-black border border-gray-900 group-hover:border-yellow-500 transition-colors">{icon}</div>
    </div>
  </Card>
);

const RecentWorkoutItem: React.FC<{ title: string, date: string, duration: string, volume: string, active?: boolean }> = ({ title, date, duration, volume, active }) => (
  <div className={`flex items-center justify-between p-4 border transition-all group cursor-pointer ${active ? 'bg-[#1a1a1a] border-yellow-500' : 'bg-gray-900/30 border-gray-900 hover:border-gray-700'}`}>
    <div className="flex items-center gap-6">
      <div className={`w-14 h-14 flex flex-col items-center justify-center border-2 font-black ${active ? 'border-yellow-500 text-yellow-500' : 'border-gray-800 text-gray-700'}`}>
        <p className="text-[10px] leading-none">VOL</p>
        <p className="text-xs italic">{volume.split(' ')[0]}</p>
      </div>
      <div>
        <h4 className={`font-black uppercase italic text-lg ${active ? 'text-yellow-500' : 'text-white'} group-hover:text-yellow-500 transition-colors`}>{title}</h4>
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{date} • {duration}</p>
      </div>
    </div>
    <div className="text-gray-700 group-hover:text-yellow-500 font-black text-xs tracking-widest italic">DETALLES →</div>
  </div>
);
