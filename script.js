// Images des participants
const rottweilerImages = [
    'rottweiler1.png',
    'rottweiler2.png',
    'rottweiler3.png',
    'rottweiler4.png',
    'rottweiler5.png',
    'rottweiler6.png',
    'rottweiler7.png',
    'rottweiler8.png',
    'rottweiler9.png',
    'rottweiler10.png',
];

// Fonction pour démarrer la course
function startRace() {
    const raceTrack = document.getElementById('race-track');
    const numRottweilers = parseInt(document.getElementById('numRottweilers').value);
    const raceTime = parseInt(document.getElementById('raceTime').value) * 1000;

    // Réinitialiser la piste
    raceTrack.innerHTML = '';
    raceTrack.style.height = `${numRottweilers * 60}px`;

    // Créer les participants
    for (let i = 0; i < numRottweilers; i++) {
        const rottweiler = document.createElement('img');
        rottweiler.src = rottweilerImages[i % rottweilerImages.length];
        rottweiler.className = 'rottweiler';
        rottweiler.style.top = `${i * 60}px`;
        rottweiler.style.left = '0px';
        raceTrack.appendChild(rottweiler);
    }

    // Lancer la course
    const participants = document.querySelectorAll('.rottweiler');
    let finishLine = raceTrack.offsetWidth - 100; // Position de la ligne d'arrivée

    participants.forEach((rottweiler) => {
        const randomDistance = Math.random() * finishLine;
        setTimeout(() => {
            rottweiler.style.transform = `translateX(${randomDistance}px)`;
        }, Math.random() * raceTime);
    });

    // Déterminer le gagnant
    setTimeout(() => {
        let winner = null;
        let maxDistance = 0;

        participants.forEach((rottweiler, index) => {
            const transform = rottweiler.style.transform;
            const distance = parseFloat(transform.match(/translateX\((\d+(\.\d+)?)px\)/)[1]);
            if (distance > maxDistance) {
                maxDistance = distance;
                winner = index + 1;
            }
        });

        alert(`Le gagnant est le participant #${winner} !`);
    }, raceTime + 100); // Ajoutez un peu de temps pour la transition
}
