class Book {
  constructor(
    title = "null",
    author = "null",
    numPages = 0,
    read = false,
    url = "none"
  ) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
    this.id = this.createID();
    this.url = url;
  }

  createID() {
    let bookID = this.title + this.author;
    bookID = bookID.split(" ").join("").split(".").join("").toLowerCase();
    let hexID = "";

    for (let i = 0; i < bookID.length; ++i) {
      hexID += bookID.charCodeAt(i).toString(16);
    }

    return hexID;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(newBook) {
    if (!this.isInLibrary(newBook)) {
      this.books.push(newBook);
      return true;
    } else {
      return false;
    }
  }

  removeBook(identity) {
    this.books = this.books.filter((book) => {
      return book.id !== identity;
    });
    removeDiv(identity);
    toLocalStorage();
  }

  isInLibrary(newBook) {
    return this.books.some((book) => book.id === newBook.id);
  }
}
