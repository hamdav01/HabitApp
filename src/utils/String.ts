export const capitalizeFirstLetter = (sentence: string) => {
  const [letter, ...rest] = sentence;
  return `${letter.toUpperCase()}${rest.join('')}`;
};
