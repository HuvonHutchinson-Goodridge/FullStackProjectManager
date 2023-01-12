import { Box, Button, IconButton, Typography, Grid } from "@mui/material"
import { tokens } from "./../theme"
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined"
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { fetchPage } from "./../store/actions"
import { connect } from 'react-redux'
import { useTheme } from "@mui/material";
import StatBox from "./../components/dashboard/StatBox"
import { useEffect } from "react"
import Pie from "./../components/Pie"
const FrontPage = ({ fetchPage }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    useEffect(() => {
        fetchPage("DASHBOARD", "Welcome to your dashboard")
    }, [fetchPage])
    return (
        <Box ml="20px">
            <Grid container alignItems="flex" spacing={1} height="75vh">
                <Grid item md={12}>
                    <Button
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px"
                        }}
                    >
                        <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                        Download Repositories
                    </Button>
                </Grid>
                <Grid container mr="15px" overflow="none">
                    <Grid item md={4} backgroundColor={colors.primary[400]} alignItems="center" justifyContent="center">
                        <StatBox title="123412" subtitle="Projects" progress="0.75" increase="+14%" icon={
                            <EmailOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
                        } />
                    </Grid>
                    <Grid item md={4} backgroundColor={colors.primary[400]} alignItems="center" justifyContent="center">
                        <StatBox title="123412" subtitle="Projects" progress="0.75" increase="+14%" icon={
                            <EmailOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
                        } />
                    </Grid>
                    <Grid item md={4} backgroundColor={colors.primary[400]} alignItems="center" justifyContent="center">
                        <StatBox title="123412" subtitle="Projects" progress="0.75" increase="+14%" icon={
                            <EmailOutlinedIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
                        } />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default connect(null, { fetchPage })(FrontPage);