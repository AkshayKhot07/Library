"use strict";

let table = document.getElementById("table");
const addBooks = document.querySelector(".add-books");
const modal = document.getElementById("modal");

//Constructor function
function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

//Creates HTML elements to add book info rows
function addBookToLibrary(arr) {
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

//Modal or dialog popup/open and close
addBooks.addEventListener("click", (e) => {
  modal.showModal();
});

document.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.close();
  }
});

//Modal book info selectors
const form = document.getElementById("form");
const submitBtn = document.querySelector(".book-info-btn");

let bookTitle = document.getElementById("bookTitle");
let bookAuthor = document.getElementById("bookAuthor");
let bookPages = document.getElementById("bookPages");
let readStatus = document.getElementById("readStatus");

//Render books from LS if any on page reload or browser start
function booksLocalStorage() {
  let booksls = JSON.parse(localStorage.getItem("books"));
  // console.log(booksls);

  if (booksls !== null) {
    addBookToLibrary(booksls);
  }
}

booksLocalStorage();

// Delete/Remove Book details
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

// Change Book Read status
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

//Submit book information
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

  let myLibrary = JSON.parse(localStorage.getItem("books")) || [];

  myLibrary.push(newBook);
  // console.log(myLibrary);

  //Render HTML of the book details submitted
  addBookToLibrary([newBook]);

  //Set book info to local storage
  localStorage.setItem("books", JSON.stringify(myLibrary));

  form.reset();
  removeBook();
  changeReadStatus();
});
