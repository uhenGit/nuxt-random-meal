<script setup>
import { useRandomMeal } from "~/composables/states.js";

const { randomMeal, loading, error } = useRandomMeal();

if (error && error.value) {
	throw createError({ status: 404, message: 'Error fetching the data', fatal: true });
}
</script>

<template>
	<div class="container-fluid">
		<h1>Random recipe app</h1>
		<client-only>
			<div v-if="loading">
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
