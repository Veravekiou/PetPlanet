const readMoreButton = document.getElementById("read-more-btn");
const servicesSection = document.getElementById("servicesSection");
const searchForm = document.getElementById("site-search");
const searchInput = document.getElementById("site-search-input");
const searchFeedback = document.getElementById("search-feedback");

const searchRoutes = [
  {
    keywords: ["dog", "dogs", "food", "toy", "toys", "clothes", "care", "accessories"],
    url: "pages/dogs.html",
  },
  {
    keywords: ["cat", "cats", "bed", "beds", "litter", "toilet"],
    url: "pages/cats.html",
  },
  {
    keywords: ["bird", "birds", "cage", "cages", "avian"],
    url: "pages/birds.html",
  },
  {
    keywords: ["fish", "aquarium", "decoration", "equipment"],
    url: "pages/fish.html",
  },
  {
    keywords: ["adopt", "adoption", "pet", "pets", "rabbit", "hamster", "parrot", "puppy", "kitten"],
    url: "pages/adoptNow.html",
  },
  {
    keywords: ["contact", "phone", "email", "hours", "location", "athens"],
    url: "pages/contactUs.html",
  },
  {
    keywords: ["login", "sign", "signup", "account"],
    url: "pages/login.html",
  },
  {
    keywords: ["about", "mission", "vision", "values"],
    url: "pages/about.html",
  },
  {
    keywords: ["grooming", "training", "supplies", "service", "services"],
    url: "#servicesSection",
  },
];

if (readMoreButton && servicesSection) {
  readMoreButton.addEventListener("click", function (event) {
    event.preventDefault();
    servicesSection.scrollIntoView({ behavior: "smooth" });
  });
}

if (searchForm && searchInput && searchFeedback) {
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
      searchFeedback.textContent = "Type what you are looking for first.";
      searchInput.focus();
      return;
    }

    const match = searchRoutes.find(function (route) {
      return route.keywords.some(function (keyword) {
        return query.includes(keyword);
      });
    });

    if (!match) {
      searchFeedback.textContent = "No match found. Try dogs, cats, birds, fish, adoption, or contact.";
      searchInput.select();
      return;
    }

    searchFeedback.textContent = "Taking you to the best match...";

    if (match.url.startsWith("#")) {
      document.querySelector(match.url)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    window.location.href = match.url;
  });
}
