import { Box, Grid, Button, useTheme, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

//React
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'

//Formik
import { Formik, Form} from 'formik'

//Files
import { tokens } from "./../theme"
import { fetchPage } from './../store/actions'
import InputBar from './../components/utils/InputBar'
import API from './../api/API'

const Bugs = ({ fetchPage, ...props }) => {
    const [bugs, setBugs] = useState([])
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
        },
        {
            field: 'assignedTo',
            headerName: 'Assigned To',
            flex: 1,
        },
        {
            field: 'bugStatus',
            headerName: 'Bug Status',
            flex: 1,
        }
    ];

    const createRows = () => {
        const rows = bugs.map((bug) => {
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
        const getAllBugsOnProject = async () => {
            try {
                const { data } = await API.getAllProjects(props.projectID, 'bugs')
                setBugs(data.data)
            } catch (err) {
                console.log(err)
            }
        }
        getAllBugsOnProject()
        fetchPage('Bugs', `Bugs for ${props.name}`)
    }, [fetchPage])

    const logBug = async (values) => {
        
        try {
            const { data } = await API.createBugOnProject(values, 'bugs')
            setBugs([...bugs, data.data])
        } catch (err) {
            console.log(err);
        }
    }
    

    return (
        <Grid>
            <Formik
                onSubmit={(values) => {
                    logBug(values)
                }}
                initialValues={initialValues}
                >
                {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
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

const mapStateToProps = ({ selectedProjectReducer, authReducer }) => {
    const { name} = selectedProjectReducer;
    const { id } = authReducer;
    return { currentUser: id, name, projectID: selectedProjectReducer.id }
}

export default connect(mapStateToProps, { fetchPage })(Bugs);



