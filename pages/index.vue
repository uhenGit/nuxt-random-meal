<script setup>
import { useRandomMeal } from "~/composables/states.js";

const { setRandomMeal, randomMeal } = useRandomMeal();
const { pending, error } = useAsyncData('meal', async () => {
	if (!('idMeal' in randomMeal.value)) {
		const { meals } = await $fetch('https://www.themealdb.com/api/json/v1/1/random.php');

		if (!meals || meals.length === 0) {
			throw createError({ status: 404, message: 'There is no meal was found', fatal: true });
		}

		await setRandomMeal(meals[0]);
	}
});

if (error && error.value) {
	throw createError({ status: 404, message: 'Error fetching the data', fatal: true });
}
</script>

<template>
	<div class="container-fluid">
		<h1>Random recipe app</h1>
		<client-only>
			<div v-if="pending">
				<h3>Loading</h3>
				<div
					class="spinner-grow"
					style="width: 3rem; height: 3rem;"
					role="status"
				>
					<span class="visually-hidden">Loading...</span>
				</div>
			</div>
			<div v-else>
				<recipe-card :recipe="randomMeal">
					<recipe-ingredients :recipe="randomMeal" />
				</recipe-card>
			</div>
		</client-only>
	</div>
</template>
