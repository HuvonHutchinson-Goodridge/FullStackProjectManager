import { useState } from 'react';
import { styled } from '@mui/material/styles';
import  ProjectImage  from './../assets/projectImages/HiRes-17.jpg'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';



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
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    title={props.name}
                   subheader="September 14, 2016"              />
                <CardMedia
                    component="img"
                    height="194"
                    image={ProjectImage}
                    alt="Project Image"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Hello everyone
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
                        <Typography paragraph> Hello everyone</Typography>
                        <Typography paragraph>
                            {props.description}
                        </Typography>
                        <Typography paragraph>
                            {props.description}
                        </Typography>
                        <Typography paragraph>
                            {props.description}
                        </Typography>
                        <Typography>
                            {props.description}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        );
    }

export default ProjectCard;