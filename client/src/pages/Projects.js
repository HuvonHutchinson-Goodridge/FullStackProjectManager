import { useEffect, useState } from "react";
import { fetchPage } from "./../store/actions"
import { connect } from "react-redux"
import { ProjectCard } from "./../components/ProjectCard"
import axios from 'axios'
const Projects = ({ fetchPage }) => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        const getProjectData = async () => {
            try {
                const { data } = await axios.get("/api/v1/projects", {

                    headers: {
                        "Content-type": "application/json"
                    }
                })
                console.log(data.data.data[0].name)
                setProjects(data.data.data)

            } catch (err) {
                console.log(err);
            }

        }
        fetchPage('Projects', "Here are your projects")
        getProjectData()
    }, [fetchPage])
    return (<div>
        hello
    </div>)
}

export default connect(null, { fetchPage })(Projects);