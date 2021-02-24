import { useEffect, useMemo } from "react";
import io from "socket.io-client";
const socketURL = process.env.REACT_APP_UNSPLASH_HOST;

export function useSocket() {
    let mySocket = useMemo(() => {
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
