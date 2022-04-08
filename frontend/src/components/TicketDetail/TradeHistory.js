import React from "react";

import styled from "styled-components";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(date, market, seller, owner, price, bill) {
  return { date, market, seller, owner, price, bill };
}

const rows = [
  createData(
    "2021.12.01 13:08",
    "Marketplace",
    "jamminpunch3",
    "도랏맨",
    3800000,
    "KRW",
  ),
  createData(
    "2021.12.01 13:01",
    "Drops",
    "류재춘",
    "jamminpunch3",
    0.14,
    "BTC",
  ),
];

const TradeHistoryTitle = styled.h2`
  display: inline-block;
  vertical-align: middle;
  margin: 30px;
`;

const TradeHistory = () => {
  const editionNum = 156;

  return (
    <div>
      <TradeHistoryTitle>에디션 #{editionNum} 거래 이력</TradeHistoryTitle>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow
              sx={{
                borderBottom: "1px solid black",
                "& th": {
                  fontWeight: "bold",
                },
              }}
            >
              <TableCell align='center'>거래일시</TableCell>
              <TableCell align='center'>마켓</TableCell>
              <TableCell align='center'>판매자</TableCell>
              <TableCell align='center'>소유자</TableCell>
              <TableCell align='center'>금액</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "& td": { border: 0 },
                }}
              >
                <TableCell align='center'>{row.date}</TableCell>
                <TableCell align='center'>{row.market}</TableCell>
                <TableCell align='center'>{row.seller}</TableCell>
                <TableCell align='center'>{row.owner}</TableCell>
                <TableCell align='center'>
                  {row.price} {row.bill}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TradeHistory;
