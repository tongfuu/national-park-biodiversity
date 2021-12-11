import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontSize: 20,
    fontFamily: "Open Sans"
  },
});

const columns = [
  { field: 'trail_name', flex: 1, headerName: 'Trail Name', minWidth: 150},
  { field: 'park_name', flex: 1, headerName: 'Park Name', minWidth: 150}

];

export const TrailsTable = (props) => {
  return (
    <div style={{ height: 400, width: '60%', margin: 'auto', padding: '15px'}}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DataGrid
        rows={props.rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
      </ThemeProvider>
    </div>
  );
}
