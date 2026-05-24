const readMoreButton = document.getElementById("read-more-btn");
const servicesSection = document.getElementById("servicesSection");
const searchForm = document.getElementById("site-search");
const searchInput = document.getElementById("site-search-input");
const searchFeedback = document.getElementById("search-feedback");

const searchRoutes = [
  {
    keywords: ["dog", "dogs", "puppy", "puppies", "food", "toy", "toys", "clothes", "care", "accessories", "leash", "collar"],
    url: "pages/dogs.html",
    label: "Dogs",
  },
  {
    keywords: ["cat", "cats", "kitten", "kittens", "bed", "beds", "litter", "toilet", "scratch", "scratcher"],
    url: "pages/cats.html",
    label: "Cats",
  },
  {
    keywords: ["bird", "birds", "parrot", "parakeet", "cage", "cages", "avian", "seed"],
    url: "pages/birds.html",
    label: "Birds",
  },
  {
    keywords: ["fish", "aquarium", "tank", "decoration", "equipment", "filter"],
    url: "pages/fish.html",
    label: "Fish",
  },
  {
    keywords: ["adopt", "adoption", "pet", "pets", "rabbit", "hamster", "parrot", "puppy", "kitten", "rescue"],
    url: "pages/adoptNow.html",
    label: "Adopt Now",
  },
  {
    keywords: ["contact", "phone", "email", "hours", "location", "athens", "message", "store"],
    url: "pages/contactUs.html",
    label: "Contact",
  },
  {
    keywords: ["login", "log in", "sign", "signup", "sign up", "account"],
    url: "pages/login.html",
    label: "Sign up / Log in",
  },
  {
    keywords: ["about", "mission", "vision", "values"],
    url: "pages/about.html",
    label: "About",
  },
  {
    keywords: ["grooming", "training", "supplies", "service", "services"],
    url: "#servicesSection",
    label: "Services",
  },
];

function normalizeSearchTerm(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

if (readMoreButton && servicesSection) {
  readMoreButton.addEventListener("click", function (event) {
    event.preventDefault();
    servicesSection.scrollIntoView({ behavior: "smooth" });
  });
}

if (searchForm && searchInput && searchFeedback) {
  searchForm.addEventListener("click", function () {
    searchForm.classList.add("is-expanded");
  });

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    searchForm.classList.add("is-expanded");

    const query = normalizeSearchTerm(searchInput.value);

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

    searchFeedback.textContent = `Best match: ${match.label}. Taking you there...`;

    if (match.url.startsWith("#")) {
      document.querySelector(match.url)?.scrollIntoView({ behavior: "smooth" });
      searchInput.blur();
      return;
    }

    window.setTimeout(function () {
      window.location.href = match.url;
    }, 350);
  });
}
