import { Button, Grid } from "@mui/material"
import { tokens } from "./../theme"
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined"
import { fetchPage } from "./../store/actions"
import { connect } from 'react-redux'
import { useTheme } from "@mui/material";
import StatBox from "./../components/dashboard/StatBox"
import { useEffect } from "react"
import Pie from "./../components/Pie"
import Team from "./Team"
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';

const FrontPage = ({ fetchPage, projects }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        fetchPage("DASHBOARD", "Welcome to your dashboard".toUpperCase())
    }, [fetchPage])

    const createBox = (projects) => {

        const projectBox = new Array();

        for (const value of Object.values(projects)) {
            const { name, numOfBugs, bugsResolved } = value;
            projectBox.push(
            <Grid item md={3} key={name} container m="10px 0 0 0" alignItems="center" justifyContent="center">
                <StatBox title={name} subtitle="Project" progress={numOfBugs === 0 ? 0 : Math.trunc(bugsResolved / numOfBugs * 100)} icon={
                    <FolderSharedOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
                } />
                </Grid>
                )
        }
        return projectBox
    }
    return (
        <Grid>
            <Grid item container justifyContent="right" >
                <Button sx={{
                    backgroundColor: colors.blueAccent[700],
                    color: colors.grey[100],
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                    margin: "0 15px 15px 0"
                }} >
                    <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                    Download Repositories
                </Button>
            </Grid>
            <Grid item container overflow="auto" nowrap m="5px 0 0 0">
                {createBox(projects)}
            </Grid>
            <Grid item container>
                <Grid item md={6} height="50vh">
                    <Pie />
                </Grid>
            </Grid>
        </Grid >

    )
}
function mapStateToProps({ projectReducer }) {
    return { projects: projectReducer }
}

export default connect(mapStateToProps, { fetchPage })(FrontPage);