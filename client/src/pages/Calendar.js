import { useState, useEffect } from "react";
import { connect } from 'react-redux'
import FullCalendar from "@fullcalendar/react";
import { formatDate } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from '@fullcalendar/list';
import { fetchPage } from './../store/actions'
import {
    Box,
    Grid,
    List,
    ListItem,
    ListItemText,
    Typography,
    useTheme
} from "@mui/material";
import { tokens } from "./../theme";

const Calendar = ({ fetchPage }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [currentEvents, setCurrentEvents] = useState([
    ]);
    //Create modals
    const handleDateClick = (selected) => {
        const title = prompt("Please enter a new title for your event");
        if (title) {
            setCurrentEvents([...currentEvents, {
                id: `${selected.start}: ${title}`,
                title,
                start: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay
            }])
        }
    }

    const handleEventClick = (selected) => {
        if (window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`)) {
            selected.event.remove();

            const newEvents = currentEvents.filter((event) => {
                return event.id !== selected.event._def.publicId
            })
            setCurrentEvents([...newEvents])

        }
    }

    useEffect(() => {
        fetchPage("CALENDAR", "THESE ARE YOUR EVENTS")
    }, [fetchPage, currentEvents])

    const eventList = currentEvents.map((event) => {
        return (<ListItem
            key={event.id}
            sx={{
                backgroundColor: colors.greenAccent[500],
                margin: "10px 0",
                borderRadius: "2px"
            }}>
            <ListItemText
                primary={event.title}
                secondary={< Typography >
                    {formatDate(event.start, { year: "numeric", month: "short", day: "numeric" })}
                </Typography>}
            >
            </ListItemText>

        </ListItem>)
    })

    return (<Box m="20px" padding="20px 10px 10px 0">
        <Grid container wrap="nowrap" md={12} backgroundColor="white" padding="0px 10px 0px 0px" borderRadius="3px">
            <Grid item md={3} flex="1 1 20%" backgroundColor={colors.grey[100]} p="15px" borderRadius="4px">
                <Typography variant="h5">Events</Typography>
                <List>
                    {eventList}
                </List>
            </Grid>
            <Grid item md={9} flex="1 1 100%" ml="10px" padding="20px 10px">
                <FullCalendar height="75vh" plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                    headerToolbar={{
                        left: "prev,next, today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
                    }}
                    initialView="dayGridMonth"
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    select={handleDateClick}
                    events={currentEvents}
                    eventClick={selected => handleEventClick(selected)}
                />
            </Grid>
        </Grid>
    </Box>
    )
}

export default connect(null, { fetchPage })(Calendar);
