import { useEffect, useMemo } from "react";
import io from "socket.io-client";
const socketURL = "http://localhost:9999";

export function useSocket() {
  let mySocket = useMemo(() => {
    console.log("aa123");
    return io(socketURL, {
      transports: ["websocket"],
      auth: {
        token: localStorage.getItem("token"),
      },
    });
  }, []);

  useEffect(() => {
    mySocket.connect();
    return () => {
      mySocket.disconnect();
    };
  }, [mySocket]);

  return mySocket;
}
