
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Dumbbell, ShieldCheck, Mail, Lock, User as UserIcon } from 'lucide-react';
import { authService } from '../../services/authService';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.login(email, password);
      navigate('/dashboard');
    } catch (err) {
      alert("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111] border-2 border-yellow-500 p-8 shadow-[0_0_50px_rgba(255,193,7,0.15)] animate-slideUp">
        <div className="text-center mb-8">
          <Dumbbell className="mx-auto text-yellow-500 mb-2" size={48} strokeWidth={3} />
          <h1 className="text-3xl font-black italic tracking-tighter">IDENTIFICACIÓN <span className="text-yellow-500">PRO</span></h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Acceso restringido a guerreros</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-black uppercase text-gray-500 tracking-widest">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input 
                type="email" 
                required
                className="w-full bg-black border border-gray-800 text-white p-3 pl-10 focus:border-yellow-500 outline-none transition-all font-bold"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black uppercase text-gray-500 tracking-widest">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input 
                type="password" 
                required
                className="w-full bg-black border border-gray-800 text-white p-3 pl-10 focus:border-yellow-500 outline-none transition-all font-bold"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 text-black font-black py-4 uppercase italic tracking-tighter text-lg hover:bg-yellow-400 transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'ACCEDIENDO...' : <><ShieldCheck size={20} /> ENTRAR AL SISTEMA</>}
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <span className="text-gray-500 font-bold uppercase">¿Nuevo aquí? </span>
          <Link to="/register" className="text-yellow-500 font-black uppercase underline">Únete a la élite</Link>
        </div>
      </div>
    </div>
  );
};

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.register(name, email, password);
      alert("Registro exitoso. Ahora inicia sesión.");
      navigate('/login');
    } catch (err) {
      alert("Error en el registro");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111] border-2 border-yellow-500 p-8 shadow-[0_0_50px_rgba(255,193,7,0.15)]">
        <div className="text-center mb-8">
          <UserIcon className="mx-auto text-yellow-500 mb-2" size={48} strokeWidth={3} />
          <h1 className="text-3xl font-black italic tracking-tighter">CREAR <span className="text-yellow-500">CUENTA</span></h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Empieza tu transformación hoy</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-black uppercase text-gray-500">Nombre Completo</label>
            <input 
              type="text" required
              className="w-full bg-black border border-gray-800 text-white p-3 focus:border-yellow-500 outline-none transition-all font-bold"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black uppercase text-gray-500">Email</label>
            <input 
              type="email" required
              className="w-full bg-black border border-gray-800 text-white p-3 focus:border-yellow-500 outline-none transition-all font-bold"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black uppercase text-gray-500">Contraseña</label>
            <input 
              type="password" required
              className="w-full bg-black border border-gray-800 text-white p-3 focus:border-yellow-500 outline-none transition-all font-bold"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 text-black font-black py-4 uppercase italic tracking-tighter text-lg hover:bg-yellow-400 transition-all mt-4"
          >
            {loading ? 'REGISTRANDO...' : 'REGISTRARSE AHORA'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-500 font-bold uppercase">¿Ya tienes cuenta? </span>
          <Link to="/login" className="text-yellow-500 font-black uppercase underline">Identifícate</Link>
        </div>
      </div>
    </div>
  );
};
