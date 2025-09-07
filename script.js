// --- Global Variables and Element Selectors ---
const loginPage = document.getElementById('loginPage');
const locationPage = document.getElementById('locationPage');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('loginForm');
const locationForm = document.getElementById('locationForm');
const dashboardHeader = document.querySelector('.header');
const logoutBtn = document.getElementById('logoutBtn');
const userLocationDisplay = document.getElementById('userLocation');
const categoryGrid = document.querySelector('.category-grid');
const workersSection = document.getElementById('workersSection');
const workersList = document.getElementById('workersList');
const categoryTitle = document.getElementById('categoryTitle');
const backBtn = document.getElementById('backBtn');

// This is placeholder data for workers. In a real application, this would come from a database.
const workersData = {
    'plumber': [
        { name: 'John Doe', profession: 'Experienced Plumber', phone: '123-456-7890', image: 'https://placehold.co/80x80/000000/FFFFFF?text=JD' },
        { name: 'Jane Smith', profession: 'Pipe and Leak Specialist', phone: '987-654-3210', image: 'https://placehold.co/80x80/000000/FFFFFF?text=JS' },
    ],
    'electrician': [
        { name: 'Mike Johnson', profession: 'Certified Electrician', phone: '111-222-3333', image: 'https://placehold.co/80x80/000000/FFFFFF?text=MJ' },
        { name: 'Sarah Lee', profession: 'Residential Wiring Expert', phone: '444-555-6666', image: 'https://placehold.co/80x80/000000/FFFFFF?text=SL' },
    ],
    'daily-wage': [
        { name: 'David Wilson', profession: 'General Laborer', phone: '777-888-9999', image: 'https://placehold.co/80x80/000000/FFFFFF?text=DW' },
        { name: 'Maria Garcia', profession: 'Construction Worker', phone: '000-111-2222', image: 'https://placehold.co/80x80/000000/FFFFFF?text=MG' },
    ],
    'movers': [
        { name: 'Robert Brown', profession: 'Professional Packer', phone: '333-444-5555', image: 'https://placehold.co/80x80/000000/FFFFFF?text=RB' },
        { name: 'Linda Davis', profession: 'Moving Services', phone: '666-777-8888', image: 'https://placehold.co/80x80/000000/FFFFFF?text=LD' },
    ]
};

// --- Helper Functions ---
function showPage(pageId) {
    // Hide all pages
    loginPage.classList.add('hidden');
    locationPage.classList.add('hidden');
    dashboard.classList.add('hidden');

    // Show the requested page
    if (pageId === 'login') {
        loginPage.classList.remove('hidden');
    } else if (pageId === 'location') {
        locationPage.classList.remove('hidden');
    } else if (pageId === 'dashboard') {
        dashboard.classList.remove('hidden');
    }
}

function showMessage(title, message) {
    const overlay = document.createElement('div');
    overlay.classList.add('message-overlay');
    
    const messageBox = document.createElement('div');
    messageBox.classList.add('message-box');
    
    messageBox.innerHTML = `
        <h3 class="message-box-title">${title}</h3>
        <p class="message-box-text">${message}</p>
        <button class="message-box-button">OK</button>
    `;
    
    messageBox.querySelector('.message-box-button').addEventListener('click', () => {
        overlay.remove();
    });
    
    overlay.appendChild(messageBox);
    document.body.appendChild(overlay);
}

// --- Event Handlers ---
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    localStorage.setItem('username', username);
    showMessage('Login Successful', `Welcome, ${username}! Now, please set up your location.`);
    showPage('location');
});

locationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = document.getElementById('location').value;
    localStorage.setItem('userLocation', location);
    userLocationDisplay.textContent = location;
    showMessage('Location Saved', 'You can now find workers near you!');
    showPage('dashboard');
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userLocation');
    showPage('login');
});

categoryGrid.addEventListener('click', (e) => {
    const button = e.target.closest('.category-button');
    if (button) {
        const category = button.dataset.category;
        const workers = workersData[category];
        const title = button.querySelector('.category-title').textContent;

        if (workers && workers.length > 0) {
            displayWorkers(workers, title);
        } else {
            showMessage('No Workers Found', `Sorry, no workers are available for ${title.toLowerCase()}.`);
        }
    }
});

backBtn.addEventListener('click', () => {
    workersSection.classList.add('hidden');
});

// --- Worker Display Logic ---
function displayWorkers(workers, title) {
    categoryTitle.textContent = title;
    workersList.innerHTML = ''; // Clear previous workers
    const userLocation = localStorage.getItem('userLocation') || 'Unknown Location';
    
    if (workers.length > 0) {
        workers.forEach(worker => {
            const workerCard = document.createElement('div');
            workerCard.classList.add('worker-card');
            workerCard.innerHTML = `
                <img src="${worker.image}" alt="${worker.name}" class="worker-avatar">
                <h4 class="worker-name">${worker.name}</h4>
                <p class="worker-details"><strong>Phone:</strong> ${worker.phone}</p>
                <p class="worker-details"><strong>Location:</strong> ${userLocation}</p>
                <a href="tel:${worker.phone}" class="contact-button">Call Worker</a>
            `;
            workersList.appendChild(workerCard);
        });
        workersSection.classList.remove('hidden');
    } else {
        showMessage('No Workers Found', `Sorry, no workers are available for this category.`);
    }
}

// --- Initial App Load ---
window.onload = function() {
    const username = localStorage.getItem('username');
    const userLocation = localStorage.getItem('userLocation');

    if (username && userLocation) {
        userLocationDisplay.textContent = userLocation;
        showPage('dashboard');
    } else if (username) {
        showPage('location');
    } else {
        showPage('login');
    }
};
