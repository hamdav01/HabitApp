export const getTodaysDate = () => {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
};

export const getTimeHours = () => new Date().getHours();
