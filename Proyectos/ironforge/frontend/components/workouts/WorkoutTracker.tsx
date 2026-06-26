
import React, { useState } from 'react';
import { Card } from '../shared/Card';
import { Plus, Trash2, Save, Clock, ClipboardList, Calendar as CalendarIcon, List as ListIcon } from 'lucide-react';
import { EXERCISE_DATABASE } from '../../constants';
import { WorkoutCalendar } from './WorkoutCalendar';

interface SetInput {
  weight: string;
  reps: string;
}

interface SelectedExercise {
  id: string;
  name: string;
  sets: SetInput[];
}

type ViewMode = 'tracker' | 'calendar';

export const WorkoutTracker: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [workoutName, setWorkoutName] = useState('NUEVA SESIÓN');
  const [selectedExercises, setSelectedExercises] = useState<SelectedExercise[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const addExercise = (id: string, name: string) => {
    setSelectedExercises([...selectedExercises, { id, name, sets: [{ weight: '', reps: '' }] }]);
    setViewMode('tracker'); // Cambiar al tracker al añadir
  };

  const removeExercise = (index: number) => {
    setSelectedExercises(selectedExercises.filter((_, i) => i !== index));
  };

  const addSet = (exerciseIndex: number) => {
    const updated = [...selectedExercises];
    updated[exerciseIndex].sets.push({ weight: '', reps: '' });
    setSelectedExercises(updated);
  };

  const updateSet = (exIdx: number, setIdx: number, field: keyof SetInput, value: string) => {
    const updated = [...selectedExercises];
    updated[exIdx].sets[setIdx][field] = value;
    setSelectedExercises(updated);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(r => setTimeout(r, 1500));
    alert("Entrenamiento guardado correctamente en la fragua de IRONFORGE.");
    setIsSaving(false);
    setSelectedExercises([]);
    setViewMode('calendar');
  };

  const handleDateSelect = (date: string) => {
    const confirmNew = window.confirm(`¿Deseas programar un nuevo entrenamiento para el ${date}?`);
    if (confirmNew) {
      setWorkoutName(`SESIÓN ${date}`);
      setViewMode('tracker');
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* View Selector */}
      <div className="flex justify-between items-end border-b-2 border-gray-900 pb-4">
        <div>
          <h1 className="text-4xl md:text-6xl font-black italic text-white leading-none tracking-tighter uppercase">
            CENTRO DE <span className="text-yellow-500">BATALLA</span>
          </h1>
          <p className="text-gray-500 mt-2 font-bold tracking-widest uppercase text-xs">Planifica, ejecuta y destruye tus límites.</p>
        </div>
        <div className="flex bg-gray-900 p-1 rounded-sm border border-gray-800">
          <button 
            onClick={() => setViewMode('calendar')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-black uppercase transition-all ${viewMode === 'calendar' ? 'bg-yellow-500 text-black' : 'text-gray-500 hover:text-white'}`}
          >
            <CalendarIcon size={14} /> Calendario
          </button>
          <button 
            onClick={() => setViewMode('tracker')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-black uppercase transition-all ${viewMode === 'tracker' ? 'bg-yellow-500 text-black' : 'text-gray-500 hover:text-white'}`}
          >
            <ListIcon size={14} /> Tracker
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 space-y-6">
          {viewMode === 'calendar' ? (
            <WorkoutCalendar onDateClick={handleDateSelect} />
          ) : (
            <>
              <div className="flex flex-col md:flex-row md:items-center justify-between bg-black border-2 border-yellow-500 p-6 shadow-2xl gap-4">
                <input 
                  className="bg-transparent text-3xl md:text-5xl font-black italic uppercase outline-none text-white w-full tracking-tighter"
                  value={workoutName}
                  onChange={(e) => setWorkoutName(e.target.value.toUpperCase())}
                  placeholder="NOMBRE DEL ENTRENAMIENTO"
                />
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-3 font-black text-xs uppercase hover:bg-gray-800 border border-gray-700">
                    <Clock size={16} /> TIMEOUT
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 font-black text-xs uppercase hover:bg-yellow-400 disabled:opacity-50 shadow-[4px_4px_0px_rgba(255,255,255,0.2)]"
                  >
                    <Save size={16} /> {isSaving ? 'GUARDANDO...' : 'FINALIZAR'}
                  </button>
                </div>
              </div>

              {selectedExercises.length === 0 ? (
                <div className="bg-[#0a0a0a] border-2 border-dashed border-gray-800 py-32 text-center group cursor-pointer hover:border-yellow-500 transition-all">
                  <ClipboardList size={64} className="mx-auto text-gray-800 mb-4 group-hover:text-yellow-500 transition-colors" />
                  <h2 className="text-2xl font-black text-gray-700 uppercase italic tracking-tighter group-hover:text-white">AÑADE EJERCICIOS DESDE EL PANEL DERECHO</h2>
                  <p className="text-gray-600 text-xs font-bold mt-2 uppercase">Tu progreso empieza con la primera serie.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {selectedExercises.map((ex, exIdx) => (
                    <Card key={`${ex.id}-${exIdx}`} title={ex.name} className="relative border-r-4 border-yellow-500">
                      <button 
                        onClick={() => removeExercise(exIdx)}
                        className="absolute top-4 right-4 text-red-500 hover:bg-red-500/10 p-2 rounded transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                      
                      <div className="mt-4 space-y-2">
                        <div className="grid grid-cols-6 text-[10px] font-black text-gray-600 uppercase px-4 tracking-widest">
                          <span>SERIE</span>
                          <span className="col-span-2">PESO (KG)</span>
                          <span className="col-span-2">REPS</span>
                          <span className="text-right">BORRAR</span>
                        </div>
                        
                        {ex.sets.map((set, setIdx) => (
                          <div key={setIdx} className="grid grid-cols-6 items-center bg-[#050505] p-3 border border-gray-900 group hover:border-yellow-500 transition-all">
                            <span className="font-black text-yellow-500 italic text-lg">#{setIdx + 1}</span>
                            <div className="col-span-2">
                              <input 
                                type="number" 
                                className="bg-black border border-gray-800 text-white p-2 w-24 outline-none focus:border-yellow-500 font-bold"
                                value={set.weight}
                                onChange={(e) => updateSet(exIdx, setIdx, 'weight', e.target.value)}
                              />
                            </div>
                            <div className="col-span-2">
                              <input 
                                type="number" 
                                className="bg-black border border-gray-800 text-white p-2 w-24 outline-none focus:border-yellow-500 font-bold"
                                value={set.reps}
                                onChange={(e) => updateSet(exIdx, setIdx, 'reps', e.target.value)}
                              />
                            </div>
                            <div className="text-right">
                              <button className="text-gray-700 hover:text-red-500 transition-colors">
                                 <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                        
                        <button 
                          onClick={() => addSet(exIdx)}
                          className="w-full mt-4 py-3 bg-gray-900/30 border border-gray-800 text-gray-500 font-black uppercase text-[10px] tracking-[0.2em] hover:text-yellow-500 hover:border-yellow-500 transition-all"
                        >
                          + AÑADIR SERIE A LA FRAGUA
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-yellow-500 text-black p-3 font-black italic uppercase text-center tracking-tighter">
            ARSENAL DISPONIBLE
          </div>
          <div className="bg-[#111] p-2 space-y-2 max-h-[800px] overflow-y-auto border border-gray-800 custom-scrollbar">
            {EXERCISE_DATABASE.map(ex => (
              <div 
                key={ex.id}
                onClick={() => addExercise(ex.id, ex.name)}
                className="flex items-center gap-3 bg-black p-2 border-l-2 border-gray-800 hover:border-yellow-500 cursor-pointer group transition-all"
              >
                <div className="w-10 h-10 bg-gray-900 flex-shrink-0 border border-gray-800">
                  <img src={ex.imageUrl} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="font-black text-[11px] text-white group-hover:text-yellow-500 uppercase truncate leading-tight tracking-tight">{ex.name}</h4>
                  <p className="text-[9px] text-gray-600 font-black uppercase">{ex.mainMuscle}</p>
                </div>
                <Plus size={14} className="text-gray-800 group-hover:text-yellow-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
