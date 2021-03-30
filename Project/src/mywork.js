function showSearchInput() {
  if (document.querySelectorAll(".searchSection").length > 0) return null;
  else {
    const searchSection = `<div class="searchSection">
  <input type="text" name="taskname" id="taskname" placeholder="Search for task names.." onkeyup="validateSearchInput()" >
  <i class="fas fa-times-circle"></i>
  </div>`;
    const mainTitle = document
      .getElementsByTagName("h1")[0]
      .insertAdjacentHTML("afterend", searchSection);
    const removeButton = document
      .querySelector(".fa-times-circle")
      .addEventListener("click", removeSearchInput);
  }
}
function removeSearchInput() {
  const mainPage = document.getElementsByTagName("main")[0];
  mainPage.removeChild(mainPage.childNodes[2]);
}

function validateSearchInput() {
  console.log("HELLO");
}

const searchInput = (function () {
  const searchIcon = document.querySelector(".fa-search");
  searchIcon.addEventListener("click", showSearchInput);
})();
