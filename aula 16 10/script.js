document.getElementById('participantForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const name = document.getElementById('name').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const email = document.getElementById('email').value.trim();
    const category = document.getElementById('category').value;

    // Verifica se o nome é "ACABOU"
    if (name.toUpperCase() === 'ACABOU') {
        displayResults();
    } else {
        // Adiciona o participante à lista
        addParticipant(name, cpf, email, category);
    }

    this.reset();
});

let participants = [];

function addParticipant(name, cpf, email, category) {
    participants.push({ name, cpf, email, category });
}

function displayResults() {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ''; 

    outputDiv.innerHTML += `<h2>Total de Participantes: ${participants.length}</h2>`;
    
    participants.forEach(participant => {
        outputDiv.innerHTML += `<p>${participant.category} - ${participant.name}</p>`;
    });

    sendToFormspree(participants);
}

async function sendToFormspree(participants) {
    const response = await fetch('https://formspree.io/f/xgveerea', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ participants })
    });

    if (response.ok) {
        console.log('Dados enviados com sucesso!');
    } else {
        console.error('Erro ao enviar os dados:', response.statusText);
    }
}
document.getElementById('clearButton').addEventListener('click', function() {
    participants = []; 
    document.getElementById('output').innerHTML = ''; 
    console.log('Participantes limpos.'); 
});