import { Request } from "express";
import prisma from "../../prisma/prisma.service"
import { msgs, returnRes } from "../../utils/messages";
import bcrypt from "bcrypt";

const jobService = {
    getJob : async (req: Request) => {
        try {
              const jobDetails = await prisma.job.findMany({
                where: {
                    isDeleted: false
                }
              });
              if (jobDetails) {
                return returnRes(200, msgs.job.sent, jobDetails);
              }
              return returnRes(400, msgs.somethingWrong);
        } catch (error) {
            console.error('[ getJob error : ]', error);
          return returnRes(400, msgs.somethingWrong);
        }

    },
    createJob: async (req : Request) => {
        const user = (req as any).user;
        const { title, description, location, salary, jobType } = req.body;
        try {

          const jobSavedResponse = await prisma.job.create({
            data: { 
                title, 
                description, 
                location, 
                salary, 
                jobType,
                updateBy: user?.userId
            },
          });
    
          if (jobSavedResponse) {
            return returnRes(200, msgs.job.created, jobSavedResponse);
          }
    
          return returnRes(400, msgs.somethingWrong);
    
        } catch (error: any) {
          console.error('[ createJob error : ]', error);
          return returnRes(400, msgs.somethingWrong);
        }
      },
      updateJob : async (req: Request) => {
        
        try {
            const user = (req as any).user;
            const id = req?.params?.jobId
            if (!id) {
                return returnRes(400, msgs.job.jobIdRequired);
            }
            const isJobExist = await prisma.job.findUnique({ where: {
                id,
                isDeleted: false
            } });
            if (!isJobExist) {
              return returnRes(400, msgs.job.notFound);
            }
            const { title, description, location, salary, jobType } = req.body;
          const updatedJobResponse = await prisma.job.update({
            where : {
                id
            },
            data: { 
                title, 
                description, 
                location, 
                salary, 
                jobType,
                updateBy: user?.userId
            },
          });
    
          if (updatedJobResponse) {
            return returnRes(200, msgs.job.updated, updatedJobResponse);
          }
    
          return returnRes(400, msgs.somethingWrong);
    
        } catch (error: any) {
          console.error('[ updateJob error : ]', error);
          return returnRes(400, msgs.somethingWrong);
        }
      },
      removeJob : async (req:Request) => {
        try {
            const id = req?.params?.jobId
            if (!id) {
                return returnRes(400, msgs.job.jobIdRequired);
            }
            const isJobExist = await prisma.job.findUnique({ where: {
                id,
                isDeleted: false
            } });
            if (!isJobExist) {
              return returnRes(400, msgs.job.notFound);
            }
          const removedJobResponse = await prisma.job.update({
            where : {
                id
            },
            data: { 
                isDeleted: true
            },
          });
    
          if (removedJobResponse) {
            return returnRes(200, msgs.job.deleted, removedJobResponse);
          }
    
          return returnRes(400, msgs.somethingWrong);
    
        } catch (error: any) {
          console.error('[ removeJob error : ]', error);
          return returnRes(400, msgs.somethingWrong);
        }
      },
      applyForJob: async (req : Request) => {
        const { jobId, resumePath } = req.body;
        try {
            const user = (req as any).user;
          const jobResponse = await prisma.jobHasSeeker.create({
            data: { 
                jobId,
                resumePath,
                userId: user?.userId
            },
          });
    
          if (jobResponse) {
            return returnRes(200, msgs.job.applied, jobResponse);
          }
    
          return returnRes(400, msgs.somethingWrong);
    
        } catch (error: any) {
          console.error('[ applyForJob error : ]', error);
          return returnRes(400, msgs.somethingWrong);
        }
      },
}

export default jobService;