import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import HeaderNew from "../Header/HeaderNew";
import BackgroundImage from "../../assets/BackgroundMain.jpg";
import Filters from "../Filters/Filters";
import Table from "../Table/MainTable";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center content horizontally
    height: "100vh",
    width: "100vw", 
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "hidden",
  },

  content: {
    display: "flex",
    flex: 1,
    width: "100%",
    justifyContent: "center",
    overflow: "hidden",
    
  },
  header: { width: "100%" },
  filters: {
    flex: 1,
    width: "100%",
    height: "calc(100vh - 100px)%",
    padding: "10px",
    overflowY: "auto",
    boxSizing: "border-box",
    // maxHeight: 'calc(100vh - 100px)', 
  },
  table: {
    flex: 2,
    width: "100%",
    height: "calc(100vh - 100px)%",
    padding: "10px",
    boxSizing: "border-box",
  },
});

const DataShowPage = () => {
  const classes = useStyles();
  const [result, setResult] = useState([]);
  const [rows, setRows] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState(
    "Сделайте запрос, чтобы увидеть данные"
  );
  const [columnHeaders, setColumnHeaders] = useState([
    { id: "date", label: "Дата" },
    { id: "username", label: "Пользователь" },
    { id: "request_body", label: "Запрос" },
  ]);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <HeaderNew />
      </div>
      <div className={classes.content}>
        <div className={classes.filters}>
          <Filters
            setResult={setResult}
            setRows={setRows}
            setColumnHeaders={setColumnHeaders}
            setAdditionalInfo={setAdditionalInfo}
          />
        </div>
        <div className={classes.table}>
          <Table
            result={result}
            rows={rows}
            columnHeaders={columnHeaders}
            additionalInfo={additionalInfo}
          />
        </div>
      </div>
    </div>
  );
};

export default DataShowPage;
