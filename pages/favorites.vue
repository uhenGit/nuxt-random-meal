<script setup>
import { ref, onMounted } from "vue";

onMounted(() => getFavoriteMeals());

const favoriteMeals = ref(null);
const getFavoriteMeals = () => {
	if (process.client) {
		favoriteMeals.value = JSON.parse(localStorage.getItem('favoriteMeals'))
	}
}
</script>

<template>
	<div>
		<h2>Favorites</h2>
		<div class="container">
			<h5
				v-if="!favoriteMeals || (favoriteMeals.length === 0)"
				class="my-4"
			>
				You do not have any saved recipes yet
			</h5>
			<div
				v-else
				class="row"
			>
				<template
					v-for="recipe in favoriteMeals"
					:key="recipe.idMeal"
				>
					<recipe-card
						:recipe="recipe"
						:tiny="true"
						@on-change-favorites="getFavoriteMeals"
					/>
				</template>
			</div>
		</div>
	</div>
</template>
