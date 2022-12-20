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
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { ColorModeContext, useMode } from './theme'

const App = () => {
    const [theme, colorMode] = useMode();
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
                            <Route path="frontpage" element={<FrontPage/>}/>
                        </Route>
                    </Routes>

                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}


export default App;
