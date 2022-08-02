const newBookForm = document.getElementById("newBookForm");
const library = new Library();
buildFromLocal();

function createBook() {
  let title = document.getElementById("titleInput").value;
  let pageNum = document.getElementById("numPagesInput").value;
  let author = document.getElementById("authorInput").value;
  let read = false;

  return new Book(title, author, pageNum, read);
}

function submitNewBook() {
  let book = createBook();
  if (library.addBook(book)) {
    createBookTile(book);
    showForm("form-container");
  } else {
    alert("This book already exists");
  }
}

function formSubmitEvent(event) {
  event.preventDefault();
  submitNewBook();
  toLocalStorage();
}

function createBookTile(newBook) {
  let title = titleCase(newBook.title);
  let author = titleCase(newBook.author);
  let pageNum = newBook.numPages;
  let bookID = newBook.id;

  let div = document.createElement("div");
  let divInner = document.createElement("div");
  let divFront = document.createElement("div");
  let divBack = document.createElement("div");
  let h3Title = document.createElement("h3");
  let h3Pages = document.createElement("h3");
  let h4Author = document.createElement("h4");
  let removeButton = document.createElement("button");
  getImgURL(title, author, bookID);

  div.id = bookID;
  div.className = "book";
  div.classList.add("hidden");
  divInner.className = "inner-book";
  divFront.className = "front-book";
  divFront.id = bookID + "front";
  divBack.className = "back-book";
  h3Title.innerText = title;
  h3Pages.innerText = pageNum;
  h4Author.innerText = author;

  removeButton.innerText = "Remove Book";

  divFront.appendChild(h3Title);
  divFront.appendChild(h3Pages);
  divFront.appendChild(h4Author);

  divBack.appendChild(removeButton);

  div.appendChild(divInner);
  divInner.appendChild(divFront);
  divInner.appendChild(divBack);

  document.getElementById("library-container").appendChild(div);
  removeButton.onclick = function (event) {
    returnID(this);
  };
}

function formatForURL(string) {
  let result = string.toLowerCase().split(" ").join("+");
  return result;
}

async function getImgURL(title, author, bookID) {
  let bookTitle = formatForURL(title);
  let bookAuthor = formatForURL(author);
  let response = await fetch(
    `https://book-coverapi.herokuapp.com/get?title=${bookTitle}&author=${bookAuthor}`,
    {
      method: "GET",
      mode: "cors",
    }
  ).catch((err) => {
    alert(title + " image could not be found");
  });

  await response.json().then((data) => {
    let img = document.createElement("img");
    img.src = data;
    img.addEventListener("onload", showForm(bookID));
    document.getElementById(bookID + "front").appendChild(img);
  });
}

function titleCase(str) {
  let splitStr = str.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; ++i) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  splitStr = splitStr.join(" ").split(".");
  for (let i = 0; i < splitStr.length; ++i) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }

  return splitStr.join(".");
}

function toLocalStorage() {
  localStorage.setItem("library", JSON.stringify(library));
}

function buildFromLocal() {
  if (!localStorage.getItem("library")) {
    toLocalStorage();
  }
  let savedLib = JSON.parse(localStorage.getItem("library"));
  let books = savedLib["books"];
  for (let i = 0; i < books.length; ++i) {
    let book = books[i];
    let newBook = new Book(book.title, book.author, book.numPages, book.read);
    createBookTile(newBook);
    library.addBook(newBook);
  }
}

function removeDiv(identity) {
  document.getElementById(identity).remove();
}

function numberInputLimit(ele) {
  ele.value = ele.value.slice(0, ele.maxLength);
}

newBookForm.addEventListener("submit", formSubmitEvent);

function returnID(ident) {
  library.removeBook(ident.parentNode.parentNode.parentNode.id);
}
