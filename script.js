"use strict";

let table = document.getElementById("table");
// console.log(table);

const addBooks = document.querySelector(".add-books");
const modal = document.getElementById("modal");

function Book(title, author, pages, status) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary(arr) {
  // do stuff here
  let tableRow;
  arr.forEach((obj) => {
    if (obj.status === "Not Read") {
      tableRow = ` <tr class="book-info" data-identifier="${
        obj.title + obj.author + obj.pages
      }">
      <td>${obj.title}</td>
      <td>${obj.author}</td>
      <td>${obj.pages}</td>
      <td><i class="fa-solid fa-xmark"></i></td>
      <td><i class="fa-solid fa-trash-can remove"></i></td>
    </tr>
      `;
    } else {
      tableRow = ` <tr class="book-info"  data-identifier="${
        obj.title + obj.author + obj.pages
      }">
      <td>${obj.title}</td>
      <td>${obj.author}</td>
      <td>${obj.pages}</td>
      <td><i class="fa-solid fa-check"></i></td>
      <td><i class="fa-solid fa-trash-can remove"></i></td>
    </tr>
      `;
    }

    table.innerHTML += tableRow;
  });
}

addBooks.addEventListener("click", (e) => {
  modal.showModal();
});

document.addEventListener("click", (e) => {
  // console.log(e.target);
  if (e.target === modal) {
    modal.close();
  }
});

///// Book Info //////
const form = document.getElementById("form");
const submitBtn = document.querySelector(".book-info-btn");

let bookTitle = document.getElementById("bookTitle");
let bookAuthor = document.getElementById("bookAuthor");
let bookPages = document.getElementById("bookPages");
let readStatus = document.getElementById("readStatus");

//Books from Local Storage
function booksLocalStorage() {
  let booksls = JSON.parse(localStorage.getItem("books"));
  // console.log(booksls);

  if (booksls !== null) {
    addBookToLibrary(booksls);
  }
}

booksLocalStorage();

/**********Delete Book details*************/

function removeBook() {
  let allBooks = Array.from(document.querySelectorAll(".book-info"));
  // console.log(allBooks);

  allBooks.forEach((book) => {
    let removeBook = book.getElementsByTagName("td")[4];
    removeBook.addEventListener("click", (e) => {
      // console.log(book.dataset.identifier);
      book.parentNode.removeChild(book);
      let booksls = JSON.parse(localStorage.getItem("books"));
      // console.log(booksls);
      for (let i = 0; i < booksls.length; i++) {
        if (
          booksls[i].title + booksls[i].author + booksls[i].pages ===
          book.dataset.identifier
        ) {
          booksls.splice(i, 1);
          // console.log(booksls);
          localStorage.setItem("books", JSON.stringify(booksls));
        }
      }
    });
  });
}

removeBook();

/**********Delete Book details*************/

/**********Change Book Read status*************/

function changeReadStatus() {
  let allBooks = Array.from(document.querySelectorAll(".book-info"));
  // console.log(allBooks);

  allBooks.forEach((book) => {
    let readStatustd = book.getElementsByTagName("td")[3];
    let readStatus = book.getElementsByTagName("td")[3].children[0];

    readStatus.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-xmark")) {
        readStatus.classList.remove("fa-xmark");
        readStatus.classList.add("fa-check");
        console.log(readStatus);

        let booksls = JSON.parse(localStorage.getItem("books"));
        for (let i = 0; i < booksls.length; i++) {
          if (
            booksls[i].title + booksls[i].author + booksls[i].pages ===
            book.dataset.identifier
          ) {
            booksls[i].status = "Read";
            localStorage.setItem("books", JSON.stringify(booksls));
          }
        }
      } else if (e.target.classList.contains("fa-check")) {
        readStatus.classList.remove("fa-check");
        readStatus.classList.add("fa-xmark");
        console.log(readStatus);

        let booksls = JSON.parse(localStorage.getItem("books"));
        for (let i = 0; i < booksls.length; i++) {
          if (
            booksls[i].title + booksls[i].author + booksls[i].pages ===
            book.dataset.identifier
          ) {
            booksls[i].status = "Not Read";
            localStorage.setItem("books", JSON.stringify(booksls));
          }
        }
      }
    });
  });
}

changeReadStatus();

/**********Change Book Read status*************/

form.addEventListener("submit", function (e) {
  let newBook;

  if (readStatus.checked) {
    newBook = new Book(
      bookTitle.value,
      bookAuthor.value,
      bookPages.value,
      "Read"
    );
  } else {
    newBook = new Book(
      bookTitle.value,
      bookAuthor.value,
      bookPages.value,
      "Not Read"
    );
  }

  // console.log(newBook.title);

  let myLibrary = JSON.parse(localStorage.getItem("books")) || [];

  myLibrary.push(newBook);
  // console.log(myLibrary);
  addBookToLibrary([newBook]);

  localStorage.setItem("books", JSON.stringify(myLibrary));
  // addBookToLibrary(myLibrary);
  form.reset();
  removeBook();
  changeReadStatus();
});
