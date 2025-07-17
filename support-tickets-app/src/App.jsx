import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:4000/api/tickets", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTickets(data));
  }, []);

  return (
    <div>
      <h2>Tickets</h2>
      <ul>
        {tickets.map((t) => (
          <li key={t._id}>
            {t.title} - {t.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
