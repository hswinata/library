let myLibrary = [];

class Book {
    constructor(_title, _author, _pages, _hasRead) {
        this.title = _title;
        this.author = _author;
        this.pages = _pages;
        this.hasRead = _hasRead;
    };

    set toggleRead(_hasRead) {
        return this.hasRead = _hasRead;
    };
};

function toggleCard() {
    let items = bookContainer.querySelectorAll('.card');
    items.forEach(item => {
        let indexNumber = item.getAttribute('data-index');
        item.addEventListener('click', e => {
            if(e.target.classList.contains('eyeopen-icon')) {
                e.target.classList.remove('eyeopen-icon');
                e.target.classList.toggle('eyeslash-icon');
                e.target.setAttribute('src', 'images/eye-slash.svg');
                e.target.setAttribute('title', `I haven't read it!`);
                myLibrary[indexNumber].toggleRead = 0;
            } else if (e.target.classList.contains('eyeslash-icon')) {
                e.target.classList.remove('eyeslash-icon');
                e.target.classList.toggle('eyeopen-icon');
                e.target.setAttribute('src', 'images/eye-open.svg');
                e.target.setAttribute('title', `I've read it!`);
                myLibrary[indexNumber].toggleRead = 1;
            };
        })
    });
};

function deleteCard() {
    let items = bookContainer.querySelectorAll('.card');
    items.forEach(item => {g
        item.addEventListener('click', e => {
            if(e.target.classList.contains('trash-icon')) {
                let cardIndex = item.getAttribute('data-index');
                myLibrary.splice(cardIndex, 1);
                item.remove();
            };
        });
    });
};

let bookContainer = document.querySelector('.book-container');
let buttonNew = document.querySelector('.button-new');
buttonNew.addEventListener('click', () => activateModal());

function activateModal() {
    let modal = document.querySelector('.modal');
    let overlay = document.querySelector('#overlay');
    modal.classList.add('active');
    overlay.classList.add('active');
};

let buttonClose = document.querySelector('.button-close');
buttonClose.addEventListener('click', () => closeModal());

function closeModal() {
    let modal = document.querySelector('.modal');
    let overlay = document.querySelector('#overlay');
    modal.classList.remove('active');
    overlay.classList.remove('active');
};

function addBookToLibrary() {
    let _title = document.getElementById('title').value;
    let _author = document.getElementById('author').value;
    let _pages = document.getElementById('pages').value;
    let _hasRead = document.getElementById('hasRead').value;
    let _newBook = new Book(_title, _author, _pages, _hasRead);
    myLibrary.push(_newBook);
    render();
};

function render() {
    bookContainer.innerHTML = "";
    myLibrary.forEach((card, index) => {
        let cardContainer = document.createElement('div');
        bookContainer.append(cardContainer);
        cardContainer.classList.add('card');

        cardContainer.setAttribute('data-index', index);

        let sentence = `${card.title} by ${card.author}`;
        cardContainer.append(sentence);

        let actionIcons = document.createElement('div');
        let trashIcon = document.createElement('img');
        let eyeOpenIcon = document.createElement('img');
        let eyeSlashIcon = document.createElement('img');

        cardContainer.append(actionIcons);
        actionIcons.classList.add('action-icons');

    if (card.hasRead == "1") {
        actionIcons.append(eyeOpenIcon);
        eyeOpenIcon.setAttribute('src', 'images/eye-open.svg');
        eyeOpenIcon.classList.add('eyeopen-icon');
        eyeOpenIcon.setAttribute('title', `I've read it!`);

    } else if (card.hasRead == "0") {
        actionIcons.append(eyeSlashIcon);
        eyeSlashIcon.setAttribute('src', 'images/eye-slash.svg');
        eyeSlashIcon.classList.add('eyeslash-icon');
        eyeSlashIcon.setAttribute('title', `I haven't read it!`);
        };

        actionIcons.append(trashIcon);
        trashIcon.classList.add('trash-icon');
        trashIcon.setAttribute('src', 'images/trash.svg');
        trashIcon.setAttribute('title', 'Delete');
    })
};

let form = document.querySelector('form'); 
form.addEventListener('submit', e => {
    e.preventDefault();
    addBookToLibrary();
    form.reset();
    closeModal();
    deleteCard();
    toggleCard();
});