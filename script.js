const addContactButtonElement = document.querySelector(".add-contact");
const searchInputElement = document.querySelector(".search-bar input");
const addContactFormElement = document.querySelector(".popup form");

addContactFormElement.addEventListener("submit", (e) => {
  e.preventDefault();

  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const name = nameInput.value;
  const phone = phoneInput.value;

  const contacts = JSON.parse(localStorage.getItem("contacts") || "[]");
  contacts.push({ name, phone });

  localStorage.setItem("contacts", JSON.stringify(contacts));
  renderContacts(contacts);

  nameInput.value = "";
  phoneInput.value = "";

  const addContactPopupElement = document.querySelector(".popup");
  addContactPopupElement.classList.remove("active");
});

addContactButtonElement.addEventListener("click", () => {
  const addNewContactPopupElement = document.querySelector(".popup");
  addNewContactPopupElement.classList.add("active");
});

searchInputElement.addEventListener("input", (event) => {
  const contacts = JSON.parse(localStorage.getItem("contacts") || "[]");
  const searchTerm = event.target.value.toLowerCase();
  const filteredContacts = contacts.filter(({ name }) => {
    return name.toLowerCase().includes(searchTerm);
  });

  renderContacts(filteredContacts);
});

document.addEventListener("click", (event) => {
  const addContactPopupElement = document.querySelector(".popup");
  const addContactFormElement = addContactPopupElement.querySelector("form");

  const isClickOnAddButton = addContactButtonElement.contains(event.target);
  const isClickInsidePopup = addContactFormElement.contains(event.target);

  if (!isClickOnAddButton && !isClickInsidePopup) {
    addContactPopupElement.classList.remove("active");
    phone = "";
    JSON.name.textContent = "";
  }
});

function renderContacts(contacts) {
  const contactListElement = document.querySelector(".contact-list");
  contactListElement.innerHTML = "";

  contacts.forEach(({ name, phone }) => {
    const liElement = document.createElement("li");
    liElement.textContent = name;

    liElement.addEventListener("click", () => {
      showContactDetails(name, phone);
    });

    contactListElement.appendChild(liElement);
  });
}
function showContactDetails(name, phone) {
  const contactPopup = document.getElementById("contact-details-popup");
  const nameElement = document.getElementById("contact-name");
  const phoneElement = document.getElementById("contact-phone");

  nameElement.textContent = name;
  phoneElement.textContent = phone;

  contactPopup.classList.add("active");
}
document.querySelector(".close-popup").addEventListener("click", () => {
  const contactPopup = document.getElementById("contact-details-popup");
  contactPopup.classList.remove("active");
});
// localStorage.clear();
const contacts = JSON.parse(localStorage.getItem("contacts") || "[]");
renderContacts(contacts);
