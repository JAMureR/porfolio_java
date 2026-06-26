
import React, { useState, useEffect } from 'react';
import { Card } from '../shared/Card';
import { Camera, Scale, Ruler, Activity, Save, User as UserIcon } from 'lucide-react';
import { authService } from '../../services/authService';
import { User, BodyMeasurements } from '../../types';

export const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(authService.getUser());
  const [measurements, setMeasurements] = useState<BodyMeasurements>({
    weight: 80,
    height: 180,
    neck: 40,
    waist: 85,
    hip: 95
  });
  const [avatar, setAvatar] = useState<string | null>(user?.avatarUrl || null);

  const calculateStats = () => {
    const heightM = measurements.height / 100;
    const bmi = measurements.weight / (heightM * heightM);
    
    // Estimación simplificada Grasa Corporal (Fórmula Navy)
    // Hombre: 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
    let bodyFat = 0;
    if (measurements.waist && measurements.neck) {
      bodyFat = 86.010 * Math.log10(measurements.waist - measurements.neck) - 70.041 * Math.log10(measurements.height) + 36.76;
    }

    return { bmi: bmi.toFixed(1), bf: bodyFat.toFixed(1) };
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const { bmi, bf } = calculateStats();

  return (
    <div className="p-4 md:p-8 space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Avatar Section */}
        <div className="w-full md:w-1/3 space-y-6">
          <Card className="text-center relative">
            <div className="relative inline-block group">
              <div className="w-48 h-48 mx-auto bg-gray-900 border-4 border-yellow-500 overflow-hidden shadow-[0_0_20px_rgba(255,193,7,0.3)]">
                {avatar ? (
                  <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-700">
                    <UserIcon size={80} />
                  </div>
                )}
              </div>
              <label className="absolute bottom-2 right-2 bg-yellow-500 p-3 text-black cursor-pointer hover:bg-yellow-400 transition-colors shadow-lg">
                <Camera size={20} />
                <input type="file" className="hidden" onChange={handleAvatarChange} accept="image/*" />
              </label>
            </div>
            <h2 className="text-3xl font-black mt-6 italic uppercase">{user?.name}</h2>
            <p className="text-gray-500 font-bold text-xs tracking-widest uppercase">{user?.email}</p>
            <div className="mt-4 inline-block bg-yellow-500 text-black px-4 py-1 text-[10px] font-black uppercase">Rango: Veterano</div>
          </Card>

          <Card title="COMPOSICIÓN ACTUAL">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black p-4 border-l-2 border-yellow-500">
                <p className="text-[10px] font-black text-gray-500 uppercase">IMC (BMI)</p>
                <p className="text-2xl font-black text-white">{bmi}</p>
              </div>
              <div className="bg-black p-4 border-l-2 border-yellow-500">
                <p className="text-[10px] font-black text-gray-500 uppercase">Grasa Est.</p>
                <p className="text-2xl font-black text-white">{bf}%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Measurements Section */}
        <div className="w-full md:w-2/3 space-y-6">
          <Card title="LA FORJA: MEDIDAS CORPORALES">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <MeasureInput label="Peso (kg)" value={measurements.weight} icon={<Scale size={18}/>} 
                onChange={(v) => setMeasurements({...measurements, weight: Number(v)})} />
              <MeasureInput label="Altura (cm)" value={measurements.height} icon={<Ruler size={18}/>} 
                onChange={(v) => setMeasurements({...measurements, height: Number(v)})} />
              <MeasureInput label="Cuello (cm)" value={measurements.neck || 0} icon={<Activity size={18}/>} 
                onChange={(v) => setMeasurements({...measurements, neck: Number(v)})} />
              <MeasureInput label="Cintura (cm)" value={measurements.waist || 0} icon={<Activity size={18}/>} 
                onChange={(v) => setMeasurements({...measurements, waist: Number(v)})} />
            </div>
            <button className="w-full mt-8 bg-yellow-500 text-black font-black py-4 uppercase italic tracking-tighter flex items-center justify-center gap-2 hover:bg-yellow-400">
              <Save size={20} /> ACTUALIZAR BIOMETRÍA
            </button>
          </Card>

          <Card title="HISTORIAL DE PESO">
            <div className="h-40 flex items-end gap-2 px-2">
              {[60, 65, 62, 70, 75, 72, 80].map((h, i) => (
                <div key={i} className="flex-1 bg-yellow-500/20 border-t-2 border-yellow-500" style={{height: `${h}%`}}></div>
              ))}
            </div>
            <p className="text-center text-[10px] text-gray-600 font-black mt-4 uppercase">Últimos 6 meses de progreso</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

const MeasureInput: React.FC<{label: string, value: number, icon: React.ReactNode, onChange: (v: string) => void}> = ({label, value, icon, onChange}) => (
  <div className="space-y-1">
    <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">{label}</label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500">{icon}</div>
      <input 
        type="number" 
        className="w-full bg-black border border-gray-800 text-white p-3 pl-10 focus:border-yellow-500 outline-none font-bold"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </div>
);
