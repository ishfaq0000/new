document.addEventListener('DOMContentLoaded', () => {
    loadContacts();

    const contactForm = document.getElementById('contactForm');
    const clearFormButton = document.getElementById('clearForm');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('contactId').value;
        const contact = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        if (id) {
            // Update existing contact
            await fetch(`http://localhost:8080/api/contacts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contact)
            });
        } else {
            // Create new contact
            await fetch('http://localhost:8080/api/contacts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contact)
            });
        }

        contactForm.reset();
        document.getElementById('contactId').value = '';
        loadContacts();
    });

    clearFormButton.addEventListener('click', () => {
        contactForm.reset();
        document.getElementById('contactId').value = '';
    });
});

async function loadContacts() {
    const response = await fetch('http://localhost:8080/api/contacts');
    const contacts = await response.json();
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = '';

    contacts.forEach(contact => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.email}</td>
            <td>${contact.message}</td>
            <td class="action-buttons">
                <button class="edit" onclick="editContact(${contact.id})">Edit</button>
                <button class="delete" onclick="deleteContact(${contact.id})">Delete</button>
            </td>
        `;
        contactList.appendChild(row);
    });
}

async function editContact(id) {
    const response = await fetch(`http://localhost:8080/api/contacts/${id}`);
    const contact = await response.json();
    document.getElementById('contactId').value = contact.id;
    document.getElementById('name').value = contact.name;
    document.getElementById('email').value = contact.email;
    document.getElementById('message').value = contact.message;
}

async function deleteContact(id) {
    await fetch(`http://localhost:8080/api/contacts/${id}`, {
        method: 'DELETE'
    });
    loadContacts();
}