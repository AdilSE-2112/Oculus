import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HeaderNew from '../Header/HeaderNew';
import BackgroundImage from '../../assets/BackgroundMain.jpg';
import Filters from '../Filters/Filters';
import Table from '../Table/Table';

const useStyles = makeStyles({
  container: {
    display: 'grid',
    placeItems: 'center', // Center content vertically
    height: '100vh',
    width: '100vw', // Make the container cover the entire viewport height
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: '120%',
    backgroundPosition: 'center',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridTemplateRows: '92.5px 2fr',
    gridAutoFlow: 'row',
    gridTemplateAreas: `
      "header header header"
      "filters table table"
    `,
  },
  header: { gridArea: 'header', width: '100%', height: '100%' },
  filters: { gridArea: 'filters', border: '1px solid red', width: '100%', height: '100%' },
  table: { gridArea: 'table', border: '1px solid red', width: '100%', height: '100%' },
});

const DataShowPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.header} style={{border: '1px dashed blue', display: 'flex', width: '100%'}}>
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
