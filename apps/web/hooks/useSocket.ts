import { useEffect, useState } from "react";
import { WS_URL } from "../app/room/config";


export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() =>{
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiZTIyZDRiOS00MjJmLTQyOTQtOTAzOS1lNDAyZDczYjI4ODMiLCJpYXQiOjE3NTAwNTg5NjV9.Q2p0IKBU3I0PEMv-LbjmJ1VWKDbWLuvu2b0aPMst2tk`);
        ws.onopen = () =>{
            setLoading(false);
            setSocket(ws);
        }
    }, []);

    return {
        socket,
        loading
    }

}