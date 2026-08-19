document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('#chapter-list li');
    const chapters = document.querySelectorAll('.chapter');

    let isAnimating = false;

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (isAnimating || item.classList.contains('active')) return;
            isAnimating = true;

            const targetId = item.getAttribute('data-target');
            const currentChapter = document.querySelector('.chapter.active-chapter');
            const targetChapter = document.getElementById(targetId);

            // Met à jour le menu visuel
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            if (currentChapter) {
                // 1. Animation de sortie (Poussière Dark Souls)
                currentChapter.classList.add('outgoing');
                
                setTimeout(() => {
                    // Nettoyage après la sortie
                    currentChapter.classList.remove('active-chapter', 'outgoing');
                    
                    // Remonte en haut du parchemin instantanément pendant qu'il n'y a pas de texte
                    window.scrollTo({ top: 0, behavior: 'instant' });

                    // 2. Animation d'entrée (Balayage lumineux)
                    targetChapter.classList.add('active-chapter', 'incoming');
                    
                    setTimeout(() => {
                        // Nettoyage après l'entrée
                        targetChapter.classList.remove('incoming');
                        isAnimating = false;
                    }, 1500); // 1.5s pour l'apparition lumineuse
                    
                }, 1000); // 1s pour la disparition en poussière
            } else {
                // S'il n'y a pas de chapitre actif (sécurité)
                targetChapter.classList.add('active-chapter');
                isAnimating = false;
            }
        });
    });
});
