const petSearchInput = document.getElementById("pet-search");
const filterButtons = document.querySelectorAll(".filter-button");
const petCards = document.querySelectorAll(".pet-card");
const filterStatus = document.getElementById("filter-status");
const noResults = document.getElementById("no-results");

let activeFilter = "all";

function getCardText(card) {
  return card.textContent.trim().toLowerCase();
}

function updatePetFilters() {
  const searchTerm = petSearchInput ? petSearchInput.value.trim().toLowerCase() : "";
  let visibleCount = 0;

  petCards.forEach(function (card) {
    const typeMatches = activeFilter === "all" || card.dataset.type === activeFilter;
    const searchMatches = !searchTerm || getCardText(card).includes(searchTerm);
    const isVisible = typeMatches && searchMatches;

    card.hidden = !isVisible;

    if (isVisible) {
      visibleCount += 1;
    }
  });

  if (filterStatus) {
    const label = visibleCount === 1 ? "pet" : "pets";
    filterStatus.textContent = `${visibleCount} ${label} found`;
  }

  if (noResults) {
    noResults.hidden = visibleCount > 0;
  }
}

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    activeFilter = button.dataset.filter;

    filterButtons.forEach(function (item) {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    updatePetFilters();
  });
});

if (petSearchInput) {
  petSearchInput.addEventListener("input", updatePetFilters);
}

updatePetFilters();
