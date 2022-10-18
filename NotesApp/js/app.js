const notesEl = document.querySelector('.notes');
const addBtn = document.querySelector('.note-add');
// 1)create function createNote
// 2)add button and command handler for adding cards
// 3)add styles
// 4)implement editing

function createNote(title, text) {
  const noteEl = document.createElement('div');
  noteEl.classList.add('note');
  noteEl.innerHTML = `
        <div class="note-header">    
            <p id="note-title">${title}</p>
            <textarea id="note-title-input" class="hidden">${title}</textarea>
            <div class="note-actions">
                <button class="note-edit"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="note-delete"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
        <p id="note-text">${text}</p>
        <textarea id="note-textarea" class="hidden">${text}</textarea>
    `;

  const editBtn = noteEl.querySelector('.note-edit');
  const deleteBtn = noteEl.querySelector('.note-delete');
  const titleEl = noteEl.querySelector('#note-title');
  const textEl = noteEl.querySelector('#note-text');
  const titleInputEl = noteEl.querySelector('#note-title-input');
  const textInputEl = noteEl.querySelector('#note-textarea');

  editBtn.addEventListener('click', (e) => {
    titleEl.classList.toggle('hidden'); //toggle adds the class if there is no class, removes it if there is
    textEl.classList.toggle('hidden');

    titleInputEl.classList.toggle('hidden');
    textInputEl.classList.toggle('hidden');
  });

  deleteBtn.addEventListener('click', (e) => {
    noteEl.remove();
  });

  titleInputEl.addEventListener('input', (e) => {
    titleEl.innerText = e.target.value;
  });

  textInputEl.addEventListener('input', (e) => {
    textEl.innerText = e.target.value;
  });
    
  return noteEl;
}

addBtn.addEventListener('click', (e) => {
  const el = createNote('Title', 'Your text');
  notesEl.appendChild(el);
});
