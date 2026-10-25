const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// DOM Elements
const loadBtn = document.getElementById('load-btn');
const submitBtn = document.getElementById('submit-btn');
const statusEl = document.getElementById('status');
const noteForm = document.getElementById('note-form');
const titleInput = document.getElementById('title-input');
const bodyInput = document.getElementById('body-input');
const notesList = document.getElementById('notes-list');

// Helper function to show status messages
function showStatus(message, className) {
    statusEl.textContent = message;
    statusEl.className = className;
}

// Reusable async request function
async function request(url, options = {}) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return await response.json();
    }
    return null;
}

// GET: Load 10 notes
async function loadNotes() {
    loadBtn.disabled = true;
    showStatus('Loading notes...', 'loading');
    notesList.innerHTML = '';

    try {
        const notes = await request(`${API_URL}?_limit=10`);
        
        if (!notes || notes.length === 0) {
            showStatus('No notes found.', 'error');
            return;
        }

        showStatus('Loaded 10 notes from the server.', 'success');
        
        notes.forEach(note => {
            renderNoteItem(note.id, note.title, note.body);
        });
    } catch (error) {
        showStatus('Failed to load notes. Please try again.', 'error');
        console.error(error);
    } finally {
        loadBtn.disabled = false;
    }
}

// POST: Create a new note
async function createNote(event) {
    event.preventDefault();
    
    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    // Validation
    if (!title) {
        showStatus('Title is required.', 'error');
        return;
    }
    if (title.length > 100) {
        showStatus('Title must be maximum 100 characters.', 'error');
        return;
    }

    submitBtn.disabled = true;
    showStatus('Creating note...', 'loading');

    try {
        const newNoteData = {
            title: title,
            body: body,
            userId: 1
        };

        const result = await request(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(newNoteData)
        });

        const assignedId = result.id || 101;
        showStatus(`Note created (status 201, id ${assignedId}).`, 'success');

        // Add to the top of the list securely using textContent
        renderNoteItem(assignedId, title, body, true);

        // Clear form
        noteForm.reset();
    } catch (error) {
        showStatus('Failed to create note. Please try again.', 'error');
        console.error(error);
    } finally {
        submitBtn.disabled = false;
    }
}

// DELETE: Remove a note
async function deleteNote(id, listItem) {
    try {
        await request(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        listItem.remove();
        showStatus(`Note ${id} deleted successfully.`, 'success');

        if (notesList.children.length === 0) {
            showStatus('No notes available in the list.', 'loading');
        }
    } catch (error) {
        showStatus(`Failed to delete note ${id}.`, 'error');
        console.error(error);
    }
}

// Helper to render a single note item securely with textContent
function renderNoteItem(id, title, body, prepend = false) {
    const li = document.createElement('li');

    const contentDiv = document.createElement('div');
    const h3 = document.createElement('h3');
    h3.textContent = title;
    
    const p = document.createElement('p');
    p.textContent = body;

    contentDiv.appendChild(h3);
    contentDiv.appendChild(p);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteNote(id, li);

    li.appendChild(contentDiv);
    li.appendChild(deleteBtn);

    if (prepend) {
        notesList.prepend(li);
    } else {
        notesList.appendChild(li);
    }
}

// Event Listeners
loadBtn.addEventListener('click', loadNotes);
noteForm.addEventListener('submit', createNote);