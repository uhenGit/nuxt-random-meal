<script setup>
import { ref } from "vue";
import { removeFromFavorites, addToFavorites, isMealInFavorites } from '~/utils/index.js';

const { recipe } = defineProps({
	recipe: {
		type: Object,
		required: true,
	},
});

const emit = defineEmits([ 'handle-favorites' ]);

const isListChanging = ref(false);

const handleFavorites = () => {
	isListChanging.value = true;

	if (isMealInFavorites(recipe.idMeal)) {
		removeFromFavorites(recipe.idMeal);
		emit('handle-favorites');
	} else {
		addToFavorites(recipe);
	}

	isListChanging.value = false;
}
const iconColor = () => isMealInFavorites(recipe.idMeal)
	? 'color: rgb(255, 0, 0); font-size: 2rem; cursor: pointer'
	: 'font-size: 2rem; cursor: pointer';
const iconTitle = () => isMealInFavorites(recipe.idMeal) ? 'Remove from favorites' : 'Save to favorites';
</script>

<template>
	<!--	tooltip does not work-->
	<div
		class="text-end"
		data-bs-toggle="tooltip"
		data-bs-placement="bottom"
		:data-bs-title="iconTitle()"
		@click="handleFavorites"
	>
		<i
			v-if="!isListChanging"
			class="bi bi-star"
			:style="iconColor()"
		/>
	</div>
</template>