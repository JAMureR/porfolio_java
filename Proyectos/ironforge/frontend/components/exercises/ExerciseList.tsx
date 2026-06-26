
import React, { useState } from 'react';
import { EXERCISE_DATABASE } from '../../constants';
import { Card } from '../shared/Card';
import { Search, Filter, Dumbbell, Zap, Target } from 'lucide-react';
import { MuscleGroup } from '../../types';

export const ExerciseList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [muscleFilter, setMuscleFilter] = useState<string>('');

  const filteredExercises = EXERCISE_DATABASE.filter(ex => 
    ex.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (muscleFilter === '' || ex.mainMuscle === muscleFilter)
  );

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <h1 className="text-5xl font-black italic tracking-tighter">BASE DE <span className="text-yellow-500">DATOS</span></h1>
        
        <div className="flex flex-col sm:flex-row gap-4 flex-1 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input 
              type="text" 
              placeholder="Buscar ejercicio..." 
              className="w-full bg-[#111] border-2 border-gray-800 focus:border-yellow-500 text-white pl-10 pr-4 py-3 font-bold outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="bg-[#111] border-2 border-gray-800 focus:border-yellow-500 text-white px-4 py-3 font-bold outline-none cursor-pointer"
            value={muscleFilter}
            onChange={(e) => setMuscleFilter(e.target.value)}
          >
            <option value="">Todos los Músculos</option>
            {Object.values(MuscleGroup).map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredExercises.map(ex => (
          <ExerciseCard key={ex.id} exercise={ex} />
        ))}
      </div>
      
      {filteredExercises.length === 0 && (
        <div className="text-center py-20">
          <p className="text-2xl font-black text-gray-600 uppercase italic">No se encontraron resultados para tu búsqueda</p>
        </div>
      )}
    </div>
  );
};

const ExerciseCard: React.FC<{ exercise: any }> = ({ exercise }) => (
  <Card noPadding className="group hover:border-white transition-all duration-300">
    <div className="relative h-64 overflow-hidden">
      <img 
        src={exercise.imageUrl} 
        alt={exercise.name} 
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
      />
      <div className="absolute top-0 left-0 p-4">
        <span className="bg-yellow-500 text-black px-3 py-1 text-xs font-black uppercase italic shadow-lg">
          {exercise.level}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
        <h3 className="text-2xl font-black text-white uppercase italic leading-tight">{exercise.name}</h3>
      </div>
    </div>
    
    <div className="p-6 bg-black border-t border-gray-900">
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2 text-gray-400">
          <Target size={16} className="text-yellow-500" />
          <span className="text-xs font-bold uppercase tracking-widest">{exercise.mainMuscle}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <Dumbbell size={16} className="text-yellow-500" />
          <span className="text-xs font-bold uppercase tracking-widest">{exercise.equipment}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <Zap size={16} className="text-yellow-500" />
          <span className="text-xs font-bold uppercase tracking-widest">{exercise.type}</span>
        </div>
      </div>
      
      <p className="text-gray-400 text-sm line-clamp-2 italic mb-6">
        {exercise.description}
      </p>
      
      <button className="w-full bg-gray-900 text-white font-black py-3 uppercase text-xs tracking-widest border border-gray-800 hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all">
        VER DETALLES TÉCNICOS
      </button>
    </div>
  </Card>
);
