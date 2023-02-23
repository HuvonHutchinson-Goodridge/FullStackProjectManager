import authEndpoints from './endpoints/authEndpoints'
import bugEndpoints from './endpoints/bugEndpoints'
import projectEndpoints from './endpoints/projectEndpoints'
import userEndpoints from './endpoints/userEndpoints'

const API = {
    ...authEndpoints,
    ...bugEndpoints,
    ...projectEndpoints,
    ...userEndpoints
}
export default API;