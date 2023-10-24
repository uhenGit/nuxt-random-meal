<script setup>
const savedMeals = localStorage.getItem('favoriteMeals');
const favoriteMeals = JSON.parse(savedMeals) || [];
</script>

<template>
	<div>
		<h2>Favorites</h2>
		<div class="container">
			<h5
				v-if="favoriteMeals.length === 0"
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
					/>
				</template>
			</div>
		</div>
	</div>
</template>
