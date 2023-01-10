import { Box, Grid, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from "@mui/material"
import { tokens } from "./../theme"
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchPage } from './../store/actions'
import API from './../api/endpoints/projectEndpoints'

const Bugs = ({ fetchPage, ...props }) => {
    const [bugs, setBugs] = useState([])
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const createRows = () => {
        const rows = bugs.map((bug, index, array) => {
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
                console.log(data.data);
                setBugs(data.data)
            } catch (err) {
                console.log(err)
            }
        }
        getAllBugsOnProject()
        fetchPage('Bugs', `Bugs for ${props.name}`)
    }, [fetchPage])


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

    return (
        <Grid item m="40px 0 0 0" p="15px" sx={{
            height: "70vh", width: '100%', "& .MuiDataGrid-root": {
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
            <Box display="flex" justifyContent="end" mb="5px">
                <Button color="secondary" variant="contained" type="submit">
                    Add Bug
                </Button>
            </Box>

            <DataGrid
                
                rows={createRows()}
                columns={columns}
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
                sx={{ backgroundColor: colors.primary[400] }}
            />
        </Grid>
    );
}

const mapStateToProps = ({ projectReducer }) => {
    const { name, id } = projectReducer;
    return { name, projectID: id }
}

export default connect(mapStateToProps, { fetchPage })(Bugs);



