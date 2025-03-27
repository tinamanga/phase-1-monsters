// Select DOM elements
const monsterContainer = document.getElementById('monster-container');
const form = document.getElementById('monster-form');
const loadMoreButton = document.getElementById('load-more-button');

// Set initial page number and limit
let currentPage = 1;
const limit = 50;

// Function to fetch monsters from API
const fetchMonsters = async (page) => {
  try {
    const response = await fetch(`http://localhost:3000/monsters?_limit=${limit}&_page=${page}`);
    const monsters = await response.json();
    renderMonsters(monsters);
  } catch (error) {
    console.error('Error fetching monsters:', error);
  }
};

// Function to render monsters in the DOM
const renderMonsters = (monsters) => {
  monsters.forEach(monster => {
    const monsterDiv = document.createElement('div');
    monsterDiv.classList.add('monster');
    monsterDiv.innerHTML = `
      <h3>${monster.name}</h3>
      <p>Age: ${monster.age}</p>
      <p>Description: ${monster.description}</p>
    `;
    monsterContainer.appendChild(monsterDiv);
  });
};

// Event listener for form submission
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Collect form data
  const name = form.name.value;
  const age = form.age.value;
  const description = form.description.value;

  // POST request to create a new monster
  try {
    await fetch('http://localhost:3000/monsters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ name, age, description }),
    });

    // Clear form fields
    form.reset();

    // Reload monsters (to include the new one)
    monsterContainer.innerHTML = '';
    fetchMonsters(currentPage);
  } catch (error) {
    console.error('Error creating monster:', error);
  }
});

// Event listener for load more button
loadMoreButton.addEventListener('click', () => {
  currentPage++;
  fetchMonsters(currentPage);
});

// Initial load
fetchMonsters(currentPage);
