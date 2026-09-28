import jwt from 'jsonwebtoken'; import {env} from '../config/env.js';
export type Role='DONOR'|'NGO'|'VOLUNTEER'|'ADMIN';
export const signAccess=(id:string,role:Role)=>jwt.sign({sub:id,role},env.JWT_SECRET,{expiresIn:'15m'});
export const signRefresh=(id:string)=>jwt.sign({sub:id},env.JWT_REFRESH_SECRET,{expiresIn:'7d'});
export const verifyAccess=(token:string)=>jwt.verify(token,env.JWT_SECRET) as {sub:string;role:Role};
