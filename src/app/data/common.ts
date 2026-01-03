import { Hall } from '@/providers/types';
import dayjs from 'dayjs';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function generateString(length: number): string {
   let result = '';
   const charactersLength = characters.length;
   for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }

   return result;
}

export function intoDate(dateStr: string): Date {
   const arr = dateStr.split('T');
   const date = arr[0].split('-');
   const time = arr[1].split(':');

   return new Date(+date[0], +date[1] - 1, +date[2], +time[0], +time[1]);
}

export const hallTime = (hall: Hall, onlyDate = false, customDiff?: number): string => {
   const startDateTime = intoDate(hall.dateTime);
   const dStart = dayjs(startDateTime);
   // Используем customDiff если передан, иначе hall.diff (для обратной совместимости)
   const diff = customDiff !== undefined ? customDiff : hall.diff;
   const dFinish = dStart.add(hall.duration + diff, 'minutes');
   const date = dStart.format('DD.MM.YYYY');
   const timeStart = dStart.format('HH:mm');
   const timeFinish = dFinish.format('HH:mm');
   // return `Время: ${date} с: ${timeStart} по: ${timeFinish}`;
   if (onlyDate) {
      return date;
   }
   return `${date} с: ${timeStart} по: ${timeFinish}`;
};
