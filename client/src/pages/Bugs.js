import { Box, Grid, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from "@mui/material"
import { tokens } from "./../theme"
import { useEffect, useState } from 'react'
import axios from 'axios'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { fetchPage } from "./../store/actions"
import { connect } from "react-redux"

const BugDataGrid = (props) => {

    useEffect(() => {
        fetchPage('Bugs',`Bugs for ${props.name}`)
    })

    return (<Grid item>
        Bugs;
    </Grid>
        )
}

export default BugDataGrid;