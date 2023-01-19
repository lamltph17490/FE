import { io } from "socket.io-client";
export const REALTIME_SERVER = "ws://localhost:8000";


export const SocketEvent = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  NOTIFICATION : 'notification',
  NEWNOTIFICATION : 'newNotification',
  CHANGESTATUSBOOKING : 'changeStatusBooking',
  USERLISTNOTIFICATION : 'userListNotification',
  NEWUSERNOTIFICATION : "newUserNotification"
};
Object.freeze(SocketEvent);

export const socket = io(REALTIME_SERVER, {
  autoConnect: true,
  forceNew: true,
  transports: ["websocket"],
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionAttempts: 10,
  // query: {
  //   token: user?.token,
  // },
  
});