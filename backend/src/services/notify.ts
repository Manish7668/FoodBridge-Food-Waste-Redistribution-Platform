import {Notification} from '../models/TransactionModels.js'; import {io} from '../server.js';
export async function notify(userId:string,type:string,title:string,message:string,relatedId?:string){const n=await Notification.create({userId,type,title,message,relatedId});io?.to(`user:${userId}`).emit('notification',n);return n}
