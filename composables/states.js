import { useState } from "#app";

export const useRandomMeal = () => {
	const randomMeal = useState(
		'random-meal',
		() => ({}),
	);

	const setRandomMeal = async (meal) => {
		randomMeal.value = meal;
	}

	return {
		randomMeal,
		setRandomMeal,
	}
}