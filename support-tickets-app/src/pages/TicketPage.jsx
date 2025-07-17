import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TicketPage = () => {
  const { id } = useParams(); // from /tickets/:id
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      const res = await axios.get(`/api/tickets/${id}`);
      setTicket(res.data);
    };

    fetchTicket();
    const interval = setInterval(fetchTicket, 5000); // ⏱️ Poll every 5s
    return () => clearInterval(interval);
  }, [id]);

  if (!ticket) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">{ticket.title}</h2>
      <p>Status: <b>{ticket.status}</b></p>
      <p>Created By: {ticket.createdBy}</p>
    </div>
  );
};

export default TicketPage;
