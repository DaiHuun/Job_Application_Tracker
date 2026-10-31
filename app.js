// List of applications will fill from local storage
let applications = [];
let contactInfos = [];
// Save applications to local storage
function saveApplications() {
  localStorage.setItem("applicationData", JSON.stringify(applications));
}
// Load applications from local storage
function loadApplications() {
  const raw = localStorage.getItem("applicationData");
  // Handles first visit
  if (raw === null) {
    saveApplications();
  } else {
    applications = JSON.parse(raw);
  }
}
function saveContactInfos() {
  localStorage.setItem("contactData", JSON.stringify(contactInfos));
}
function loadContactInfos() {
  const raw = localStorage.getItem("contactData");
  if (raw === null) {
    saveContactInfos();
  } else {
    contactInfos = JSON.parse(raw);
  }
}

// Build a list element for a single application
function createApplicationCard(props) {
  const application = props.application;
  const onStatusChange = props.onStatusChange;
  const onDelete = props.onDelete;

  const card = document.createElement("li");
  card.classList.add("application-card");

  const companyName = document.createElement("p");
  companyName.classList.add("company-name");
  companyName.textContent = application.companyName;
  const jobTitle = document.createElement("p");
  jobTitle.textContent = application.jobTitle;

  const status = document.createElement("div");
  const jobStatus = document.createElement("span");
  jobStatus.classList.add(application.jobStatus);
  jobStatus.textContent = application.jobStatus;
  const dateApplied = document.createElement("span");
  dateApplied.textContent = application.dateApplied;
  const note = document.createElement("span");
  note.textContent = application.note;
  status.append(jobStatus, dateApplied, note);

  const actions = document.createElement("div");
  actions.classList.add("card-actions");
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn");
  deleteButton.textContent = "Delete";
  const changeStatus = document.createElement("select");
  changeStatus.classList.add("select-status-change");
  const appliedOption = document.createElement("option");
  appliedOption.value = "applied";
  appliedOption.textContent = "Applied";
  const interviewedOption = document.createElement("option");
  interviewedOption.value = "interviewed";
  interviewedOption.textContent = "Interviewed";
  const offeredOption = document.createElement("option");
  offeredOption.value = "offered";
  offeredOption.textContent = "Offered";
  const rejectedOption = document.createElement("option");
  rejectedOption.value = "rejected";
  rejectedOption.textContent = "Rejected";

  changeStatus.append(
    appliedOption,
    interviewedOption,
    offeredOption,
    rejectedOption,
  );
  changeStatus.value = application.jobStatus;
  changeStatus.addEventListener("change", function (event) {
    onStatusChange(application.id, event.target.value);
  });
  deleteButton.addEventListener("click", function () {
    onDelete(application.id);
  });
  actions.append(changeStatus, deleteButton);
  card.append(companyName, jobTitle, status, actions);
  return card;
}

// Function to update counts
function updateCounts() {
  const applied = applications.filter(
    (application) => application.jobStatus === "applied",
  );
  const interviewed = applications.filter(
    (application) => application.jobStatus === "interviewed",
  );
  const offered = applications.filter(
    (application) => application.jobStatus === "offered",
  );
  const rejected = applications.filter(
    (application) => application.jobStatus === "rejected",
  );

  const totalCount = document.querySelector("#total-count");
  totalCount.textContent = `${applications.length} Applications`;
  const appliedCount = document.querySelector("#applied-count");
  appliedCount.textContent = `${applied.length} Applied`;
  const interviewedCount = document.querySelector("#interviewed-count");
  interviewedCount.textContent = `${interviewed.length} Interviewed`;
  const offeredCount = document.querySelector("#offered-count");
  offeredCount.textContent = `${offered.length} Offered`;
  const rejectedCount = document.querySelector("#rejected-count");
  rejectedCount.textContent = `${rejected.length} Rejected`;
}

// clears columns and renders applications into the column that matches status
function renderBoard() {
  const appliedList = document.querySelector("#list-applied");
  const interviewedList = document.querySelector("#list-interviewed");
  const offeredList = document.querySelector("#list-offered");
  const rejectedList = document.querySelector("#list-rejected");
  appliedList.textContent = "";
  interviewedList.textContent = "";
  offeredList.textContent = "";
  rejectedList.textContent = "";

  const filterClick = document.querySelector(".filter-btn.active");
  const selectedFilter = filterClick.dataset.filter;
  const searchInput = document.querySelector("#search-bar");
  const searchQuery = searchInput.value.trim().toLowerCase();

  const visibleApplications = applications
    .filter(function (application) {
      return (
        selectedFilter === "all" || application.jobStatus === selectedFilter
      );
    })
    .filter(function (application) {
      return application.companyName.toLowerCase().includes(searchQuery);
    });

  visibleApplications.forEach(function (application) {
    const newCard = createApplicationCard({
      application: application,
      onStatusChange: handleChangeStatus,
      onDelete: handleDeleteApplication,
    });
    if (application.jobStatus === "applied") {
      appliedList.append(newCard);
    } else if (application.jobStatus === "interviewed") {
      interviewedList.append(newCard);
    } else if (application.jobStatus === "offered") {
      offeredList.append(newCard);
    } else if (application.jobStatus === "rejected") {
      rejectedList.append(newCard);
    }
  });

  updateCounts();
}

