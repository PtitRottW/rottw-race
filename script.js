const app = document.getElementById('app');
app.style.background = "linear-gradient(to bottom, #2c2c2c, #1a1a1a)"; // Adding a dark gray gradient background
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

const names = [
    'Rocky', 'Bella', 'Max', 'Luna', 'Duke', 'Charlie', 'Molly', 'Buddy', 'Daisy', 'Jack',
    'Sophie', 'Oliver', 'Chloe', 'Teddy', 'Maggie', 'Cooper', 'Lucy', 'Jake', 'Ruby', 'Oscar'
]; // Add up to 20 names

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

const scaleFactor = Math.min(1.5, 5 / totalTracks); // Adjust scale based on the number of participants

for (let i = 0; i < totalTracks; i++) {
    createTrack(i, scaleFactor);
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

setTimeout(startRace, 2000);
