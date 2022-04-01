import React from "react";
import styled from "styled-components";

import { makeStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// makeStyles 설정
const useStyles = makeStyles({
  table: {
    display: "flex",
  },
  tableHead: {
    display: "flex",
    flexDirection: "column",
  },
  tableBody: {
    display: "flex",
  },
  tableRow: {
    display: "flex",
    flexDirection: "column",
  },
});

const NftInfoTitle = styled.h3`
  display: inline-block;
  vertical-align: middle;
  margin: 30px;
`;

// 테이블에 넣을 데이터
function createData(owner, contractAddress, tokenID) {
  return { owner, contractAddress, tokenID };
}
const rows = [
  createData("뮤*잉", "0xcA91c657a96Efd0BEDd043A564cBaC3619416281", 141),
];

const NFTInfo = () => {
  const classes = useStyles();

  return (
    <div>
      <NftInfoTitle>NFT 정보</NftInfoTitle>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableRow
            className={classes.tableHead}
            sx={{ "& td": { border: 0, fontWeight: "bold" } }}
          >
            <TableCell align='center'>소유자</TableCell>
            <TableCell align='center'>컨트렉트 주소</TableCell>
            <TableCell align='center'>토큰 ID</TableCell>
          </TableRow>
          <TableBody className={classes.tableBody}>
            {rows.map((row) => (
              <TableRow
                className={classes.tableRow}
                key={row.name}
                sx={{ "& td": { border: 0 } }}
              >
                <TableCell align='center'>{row.owner}</TableCell>
                <TableCell align='center'>{row.contractAddress}</TableCell>
                <TableCell align='center'>{row.tokenID}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default NFTInfo;
