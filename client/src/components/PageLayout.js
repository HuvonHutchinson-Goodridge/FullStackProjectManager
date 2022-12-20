import React from 'react'
import Topbar from './Topbar';
import SideBar from './SideBar'
import Header from './Header'
import { useTheme, Grid } from "@mui/material"
import { Outlet } from 'react-router-dom'
import { tokens } from "./../theme"
import { connect } from 'react-redux'

const PageLayout = ({headerTitle, headerSubtitle}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Grid container wrap="nowrap" spacing={1} height={"101vh"} backgroundColor={colors.primary[500]} justifyContent="center">
            <Grid item width="240px">
                <SideBar />
            </Grid>
            <Grid item md={12}>
                <Grid item>
                    <Topbar />
                </Grid>
                <Grid item>
                    <Header title={headerTitle} subtitle={headerSubtitle} />
                    <Outlet />
                </Grid>
            </Grid>

        </Grid>

    )

}

const mapStateToProps = (state) => {
    const { title, subtitle } = state.pageReducer
    return {
        headerTitle: title,
        headerSubtitle: subtitle
    }
}

export default connect(mapStateToProps)(PageLayout);