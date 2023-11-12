<script setup>
import { ref, onMounted, computed } from "vue";
import { savedMeals } from '~/utils';

const meals = ref([]);
const searchValue = ref('');

onMounted(() => getMeals());

const getMeals = () => {
	meals.value = savedMeals();
}

const favoriteMeals = computed(() => {
	if (!searchValue.value) {
		return meals.value;
	}

	const processedSearchValue = searchValue.value.trim().toLowerCase();

	return meals.value.filter(({ strMeal }) => strMeal.toLowerCase().includes(processedSearchValue));
})
</script>

<template>
	<div class="container">
		<h1>Favorites</h1>
		<form
			class="d-flex"
			role="search"
		>
			<input
				v-model="searchValue"
				class="form-control me-2"
				type="search"
				placeholder="Search"
				aria-label="Search"
			>
		</form>
		<div>
			<h5
				v-if="!favoriteMeals || (favoriteMeals.length === 0)"
				class="my-4"
			>
				You do not have any saved recipes yet
			</h5>
			<div
				v-else
			>
				<template
					v-for="recipe in favoriteMeals"
					:key="recipe.idMeal"
				>
					<recipe-card
						:recipe="recipe"
						:tiny="true"
						@on-change-favorites="getMeals"
					/>
				</template>
			</div>
		</div>
	</div>
</template>
