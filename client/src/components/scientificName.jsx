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
    { field: 'num', flex: 1, headerName: 'Number of Occurrence', minWidth: 150},
    { field: 'state', flex: 1, headerName: 'State', minWidth: 150}
  
  ];

  export const ScientificNameTable = (props) => {
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

