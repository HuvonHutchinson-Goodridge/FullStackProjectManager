import { useEffect, useState } from "react";
import { fetchPage } from "./../store/actions"
import { connect } from "react-redux"
import ProjectCard from "./../components/ProjectCard"
import API from './../api/API'
const Projects = ({ fetchPage }) => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const getProjectData = async () => {
            try {
                const { data } = await API.getAllProjects()
                setProjects(data.data)
            } catch (err) {
                console.log(err);
            }
        }
        fetchPage('Projects', "Here are your projects")
        getProjectData()
    }, [fetchPage])

    const projectArray = projects.map((project) => {
        return <ProjectCard key={project.name} name={project.name} description={project.description}/>
    })

    return (<div>
        {projectArray}
    </div>)
}

export default connect(null, { fetchPage })(Projects);