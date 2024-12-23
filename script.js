const app = document.getElementById('app');
app.style.height = "100vh";
app.style.margin = "0";
app.style.overflow = "hidden";

const totalTracks = 20;
const rottweilers = [
    'rottweiler1.png',
    'rottweiler2.png',
    'rottweiler3.png',
    'rottweiler4.png',
    'rottweiler5.png'
];

let names = []; // This will hold the participant names entered by the user

// Create a form to collect participant names
const form = document.createElement('form');
form.id = 'participant-form';
form.innerHTML = `
    <h2>Enter Participant Names (Up to ${totalTracks}):</h2>
    <div id="name-inputs">
        ${Array.from({ length: totalTracks }).map((_, i) => `<input type="text" placeholder="Name ${i + 1}" class="name-input">`).join('')}
    </div>
    <button type="submit">Start Race</button>
`;
app.appendChild(form);

form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Collect names from input fields
    const inputs = document.querySelectorAll('.name-input');
    names = Array.from(inputs).map(input => input.value.trim()).filter(name => name !== '');

    if (names.length === 0) {
        alert('Please enter at least one participant name.');
        return;
    }

    // Hide the form and start the race
    form.style.display = 'none';
    startGame();
});

function createTrack(index, scaleFactor) {
    const track = document.createElement('div');
    track.classList.add('track');

    const rottweiler = document.createElement('img');
    rottweiler.src = rottweilers[index % rottweilers.length];
    rottweiler.classList.add('rottweiler');
    rottweiler.style.left = '0';

    const size = `${100 * scaleFactor}px`;
    rottweiler.style.width = size;
    rottweiler.style.height = size;

    const nameTag = document.createElement('div');
    nameTag.classList.add('name-tag');
    nameTag.textContent = names[index] || `Rottweiler ${index + 1}`;

    track.appendChild(rottweiler);
    track.appendChild(nameTag);
    app.appendChild(track);
}

function startGame() {
    const scaleFactor = Math.min(1.5, 5 / names.length); // Adjust scale based on the number of participants

    for (let i = 0; i < names.length; i++) {
        createTrack(i, scaleFactor);
    }

    setTimeout(startRace, 2000);
}

function startRace() {
    const rottweilerElements = document.querySelectorAll('.rottweiler');

    rottweilerElements.forEach(rottweiler => {
        const raceTime = Math.random() * 5 + 5; // 5 to 10 seconds
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
        alert(`The winner is ${names[winnerIndex] || `Rottweiler ${winnerIndex + 1}`}!`);
    }, 11000);
}
