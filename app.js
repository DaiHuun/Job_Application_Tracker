// List of applications will fill from local storage
let applications = [];

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

// Build a list element for a single application
function createApplicationCard(application) {
  const card = document.createElement("li");
  card.classList.add("application-card");
  card.dataset.id = application.id;

  const companyName = document.createElement("p");
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
  const rejectedOption = document.createElement("option");
  rejectedOption.value = "rejected";
  rejectedOption.textContent = "Rejected";
  const offeredOption = document.createElement("option");
  offeredOption.value = "offered";
  offeredOption.textContent = "Offered";
  changeStatus.append(
    appliedOption,
    interviewedOption,
    rejectedOption,
    offeredOption,
  );
  changeStatus.value = application.jobStatus;
  actions.append(changeStatus, deleteButton);

  card.append(companyName, jobTitle, status, actions);
  return card;
}

// clears columns and renders applications into the column that matches status
function renderBoard() {
  const appliedList = document.querySelector("#list-applied");
  const interviewedList = document.querySelector("#list-interviewed");
  const rejectedList = document.querySelector("#list-rejected");
  const offeredList = document.querySelector("#list-offered");
  appliedList.textContent = "";
  interviewedList.textContent = "";
  rejectedList.textContent = "";
  offeredList.textContent = "";

  applications.forEach(function (application) {
    const newCard = createApplicationCard(application);
    if (application.jobStatus === "applied") {
      appliedList.append(newCard);
    } else if (application.jobStatus === "interviewed") {
      interviewedList.append(newCard);
    } else if (application.jobStatus === "rejected") {
      rejectedList.append(newCard);
    } else if (application.jobStatus === "offered") {
      offeredList.append(newCard);
    }
  });
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
function handleDeleteApplication(event) {
  const card = event.target.closest(".application-card");
  if (!card) {
    return;
  }

  const appId = parseInt(card.dataset.id);

  if (event.target.classList.contains("delete-btn")) {
    applications = applications.filter(
      (application) => application.id !== appId,
    );
    saveApplications();
    renderBoard();
  }
}
const appBoard = document.querySelector(".board");
appBoard.addEventListener("click", handleDeleteApplication);

// Change Status function
function handleChangeStatus(event) {
  const card = event.target.closest(".application-card");
  if (!card) {
    return;
  }

  const appId = parseInt(card.dataset.id);

  if (event.target.classList.contains("select-status-change")) {
    const foundApplication = applications.find(
      (application) => application.id === appId,
    );

    const newStatus = event.target.value;
    foundApplication.jobStatus = newStatus;

    saveApplications();
    renderBoard();
  }
}

appBoard.addEventListener("change", handleChangeStatus);

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

// init function to load and render application from local storage
function init() {
  loadApplications();
  renderBoard();
}

init();
