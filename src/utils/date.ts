import { format, setDay, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';

export const getNextStreamDate = () => {
  // Set to December 9th, 2023 at 10:00 AM
  const firstSession = new Date(2023, 11, 9, 10, 0, 0, 0);
  return firstSession;
};

export const formatDate = (date: Date) => {
  return format(date, 'EEEE d MMMM', { locale: fr });
};

export const formatTime = (date: Date) => {
  return format(date, 'HH:mm');
};