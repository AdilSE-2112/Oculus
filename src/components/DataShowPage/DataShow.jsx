import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HeaderNew from '../Header/HeaderNew';
import BackgroundImage from '../../assets/BackgroundMain.jpg';
import Filters from '../Filters/Filters';
import Table from '../Table/Table';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center content horizontally
    height: '100vh',
    width: '100vw', // Make the container cover the entire viewport height
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  content: {
    display: 'flex',
    flex: 1,
    width: '100%',
    justifyContent: 'center', // Center content horizontally
  },
  header: { width: '100%', },
  filters: { flex: 1, border: '1px solid red', width: '100%', padding: '10px',},
  table: { flex: 2, border: '1px solid red', width: '100%',  padding: '10px',},
});

const DataShowPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <HeaderNew />
      </div>
      <div className={classes.content}>
        <div className={classes.filters}>
          <Filters />
        </div>
        <div className={classes.table}>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default DataShowPage;
