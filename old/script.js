const academies = JSON.parse(localStorage.getItem('academies')) || [];

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('add-academy')) {
        document.getElementById('add-academy').addEventListener('click', addAcademy);
    }
    if (document.getElementById('update-medals')) {
        document.getElementById('update-medals').addEventListener('click', updateMedals);
    }
    if (document.getElementById('academies-container')) {
        displayAcademies();
    }
});

function addAcademy() {
    const name = document.getElementById('academy-name').value;
    const gold = parseInt(document.getElementById('gold-medals').value) || 0;
    const silver = parseInt(document.getElementById('silver-medals').value) || 0;

    if (name) {
        const academy = { name, gold, silver };
        academies.push(academy);
        localStorage.setItem('academ ies', JSON.stringify(academies));
        alert("Academia añadida con éxito.");
        clearInputs();
    } else {
        alert("Por favor, ingresa el nombre de la academia.");
    }
}

function updateMedals() {
    const name = document.getElementById('academy-name-update').value;
    const gold = parseInt(document.getElementById('gold-medals-update').value) || 0;
    const silver = parseInt(document.getElementById('silver-medals-update').value) || 0;

    const academy = academies.find(a => a.name === name);
    if (academy) {
        academy.gold = gold;
        academy.silver = silver;
        localStorage.setItem('academies', JSON.stringify(academies));
        alert("Medallas actualizadas con éxito.");
        clearUpdateInputs();
    } else {
        alert("Academia no encontrada.");
    }
}

function displayAcademies() {
    const container = document.getElementById('academies-container');
    container.innerHTML = '';

    academies.sort((a, b) => b.gold - a.gold || b.silver - a.silver);

    academies.forEach(academy => {
        const div = document.createElement('div');
        div.classList.add('academy');
        div.innerHTML = `
            <h2>${academy.name}</h2>
            <p>Medallas de Oro: ${academy.gold}</p>
            <p>Medallas de Plata: ${academy.silver}</p>
        `;
        container.appendChild(div);
    });
}

function clearInputs() {
    document.getElementById('academy-name').value = '';
    document.getElementById('gold-medals').value = '';
    document.getElementById('silver-medals').value = '';
}

function clearUpdateInputs() {
    document.getElementById('academy-name-update').value = '';
    document.getElementById('gold-medals-update').value = '';
    document.getElementById('silver-medals-update').value = '';
}