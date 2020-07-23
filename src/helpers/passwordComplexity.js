export default (password) => {
  // Minimum of 1 Uppercase Letter
  if (!/[A-Z]/.test(password)) return false;
  // Minimum of 1 lowercase Letter
  if (!/[a-z]/.test(password)) return false;
  // Minimum of 1 Number
  if (!/\d/.test(password)) return false;
  if (!/[-+_@$!%*?&#.,;:[\]{}]/.test(password)) return false;
  return true;
};
