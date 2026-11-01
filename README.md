# Job Application Tracker
A small, dependency-free web app for tracking job applications through each stage of the hiring process. Built with plain HTML, CSS, and JavaScript, with all data saved in the browser's Local Storage.

## Features

- **Add applications**: record company, job title, status, date applied, and notes.
- **Update status**: change an application between Applied, Interviewed, Offered, and Rejected from its card.
- **Delete applications**: remove an entry with one click.
- **Persistent storage**: applications and contact submissions are saved in Local Storage and survive page reloads.
- **Filter and search**: filter by status, and live-search by company name (combined with the status filter).
- **Dashboard counts**: the header shows the total and per-status counts, updated on every change.
- **Kanban-style board**: applications are grouped into Applied / Interviewed / Offered / Rejected columns.
- **Contact form**: validates input (all fields required, name of 2+ characters, valid email, message of 10+ characters), sends it to a mock API, and stores successful submissions in Local Storage.
- **Single-page navigation**: a nav bar switches between Add Application, Applications, and Contact without reloading.
- **Responsive layout**: the board goes from 4 columns on desktop to 2 on tablets (900px and below) and 1 on phones (600px and below); the add form, search bar, and nav links also adapt on phones.

## Screenshots
### Add Application

Fill in the company, job title, status, date applied, and notes, then click **Add Job**. The header counts update immediately.



### Applications board

Applications are grouped by status. Each card has a status dropdown and a delete button.



### Filtering and search

Use the filter buttons to show a single status, and the search box to narrow by company name. The two work together.



### Contact form

The form validates input before sending. Here a message that is too short shows an inline error.



### Mobile layout

On phones, the nav, filters, and board columns stack into a single column.



## Tech Stack

- HTML
- CSS
- JavaScript