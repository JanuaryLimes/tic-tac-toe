import { createSocket } from '../socket.io/socket.io';

export const socketMiddleWare = store => {
  const socket = createSocket(store);
  return next => action => {
    if (action.type === 'SOCKET') {
      let room = '';
      let conn = store.getState().connection;
      if (action.event === 'ROOM_CONNECT') {
        room = conn.inputRoom;
      } else {
        room = conn.connectedRoom;
      }
      socket.emit(action.event, room, ...(action.args || []));
    } else {
      next(action);
    }
  };
};
