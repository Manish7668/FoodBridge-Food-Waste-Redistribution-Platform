import type {Response} from 'express';
export const ok=(res:Response,data:unknown,message='OK',status=200)=>res.status(status).json({success:true,data,message});
export const fail=(res:Response,code:string,message:string,status=400,details?:unknown)=>res.status(status).json({success:false,error:{code,message,details}});
