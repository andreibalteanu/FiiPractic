//SEARCH INPUT FUNCTIONS

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
  const searchIcon = document.querySelector("#searchTask");
  searchIcon.addEventListener("click", showSearchInput);
})();

//FILTERS FUNCTIONS

function showFilters() {
  const filterSection = document.querySelector(".filterSection");
  if (window.getComputedStyle(filterSection).display === "none")
    filterSection.style.display = "block";
  else filterSection.style.display = "none";

  const removeFiltersButton = document
    .querySelector(".fa-times-circle")
    .addEventListener("click", removeFilters);
}

function removeFilters() {
  const filterSection = document.querySelector(".filterSection");
  filterSection.style.display = "none";
}

const filters = (function () {
  const filterIcon = document.querySelector("#filterTask");
  filterIcon.addEventListener("click", showFilters);
})();

//SIDEBAR TRANSITION

function testIn() {
  console.log("hovering in sidebar");
}

function testOut() {
  console.log("hovering outside sidebar");
}
