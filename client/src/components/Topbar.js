//Color Theme Files
import { tokens } from "./../theme"

//React-Router-Dom
import { useNavigate } from 'react-router-dom'

//Material UI
import { Box, IconButton, useTheme, Button } from "@mui/material";
import InputBase from "@mui/material/InputBase"
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import SearchIcon from "@mui/icons-material/Search"

const TopBar = ({ LogOut }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate()
    return (<Box display="flex" justifyContent="space-between" padding={2}>
        <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
            <IconButton type="button" sx={{ p: 1 }}>
                <SearchIcon />
            </IconButton>
        </Box>
        <Box display="flex">
            <IconButton>
                <NotificationsOutlinedIcon />
            </IconButton>
            <IconButton>
                <SettingsOutlinedIcon />
            </IconButton>
            <IconButton>
                <PersonOutlinedIcon />
            </IconButton>
            <Button color="secondary" variant="contained" onClick={() => LogOut(navigate)}>
                Log Out
            </Button>
        </Box>
    </Box>)
}

export default connect(null, { LogOut })(TopBar);