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
    { field: 'species_name', flex: 1, headerName: 'Species Name', minWidth: 150}
  
  ];

  export const SpeciesTable = (props) => {
    return (
      <div style={{ height: 400, width: '60%', margin: 'auto', padding: '40px'}}>
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