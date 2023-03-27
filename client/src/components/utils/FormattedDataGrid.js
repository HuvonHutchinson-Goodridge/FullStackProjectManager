//Material UI
import { Grid, useTheme} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

//React
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

//Files
import { tokens } from "./../../theme"
import { fetchPage} from './../../store/actions'

const FormattedDataGrid = ({ fetchPage, styles, header, subHeader, rows, columns, ...props }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        fetchPage(header, subHeader)
    }, [fetchPage,header,subHeader])

    return (<Grid item sx={styles} >
        <DataGrid
            getRowId={(row) => row._id}
            rows={rows}
            columns={columns}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            sx={{ backgroundColor: colors.primary[400] }}
        />
    </Grid>)
}

export default connect(null, {fetchPage})(FormattedDataGrid);