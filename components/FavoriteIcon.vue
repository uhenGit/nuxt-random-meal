<script setup>
import { ref } from "vue";
import { removeFromFavorites, addToFavorites, isMealInFavorites } from '~/utils/index.js';

const { recipe } = defineProps({
	recipe: {
		type: Object,
		required: true,
	},
});
// @todo reload part to update color
const isListChanging = ref(false);

const isMealInFavs = isMealInFavorites(recipe.idMeal);

const handleFavorites = () => {
	isListChanging.value = true;
	if (isMealInFavs) {
		removeFromFavorites(recipe.idMeal);
	} else {
		addToFavorites(recipe);
	}
	isListChanging.value = false;
}
const iconColor = computed(() => isMealInFavs ? 'color: rgb(255, 0, 0)' : '');
const iconTitle = computed(() => isMealInFavs ? 'Remove from favorites' : 'Add to favorites');
</script>

<template>
	<!--	tooltip does not work-->
	<div
		data-bs-toggle="tooltip"
		data-bs-placement="bottom"
		:data-bs-title="iconTitle"
		@click="handleFavorites"
	>
		<i
			v-if="!isListChanging"
			class="bi bi-star"
			:style="iconColor"
		/>
	</div>
</template>