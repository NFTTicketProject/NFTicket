import React, { useRef, useState } from "react";
import CreateTicket from "./CreateTicket";
import TicketItem from "./TicketItem";

// function TicketList({ tickets, setTickets, detailInfo, setDetailInfo }) {
function TicketList() {
  const [tickets, setTickets] = useState([
    // {
    //   id: '',
    //   grade: '',
    //   seats: '',
    //   price: '',
    //   addr: '',
    // },
  ]);
  const nextId = useRef(0);

  const [inputs, setInputs] = useState({
    grade: "",
    seats: "",
    price: "",
    addr: "",
  });
  const { grade, seats, price, addr } = inputs;

  // '추가' 버튼 누르면 동작하는 함수
  const onCreate = (e) => {
    e.preventDefault();
    const ticket = {
      id: nextId.current,
      grade,
      seats,
      price,
      addr,
    };
    // 티켓에 저장
    setTickets([...tickets, ticket]);
    // 추가 버튼 클릭 후 초기화
    setInputs({ grade: "", seats: "", price: "", addr: "" });
    nextId.current++;
  };

  const onDataChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
    // setDetailInfo({ ...detailInfo, ticketInfo: tickets });
  };

  // console.log(tickets);
  // setDetailInfo({ ...detailInfo, ticketInfo: tickets });
  return (
    <div>
      <CreateTicket
        grade={grade}
        seats={seats}
        price={price}
        addr={addr}
        onDataChange={onDataChange}
        onCreate={onCreate}
      />
      {/* 확인용 */}
      {tickets.map((ticket) => (
        <TicketItem ticket={ticket} key={ticket.id} />
      ))}
    </div>
  );
}

export default TicketList;
