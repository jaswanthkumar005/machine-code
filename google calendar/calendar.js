const nonConflictingData = [
    { startTime: "00:00", endTime: "01:30", color: "#f6be23", title: "#TeamDevkode" },
    { startTime: "04:30", endTime: "07:30", color: "#f6501e", title: "#TeamDevkode" },
    { startTime: "12:00", endTime: "13:30", color: "#029be5", title: "#TeamDevkode" },
    { startTime: "09:00", endTime: "10:00", color: "#029be5", title: "#TeamDevkode" },
    { startTime: "16:00", endTime: "19:00", color: "#029be5", title: "#TeamDevkode" },
    { startTime: "20:30", endTime: "22:30", color: "#029be5", title: "#TeamDevkode" },
];

const conflictingData = [
    { startTime: "00:00", endTime: "01:30", color: "#f6be23", title: "#TeamDevkode" },
    { startTime: "03:30", endTime: "07:30", color: "#f6501e", title: "#TeamDevkode" },
    { startTime: "04:30", endTime: "08:30", color: "#f6501e", title: "#TeamDevkode" },
    { startTime: "06:30", endTime: "09:00", color: "#f6501e", title: "Demo" },
    { startTime: "11:00", endTime: "13:30", color: "#029be5", title: "#TeamDevkode" },
    { startTime: "12:00", endTime: "13:30", color: "#029be5", title: "#TeamDevkode" },
    { startTime: "09:30", endTime: "10:30", color: "#029be5", title: "#TeamDevkode" },
    { startTime: "16:00", endTime: "17:00", color: "#029be5", title: "#TeamDevkode" },
    { startTime: "15:00", endTime: "17:00", color: "#029be5", title: "#TeamDevkode" },
    { startTime: "18:00", endTime: "19:00", color: "#f6501e", title: "#TeamDevkode" },
    { startTime: "20:30", endTime: "22:30", color: "#029be5", title: "#TeamDevkode" },
    { startTime: "20:30", endTime: "22:30", color: "#029be5", title: "#TeamDevkode" },
];

// Convert time string to minutes since start of the day
function timeToMinutes(time) {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
}

// Create event blocks
function createEventBlock(event) {
    const startMinutes = timeToMinutes(event.startTime);
    const endMinutes = timeToMinutes(event.endTime);
    const duration = endMinutes - startMinutes;

    const eventBlock = document.createElement("div");
    eventBlock.classList.add("event");
    eventBlock.style.top = `${startMinutes}px`;
    eventBlock.style.height = `${duration}px`;
    eventBlock.style.backgroundColor = event.color;
    eventBlock.innerHTML = `${event.title}<br>${event.startTime} - ${event.endTime}`;

    const arrow = document.createElement("div");
    arrow.classList.add("arrow");
    arrow.style.borderBottomColor = event.color;
    eventBlock.appendChild(arrow);

    return eventBlock;
}

// Render events in the calendar
function renderEvents(calendarId, events) {
    const calendar = document.getElementById(calendarId);
    events.forEach(event => {
        const eventBlock = createEventBlock(event);
        calendar.appendChild(eventBlock);
    });
}

// Generate time labels
function generateTimeLabels(containerId) {
    const container = document.getElementById(containerId);
    for (let hour = 0; hour < 24; hour++) {
        const label = document.createElement("div");
        label.classList.add("time-label");
        label.textContent = `${hour.toString().padStart(2, '0')}:00`;
        container.appendChild(label);
    }
}

// Populate time labels and events
generateTimeLabels("timeLabels");
generateTimeLabels("timeLabels2");
renderEvents("nonConflictingCalendar", nonConflictingData);
renderEvents("conflictingCalendar", conflictingData);

//2.toString().padStart(2, '0')
