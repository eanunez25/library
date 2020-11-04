let myLibrary = [];

function Book(title, author, totalPages, genre, currentPage, id) {
  this.title = title;
  this.author = author;
  this.totalPages = totalPages;
  this.genre = genre;
  this.currentPage = currentPage;
  this.id = id;
}


// ==================== add new book to library ====================

// add book button
document.getElementById("add-book").addEventListener("click", openAddBookForm);

function openAddBookForm() {
  document.getElementById("addBookForm").style.display = 'block';
}


// close add book form
document.getElementById("fa-window-close-add").addEventListener("click", closeAddBookForm);

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
  let id = setId();
  let book = new Book(title, author, totalPages, genre, currentPage, id);
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

function setId() {
  let library = JSON.parse(localStorage.getItem('myLibrary'));
  if (library == null) {
    return 0
  } else {
    return library.length;
  }
}


// ==================== sort myLibrary to three categories ====================
let library = JSON.parse(localStorage.getItem('myLibrary'));

let notStartedBooks = library.filter(pages => (parseInt(pages.currentPage) <= 0) || pages.currentPage == "");
let startedBooks = library.filter(pages => (parseInt(pages.currentPage) > 0 && parseInt(pages.currentPage) < parseInt(pages.totalPages)));
let finishedBooks = library.filter(pages => (parseInt(pages.currentPage) == parseInt(pages.totalPages) && parseInt(pages.currentPage) > 0));


// ==================== display categories in columns ====================

// add 'by' in front of author name if one is given
function authorCheck(book) {
  if (book.author == "") {
    return ""
  } else {
    return "by " + book.author
  }
}

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
  startButton.className = 'btn btn-primary btn-sm btn-body start-book';
  startButton.id = 'start-book' + book.id;

  startButton.innerHTML = 'Start'
  title.innerHTML = book.title;
  author.innerHTML = authorCheck(book);
  genre.innerHTML = book.genre;

  notStartedBooksColumn.appendChild(blockquote);
  blockquote.appendChild(divBook);
  divBook.appendChild(title);
  divBook.appendChild(author);
  divBook.appendChild(genre);
  blockquote.appendChild(startButton);

  // open form to type in current page and total pages to start book
  startButton.addEventListener('click', startBookForm);

  function startBookForm() {
    let divStartBookForm = document.createElement('div');
    divStartBookForm.id = 'startBookForm';
    divBook.className = 'form-popup'

    let divPadding30 = document.createElement('div');
    divPadding30.className = 'padding-30';

    let form = document.createElement('form');
    form.action = 'index.html';
    form.method = 'post';

    let title = document.createElement('label');
    title.innerHTML = book.title;

    let author = document.createElement('p');
    author.innerHTML = book.author;

    let genre = document.createElement('p');
    genre.innerHTML = book.genre;

    let formGroupPages = document.createElement('div');
    formGroupPages.className = 'form-group';

    let labelPages = document.createElement('label');
    labelPages.htmlFor = 'pages';
    labelPages.innerHTML = 'Pages';

    let inputPages = document.createElement('input')
    inputPages.type = 'number';
    inputPages.className = 'form-control';
    inputPages.id = 'pages'; 
    inputPages.placeholder = 'Total pages'
    inputPages.value = book.totalPages;

    let mutePages = document.createElement('small');
    mutePages.className = 'form-text text-muted';
    mutePages.innerHTML = 'Required'; 

    let formGroupCurrentPage = document.createElement('div')
    formGroupCurrentPage.className = 'form-group';

    let labelCurrentPage = document.createElement('label');
    labelCurrentPage.innerHTML = 'Current Page';
    labelCurrentPage.htmlFor = 'current-page';

    let inputCurrentPage = document.createElement('input');
    inputCurrentPage.type = 'number';
    inputCurrentPage.className = 'form-control';
    inputCurrentPage.id = 'current-page';
    inputCurrentPage.placeholder = 'What page are you on?';

    let smallCurrentPage = document.createElement('small');
    smallCurrentPage.className = 'form-text text-muted';
    smallCurrentPage.innerHTML = 'Required';

    let buttonStartBook = document.createElement('button');
    buttonStartBook.type = 'submit';
    buttonStartBook.className = 'btn btn-primary submit';
    buttonStartBook.id = 'start-book-submit';
    buttonStartBook.innerHTML = 'Submit';

    let closeButton = document.createElement('a');
    closeButton.className = 'btn float-right';
    
    let iCloseButton = document.createElement('i');
    iCloseButton.className = 'fas fa-window-close fa-2x';

    document.body.appendChild(divStartBookForm);
    divStartBookForm.appendChild(closeButton);
    closeButton.appendChild(iCloseButton);
    divStartBookForm.appendChild(divPadding30);
    divPadding30.appendChild(form);
    form.appendChild(title);
    form.appendChild(author);
    form.appendChild(genre);
    form.appendChild(formGroupPages);
    formGroupPages.appendChild(labelPages);
    formGroupPages.appendChild(inputPages);
    formGroupPages.appendChild(mutePages);
    form.appendChild(formGroupCurrentPage);
    formGroupCurrentPage.appendChild(labelCurrentPage);
    formGroupCurrentPage.appendChild(inputCurrentPage);
    formGroupCurrentPage.appendChild(smallCurrentPage);
    form.appendChild(buttonStartBook);

    document.getElementById('startBookForm').style.display = 'block';

  }
});

