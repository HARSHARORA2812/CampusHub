/**
 * Extract college name from email address
 * @param {string} email - Email address to parse
 * @returns {string|null} - College name or null
 */
export const getCollegeName = (email) => {
  if (!email) return null;
  // Extract text between @ and .edu/.edu.in/.ac.in
  const match = email.match(/@([^.]+)\.(edu|ac)/i);
  if (match && match[1]) {
    // Capitalize first letter of each word
    return match[1]
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  return null;
};
