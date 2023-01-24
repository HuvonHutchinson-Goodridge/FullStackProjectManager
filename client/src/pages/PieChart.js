import { Box, Grid } from "@mui/material";
import { fetchPage } from "./../store/actions"
import { connect } from "react-redux"
import { useEffect } from "react"
import Pie from "./../components/Pie";

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