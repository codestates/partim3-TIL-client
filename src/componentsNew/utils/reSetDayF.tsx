import { resetDayI } from '../../types';

export default function resetDay() {
  let date: resetDayI = {
    year: null,
    month: null,
    day: null,
    hour: null,
    min: null,
  };

  return date;
}
