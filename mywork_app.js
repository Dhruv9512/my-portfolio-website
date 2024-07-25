document.addEventListener("DOMContentLoaded", function() {
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('nav');
  var photo = document.getElementById('animated-photo');
  
  navToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      navToggle.classList.toggle('active');
      
      // If nav is not active after toggling, hide it
      if (!nav.classList.contains('active')) {
          setTimeout(function() {
              nav.style.display = 'none';
          }, 500); // Adjust the delay as needed to match your CSS transition duration
      } else {
          nav.style.display = 'block'; // Ensure nav is visible when toggled active
      }
  });
  
  photo.addEventListener('click', function() {
      photo.classList.toggle('rotate');
      setTimeout(() => {
          photo.classList.remove('rotate');
      }, 4000);
  });
  
  // Initially rotate the photo
  photo.classList.add('rotate');
});




// Data fetching 
async function fetchDataAndPopulateTable() {
    try {
        const response = await fetch('https://my-portfilio-one.vercel.app/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log('Received data:', data);

        const table = document.getElementById('data-table');

        // Clear the table's content including header and body
        table.innerHTML = '';

        // Create and append the header row
        const tableHead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        ['ID', 'Title', 'Description', 'GitHub link', 'Website link'].forEach(headerText => {
            const headerCell = document.createElement('th');
            headerCell.textContent = headerText;
            headerRow.appendChild(headerCell);
        });
        tableHead.appendChild(headerRow);
        table.appendChild(tableHead);

        const tableBody = document.createElement('tbody');

        // Check if data is an array
        if (Array.isArray(data)) {
            // Insert data rows
            data.forEach(item => {
                console.log(item); // Log the item to inspect its structure
                
                const row = document.createElement('tr');

                // Display values of each key in the object
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
                    websiteCell.appendChild(websiteLink);
                } else {
                    websiteCell.innerText = 'N/A';
                }
                row.appendChild(websiteCell);

                // Append the row to the table body
                tableBody.appendChild(row);
            });
        } else {
            console.error('Data is not an array:', data);
        }

        // Append the table body to the table
        table.appendChild(tableBody);
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}

// Call the function to fetch data and populate the table
fetchDataAndPopulateTable();



setInterval(fetchDataAndPopulateTable, 5000);
