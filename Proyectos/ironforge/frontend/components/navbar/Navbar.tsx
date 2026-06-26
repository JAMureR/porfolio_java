
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Dumbbell, User as UserIcon, LogOut, Home, Search, Calendar as CalendarIcon } from 'lucide-react';
import { authService } from '../../services/authService';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = authService.isAuthenticated();
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="bg-black border-b-2 border-yellow-500 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-yellow-500 p-1 rounded-sm rotate-45">
              <Dumbbell className="text-black w-7 h-7 -rotate-45" strokeWidth={3} />
            </div>
            <span className="text-3xl font-black text-white tracking-tighter italic">
              IRON<span className="text-yellow-500 underline decoration-2 underline-offset-4">FORGE</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {isAuthenticated ? (
                <>
                  <NavLink to="/dashboard" icon={<Home size={18} />}>Dashboard</NavLink>
                  <NavLink to="/exercises" icon={<Search size={18} />}>Ejercicios</NavLink>
                  <NavLink to="/workouts" icon={<CalendarIcon size={18} />}>Entrenos</NavLink>
                  <NavLink to="/profile" icon={<UserIcon size={18} />}>Perfil</NavLink>
                  <button 
                    onClick={handleLogout}
                    className="text-gray-300 hover:bg-yellow-500 hover:text-black px-4 py-2 rounded-sm text-sm font-black flex items-center gap-2 transition-all border border-transparent hover:border-yellow-500"
                  >
                    <LogOut size={18} /> SALIR
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-white hover:text-yellow-500 px-3 py-2 text-sm font-bold uppercase tracking-widest">Entrar</Link>
                  <Link to="/register" className="bg-yellow-500 text-black px-6 py-2 rounded-sm text-sm font-black hover:bg-yellow-400 transition-colors uppercase italic shadow-[4px_4px_0px_rgba(255,255,255,0.2)]">Unirse</Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-yellow-500 hover:bg-gray-800"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {isAuthenticated ? (
            <>
              <MobileNavLink to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</MobileNavLink>
              <MobileNavLink to="/exercises" onClick={() => setIsOpen(false)}>Ejercicios</MobileNavLink>
              <MobileNavLink to="/workouts" onClick={() => setIsOpen(false)}>Entrenamientos</MobileNavLink>
              <MobileNavLink to="/profile" onClick={() => setIsOpen(false)}>Perfil</MobileNavLink>
              <button onClick={handleLogout} className="text-red-500 w-full text-left block px-3 py-2 text-base font-bold uppercase">LOGOUT</button>
            </>
          ) : (
            <>
              <MobileNavLink to="/login" onClick={() => setIsOpen(false)}>Entrar</MobileNavLink>
              <MobileNavLink to="/register" onClick={() => setIsOpen(false)}>Unirse</MobileNavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

const NavLink: React.FC<{ to: string, icon: React.ReactNode, children: React.ReactNode }> = ({ to, icon, children }) => (
  <Link
    to={to}
    className="text-gray-300 hover:text-yellow-500 px-3 py-2 rounded-md text-sm font-black uppercase flex items-center gap-2 transition-all border-b-2 border-transparent hover:border-yellow-500 italic"
  >
    {icon} {children}
  </Link>
);

const MobileNavLink: React.FC<{ to: string, onClick: () => void, children: React.ReactNode }> = ({ to, onClick, children }) => (
  <Link
    to={to}
    onClick={onClick}
    className="text-gray-300 hover:bg-yellow-500 hover:text-black block px-3 py-2 rounded-md text-base font-bold uppercase transition-all italic"
  >
    {children}
  </Link>
);
