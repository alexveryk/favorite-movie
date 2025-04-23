export const truncatedText = (text, maxLength = 17) => {
  return text.length > maxLength ? `${text.slice(0, maxLength + 1)}…` : text;
};
