<script setup>
const { recipe } = defineProps({
	recipe: {
		type: Object,
		required: true,
	},
});

const recipeIngredients = computed(() => {
	const ingredientsNames = getRecipeItem('strIngredient')
		.map((item) => item[1]);
	return getRecipeItem('strMeasure')
		.map((item, idx) => `${ingredientsNames[idx]} - ${item[1]}`);
});

const getRecipeItem = (recipeItem) => {
	return Object.entries(recipe)
		.filter((item) => (item[0].includes(recipeItem) && item[1] && item[1].trim()));
}
</script>

<template>
	<ul
		v-if="recipeIngredients.length !== 0"
		class="list-group list-group-flush"
	>
		<li
			v-for="ingredient in recipeIngredients"
			:key="ingredient.idMeal"
			class="list-group-item"
		>
			{{ ingredient }}
		</li>
	</ul>
</template>