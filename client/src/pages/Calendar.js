import { useState, useEffect } from "react";
import { connect } from 'react-redux'
import  FullCalendar  from "@fullcalendar/react";
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
import timegrid from "@fullcalendar/timegrid";

const Calendar = ({ fetchPage }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [currentEvents, setCurrentEvents] = useState([]);
    //Create modals
    const handleDateClick = (selected) => {
        const title = prompt("Please enter a new title for your event");
        const calendarAPI = selected.view.calendar;
        calendarAPI.unselect();

        if (title) {
            calendarAPI.addEvent({
                id: `${selected.dateStr} - ${title}`,
                title,
                state: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay
            })
        }
    }

    const handleEventClick = (selected) => {
        if (window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`)) {
            selected.event.remove();
        }
    }

    useEffect(() => {
        fetchPage("CALENDAR", "THESE ARE YOUR EVENTS")
    })

    return (<Box m="20px">
        <Grid container wrap="nowrap"md={12}>
            <Grid item md={3} flex="1 1 20%" backgroundColor={colors.primary[400]} p="15px" borderRadius="4px">
                <Typography variant="h5">Events</Typography>
                <List>
                    {currentEvents.map((event) => {
                        <ListItem
                            key={event.id}
                            sx={{
                                backgroundColor: colors.greentAccent[500],
                                margin: "10px 0",
                                borderRadius: "2px"

                            }}>
                            <ListItemText
                                primary={event.title}
                                secondary={<Typography>{formatDate(event.start), {
                                    year: "numeric", month: "short", day: "numeric"
                                }}</Typography>}/>

                            </ListItem>
                    })}
                    </List>
            </Grid>
            <Grid item md={9} flex="1 1 100%" ml="15px">
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
                    eventclick={handleEventClick}
                    eventsSet={events => setCurrentEvents(events)}
                  
                    />
                </Grid>
            </Grid>
    </Box>
        )
}

        export default connect(null, {fetchPage})(Calendar);
