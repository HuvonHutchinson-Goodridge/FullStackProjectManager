import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "./../../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box width="100%" borderRadius = "3px" height="100%" m="0 15px" p ="5px" backgroundColor={colors.primary[400]}>
            <Box >
                <Box display='flex' justifyContent="space-between">
                    <Box display='flex' justifyContent="center" alignItems="center">
                        {icon}
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            sx={{ color: colors.greenAccent[500] }}>
                            {subtitle}
                        </Typography>
                    </Box>
                    <Box>
                        <ProgressCircle progress={progress} />
                    </Box>
                </Box>

                <Box display="flex" justifyContent="space-between">
                    <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{ color: colors.grey[100] }}>
                        {title}
                    </Typography>
                </Box></Box> </Box>)
}

export default StatBox;