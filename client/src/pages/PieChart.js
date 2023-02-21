//Material UI
import { Box, Grid } from "@mui/material";

//React 
import { connect } from "react-redux"
import { useEffect } from "react"

//Components
import Pie from "./../components/Pie";

//Action Creators 
import { fetchPage } from "./../store/actions"

const PieChart = ({ fetchPage }) => {
    useEffect(() => {
        fetchPage("PIE CHART", "PROJECT PROGRESS")
    }, [fetchPage])
    return (
        <Box m="20px" >
            <Grid md={12}>
                <Grid item md={12} height="75vh">
                    <Pie />
                </Grid>
            </Grid>
        </Box>
    )
}

export default connect(null, { fetchPage })(PieChart);