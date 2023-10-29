export const addToFavorites = (meal) => {
	const savedMeals = process.client ? JSON.parse(localStorage.getItem('favoriteMeals')) : [];
	const updatedFavorites = [ ...savedMeals, meal ];
	localStorage.setItem('favoriteMeals', JSON.stringify(updatedFavorites));
}

export const removeFromFavorites = (mealId) => {
	const savedMeals = process.client ? JSON.parse(localStorage.getItem('favoriteMeals')) : [];
	const updatedFavorites = savedMeals.filter(({ idMeal }) => idMeal !== mealId);
	localStorage.setItem('favoriteMeals', JSON.stringify(updatedFavorites));
}

export const isMealInFavorites = (mealId) => {
	const savedMeals = process.client ? JSON.parse(localStorage.getItem('favoriteMeals')) : [];

	return !!savedMeals.find(({ idMeal }) => idMeal === mealId);
}