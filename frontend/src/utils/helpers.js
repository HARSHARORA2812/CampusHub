export const getCollegeName = (email) => {
  if (!email) return null;
  const match = email.match(/@([^.]+)\.(edu|ac)/i);
  if (match && match[1]) {
    return match[1]
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  return null;
};
