'use-strict';

// UI Class: Handle UI tasks
export default class UI {
  static displayBooks() {
    const storedBooks = [
      {
        title: 'Eveything is fuck up',
        author: 'James arthur',
        isbn: 661561616,
      },
      {
        title: 'Rich dad, Poor dad',
        author: 'Rusty Look',
        isbn: 120990100,
      },
    ];

    const books = storedBooks;

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
      el.parentElement.parentElement.remove();
      UI.alertMessage('Book successfully deleted', 'success');
    }
  }
}
