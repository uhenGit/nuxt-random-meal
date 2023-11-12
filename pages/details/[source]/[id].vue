<script>
import { useRoute, useRouter } from 'vue-router';
import { addToFavorites, isMealInFavorites, removeFromFavorites, savedMeals } from "~/utils/index.js";
import { useRandomMeal } from "~/composables/states.js";

const getMealFromFavoritesList = (mealId) => {
	return savedMeals().find(({ idMeal }) => idMeal === mealId);
}
export default {
	emits: [ 'on-change-favorites' ],

	setup() {
		const route = useRoute();
		const router = useRouter();
		const prevPage = route.params.source;
		const recipe = prevPage === 'index'
			? useRandomMeal().randomMeal.value
			: getMealFromFavoritesList(route.params.id);

		return { recipe, prevPage, router };
	},

	data() {
		return {
			isListChanging: false,
		};
	},

	computed: {
		processedInstructions() {
			const matchedString = this.recipe?.strInstructions?.includes('\r\n\r\n') ? '\r\n\r\n' : '\r\n';

			return this.recipe?.strInstructions?.split(matchedString).filter((step) => step !== '');
		},
	},

	mounted() {
		if (!('idMeal' in this.recipe)) {
			this.router.push('/');
		}
	},

	methods: {
		handleFavorites() {
			this.isListChanging = true;

			if (isMealInFavorites(this.recipe.idMeal)) {
				removeFromFavorites(this.recipe.idMeal);
				this.$nextTick(() => {
					if (this.prevPage === 'index') {
						return;
					}

					this.router.push(`/${this.prevPage}`);
				})
			} else {
				addToFavorites(this.recipe);
			}

			this.isListChanging = false;
		},

		btnText() {
			return isMealInFavorites(this.recipe.idMeal)
				? 'Remove from favorites'
				: 'Save to favorites';
		},

		btnColor() {
			return isMealInFavorites(this.recipe.idMeal)
				? 'btn-warning'
				: 'btn-primary';
		},
	},
}
</script>

<template>
	<div class="container my-2">
		<client-only>
			<div v-if="!recipe">
				<div
					class="spinner-grow"
					style="width: 3rem; height: 3rem;"
					role="status"
				>
					<span class="visually-hidden">Loading...</span>
				</div>
			</div>
			<div v-else>
				<h2 class="my-4">
					{{ recipe.strMeal }}
					<small>
						<nuxt-link
							class="text-body-secondary fs-6"
							:to="recipe.strSource"
							target="blank"
						>
							Original recipe source
						</nuxt-link>
					</small>
				</h2>
				<div class="card p-4">
					<favorite-icon
						:recipe="recipe"
						@handle-favorites="() => { $emit('on-change-favorites') }"
					/>
					<div class="col">
						<div class="row g-0">
							<div class="col-md-4 p-4">
								<h3 class="ps-3 fst-italic text-body-secondary">
									Ingredients:
								</h3>
								<recipe-ingredients :recipe="recipe" />
							</div>
							<div class="card-text col-md-8 p-4">
								<h3 class="ps-3">
									Steps:
								</h3>
								<p
									v-for="(step, idx) in processedInstructions"
									:key="idx"
									class="pb-3"
								>
									{{ step }}
								</p>
								<button
									v-if="!isListChanging"
									type="button"
									class="btn mt-1 w-100"
									:class="btnColor()"
									@click="handleFavorites"
								>
									{{ btnText() }}
								</button>
							</div>
						</div>
						<div class="container-fluid text-center">
							<img
								:src="recipe.strMealThumb"
								class="img-fluid rounded-start"
								alt="meal thumbnail"
							>
						</div>
					</div>
				</div>
			</div>
		</client-only>
	</div>
</template>
