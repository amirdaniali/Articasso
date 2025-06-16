// makes a string for a description shorter so it fits in limited space.
export function truncate_string(str, maxLength){
  if (str.length > maxLength) {
    return str.slice(0, maxLength - 3) + '...';
  }
  return str;
};