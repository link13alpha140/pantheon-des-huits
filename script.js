document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('#chapter-list li');
    const chapters = document.querySelectorAll('.chapter');

    // 1. Découper tout le texte en spans individuels pour l'animation lettre par lettre
    function wrapTextNodes(element) {
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
        const textNodes = [];
        while (walker.nextNode()) {
            textNodes.push(walker.currentNode);
        }
        
        textNodes.forEach(node => {
            if (!node.nodeValue.trim()) return;
            const parent = node.parentNode;
            if (parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE' || parent.classList.contains('char')) return;
            
            const fragment = document.createDocumentFragment();
            const text = node.nodeValue;
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                if (char.trim() === '') {
                    // Garder les espaces intacts pour ne pas casser la mise en page
                    fragment.appendChild(document.createTextNode(char));
                } else {
                    const span = document.createElement('span');
                    span.className = 'char';
                    span.textContent = char;
                    fragment.appendChild(span);
                }
            }
            parent.replaceChild(fragment, node);
        });
    }

    // Appliquer le découpage sur tous les chapitres
    chapters.forEach(chapter => {
        wrapTextNodes(chapter);
    });

    let isAnimating = false;

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (isAnimating || item.classList.contains('active')) return;
            isAnimating = true;

            const targetId = item.getAttribute('data-target');
            const currentChapter = document.querySelector('.chapter.active-chapter');
            const targetChapter = document.getElementById(targetId);

            // Mise à jour visuelle du menu
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            if (currentChapter) {
                // Animation de SORTIE (Cendres Dark Souls)
                const currentChars = currentChapter.querySelectorAll('.char');
                currentChars.forEach(char => {
                    char.classList.remove('in-anim');
                    char.classList.add('out-anim');
                    // Délai purement aléatoire pour un effet d'évaporation de braises
                    const delay = Math.random() * 0.5;
                    char.style.animationDelay = `${delay}s`;
                });

                // Attendre la fin de l'animation de sortie (0.5s délai max + 0.8s durée = 1.3s)
                setTimeout(() => {
                    currentChapter.classList.remove('active-chapter');
                    window.scrollTo({ top: 0, behavior: 'instant' });

                    // Animation d'ENTRÉE (Apparition magique de gauche à droite)
                    targetChapter.classList.add('active-chapter');
                    const targetChars = targetChapter.querySelectorAll('.char');
                    
                    // Forcer le recalcul du layout pour avoir les vraies positions X
                    targetChapter.offsetWidth; 

                    const chapterWidth = targetChapter.offsetWidth || 800;

                    targetChars.forEach(char => {
                        char.classList.remove('out-anim');
                        char.classList.add('in-anim');
                        
                        // Calcul du délai basé sur la position X du caractère pour un effet de balayage fluide
                        const xRatio = char.offsetLeft / chapterWidth;
                        // Ajout d'un tout petit peu d'aléatoire pour rendre la magie plus organique
                        const noise = Math.random() * 0.2;
                        const delay = (xRatio * 1.0) + noise; 
                        char.style.animationDelay = `${delay}s`;
                    });

                    // Débloquer le clic après l'apparition (1.0s max sweep + 0.2s max noise + 0.8s anim = 2.0s)
                    setTimeout(() => {
                        isAnimating = false;
                    }, 2000);
                }, 1300);
            } else {
                targetChapter.classList.add('active-chapter');
                isAnimating = false;
            }
        });
    });

    // Animation initiale de la première page au chargement
    const initialChapter = document.querySelector('.chapter.active-chapter');
    if (initialChapter) {
        const chars = initialChapter.querySelectorAll('.char');
        chars.forEach(char => {
            char.classList.add('in-anim');
            // Apparition magique aléatoire
            char.style.animationDelay = `${Math.random() * 0.5}s`;
        });
    }
});
