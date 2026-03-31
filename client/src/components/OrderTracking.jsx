import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080"); // backend ka port

export default function OrderTracking({ orderId }) {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    // Join specific order room
    socket.emit("joinOrder", orderId);

    // Listen for location updates from agent
    socket.on("locationUpdated", (coordinates) => {
      console.log("Customer received agent location:", coordinates);
      setCoords(coordinates);
    });

    return () => {
      socket.off("locationUpdated");
    };
  }, [orderId]);

  return (
    <div>
      <h2>Order Tracking for Order ID: {orderId}</h2>
      {coords ? (
        <p>Agent is at: Latitude {coords[1]}, Longitude {coords[0]}</p>
      ) : (
        <p>Waiting for agent location...</p>
      )}
    </div>
  );
}
