import { useEffect, useState } from "react";
import { fetchPage } from "./../store/actions"
import { connect } from "react-redux"
import { ProjectCard } from "./../components/ProjectCard"
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
    return (<div>
        {projects[0].name}
    </div>)
}

export default connect(null, { fetchPage })(Projects);