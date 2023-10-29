<script>
import { useRoute } from 'vue-router';
import { addToFavorites, isMealInFavorites, removeFromFavorites } from "~/utils/index.js";
import { useRandomMeal } from "~/composables/states.js";

const getMealFromFavoritesList = (mealId) => {
	const savedMeals = JSON.parse(localStorage.getItem('favoriteMeals'));

	return savedMeals.find(({ idMeal }) => idMeal === mealId);
}
export default {
	setup() {
		const route = useRoute();
		const prevPage = route.params.source;
		const recipe = prevPage === 'index'
			? useRandomMeal().randomMeal
			: getMealFromFavoritesList(route.params.id);

		return { recipe, prevPage };
	},

	data() {
		return {
			isListChanging: false,
		};
	},

	computed: {
		isMealInFavs() {
			return isMealInFavorites(this.recipe.idMeal);
		},

		processedInstructions() {
			const matchedString = this.recipe.strInstructions.includes('\r\n\r\n') ? '\r\n\r\n' : '\r\n';

			return this.recipe.strInstructions
				.split(matchedString)
				.filter((step) => step !== '');
		},

		handleMealButton() {
			return this.isMealInFavs
				? 'Remove from favorites'
				: 'Save to favorites';
		},
	},

	methods: {
		handleFavorites() {
			this.isListChanging = true;

			if (this.isMealInFavs) {
				removeFromFavorites(this.recipe.idMeal);
			} else {
				addToFavorites(this.recipe);
			}

			this.isListChanging = false;
		},
	},
}
</script>

<template>
	<div class="container my-2">
		<h1 class="my-4">
			{{ recipe.strMeal }}
			<small>
				<a
					class="text-body-secondary fs-6"
					:href="recipe.strSource"
				>
					Original recipe source
				</a>
			</small>
		</h1>
		<div class="card">
			<div class="col">
				<div class="row g-0">
					<div class="col-md-4 p-4">
						<h3 class="ps-3 fst-italic text-body-secondary">
							Ingredients:
						</h3>
						<recipe-ingredients :recipe="recipe"/>
					</div>
					<div class="card-text col-md-8 p-4">
						<h3 class="ps-3">
							Steps:
						</h3>
						<ol>
							<li
								v-for="(step, idx) in processedInstructions"
								:key="idx"
								class="pb-3"
							>
								{{ step }}
							</li>
						</ol>
						<button
							v-if="!isListChanging"
							type="button"
							class="btn mt-1 w-100"
							:class="isMealInFavs ? 'btn-warning' : 'btn-primary'"
							@click="handleFavorites"
						>
							{{ handleMealButton }}
						</button>
					</div>
				</div>
				<div class="container-fluid text-center pb-2">
					<img
						:src="recipe.strMealThumb"
						alt="meal thumbnail"
					>
				</div>
			</div>
		</div>
	</div>
</template>