// startedBooks
let startedBooksColumn = document.getElementById('started-books');

startedBooks.forEach(function(book) {
  let blockquote = document.createElement('blockquote');
  let divBook = document.createElement('div');
  let title = document.createElement('p');
  let author = document.createElement('p');
  let progress = document.createElement('p');
  let updateButton = document.createElement('a');

  blockquote.className = 'blockquote mb-0';
  divBook.className = 'book';
  title.className = 'title';
  author.className = 'author';
  progress.className = 'genre';
  updateButton.className = 'btn btn-primary btn-sm btn-body update-book';
  updateButton.id = 'update-book';

  updateButton.innerHTML = 'Update';
  title.innerHTML = book.title;
  author.innerHTML = authorCheck(book);
  let pagePercentage = book.currentPage/book.totalPages*100;
  progress.innerHTML = book.currentPage + '/' + book.totalPages + ' (' + pagePercentage.toFixed(0)  + '%)';

  startedBooksColumn.appendChild(blockquote);
  blockquote.appendChild(divBook);
  divBook.appendChild(title);
  divBook.appendChild(author);
  divBook.appendChild(progress);
  blockquote.appendChild(updateButton);
});

// finishedBooks
let finishedBooksColumn = document.getElementById('finished-books');

finishedBooks.forEach(function(book) {
  let blockquote = document.createElement('blockquote');
  let title = document.createElement('p');
  let author = document.createElement('p');

  blockquote.className = 'blockquote mb-0';
  title.className = 'title';
  author.className = 'author';

  title.innerHTML = book.title;
  author.innerHTML = authorCheck(book);

  finishedBooksColumn.appendChild(blockquote);
  blockquote.appendChild(title);
  blockquote.appendChild(author);
});


// ==================== button to start reading book ====================

// start book button
// document.getElementsByClassName("start-book").addEventListener("click", openStartBookForm);

// function openStartBookForm() {
//   document.getElementById("startBookForm").style.display = 'block';
// }

// close add book form
// document.getElementById("fa-window-close-start").addEventListener("click", closeStartBookForm);

// function closeStartBookForm() {
//   document.getElementById("startBookForm").style.display = 'none';
// }

// event listener to find out which button was pressed



// ==================== console log ====================
console.log(JSON.parse(localStorage.getItem('myLibrary')));
// console.log(notStartedBooks);
// console.log(startedBooks);
// console.log(finishedBooks);
// localStorage.clear();