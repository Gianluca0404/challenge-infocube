const express = require('express');
const { DateTime } = require('luxon');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// GENERATORE DI AGENDA DINAMICA (14 giorni con impegni variabili)
const generateAgenda = () => {
    const agenda = {};
    const today = DateTime.now().startOf('day');
    for (let i = 0; i < 14; i++) {
        const dateStr = today.plus({ days: i }).toISODate();
        if (i % 3 === 0) {
            agenda[dateStr] = [
                { title: "Review Progetto", start: `${dateStr}T09:30:00`, end: `${dateStr}T11:00:00` },
                { title: "Lunch Meeting", start: `${dateStr}T13:00:00`, end: `${dateStr}T14:30:00` },
                { title: "Sync Tecnica", start: `${dateStr}T16:00:00`, end: `${dateStr}T17:30:00` }
            ];
        } else if (i % 2 === 0) {
            agenda[dateStr] = [
                { title: "Focus Work", start: `${dateStr}T10:00:00`, end: `${dateStr}T12:00:00` }
            ];
        } else {
            agenda[dateStr] = []; // Giorno libero
        }
    }
    return agenda;
};

const myAgenda = generateAgenda();

// LOGICA CALCOLO SLOT
const calculateSlots = (date, occupiedEvents, duration) => {
    const workStart = DateTime.fromISO(`${date}T08:00:00`);
    const workEnd = DateTime.fromISO(`${date}T18:00:00`);
    let availableSlots = [];
    let currentTime = workStart;

    const sortedEvents = occupiedEvents.sort((a, b) => DateTime.fromISO(a.start) - DateTime.fromISO(b.start));

    sortedEvents.forEach(event => {
        const eventStart = DateTime.fromISO(event.start);
        const eventEnd = DateTime.fromISO(event.end);

        if (currentTime.plus({ minutes: duration }) <= eventStart) {
            availableSlots.push({
                start: currentTime.toFormat('HH:mm'),
                end: eventStart.toFormat('HH:mm'),
                type: 'free'
            });
        }
        if (eventEnd > currentTime) currentTime = eventEnd;
    });

    if (currentTime.plus({ minutes: duration }) <= workEnd) {
        availableSlots.push({
            start: currentTime.toFormat('HH:mm'),
            end: workEnd.toFormat('HH:mm'),
            type: 'free'
        });
    }
    return availableSlots;
};

app.post('/api/get-slots', (req, res) => {
    const { date, duration } = req.body;
    
    // Validazione: Non accettare date passate
    const chosenDate = DateTime.fromISO(date);
    const today = DateTime.now().startOf('day');
    
    if (chosenDate < today) {
        return res.status(400).json({ error: "Data non valida: non puoi viaggiare nel passato!" });
    }

    const events = myAgenda[date] || [];
    const slots = calculateSlots(date, events, parseInt(duration));
    
    res.json({
        date,
        occupied: events.map(e => ({
            ...e,
            start: DateTime.fromISO(e.start).toFormat('HH:mm'),
            end: DateTime.fromISO(e.end).toFormat('HH:mm'),
            type: 'busy'
        })),
        available: slots,
        isWeekend: [6, 7].includes(chosenDate.weekday)
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`\n🚀 AGENDA PRO AVVIATA`);
    console.log(`🔗 Link: http://localhost:${PORT}\n`);
});