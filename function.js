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
  let div2 = document.createElement("div");
  let h3Title = document.createElement("h3");
  let h3Pages = document.createElement("h3");
  let h4Author = document.createElement("h4");
  getImgURL(title, author, bookID);

  div.id = bookID;
  div.className = "book";
  h3Title.innerText = title;
  h3Pages.innerText = pageNum;
  h4Author.innerText = author;

  div2.appendChild(h3Title);
  div2.appendChild(h3Pages);
  div2.appendChild(h4Author);

  div.appendChild(div2);

  document.getElementById("library-container").appendChild(div);
  document.getElementById(bookID).addEventListener("click", () => {
    return bookID;
  });
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
  if (response != undefined) {
    await response.json().then((data) => {
      let img = document.createElement("img");
      img.src = data;
      document.getElementById(bookID).appendChild(img);
    });
  }
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
