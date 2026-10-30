// List of applications from form input stored in an array
let applications = [];

// Build a list element for a single application
function createApplicationCard(application) {
  const card = document.createElement("li");
  card.dataset.id = application.id;

  const companyName = document.createElement("p");
  companyName.textContent = application.companyName;
  const jobTitle = document.createElement("p");
  jobTitle.textContent = application.jobTitle;

  const div = document.createElement("div");
  const jobStatus = document.createElement("span");
  jobStatus.classList.add(application.jobStatus);
  jobStatus.textContent = application.jobStatus;
  const dateApplied = document.createElement("span");
  dateApplied.textContent = application.dateApplied;
  const note = document.createElement("span");
  note.textContent = application.note;
  div.append(jobStatus, dateApplied, note);

  card.append(companyName, jobTitle, div);
  return card;
}

// clears columns and renders applications into the column that matches status
function renderBoard(applicationList) {
  const appliedList = document.querySelector("#list-applied");
  const interviewedList = document.querySelector("#list-interviewed");
  const rejectedList = document.querySelector("#list-rejected");
  const offeredList = document.querySelector("#list-offered");
  appliedList.textContent = "";
  interviewedList.textContent = "";
  rejectedList.textContent = "";
  offeredList.textContent = "";

  applicationList.forEach(function (application) {
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
  renderBoard(applications);

  companyNameInput.value = "";
  jobTitleInput.value = "";
  dateAppliedInput.value = "";
  noteInput.value = "";
}

// Connects form to handler
const submitForm = document.querySelector(`#add-app-form`);
submitForm.addEventListener("submit", handleAddApplication);
