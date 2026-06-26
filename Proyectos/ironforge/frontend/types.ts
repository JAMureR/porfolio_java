
export type Role = 'USER' | 'ADMIN';

export interface BodyMeasurements {
  weight: number; // kg
  height: number; // cm
  neck?: number;
  waist?: number;
  hip?: number;
  bodyFat?: number;
  bmi?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  bio?: string;
  createdAt: string;
  measurements?: BodyMeasurements;
}

export enum MuscleGroup {
  CHEST = 'Pecho',
  BACK = 'Espalda',
  LEGS = 'Piernas',
  SHOULDERS = 'Hombros',
  BICEPS = 'Bíceps',
  TRICEPS = 'Tríceps',
  CORE = 'Core',
  FULL_BODY = 'Cuerpo Completo'
}

export enum ExerciseType {
  STRENGTH = 'Fuerza',
  CARDIO = 'Cardio',
  MOBILITY = 'Movilidad'
}

export enum DifficultyLevel {
  BEGINNER = 'Principiante',
  INTERMEDIATE = 'Intermedio',
  ADVANCED = 'Avanzado'
}

export interface Exercise {
  id: string;
  name: string;
  mainMuscle: MuscleGroup;
  secondaryMuscles: MuscleGroup[];
  type: ExerciseType;
  level: DifficultyLevel;
  equipment: string;
  imageUrl: string;
  description: string;
  techniqueTips: string[];
}

export interface WorkoutSet {
  id: string;
  reps: number;
  weight: number;
  rir?: number;
  rest?: number;
}

export interface WorkoutExercise {
  id: string;
  exerciseId: string;
  exerciseName: string;
  sets: WorkoutSet[];
  notes?: string;
}

export interface Workout {
  id: string;
  userId: string;
  name: string;
  date: string;
  durationMinutes: number;
  type: string;
  exercises: WorkoutExercise[];
  notes?: string;
  totalVolume?: number;
}
