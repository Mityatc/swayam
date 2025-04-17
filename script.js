document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.neumorphic-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Add a small delay to the scale animation
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        });
    });
}); 