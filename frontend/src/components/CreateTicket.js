import React from "react";

function CreateTicket({ grade, seats, price, addr, onDataChange, onCreate }) {
  // grade: 'VIP',
  // seats: 70,
  // price: 70000,
  // addr: 'something',

  return (
    <div>
      <input type="text" name="grade" placeholder="등급" onChange={onDataChange} value={grade} />
      &nbsp;&nbsp;
      <input type="text" name="seats" placeholder="좌석 수" onChange={onDataChange} value={seats} />
      &nbsp;&nbsp;
      <input type="text" name="price" placeholder="가격" onChange={onDataChange} value={price} />
      &nbsp;&nbsp;
      <input type="file" name="addr" placeholder="파일" onChange={onDataChange} value={addr} />
      &nbsp;&nbsp;
      <button onClick={onCreate}>추가</button>
    </div>
  );
}

export default CreateTicket;
