import { User } from "./User";

declare global {
  namespace Express {
    interface User extends User {}

    interface Request {
      user?: User;
      isAuthenticated : boolean;
    }
  }
}
