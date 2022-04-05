export const getTodaysDate = () => {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
};

export const getTimeHours = () => new Date().getHours();

const weekday = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];
export const getTodaysDay = () => weekday[new Date().getDay()];
