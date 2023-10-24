export default function (meal) {
	console.log('save');
	const savedMeals = JSON.parse(localStorage.getItem('favoriteMeals')) || [];
	const updatedFavoriteMeals = [ ...savedMeals, meal ];
	localStorage.setItem('favoriteMeals', JSON.stringify(updatedFavoriteMeals));
}