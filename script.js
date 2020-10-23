let myLibrary = [];

function Book(title, author, totalPages, genre, currentPage) {
  this.title = title;
  this.author = author;
  this.totalPages = totalPages;
  this.genre = genre;
  this.currentPage = currentPage;
}


// ==================== add new book to library ====================

// add book button
document.getElementById("add-book").addEventListener("click", openAddBookForm);

function openAddBookForm() {
  document.getElementById("addBookForm").style.display = 'block';
  console.log(localStorage.getItem('books'));
}

// close add book form
document.getElementById("fa-window-close").addEventListener("click", closeAddBookForm);

function closeAddBookForm() {
  document.getElementById("addBookForm").style.display = 'none';
}

// add book to myLibrary 
document.getElementById('new-book-submit').addEventListener('click', addBookToLibrary)

function addBookToLibrary() {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let genre = document.getElementById('genre').value;
  let totalPages = document.getElementById("pages").value;
  let currentPage = document.getElementById("current-page").value; 
  let book = new Book(title, author, totalPages, genre, currentPage);
  setMyLibrary();
  myLibrary.push(book);
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function setMyLibrary() {
  if (localStorage.getItem('myLibrary')) {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'))
  } else {
    myLibrary = []
  }
}


// ==================== console log ====================
console.log(JSON.parse(localStorage.getItem('myLibrary')));
// localStorage.clear();