// reads inputs, adds new application to array, and renders board
function handleAddApplication(event) {
  event.preventDefault();
  const companyNameInput = document.querySelector("#company-name-input");
  const jobTitleInput = document.querySelector("#job-title-input");
  const jobStatusInput = document.querySelector("#job-status-input");
  const dateAppliedInput = document.querySelector("#date-applied-input");
  const noteInput = document.querySelector("#note-input");

  const companyName = companyNameInput.value.trim();
  const jobTitle = jobTitleInput.value.trim();
  const jobStatus = jobStatusInput.value;
  const dateApplied = dateAppliedInput.value;
  const note = noteInput.value.trim();

  const newApplication = {
    id: Date.now(),
    companyName,
    jobTitle,
    jobStatus,
    dateApplied,
    note,
  };

  applications.push(newApplication);

  saveApplications();
  renderBoard();

  companyNameInput.value = "";
  jobTitleInput.value = "";
  dateAppliedInput.value = "";
  noteInput.value = "";
}

// Connects form to handler
const addAppForm = document.querySelector(`#add-app-form`);
addAppForm.addEventListener("submit", handleAddApplication);

// Delete function to delete application
function handleDeleteApplication(appId) {
  applications = applications.filter((application) => application.id !== appId);
  saveApplications();
  renderBoard();
}

// Change Status function
function handleChangeStatus(appId, newStatus) {
  const foundApplication = applications.find(
    (application) => application.id === appId,
  );
  foundApplication.jobStatus = newStatus;
  saveApplications();
  renderBoard();
}

// Filter function
function handleFilterClick(event) {
  const filterButton = event.target.closest(".filter-btn");
  if (!filterButton) {
    return;
  }
  const removeActive = document.querySelectorAll(".filter-btn.active");
  removeActive.forEach(function (btn) {
    btn.classList.remove("active");
  });
  filterButton.classList.add("active");

  renderBoard();
}

const filterBar = document.querySelector("#filter-bar");
filterBar.addEventListener("click", handleFilterClick);

// Search bar filter function to search by Company Name
function handleSearchFilter() {
  renderBoard();
}
const searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("input", handleSearchFilter);

async function handleAddContactInfo(event) {
  event.preventDefault();
  const contactNameInput = document.querySelector("#contact-name");
  const contactEmailInput = document.querySelector("#contact-email");
  const contactMessageInput = document.querySelector("#contact-message");
  const contactFeedback = document.querySelector("#contact-feedback");
  const submitButton = document.querySelector("#submit-contact-info");

  const contactName = contactNameInput.value.trim();
  const contactEmail = contactEmailInput.value.trim();
  const contactMessage = contactMessageInput.value.trim();

  const errorMessage = validateContact(
    contactName,
    contactEmail,
    contactMessage,
  );
  if (errorMessage !== "") {
    contactFeedback.textContent = errorMessage;
    contactFeedback.classList.remove("success");
    contactFeedback.classList.add("error");
    return;
  }

  const newContactInfo = {
    id: Date.now(),
    contactName,
    contactEmail,
    contactMessage,
  };

  submitButton.disabled = true;
  contactFeedback.textContent = "Sending...";
  contactFeedback.classList.remove("error", "success");

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newContactInfo),
    });

    // fetch only throws on network failure
    if (!response.ok) {
      throw new Error("Server responded with status " + response.status);
    }

    // Only save and clear after the request succeeded
    contactInfos.push(newContactInfo);
    saveContactInfos();

    contactNameInput.value = "";
    contactEmailInput.value = "";
    contactMessageInput.value = "";

    contactFeedback.textContent = "Thanks! Your message was sent.";
    contactFeedback.classList.add("success");
  } catch (error) {
    contactFeedback.textContent =
      "Sorry, your message could not be sent. Please try again.";
    contactFeedback.classList.add("error");
  } finally {
    submitButton.disabled = false;
  }
}

const addContactForm = document.querySelector("#contact-form");
addContactForm.addEventListener("submit", handleAddContactInfo);

// Returns an error message, or "" if the input is valid
function validateContact(name, email, message) {
  if (name === "" || email === "" || message === "") {
    return "Please fill out all fields.";
  }
  if (name.length < 2) {
    return "Name must be at least 2 characters.";
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return "Please enter a valid email address.";
  }
  if (message.length < 10) {
    return "Message must be at least 10 characters.";
  }
  return "";
}

// Function show one page, and hide the others
function showPage(pageName) {
  document.querySelectorAll(".page").forEach(function (page) {
    page.classList.add("hidden");
  });
  document.querySelector(`#page-${pageName}`).classList.remove("hidden");

  document.querySelectorAll(".nav-link").forEach(function (link) {
    link.classList.toggle("active", link.dataset.page === pageName);
  });
}

function handleNavClick(event) {
  const navLink = event.target.closest(".nav-link");
  if (!navLink) {
    return;
  }
  event.preventDefault();
  showPage(navLink.dataset.page);
}

const navBar = document.querySelector("#nav-bar");
navBar.addEventListener("click", handleNavClick);

// init function to load and render application from local storage
function init() {
  loadApplications();
  loadContactInfos();
  renderBoard();
}

init();
