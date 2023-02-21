//Components
import ProjectCard from "./../components/ProjectCard"

//Action Creators
import { fetchPage } from "./../store/actions"

//React
import { useEffect } from "react";
import { connect } from "react-redux"

//Material UI
import Grid from "@mui/material/Grid"

const Projects = ({fetchPage, ...props }) => {

    useEffect(() => {
        fetchPage('Projects', "Here are your projects")
    }, [fetchPage])

    const projectArray = props.projects.map((project) => {
        return <ProjectCard
            project={project}
            key={project.name}
            name={project.name}
            description={project.description}
            image={project.image} />
    })

    return (

        <Grid item container overflow="auto" nowrap spacing={1} md={12} ml="5px">
            {projectArray}
        </Grid>

    )
}

const mapStateToProps = ({ projectReducer }) => {
    return {projects: projectReducer}
}

export default connect(mapStateToProps, { fetchPage })(Projects);