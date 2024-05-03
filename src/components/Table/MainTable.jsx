import React, { useState, useEffect } from "react";
import "../Table/Tables.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CustomTablePagination from "../Pagination/CustomTablePagination";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const MainTable = ({ result, rows, columnHeaders, additionalInfo }) => {
  console.log(result, rows);
  const [source, setSource] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (_rowsPerPage) => {
    setRowsPerPage(_rowsPerPage);
    setPage(0);
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <div className="container">
      <div className="table-container-wrapper">
        <TableContainer
          component={Paper}
          sx={{
            width: "100%",
            mt: 4,
            bgcolor: "transparent",
            boxShadow: "none",
            color: "#fff",
          }}
        >
          <Typography
            variant="subtitle1"
            color="inherit"
            noWrap
            sx={{
              marginRight: 1,
              fontSize: "1.55rem",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: "600",
            }}
          >
            {additionalInfo}
          </Typography>

          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {columnHeaders
                  .filter((header) => source !== "Itap" || header.id !== "id")
                  .map((header) => (
                    <TableCell
                      key={header.id}
                      sx={{
                        fontSize: "12px",
                        fontFamily: "Montserrat, sans-serif",
                        color: "#fff",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {header.label}
                    </TableCell>
                  ))}
                <TableCell align="right"> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {columnHeaders
                    .filter((header) => source !== "Itap" || header.id !== "id")
                    .map((header) => (
                      <TableCell
                        key={header.id}
                        align="left"
                        sx={{
                          fontSize: "12px",
                          fontFamily: "Montserrat, sans-serif",
                          color: "#fff",
                        }}
                      >
                        {header.id === "request_body"
                          ? Array.isArray(row.request_body)
                            ? row.request_body.join(", ")
                            : ""
                          : row[header.id]}
                      </TableCell>
                    ))}
                  <TableCell
                    align="left"
                    sx={{
                      fontSize: "12px",
                      fontFamily: "Montserrat, sans-serif",
                      color: "#fff",
                    }}
                  ></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <ThemeProvider theme={darkTheme}>
        <CustomTablePagination
          rows={rows}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </ThemeProvider>
    </div>
  );
};

export default MainTable;
