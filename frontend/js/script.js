console.log('Frontend script loaded!');

// Fetch items from the backend API when the page loads
async function fetchItems() {
    try {
        const response = await fetch('/api/items', {
            headers: {
                'X-User-ID': '1' // Replace with the actual user ID
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const items = await response.json();
        console.log('Fetched items:', items);
        renderItemsTable(items);
    } catch (error) {
        console.error('Error fetching items:', error);
        displayErrorMessage('Failed to fetch items. Please try again.');
    }
}

// Render items in the table
function renderItemsTable(items) {
    const tableBody = document.querySelector('#items-table tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    if (!items || items.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5">No items found.</td></tr>';
        document.getElementById('total-items').textContent = '0';
        return;
    }

    items.forEach((item, index) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><img src="#" alt="Icon" width="20" height="20"> ${item.name} ${item.is_shared ? '<span class="shared-icon">👥</span>' : ''}</td>
            <td>${formatDate(item.created_at)}</td>
            <td>${formatDate(item.updated_at)}</td>
            <td>
                <button onclick="viewItem(${item.id})">🔑 View</button>
                <button onclick="copyItem(${item.id})">📄 Copy</button>
                <button onclick="moreItemActions(${item.id})">··· More</button>
            </td>
        `;
    });
    document.getElementById('total-items').textContent = items.length;
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}

// Display an error message in the UI
function displayErrorMessage(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

// Event listener for the "New Item" button
document.getElementById('new-item-btn').addEventListener('click', () => {
    console.log('New Item button clicked');
    // Show the New Item modal/form
    document.getElementById('new-item-modal').style.display = 'block';
});

// Event listener for the "Import" button
document.getElementById('import-btn').addEventListener('click', () => {
    console.log('Import button clicked');
    // TODO: Implement import functionality (e.g., file upload and processing)
    alert('Import functionality is not yet implemented.');
});

// Event listener for the "Sort" button
document.getElementById('sort-btn').addEventListener('click', () => {
    console.log('Sort button clicked');
    // TODO: Implement sorting logic (e.g., sort items by name, date, etc.)
    alert('Sort functionality is not yet implemented.');
});

// Event listener for the "Search" input
document.getElementById('search-input').addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    console.log('Search term:', searchTerm);
    // TODO: Implement search functionality (e.g., filter items in the table)
    alert('Search functionality is not yet implemented.');
});

// Example functions for item actions
function viewItem(itemId) {
    console.log('View item:', itemId);
    // TODO: Show item details in a modal
}

function copyItem(itemId) {
    console.log('Copy item:', itemId);
    // TODO: Copy item details to clipboard
}

function moreItemActions(itemId) {
    console.log('More actions for item:', itemId);
    // TODO: Show additional actions (e.g., share, delete, etc.)
}

// Call fetchItems when the page is fully loaded
document.addEventListener('DOMContentLoaded', fetchItems);