//From Material UI
import { Box, Grid, useTheme, TextField } from '@mui/material';

//Files
import { tokens } from "./../../theme"


const InputBar = ({ md, ...props }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Grid item md={md} ml="15px">
            <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
                <TextField
                    {...props}
                    fullWidth
                    id={props.id}
                    onBlur={props.onBlur}
                    name={props.name}
                    label={props.label}
                    value={props.value}
                    variant="filled"
                    type="text"
                    onChange={props.onChange}
                    error={props.error}
                />
            </Box>
            <Box>
                {props.error && props.helperText}
            </Box>
        </Grid>
    )
}

export default InputBar;