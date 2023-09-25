// Define the Book class
class Book {
  constructor(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
  }

  toggleRead() {
    this.hasRead = !this.hasRead;
  }
}

// Define a library array to store books
const myLibrary = [];

// DOM elements
const bookContainer = document.querySelector(".book-container");
const buttonNew = document.querySelector(".button-new");
const buttonClose = document.querySelector(".button-close");
const form = document.querySelector("form");
const modal = document.querySelector(".modal");
const overlay = document.querySelector("#overlay");

// Event listeners
buttonNew.addEventListener("click", activateModal);
buttonClose.addEventListener("click", closeModal);
form.addEventListener("submit", handleFormSubmit);

// Event delegation for card clicks
bookContainer.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("eyeopen-icon") ||
    e.target.classList.contains("eyeslash-icon")
  ) {
    const cardIndex = e.target.closest(".card").getAttribute("data-index");
    myLibrary[cardIndex].toggleRead();
    renderLibrary();
  } else if (e.target.classList.contains("trash-icon")) {
    const cardIndex = e.target.closest(".card").getAttribute("data-index");
    removeBook(cardIndex);
  }
});

// Function to activate the modal
function activateModal() {
  modal.classList.add("active");
  overlay.classList.add("active");
}

// Function to close the modal
function closeModal() {
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

// Function to handle form submission
function handleFormSubmit(e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const hasRead = document.getElementById("hasRead").value === "1";
  addBookToLibrary(title, author, pages, hasRead);
  form.reset();
  closeModal();
}

// Function to add a new book to the library
function addBookToLibrary(title, author, pages, hasRead) {
  const newBook = new Book(title, author, pages, hasRead);
  myLibrary.push(newBook);
  renderLibrary();
}

// Function to remove a book from the library
function removeBook(index) {
  myLibrary.splice(index, 1);
  renderLibrary();
}

// Function to render the library
function renderLibrary() {
  bookContainer.innerHTML = "";
  myLibrary.forEach((book, index) => {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card");
    cardContainer.setAttribute("data-index", index);
    const sentence = `${book.title} by ${book.author}`;
    cardContainer.innerHTML = sentence;
    const actionIcons = document.createElement("div");
    actionIcons.classList.add("action-icons");
    const eyeIcon = document.createElement("img");
    eyeIcon.setAttribute(
      "src",
      book.hasRead ? "images/eye-open.svg" : "images/eye-slash.svg"
    );
    eyeIcon.classList.add(book.hasRead ? "eyeopen-icon" : "eyeslash-icon");
    eyeIcon.setAttribute(
      "title",
      book.hasRead ? `I've read it!` : `I haven't read it!`
    );
    const trashIcon = document.createElement("img");
    trashIcon.setAttribute("src", "images/trash.svg");
    trashIcon.classList.add("trash-icon");
    trashIcon.setAttribute("title", "Delete");
    actionIcons.appendChild(eyeIcon);
    actionIcons.appendChild(trashIcon);
    cardContainer.appendChild(actionIcons);
    bookContainer.appendChild(cardContainer);
  });
}

// Initial rendering
renderLibrary();
