import { Request } from "express";
import prisma from "../../prisma/prisma.service"
import { msgs, returnRes } from "../../utils/messages";
import bcrypt from "bcrypt";

const authService = {
    login : () => {

    },
    register: async (req : Request) => {
        console.log('req.body : ', req.body);
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