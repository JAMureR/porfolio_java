
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Card } from '../shared/Card';

interface WorkoutCalendarProps {
  onDateClick: (dateStr: string) => void;
}

export const WorkoutCalendar: React.FC<WorkoutCalendarProps> = ({ onDateClick }) => {
  // Mock de entrenamientos para visualización
  const events = [
    { title: '💪 PUSH DAY', start: '2025-05-10', backgroundColor: '#FFC107', textColor: '#000', className: 'font-black italic' },
    { title: '🦵 LEG DAY', start: '2025-05-12', backgroundColor: '#FFC107', textColor: '#000', className: 'font-black italic' },
    { title: '🔥 FULL BODY', start: '2025-05-15', backgroundColor: '#333', textColor: '#FFC107', className: 'font-bold border border-yellow-500' },
  ];

  const handleDateClick = (arg: any) => {
    onDateClick(arg.dateStr);
  };

  const handleEventClick = (arg: any) => {
    alert(`Entrenamiento: ${arg.event.title}\nEstado: Completado`);
  };

  return (
    <Card className="p-0 overflow-hidden border-2 border-gray-800">
      <div className="bg-[#111] p-4 md:p-8">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale="es"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek'
          }}
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height="auto"
          dayMaxEvents={true}
          firstDay={1}
        />
      </div>
      <div className="bg-gray-900/50 p-4 border-t border-gray-800 flex flex-wrap gap-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-[10px] font-black uppercase text-gray-400">Completado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border border-yellow-500 rounded-full"></div>
          <span className="text-[10px] font-black uppercase text-gray-400">Programado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
          <span className="text-[10px] font-black uppercase text-gray-400">Perdido</span>
        </div>
      </div>
    </Card>
  );
};
