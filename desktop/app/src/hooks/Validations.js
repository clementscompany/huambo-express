export const StringValidate = (values = []) => {
  for (const value of values) {
    for (const key in value) {
      if (typeof value[key] !== "string" || value[key].trim() === "") {
        return false;
      }
    }
  }
  return true;
}


export const ValidatePassword = (data) => {
  const { password, confirmPassword } = data;
  return password === confirmPassword;
}