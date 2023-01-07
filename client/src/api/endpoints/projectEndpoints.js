import axios from 'axios';
import handleEndpoints from './handleEndpoints'

export const getAllProjects = handleEndpoints.getAll('projects')
export const getProject = handleEndpoints.getOne('projects')
export const updateProject = handleEndpoints.updateOne('projects');
export const createProject = handleEndpoints.createOne('projects');
export const deleteProject = handleEndpoints.deleteOne('projects')


export default {
    getAllProjects,
    getProject,
    updateProject,
    createProject,
    deleteProject
}