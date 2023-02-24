import { Box, Grid, Button, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

//React
import { useEffect} from 'react'
import { connect } from 'react-redux'

//Formik
import { Formik, Form } from 'formik'

//Files
import { tokens } from "./../theme"
import { fetchPage, createBug, updateBug, deleteBug } from './../store/actions'
import InputBar from './../components/utils/InputBar'

const Bugs = ({ fetchPage, createBug, updateBug, deleteBug, ...props }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const initialValues = {
        bug: "",
        assignedTo: props.currentUser,
        project: props.projectID
    }


    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
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

    const createRows = () => {

        if (props.bugs === undefined) {
            const rows = []
            return rows;
        }
        const rows = props.bugs.map((bug) => {
            return {
                id: bug._id,
                bug: bug.bug,
                assignedTo: bug.assignedTo.firstName + " " + bug.assignedTo.lastName,
                bugStatus: bug.bugStatus
            }
        })
        return rows
    }

    useEffect(() => {
        fetchPage('Bugs', `Bugs for ${props.name}`)
    }, [fetchPage, props.bugReducer, props.name])



    return (
        <Grid>
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
                                Add Bug
                            </Button>
                        </Grid>
                    </Form>)}
            </Formik>
            <Grid item m="5px 0 0 0" p="15px" sx={{
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
                    rows={createRows()}
                    columns={columns}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    sx={{ backgroundColor: colors.primary[400] }}
                />
            </Grid>
        </Grid>
    );
}

const mapStateToProps = ({ selectedProjectReducer, authReducer, bugReducer }) => {
    const { name } = selectedProjectReducer;
    const projectID = selectedProjectReducer.id
    const { id } = authReducer;
    const bugsOnProject = bugReducer.find((bugs) => {
        if (bugs[0] !== undefined && bugs[0].project === projectID) {
            return bugs
        }
    })
    
    return { currentUser: id, name, projectID: selectedProjectReducer.id, bugs: bugsOnProject, bugReducer }
}

export default connect(mapStateToProps, { fetchPage, createBug, updateBug, deleteBug })(Bugs);