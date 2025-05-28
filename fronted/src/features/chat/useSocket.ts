// import { useEffect, useState } from 'react';
// import { io, Socket } from 'socket.io-client';
// import { getCookie } from 'typescript-cookie';

// type UseSocketParams = {
//   category: string;
//   onUnauthorized: () => void;
// };

// export function useSocket({ category, onUnauthorized }: UseSocketParams) {
//   const [socket, setSocket] = useState<Socket | null>(null);

//   useEffect(() => {
//     const token = getCookie('token');
//     const socketInstance = io('http://localhost:3000', {
//       auth: { token },
//     });

//     socketInstance.emit('joinRoom', { category });

//     socketInstance.on('unauthorized', (msg: string) => {
//       alert(msg);
//       onUnauthorized();
//     });

//     setSocket(socketInstance);

//     return () => {
//       socketInstance.disconnect();
//     };
//   }, [category, onUnauthorized]);

//   return socket;
// }
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type UseSocketParams = {
  category: string;
  onUnauthorized: () => void;
};

export const useSocket = ({ category, onUnauthorized }: UseSocketParams) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io('http://localhost:3000');

    socketInstance.emit('joinRoom', { category });

    socketInstance.on('unauthorized', (msg: string) => {
      alert(msg);
      onUnauthorized();
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [category, onUnauthorized]);

  return socket;
}
