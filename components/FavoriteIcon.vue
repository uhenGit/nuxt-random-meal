<script setup>
const { recipe } = defineProps({
	recipe: {
		type: Object,
		required: true,
	},
});
const isMealInFavs = isMealInFavorites(recipe.idMeal);
const handleFavorites = () => {
	isMealInFavs
		? removeFromFavorites(recipe.idMeal)
		: addToFavorites(recipe);
}
const iconColor = computed(() => isMealInFavs ? 'color: rgb(255, 0, 0)' : '');
const iconTitle = computed(() => isMealInFavs ? 'Remove from favorites' : 'Add to favorites');
</script>

<template>
	<div
		data-bs-toggle="tooltip"
		data-bs-placement="bottom"
		:data-bs-title="iconTitle"
		@click="handleFavorites"
	>
		<i
			class="bi bi-star"
			:style="iconColor"
		/>
	</div>
</template>