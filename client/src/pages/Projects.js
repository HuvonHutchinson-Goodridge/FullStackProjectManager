import { useEffect, useState } from "react";
import { fetchPage } from "./../store/actions"
import { connect } from "react-redux"
import ProjectCard from "./../components/ProjectCard"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import API from './../api/API'
const Projects = ({ fetchPage }) => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const getProjectData = async () => {
            try {
                const { data } = await API.getAllProjects()
                console.log(data.data)
                setProjects(data.data)
            } catch (err) {
                console.log(err);
            }
        }
        fetchPage('Projects', "Here are your projects")
        getProjectData()
    }, [fetchPage])

    const projectArray = projects.map((project) => {
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

export default connect(null, { fetchPage })(Projects);