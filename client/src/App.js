//Pages
import Home from './pages/Home'
import Login from "./pages/Login"
import Registration from "./pages/Registration"
import Dashboard from "./pages/Dashboard"
import PageLayout from "./components/PageLayout"
import Team from './pages/Team'
import Profile from './pages/Profile'
import Calendar from './pages/Calendar'
import PieChart from './pages/PieChart'
import FrontPage from './pages/FrontPage'
import Projects from './pages/Projects'
import Bugs from './pages/Bugs'

//From React
import { useEffect } from 'react'
import { connect } from 'react-redux'
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'

//Material UI
import { ThemeProvider } from '@mui/material'
import { ColorModeContext, useMode } from './theme'

//ActionCreators
import { loadData } from './store/actions'

const App = (props) => {
    const [theme, colorMode] = useMode();
    const _loadData = props.loadData;

    useEffect(() => {
        const load = async () => {
            if (props.isSignedIn) {
                await _loadData()
            }
        }
        load();
        
    },[props.isSignedIn])
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>

                    <Routes>
                        <Route path="/registration" element={<Registration />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/bug" element={<PageLayout />}>
                            <Route path="team" element={<Team />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="calendar" element={<Calendar />} />
                            <Route path="piechart" element={<PieChart />} />
                            <Route path="frontpage" element={<FrontPage />} />
                            <Route path="projects" element={<Projects />}/>
                            <Route path="projects/details" element={<Bugs />} />
                        </Route>
                    </Routes>

                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

const mapStateToProps = ({ authReducer }) => {
    const { isSignedIn } = authReducer
    return {isSignedIn}
}

export default connect(mapStateToProps, { loadData })(App);
