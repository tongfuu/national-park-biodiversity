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
  { field: 'trail_name', flex: 1, headerName: 'Trail Name', minWidth: 150}

];

export const TrailsTable = (props) => {
  return (
    <div style={{ height: 330, width: '100%'}}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DataGrid
        rows={props.rows}
        columns={columns}
        pageSize={4}
        rowsPerPageOptions={[4]}
      />
      </ThemeProvider>
    </div>
  );
}
