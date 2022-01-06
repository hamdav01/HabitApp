export const validateEmail = (email?: string) =>
  email === undefined
    ? false
    : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
export const validatePassword = (password?: string) =>
  password === undefined ? false : password.length > 5;
