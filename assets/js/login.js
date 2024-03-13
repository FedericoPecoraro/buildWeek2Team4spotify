function toggleElements() {
    const element2 = document.getElementById('eye-icon-visibile');
    const element1 = document.getElementById('eye-icon-privacy');

    if (element1.style.display === 'none') {
        element1.style.display = 'block';
        element2.style.display = 'none';
    } else {
        element1.style.display = 'none';
        element2.style.display = 'block';
    }
}

document.getElementById('eye-icon-privacy').addEventListener('click', toggleElements);
document.getElementById('eye-icon-visibile').addEventListener('click', toggleElements);

