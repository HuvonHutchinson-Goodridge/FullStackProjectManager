import axios from 'axios';
import handleEndpoints from './handleEndpoints'

export const getAllProjects = handleEndpoints.getAll('projects')

export default {
    getAllProjects
}