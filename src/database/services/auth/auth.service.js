import bcrypt from 'bcrypt';

export class AuthService {
  static async comparePassword(inputPassword, storedPassword) {
    const isMatch = await bcrypt.compare(inputPassword, storedPassword);
    return isMatch;
  }

  static async hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
}