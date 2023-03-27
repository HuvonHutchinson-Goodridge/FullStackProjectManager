//Material UI
import { Box, Grid, Button, useTheme, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

//React
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

//Formik
import { Formik, Form } from 'formik'

//Files
import { tokens } from "./../../theme"
import { fetchPage} from './../../store/actions'

const FormattedDataGrid = ({ styles, header, subHeader, rows, columns, ...props }) => {
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