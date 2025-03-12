import { Request } from "express";
import prisma from "../../prisma/prisma.service"
import { msgs, returnRes } from "../../utils/messages";
import bcrypt from "bcrypt";
import jwtService from "../../services/jwt.service";

const authService = {
    login: async (req : Request) => {
        const { email, password } = req.body;
        try {
          const user = await prisma.user.findUnique({ 
            where: { email },
            include: { userHasPassword: true }
          });
          if (!user || user.userHasPassword.length === 0) return returnRes(401, msgs.auth.unauthorized);
    
          const isMatch = await bcrypt.compare(password, user.userHasPassword[0].password);
          if (!isMatch) return returnRes(401, msgs.auth.invalidPassword);
    
          const payload = { userId: user.id, role: user.role }
    
    
          const token = jwtService.generateToken({ userId: user.id, role: user.role }, '1h' );
    
    
          return returnRes(200, msgs.auth.loggedIn, { token, userData : {
              ...payload, firstName: user.firstName, lastName: user.lastName, email: user.email
            }
          });
    
        } catch (error: any) {
          console.error('[ login error : ]',error);
          return returnRes(400, msgs.somethingWrong);
        }
      },
    register: async (req : Request) => {
        const { firstName, lastName, role, email, password } = req.body;
        try {
          const existingUser = await prisma.user.findUnique({ where: { email } });
          if (existingUser) {
            return returnRes(409, msgs.emailExist);
          }
    
          const hashedPassword = await bcrypt.hash(password, 10);
          const userDetails = await prisma.user.create({
            data: { 
              email, 
              firstName, 
              lastName, 
              role,
              userHasPassword: {
                create: {
                    password: hashedPassword
                }
              }  
            },
          });
    
          if (userDetails) {
            const { id, email } = userDetails;
            return returnRes(200, msgs.registered, { id, email });
          }
    
          return returnRes(400, msgs.somethingWrong);
    
        } catch (error: any) {
          console.error('[ register error : ]', error);
          return returnRes(400, msgs.somethingWrong);
        }
      },
}

export default authService