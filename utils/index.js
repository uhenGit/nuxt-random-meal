const savedMeals = process.client && localStorage.getItem('favoriteMeals')
	? JSON.parse(favoriteMeals)
	: [];
	
export const addToFavorites = (meal) => {
	const updatedFavorites = [ ...savedMeals, meal ];
	localStorage.setItem('favoriteMeals', JSON.stringify(updatedFavorites));
}

export const removeFromFavorites = (mealId) => {
	const updatedFavorites = savedMeals.filter(({ idMeal }) => idMeal !== mealId);
	localStorage.setItem('favoriteMeals', JSON.stringify(updatedFavorites));
}

export const isMealInFavorites = (mealId) => {
	return !!savedMeals.find(({ idMeal }) => idMeal === mealId);
}