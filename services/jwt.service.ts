
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRET_KEY ?? "Secret";

const jwtService = {
  generateToken: (payload: object, expiresIn: string = '1h'): string => {
    return jwt.sign(payload, secret);
    // return jwt.sign(payload, secret, { expiresIn }); // TODO : need to check type for expiresIn 
 
  },
  verifyToken :(token: string) => {
    try {
      return jwt.verify(token, secret);
    } catch (error: any) {
      console.log('[ verifyToken error: ]', error);
      if (error.name === 'TokenExpiredError') {
        throw new Error('Token expired');
      }
      throw new Error('Invalid token');
    }
  }
}

export default jwtService;