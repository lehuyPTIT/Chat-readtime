import { useEffect, useMemo, useContext } from "react";
import io from "socket.io-client";
import { SocketContext } from "./socket-context";
const socketURL = "http://localhost:9999";

export function useSocket() {
  let mySocket = useMemo(
    () =>
      io(socketURL, {
        transports: ["websocket"],
      }),
    []
  );

  useEffect(() => {
    mySocket.connect();
    return () => {
      mySocket.disconnect();
    };
  }, []);

  return mySocket;
}
