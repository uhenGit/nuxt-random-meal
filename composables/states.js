import { useState } from "#app";
import { ref, onMounted } from "vue";

export const useRandomMeal = () => {
	const randomMeal = useState(
		'random-meal',
		() => ({}),
	);
	const loading = ref(false);
	const error = ref(null);

	const setRandomMeal = async () => {
		loading.value = true;
		try {
			// eslint-disable-next-line
			const { meals } = await $fetch('https://www.themealdb.com/api/json/v1/1/random.php');

			if (!meals || meals.length === 0) {
				throw new Error('There was no meal found');
			}

			randomMeal.value = meals[0];
		} catch (err) {
			error.value = err;
		} finally {
			loading.value = false;
		}
	}

	onMounted(() => {
		setRandomMeal();
	})

	return {
		randomMeal,
		loading,
		error,
	};
}