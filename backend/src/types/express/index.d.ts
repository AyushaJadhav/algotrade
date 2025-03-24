import { IUser } from "../../models/model.user"; 

declare global {
  namespace Express {

    interface Request {
      user?: IUser;
    }
  }
}
