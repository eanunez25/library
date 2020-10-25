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


// ==================== sort myLibrary to three categories ====================

let library = JSON.parse(localStorage.getItem('myLibrary'));

let notStartedBooks = library.filter(pages => (pages.currentPage <= 0));
let startedBooks = library.filter(pages => (pages.currentPage > 0 && pages.currentPage < pages.totalPages));
let finishedBooks = library.filter(pages => (pages.currentPage == pages.totalPages && pages.currentPage > 0));


// ==================== display categories in columns ====================

// notStartedBooks
let notStartedBooksColumn = document.getElementById('not-started-books');

notStartedBooks.forEach(function(book) {
  let blockquote = document.createElement('blockquote');
  let divBook = document.createElement('div');
  let title = document.createElement('p');
  let author = document.createElement('p');
  let genre = document.createElement('p');
  let startButton = document.createElement('a');

  blockquote.className = 'blockquote mb-0';
  divBook.className = 'book';
  title.className = 'title';
  author.className = 'author';
  genre.className = 'genre';
  startButton.className = 'btn btn-primary btn-sm btn-body';
  startButton.id = 'start-book';

  startButton.innerHTML = 'Start'
  title.innerHTML = book.title;
  author.innerHTML = book.author;
  genre.innerHTML = book.genre;

  notStartedBooksColumn.appendChild(blockquote);
  blockquote.appendChild(divBook);
  divBook.appendChild(title);
  divBook.appendChild(author);
  divBook.appendChild(genre);
  blockquote.appendChild(startButton);
});


// ==================== console log ====================
console.log(JSON.parse(localStorage.getItem('myLibrary')));
// localStorage.clear();