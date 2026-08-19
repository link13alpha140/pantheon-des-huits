document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('#chapter-list li');
    const chapters = document.querySelectorAll('.chapter');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');

            // Hide all chapters
            chapters.forEach(chapter => chapter.classList.remove('active-chapter'));

            // Show the target chapter
            const targetId = item.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active-chapter');

            // Scroll to top of parchment smoothly
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
});
