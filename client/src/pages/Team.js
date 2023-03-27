//Color Theme
import { tokens } from "./../theme"

//Action Creators
import { fetchPage } from "./../store/actions"

//Material UI
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { Box,  Typography } from '@mui/material';
import { useTheme } from "@mui/material"

//React
import { connect } from "react-redux"
import FormattedDataGrid from "../components/utils/FormattedDataGrid";

//NEED TO IMPLEMENT DELETE USER FROM DATABASE

const Team = ({fetchPage, ...props}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const classes = {
        height: "75vh", width: '100%', margin : "40px 0 0 0", padding: "15px", "& .MuiDataGrid-root": {
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
    
    return (
        <FormattedDataGrid header="TEAM" subHeader="HERE IS YOUR TEAM" styles={classes} rows={props.users} columns={columns}/>

    );
}

const mapStateToProps = ({ userReducer }) => {
    return {users: userReducer}
}
export default connect(mapStateToProps, { fetchPage })(Team);