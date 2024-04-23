import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HeaderNew from '../Header/HeaderNew';
import BackgroundImage from '../../assets/BackgroundMain.jpg';
import Filters from '../Filters/Filters';
import Table from '../Table/Table';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    placeItems: 'center', // Center content horizontally and vertically
    minHeight: '100vh', // Ensure the container covers the viewport height
    backgroundImage: `url(${BackgroundImage})`, // Set the background image
    backgroundSize: 'cover', // Cover the entire container with the background image
    backgroundPosition: 'center',
    gridTemplateColumns: '1fr 2fr 2fr', // Define the columns
    gridTemplateRows: 'auto auto auto', // Define the rows
    gridTemplateAreas: `
      "header header header"
      "filters table table"
    `,
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr', // Adjust to single column layout on smaller screens
    },
  },
  header: { gridArea: 'header' },
  filters: { gridArea: 'filters' },
  table: { gridArea: 'table' },
}));



const DataShowPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <HeaderNew />
      </div>
      <div className={classes.filters}>
        <Filters />
      </div>
      <div className={classes.table}>
        <Table />
      </div>
    </div>
  );
};

export default DataShowPage;
