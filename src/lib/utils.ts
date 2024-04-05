export const isValidCoordinate = (value: string, type: string) => {
  // Allow empty value or initial minus sign
  if (!value || value === "-") return true;

  const num = parseFloat(value);
  if (isNaN(num)) return false; // Ensure it's a number

  // Validate based on type
  if (type === "latitude") return num >= -90 && num <= 90;
  if (type === "longitude") return num >= -180 && num <= 180;
  return false;
};