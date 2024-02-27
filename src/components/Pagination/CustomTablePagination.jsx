import React from 'react';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

const CustomTablePagination = ({
  rows,
  page,
  onPageChange,
  rowsPerPage,
  onChangeRowsPerPage,
}) => {
  const handleChangePage = (event, newPage) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log('event:', event); // Log the event object for debugging
    const newRowsPerPage = event?.target?.value ? +event.target.value : 5;
    console.log('newRowsPerPage:', newRowsPerPage); // Log the new rows per page value for debugging
    onChangeRowsPerPage(newRowsPerPage);
  };

  const handleFirstPageButtonClick = () => {
    onPageChange(0);
  };

  const handleBackButtonClick = () => {
    onPageChange(page - 1);
  };

  const handleNextButtonClick = () => {
    onPageChange(page + 1);
  };

  const handleLastPageButtonClick = () => {
    onPageChange(Math.ceil(rows.length / rowsPerPage) - 1);
  };

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={rows.length}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      labelRowsPerPage="Количество строк на странице"
      ActionsComponent={(props) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            color="inherit"
          >
            <FirstPageIcon />
          </IconButton>
          <IconButton
            onClick={handleBackButtonClick}
            disabled={page === 0}
            color="inherit"
          >
            <KeyboardArrowLeft />
          </IconButton>
          <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(rows.length / rowsPerPage) - 1}
            color="inherit"
          >
            <KeyboardArrowRight />
          </IconButton>
          <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(rows.length / rowsPerPage) - 1}
            color="inherit"
          >
            <LastPageIcon />
          </IconButton>
        </div>
      )}
    />
  );
};

export default CustomTablePagination;
