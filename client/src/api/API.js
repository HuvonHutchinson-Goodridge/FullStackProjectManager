import authEndpoints from './endpoints/authEndpoints'
import bugEndpoints from './endpoints/bugEndpoints'
import projectEndpoints from './endpoints/projectEndpoints'
import userEndpoints from './endpoints/userEndpoints'






export default {
    ...authEndpoints,
    ...bugEndpoints,
    ...projectEndpoints,
    ...userEndpoints
}