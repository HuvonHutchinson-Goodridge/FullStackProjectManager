import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid'



const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


const ProjectCard = (props) => {
    const [expanded, setExpanded] = useState(false);


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Grid item md={3}>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    title={props.name}                />
                <CardMedia
                    component="img"
                    height="194"
                    image={require(`../assets/projectImages/${props.image}`)}
                    alt="Project Image"
                />
                <CardContent>
                    <Typography variant="h6" color="text.secondary">
                        {props.name}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph> Description: </Typography>
                        <Typography paragraph>
                            {props.description}
                        </Typography>

                    </CardContent>
                </Collapse>
            </Card>
        </Grid>
    );
}

export default ProjectCard;