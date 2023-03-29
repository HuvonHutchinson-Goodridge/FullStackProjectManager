//Material UI
import { Box, Grid, Button, useTheme, Typography } from '@mui/material';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

//React
import { useState } from 'react'
import { connect } from 'react-redux'

//Formik
import { Formik, Form } from 'formik'

//Files
import { tokens } from "./../theme"
import { fetchPage, createBug, updateBug, deleteBug } from './../store/actions'
import InputBar from './../components/utils/InputBar'
import FormattedDataGrid from './../components/utils/FormattedDataGrid';

const Bugs = ({ fetchPage, createBug, updateBug, deleteBug, ...props }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const classes = {
        height: "75vh", width: '100%', margin: "5px 0 0 0", padding: "15px", "& .MuiDataGrid-root": {
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
    const [seeTeam, setSeeTeam] = useState(false);

    const initialValues = {
        bug: "",
        assignedTo: props.currentUser,
        project: props.projectID
    }


    const columns = [
        { field: '_id', headerName: 'ID', width: 100 },
        {
            field: 'bug',
            headerName: 'Bugs',
            flex: 1,
            type: 'string'
        },
        {
            field: 'assignedTo',
            headerName: 'Assigned To',
            flex: 1,
            type: 'string'
        },
        {
            field: 'bugStatus',
            headerName: 'Bug Status',
            flex: 1,
            type: 'string',
            renderCell: ({ row: { bugStatus, id } }) => {
                return (
                    <Box>
                        <Button sx={{ backgroundColor: colors.greenAccent[500] }} onClick={() => updateBug(id, bugStatus, props.bugs)}>
                            {bugStatus}
                        </Button>
                    </Box>
                )
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            type: 'string',
            renderCell: ({ row: { id, project } }) => {
                return (
                    <Box>
                        <Button sx={{ backgroundColor: colors.greenAccent[500] }} onClick={() => deleteBug(id, project)}>
                            DELETE
                        </Button>
                    </Box>)
            }
        }
    ];

    const teamColumns = [
        { field: '_id', headerName: 'ID', width: 180 },
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

    const createRows = () => {
        if (Object.keys(props.bugs).length === 0) {
            const rows = []
            return rows;
        }
        const rows = new Array();
        for (const bug of Object.values(props.bugs)) {
            rows.push({
                _id: bug._id,
                bug: bug.bug,
                assignedTo: bug.assignedTo.firstName + " " + bug.assignedTo.lastName,
                bugStatus: bug.bugStatus
            })
        }
        return rows
    }

    const handleTeam = () => {
        setSeeTeam(prev => prev === false)
    }

    return (
        <Grid>
            {seeTeam ? '' : 
            <Formik
                onSubmit={(values) => {
                    createBug(values, props.bugs)
                }}
                initialValues={initialValues}
            >
                {({ values, handleBlur, handleChange, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Grid item display="flex" justifyContent="space-between" mr="15px">
                            <InputBar
                                id="bug"
                                label="Bug"
                                name="bug"
                                md={10}
                                value={values.bug}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            <Button color="secondary" variant="contained" type="submit">
                                ADD BUG
                            </Button>
                        </Grid>
                    </Form>)}
                </Formik>
            }
            {seeTeam ?
                <FormattedDataGrid header="TEAM" subHeader="HERE IS YOUR TEAM" styles={classes} rows={props.users}
                    columns={teamColumns} />
                :
                <FormattedDataGrid header="BUGS" subHeader={`Bugs for ${props.name}`.toUpperCase()} styles={classes} rows={createRows()}
                        columns={columns}/>
            }
            <Box display="flex" justifyContent="right" alignItems="flex-start" mr="15px" height= "100px">
                <Button color="secondary" variant="contained" onClick={()=>handleTeam()} >
                    {!seeTeam ? "MANAGE TEAM" : "MANAGE BUGS"}
                </Button>
            </Box>
        </Grid>
    );
}

const mapStateToProps = ({ selectedProjectReducer, authReducer, bugReducer }) => {
    const { name, users } = selectedProjectReducer;
    const projectID = selectedProjectReducer.id
    const { id } = authReducer;
    const bugsOnProject = bugReducer[projectID]

    return {
        currentUser: id, name, projectID: selectedProjectReducer.id, bugs: bugsOnProject, bugReducer,
    users    }
}

export default connect(mapStateToProps, { fetchPage, createBug, updateBug, deleteBug })(Bugs);