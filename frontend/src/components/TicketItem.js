import React from "react";

function TicketItem({ ticket }) {
  return (
    <div>
      <h4>등급: {ticket.grade}</h4>
      <h4>좌석 수: {ticket.seats}</h4>
      <h4>가격: {ticket.price}</h4>
      <h4>파일?: {ticket.addr}</h4>
      <hr />
    </div>
  );
}

export default TicketItem;
