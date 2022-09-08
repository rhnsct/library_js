function changeLayout(identity) {
  const newLayout = identity === "table" ? "grid" : "table";
  if (identity === "table") {
    document.getElementById("tableInfo").classList.add("hidden");
  } else {
    document.getElementById("tableInfo").classList.remove("hidden");
  }
  document.getElementById(identity).id = newLayout;
  document.getElementById(newLayout).innerText = newLayout;
  document.getElementById("libraryContainer").classList.remove(identity);
  document.getElementById("libraryContainer").classList.add(newLayout);
}

function showForm(idOfChange, clear = true) {
  let classes = document.getElementById(idOfChange).classList;
  if (classes.contains("hidden")) {
    classes.remove("hidden");
  } else {
    classes.add("hidden");
  }

  if (clear) {
    document.getElementById("newBookForm").reset();
    removeHidden("readingPages");
    removeHidden("urlDiv");
  }
}

function removeHidden(idOfElement) {
  let classes = document.getElementById(idOfElement).classList;
  if (classes.contains("hidden")) {
    classes.remove("hidden");
  }
}

function whileFocused(idToFocus) {
  let labels = idToFocus.getElementsByTagName("label");
  for (let i = 0; i < labels.length; i++) {
    let label = labels[i];
    if (label.classList.contains("underline")) {
      label.classList.remove("underline");
    } else {
      label.classList.add("underline");
    }
  }
}
