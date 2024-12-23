const app = document.getElementById('app');
app.style.height = "100vh";
app.style.margin = "0";
app.style.overflow = "hidden";
app.style.background = "linear-gradient(to bottom, #87CEEB, #00BFFF)"; // Sky background

const totalTracks = 8;
const maxParticipants = 20;

// Array to store participants' names
let participantNames = new Array(totalTracks).fill('').map((_, i) => `Participant ${i + 1}`);

const rottweilers = [
    'rottweiler1.png',
    'rottweiler2.png',
    'rottweiler3.png',
    'rottweiler4.png',
    'rottweiler5.png'
];

function createTrack(index, scaleFactor) {
    const track = document.createElement('div');
    track.classList.add('track');
    track.style.height = `${100 / totalTracks}%`;

    const rottweiler = document.createElement('img');
    rottweiler.src = rottweilers[index % rottweilers.length];
    rottweiler.classList.add('rottweiler');
    rottweiler.style.left = '0';

    const size = `${100 * scaleFactor}px`;
    rottweiler.style.width = size;
    rottweiler.style.height = size;

    const nameTag = document.createElement('div');
    nameTag.classList.add('name-tag');
    nameTag.textContent = participantNames[index];

    track.appendChild(rottweiler);
    track.appendChild(nameTag);
    app.appendChild(track);
}

function initializeRace() {
    app.innerHTML = ''; // Clear existing tracks

    const scaleFactor = Math.min(1.5, 5 / totalTracks); // Adjust size based on participants

    for (let i = 0; i < totalTracks; i++) {
        createTrack(i, scaleFactor);
    }
}

function startRace(duration) {
    const rottweilerElements = document.querySelectorAll('.rottweiler');

    rottweilerElements.forEach(rottweiler => {
        const raceTime = Math.random() * duration + duration; // Randomize finish time
        const keyframes = [
            { transform: 'translateX(0)' },
            { transform: `translateX(calc(100% - 50px))` }
        ];
        const timing = {
            duration: raceTime * 1000,
            easing: 'cubic-bezier(0.42, 0, 0.58, 1)' // Smooth easing
        };
        rottweiler.animate(keyframes, timing);

        setTimeout(() => {
            rottweiler.style.transform = `translateX(calc(100% - 50px))`;
        }, raceTime * 1000);
    });

    setTimeout(() => {
        const rottweilerElementsArray = Array.from(rottweilerElements);
        const winner = rottweilerElementsArray.sort((a, b) => {
            const aLeft = a.getBoundingClientRect().left;
            const bLeft = b.getBoundingClientRect().left;
            return bLeft - aLeft;
        })[0];

        const winnerIndex = rottweilerElementsArray.indexOf(winner);
        alert(`The winner is ${participantNames[winnerIndex]}!`);
    }, duration * 1000 + 1000);
}

// User interaction to set names and duration
function configureRace() {
    const nameInputs = prompt(`Enter up to ${totalTracks} participant names separated by commas:`);
    if (nameInputs) {
        participantNames = nameInputs.split(',').map(name => name.trim()).slice(0, totalTracks);
    }

    const raceTimeInput = prompt('Enter the race duration in seconds (e.g., 10):');
    const raceDuration = parseFloat(raceTimeInput) || 10;

    initializeRace();
    setTimeout(() => startRace(raceDuration), 2000);
}

// Initialize the race with the default configuration
configureRace();
