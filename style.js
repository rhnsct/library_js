function changeLayout(identity) {
  const newLayout = identity === "Table" ? "Grid" : "Table";
  if (identity === "Table") {
    document.getElementById("table-info").classList.add("hidden");
  } else {
    document.getElementById("table-info").classList.remove("hidden");
  }
  document.getElementById(identity).id = newLayout;
  document.getElementById(newLayout).innerText = newLayout;
  document.getElementById("library-container").classList.remove(identity);
  document.getElementById("library-container").classList.add(newLayout);
}

function showForm(idOfChange) {
  let classes = document.getElementById(idOfChange).classList;
  if (classes.contains("hidden")) {
    classes.remove("hidden");
  } else {
    classes.add("hidden");
    document.getElementById("newBookForm").reset();
  }
}
