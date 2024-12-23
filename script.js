document.addEventListener('DOMContentLoaded', () => {
    const raceTrack = document.getElementById('race-track');
    const startButton = document.getElementById('start-button');
    const winnerDisplay = document.getElementById('winner');
    const rottweilers = [];
    const numRottweilers = 5; // Nombre de rottweilers dans la course

    // Créer les couloirs et les rottweilers
    for (let i = 0; i < numRottweilers; i++) {
        const lane = document.createElement('div');
        lane.classList.add('lane');
        lane.style.top = `${i * 60}px`;

        const rottweiler = document.createElement('div');
        rottweiler.classList.add('rottweiler');
        rottweiler.id = `rottweiler-${i + 1}`;

        lane.appendChild(rottweiler);
        raceTrack.appendChild(lane);
        rottweilers.push(rottweiler);
    }

    // Fonction pour lancer la course
    function startRace() {
        winnerDisplay.textContent = ''; // Réinitialiser le gagnant
        startButton.disabled = true; // Désactiver le bouton pendant la course

        let finished = false;

        rottweilers.forEach((rottweiler, index) => {
            rottweiler.style.left = '0px'; // Réinitialiser les positions
        });

        const interval = setInterval(() => {
            rottweilers.forEach((rottweiler) => {
                const progress = parseInt(rottweiler.style.left || 0, 10);
                const randomStep = Math.floor(Math.random() * 10); // Avancement aléatoire
                const newProgress = progress + randomStep;

                rottweiler.style.left = `${newProgress}px`;

                if (newProgress >= raceTrack.offsetWidth - 60 && !finished) {
                    finished = true;
                    clearInterval(interval);
                    const winnerId = rottweiler.id;
                    winnerDisplay.textContent = `${winnerId.replace('rottweiler-', 'Rottweiler ')} a gagné la course ! 🎉`;
                    startButton.disabled = false; // Réactiver le bouton
                }
            });
        }, 100);
    }

    startButton.addEventListener('click', startRace);
});
