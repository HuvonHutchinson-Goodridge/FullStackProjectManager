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

//NEED TO IMPLEMENT DELETE USER FROM DATABASE

const Team = ({fetchPage, ...props}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        { field: '_id', headerName: 'ID', width: 180},
        {
            field: 'firstName',
            headerName: 'First name',
            flex: 1,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            flex: 1,
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
        },
        {
            field: 'role',
            headerName: 'Role',
            align: "left",
            headerAlign: "left",
            type: 'string',
            flex: 1,
            renderCell: ({ row: { role } }) => {
                return (
                    <Box
                        overflow="hidden"
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            role === "admin" ? colors.greenAccent[600]
                                : colors.greenAccent[700]
                        }
                        borderRadius="4px">
                        {role === "admin" && <AdminPanelSettingsOutlinedIcon />}
                        {role === "user" && <LockOpenOutlinedIcon />}
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            {role}
                        </Typography>
                    </Box>)
            },
            editable: true,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            flex: 1,
            cellClassName: "name-column--cell",
            valueGetter: (params) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
    ];

    useEffect(() => {
        fetchPage("TEAM", "Here is your team");
    }, [fetchPage])

    
    return (
        <Grid item m="40px 0 0 0" p="15px" sx={{
            height: "75vh", width: '100%', "& .MuiDataGrid-root": {
                border: "none",
            },
            "& .MuiDataGrid-cell": {
                 borderBottom: 'none'
            },
            "& .name-column--cell": {
                color: colors.greenAccent[300]
            },
            "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none"
            },
            "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400]
            },
            "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700]
            }

        }
        } >

            <DataGrid
                getRowId={(row) => row._id}
                rows={props.users}
                columns={columns}
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                sx={{ backgroundColor: colors.primary[400] }}
            />
        </Grid>
    );
}

const mapStateToProps = ({ userReducer }) => {
    return {users: userReducer}
}
export default connect(mapStateToProps, { fetchPage })(Team);