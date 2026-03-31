import React, { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

export default function AgentLocation({ orderId }) {
  useEffect(() => {
    // Agent joins the same order room
    socket.emit("joinOrder", orderId);

    // Send live location every time browser detects change
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        console.log("Agent sending:", [longitude, latitude]);

        socket.emit("updateLocation", {
          orderId,
          coordinates: [longitude, latitude],
        });
      },
      (err) => console.error("Error getting location:", err),
      { enableHighAccuracy: true }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [orderId]);

  return <h2>Agent is delivering order {orderId}...</h2>;
}
