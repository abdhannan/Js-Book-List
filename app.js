'use-strict';

// import UI from './assets/js/UI.js';
// import Book from './assets/js/Book.js';

// Book Class: represent a book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// Store Class: handle storage
class Store {
  static getBooks() {
    let books;
    // check if there books exist on local storage
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// UI Class: Handle UI tasks
class UI {
  static displayBooks() {
    // const storedBooks = [
    //   {
    //     title: 'Eveything is fuck up',
    //     author: 'James arthur',
    //     isbn: 661561616,
    //   },
    //   {
    //     title: 'Rich dad, Poor dad',
    //     author: 'Rusty Look',
    //     isbn: 120990100,
    //   },
    // ];

    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
              <td>${book.title}</td>
              <td>${book.author}</td>
              <td>${book.isbn}</td>
              <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>
          `;

    list.appendChild(row);
  }

  //   Aler validation message
  static alertMessage(message, className) {
    const alert = document.querySelector('#alert');
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    // insert div before form
    alert.appendChild(div);
    // set time out
    setTimeout((e) => {
      div.remove();
    }, 3000);
  }

  //   Empty form values after submit method
  static removeFormValues() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }

  //   Delete Book method
  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      // remove book from UI
      el.parentElement.parentElement.remove();

      UI.alertMessage('Book successfully deleted', 'success');
    }
  }
}

// event: to display boook

document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  e.preventDefault();

  //   Get form Value
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  //   Validate form
  if (title === '' || author === '' || isbn === '') {
    UI.alertMessage('Please fill all fields', 'danger');
  } else {
    //   initiate Book
    const book = new Book(title, author, isbn);

    //   add book to list using method
    // UI.addBookToList(book);
    Store.addBook(book);

    // use success alert
    UI.alertMessage('Book successfully added', 'success');

    //   Empry the form value after submit
    UI.removeFormValues();
    // UI.displayBooks();
    // Store.getBooks();
    // UI.addBookToList();
    setTimeout(() => {
      window.location.reload();
    }, 3500);
  }
});

// Event: remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});
