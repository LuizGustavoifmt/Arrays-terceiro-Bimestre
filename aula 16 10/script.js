const participantForm = document.getElementById('participant-form');
const participantsList = document.getElementById('participants-list');
const showParticipantsBtn = document.getElementById('show-participants-btn');
const participantsListContainer = document.getElementById('participants-list-container');
const participants = [];

participantForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Previne o envio padrão do formulário

    const name = document.getElementById('name').value;
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;
    const category = document.getElementById('category').value;

    // Adiciona o participante à lista
    const participant = { name, cpf, email, category };
    participants.push(participant);

    // Envia as informações para o Formspree
    fetch('https://formspree.io/f/xgveerea', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            cpf: cpf,
            email: email,
            category: category
        })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));

    // Limpa os campos do formulário
    participantForm.reset();
});

showParticipantsBtn.addEventListener('click', () => {
    displayParticipants();
});

function displayParticipants() {
    participantsListContainer.style.display = 'block';
    participantsList.innerHTML = '';
    participants.forEach((participant, index) => {
        const participantListItem = document.createElement('li');
        participantListItem.classList.add('participant');
        participantListItem.innerHTML = `
            <p>Nome: ${participant.name}</p>
            <p>CPF: ${participant.cpf}</p>
            <p>Email: ${participant.email}</p>
            <p>Categoria: ${participant.category === '1' ? 'Ouvinte' : participant.category === '2' ? 'Palestrante' : 'Organizador'}</p>
        `;
        participantsList.appendChild(participantListItem);
    });
}

const endEventBtn = document.getElementById('end-event-btn');

endEventBtn.addEventListener('click', () => {
    participantsListContainer.style.display = 'none';
    participantsList.innerHTML = '';
    participants = [];
});
