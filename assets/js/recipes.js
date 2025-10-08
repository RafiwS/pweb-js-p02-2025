let allRecipes = [];
let filteredRecipes = [];
let displayedRecipes = 0;
const recipesPerPage = 9;
let searchDebounceTimer = null;

document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
    displayUserName();
    setupEventListeners();
    fetchRecipes();
});

function checkAuthentication() {
    const firstName = localStorage.getItem('firstName');
    if (!firstName) {
        window.location.href = 'index.html';
    }
}

function displayUserName() {
    const firstName = localStorage.getItem('firstName');
    document.getElementById('userName').textContent = firstName;
}

function setupEventListeners() {
    document.getElementById('logoutButton').addEventListener('click', handleLogout);
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    document.getElementById('cuisineFilter').addEventListener('change', handleFilter);
    document.getElementById('showMoreButton').addEventListener('click', showMoreRecipes);
    document.getElementById('retryButton').addEventListener('click', fetchRecipes);
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target.id === 'recipeModal') {
            closeModal();
        }
    });
}

function handleLogout() {
    localStorage.removeItem('firstName');
    window.location.href = 'index.html';
}

async function fetchRecipes() {
    showLoading();
    hideError();
    try {
        const response = await fetch('https://dummyjson.com/recipes');
        if (!response.ok) {
            throw new Error('Gagal mengambil data recipes');
        }
        const data = await response.json();
        allRecipes = data.recipes;
        filteredRecipes = [...allRecipes];
        populateCuisineFilter();
        displayedRecipes = 0;
        hideLoading();
        displayRecipes();
    } catch (error) {
        console.error('Error fetching recipes:', error);
        hideLoading();
        showError();
    }
}

function populateCuisineFilter() {
    const cuisineFilter = document.getElementById('cuisineFilter');
    const cuisines = [...new Set(allRecipes.map(recipe => recipe.cuisine))].sort();
    cuisines.forEach(cuisine => {
        const option = document.createElement('option');
        option.value = cuisine;
        option.textContent = cuisine;
        cuisineFilter.appendChild(option);
    });
}

function displayRecipes() {
    const recipesGrid = document.getElementById('recipesGrid');
    const showMoreButton = document.getElementById('showMoreButton');
    const recipesToShow = filteredRecipes.slice(0, displayedRecipes + recipesPerPage);
    displayedRecipes = recipesToShow.length;
    recipesGrid.innerHTML = '';
    if (recipesToShow.length === 0) {
        recipesGrid.innerHTML = '<p style="text-align: center; color: #666; padding: 40px;">Tidak ada resep yang ditemukan.</p>';
        showMoreButton.style.display = 'none';
        return;
    }
    recipesToShow.forEach(recipe => {
        const card = createRecipeCard(recipe);
        recipesGrid.appendChild(card);
    });
    if (displayedRecipes < filteredRecipes.length) {
        showMoreButton.style.display = 'block';
    } else {
        showMoreButton.style.display = 'none';
    }
}

function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    const stars = generateStars(recipe.rating);
    const totalCookTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
    const ingredientsList = recipe.ingredients.join(', ');
    card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
        <div class="recipe-content">
            <h3 class="recipe-title">${recipe.name}</h3>
            <div class="recipe-meta">
                <span class="meta-item">⏱️ ${totalCookTime} menit</span>
                <span class="meta-item">🍳 ${recipe.difficulty}</span>
                <span class="meta-item">🌍 ${recipe.cuisine}</span>
            </div>
            <div class="recipe-rating">
                <span class="stars">${stars}</span>
                <span class="rating-value">${recipe.rating}</span>
            </div>
            <div class="recipe-ingredients">
                <div class="ingredients-title">Bahan-bahan:</div>
                <div class="ingredients-list">${ingredientsList}</div>
            </div>
            <button class="btn-view-recipe" onclick="showRecipeDetail(${recipe.id})">View Full Recipe</button>
        </div>
    `;
    return card;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '★';
    }
    if (hasHalfStar) {
        stars += '☆';
    }
    while (stars.length < 5) {
        stars += '☆';
    }
    return stars;
}

function handleSearch(e) {
    const searchQuery = e.target.value.toLowerCase().trim();
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
        filterRecipes(searchQuery);
    }, 500);
}

function filterRecipes(searchQuery = '') {
    const cuisineFilter = document.getElementById('cuisineFilter').value;
    filteredRecipes = allRecipes.filter(recipe => {
        const matchesSearch = searchQuery === '' ||
            recipe.name.toLowerCase().includes(searchQuery) ||
            recipe.cuisine.toLowerCase().includes(searchQuery) ||
            recipe.ingredients.some(ing => ing.toLowerCase().includes(searchQuery)) ||
            recipe.tags.some(tag => tag.toLowerCase().includes(searchQuery));
        const matchesCuisine = cuisineFilter === '' || recipe.cuisine === cuisineFilter;
        return matchesSearch && matchesCuisine;
    });
    displayedRecipes = 0;
    displayRecipes();
}

function handleFilter() {
    const searchInput = document.getElementById('searchInput');
    const searchQuery = searchInput.value.toLowerCase().trim();
    filterRecipes(searchQuery);
}

function showMoreRecipes() {
    displayRecipes();
}

function showRecipeDetail(recipeId) {
    const recipe = allRecipes.find(r => r.id === recipeId);
    if (!recipe) return;
    const modal = document.getElementById('recipeModal');
    const modalBody = document.getElementById('modalBody');
    const stars = generateStars(recipe.rating);
    modalBody.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}" class="modal-recipe-image">
        <h2 class="modal-recipe-title">${recipe.name}</h2>
        <div class="modal-meta">
            <span class="modal-meta-item">⏱️ Prep: ${recipe.prepTimeMinutes} menit</span>
            <span class="modal-meta-item">🍳 Cook: ${recipe.cookTimeMinutes} menit</span>
            <span class="modal-meta-item">👥 ${recipe.servings} porsi</span>
            <span class="modal-meta-item">📊 ${recipe.difficulty}</span>
            <span class="modal-meta-item">🌍 ${recipe.cuisine}</span>
            <span class="modal-meta-item">⭐ ${stars} ${recipe.rating}</span>
            <span class="modal-meta-item">🔥 ${recipe.caloriesPerServing} kcal/porsi</span>
        </div>
        <div class="modal-section">
            <h3 class="modal-section-title">Bahan-bahan:</h3>
            <ul class="modal-list">
                ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
        </div>
        <div class="modal-section">
            <h3 class="modal-section-title">Cara Memasak:</h3>
            <ol class="modal-list">
                ${recipe.instructions.map(inst => `<li>${inst}</li>`).join('')}
            </ol>
        </div>
        ${recipe.tags.length > 0 ? `
            <div class="modal-section">
                <h3 class="modal-section-title">Tags:</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${recipe.tags.map(tag => `<span class="meta-item">${tag}</span>`).join('')}
                </div>
            </div>
        ` : ''}
    `;
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('recipeModal').style.display = 'none';
}

function showLoading() {
    document.getElementById('loadingState').style.display = 'block';
    document.getElementById('recipesGrid').style.display = 'none';
}

function hideLoading() {
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('recipesGrid').style.display = 'grid';
}

function showError() {
    document.getElementById('errorState').style.display = 'block';
}

function hideError() {
    document.getElementById('errorState').style.display = 'none';
}
