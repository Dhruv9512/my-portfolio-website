document.addEventListener("DOMContentLoaded", function () {
    var navToggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('nav');
    var photo = document.getElementById('animated-photo');

    navToggle.addEventListener('click', function () {
        nav.classList.toggle('active');
        navToggle.classList.toggle('active');

        if (!nav.classList.contains('active')) {
            setTimeout(function () {
                nav.style.display = 'none';
            }, 500);
        } else {
            nav.style.display = 'block';
        }
    });

    photo.addEventListener('click', function () {
        photo.classList.toggle('rotate');
        setTimeout(() => {
            photo.classList.remove('rotate');
        }, 4000);
    });

    // Initially rotate the photo
    photo.classList.add('rotate');
});

// Data fetching
let dataLoaded = false;

function createPlaceholderRows(count) {
    const table = document.getElementById('data-table').querySelector('tbody');

    // Remove existing placeholder rows if any
    const existingPlaceholders = document.querySelectorAll('.placeholder-row');
    existingPlaceholders.forEach(row => row.remove());

    for (let i = 0; i < count; i++) {
        const row = document.createElement('tr');
        row.classList.add('placeholder-row');

        for (let j = 0; j < 5; j++) { // Assuming 5 columns
            const cell = document.createElement('td');
            cell.classList.add('placeholder');
            row.appendChild(cell);
        }

        table.appendChild(row);
    }
}

async function fetchDataAndPopulateTable() {
    try {
        if (!dataLoaded) {
            createPlaceholderRows(11);
        }

        const response = await fetch('https://my-portfilio.onrender.com/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log('Received data:', data);

        const table = document.getElementById('data-table').querySelector('tbody');

        if (!dataLoaded) {
            const placeholderRows = document.querySelectorAll('.placeholder-row');
            placeholderRows.forEach(row => row.remove());
        }

        if (Array.isArray(data) && !dataLoaded) {
            data.forEach(item => {
                const row = document.createElement('tr');

                const idCell = document.createElement('td');
                idCell.innerText = item.Id || 'N/A';
                row.appendChild(idCell);

                const titleCell = document.createElement('td');
                titleCell.innerText = item.Title || 'N/A';
                row.appendChild(titleCell);

                const descriptionCell = document.createElement('td');
                descriptionCell.innerText = item.Description || 'N/A';
                row.appendChild(descriptionCell);

                const githubCell = document.createElement('td');
                if (item.GithubLink) {
                    const githubLink = document.createElement('a');
                    githubLink.href = item.GithubLink;
                    githubLink.innerText = 'Link';
                    githubLink.classList.add('text-purple');
                    githubCell.appendChild(githubLink);
                } else {
                    githubCell.innerText = 'N/A';
                }
                row.appendChild(githubCell);

                const websiteCell = document.createElement('td');
                if (item.WebsiteLink) {
                    const websiteLink = document.createElement('a');
                    websiteLink.href = item.WebsiteLink;
                    websiteLink.innerText = 'Link';
                    websiteLink.classList.add('text-purple');
                    websiteCell.appendChild(websiteLink);
                } else {
                    websiteCell.innerText = 'N/A';
                }
                row.appendChild(websiteCell);

                table.appendChild(row);
            });

            dataLoaded = true;
        } else {
            console.error('Data is not an array:', data);
        }

    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}

fetchDataAndPopulateTable();
