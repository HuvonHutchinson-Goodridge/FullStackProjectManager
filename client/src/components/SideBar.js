import { useState } from 'react'
import { Box, Drawer, Avatar, List } from '@mui/material';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined"
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined"
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import { Link as RouterLink } from 'react-router-dom'
import { useTheme } from '@mui/material'
import { tokens } from "./../theme"
import Logo from "./../assets/code2.jpg"

const SideBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState("Dashboard")

    const handleListItemClick = (text) => {
        setSelected(text)
    }

    const Item = ({ icon, text, to, selected }) => {
        return (
            <ListItem key={text}
                selected={selected === text}
                disablePadding
                onClick={() => handleListItemClick(text)}
                sx={{
                    "&.Mui-selected": {backgroundColor: colors.primary[400]}
                }}>
                <ListItemButton component={RouterLink} to={to}>
                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                    <ListItemText sx={{ "&.MuiTypography-body1": { backgroundColor: colors.greenAccent[400] } }}>
                        {text}
                    </ListItemText>
                </ListItemButton>
            </ListItem>)
    }
    return (
        <Drawer sx={{
            width: 280,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                p: 2,
                width: 240,
                boxSizing: 'border-box',
                backgroundColor: colors.primary[500],
            }
        }} variant="permanent" anchor="left">
            <Box textAlign="center" m="0 0 15px 0">
                <Typography variant="h3" color={colors.grey[100]} fontWeight="bold" sx={{ m: "10px 0 0 0" }}>ADMINIS</Typography>
            </Box>
            <Box mb="10px">
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Avatar alt="logo" src={Logo} sx={{ width: 100, height: 100, cursor: "pointer"}} />
                </Box>
            </Box>
            <Box textAlign="center">
                <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ m: "10px 0 0 0" }}> Huvon Goodridge</Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>VP Fancy Admin</Typography>
            </Box>
            <List>
                <Item selected={selected} icon={<HomeOutlinedIcon />} text={"Dashboard"} to={'frontpage'} />
            </List>
            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0px 0px 5px" }}>
                Data
            </Typography>
            <List>
                <Item selected={selected} icon={<PeopleOutlinedIcon />} text={"Team"} to={'team'} />
                <Item selected={selected} icon={<FolderSharedOutlinedIcon />} text={"Projects"} to={"projects"} />
            </List>
            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0px 0px 5px" }}>
                Pages
            </Typography>
            <List>
                <Item selected={selected} icon={<PersonOutlinedIcon />} text={"Profile"} to={'profile'} />
                <Item selected={selected} icon={<CalendarTodayOutlinedIcon />} text={"Calendar"} to={'calendar'} />
            </List>
            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0px 0px 5px" }}>
                Charts
            </Typography>
            <List>
                <Item selected={selected} icon={<PieChartOutlineOutlinedIcon />} text={"Pie Chart"} to={'piechart'} />
                <Item selected={selected} icon={<TimelineOutlinedIcon />} text={"Timeline"} to={'timeline'} />
            </List>
        </Drawer>)
}

export default SideBar;