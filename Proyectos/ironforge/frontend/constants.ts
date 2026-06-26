
import { Exercise, MuscleGroup, ExerciseType, DifficultyLevel } from './types';

export const COLORS = {
  PRIMARY: '#FFC107', // Amarillo
  SECONDARY: '#000000', // Negro
  ACCENT: '#222222',
  WHITE: '#FFFFFF'
};

export const EXERCISE_DATABASE: Exercise[] = [
  {
    id: 'ex-1',
    name: 'Press de Banca con Barra',
    mainMuscle: MuscleGroup.CHEST,
    secondaryMuscles: [MuscleGroup.TRICEPS, MuscleGroup.SHOULDERS],
    type: ExerciseType.STRENGTH,
    level: DifficultyLevel.INTERMEDIATE,
    equipment: 'Barra',
    imageUrl: 'https://picsum.photos/seed/benchpress/400/300',
    description: 'El press de banca es el ejercicio rey para el desarrollo del torso superior.',
    techniqueTips: ['Mantener los pies plantados', 'Retracción escapular siempre']
  },
  {
    id: 'ex-2',
    name: 'Sentadilla Libre con Barra',
    mainMuscle: MuscleGroup.LEGS,
    secondaryMuscles: [MuscleGroup.CORE, MuscleGroup.BACK],
    type: ExerciseType.STRENGTH,
    level: DifficultyLevel.ADVANCED,
    equipment: 'Barra',
    imageUrl: 'https://picsum.photos/seed/squat/400/300',
    description: 'Ejercicio fundamental para el tren inferior y la fuerza general.',
    techniqueTips: ['Bajar hasta romper el paralelo', 'No colapsar las rodillas']
  },
  {
    id: 'ex-3',
    name: 'Peso Muerto Convencional',
    mainMuscle: MuscleGroup.BACK,
    secondaryMuscles: [MuscleGroup.LEGS, MuscleGroup.CORE],
    type: ExerciseType.STRENGTH,
    level: DifficultyLevel.ADVANCED,
    equipment: 'Barra',
    imageUrl: 'https://picsum.photos/seed/deadlift/400/300',
    description: 'Mueve grandes cargas y fortalece toda la cadena posterior.',
    techniqueTips: ['Espalda neutra', 'Barra pegada a las tibias']
  },
  {
    id: 'ex-4',
    name: 'Dominadas Pronas',
    mainMuscle: MuscleGroup.BACK,
    secondaryMuscles: [MuscleGroup.BICEPS],
    type: ExerciseType.STRENGTH,
    level: DifficultyLevel.INTERMEDIATE,
    equipment: 'Peso Corporal',
    imageUrl: 'https://picsum.photos/seed/pullups/400/300',
    description: 'El mejor ejercicio de tracción vertical para una espalda ancha.',
    techniqueTips: ['Rango completo de movimiento', 'Barbilla por encima de la barra']
  },
  {
    id: 'ex-5',
    name: 'Press Militar de Pie',
    mainMuscle: MuscleGroup.SHOULDERS,
    secondaryMuscles: [MuscleGroup.TRICEPS, MuscleGroup.CORE],
    type: ExerciseType.STRENGTH,
    level: DifficultyLevel.INTERMEDIATE,
    equipment: 'Barra',
    imageUrl: 'https://picsum.photos/seed/ohp/400/300',
    description: 'Desarrolla hombros potentes y estabilidad del core.',
    techniqueTips: ['Glúteos apretados', 'Bloqueo vertical de los brazos']
  }
];
