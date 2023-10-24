<script setup>
const { recipe } = defineProps({
	recipe: {
		type: Object,
		required: true,
	},
});

const saveMeal = () => {
	saveToFavs(recipe);
}
</script>

<template>
	<div
		id="recipeDetails"
		class="modal fade"
		tabindex="-1"
		aria-labelledby="recipeDetailsLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog modal-dialog-scrollable modal-xl">
			<div class="modal-content">
				<div class="modal-header">
					<h1
						id="recipeDetailsLabel"
						class="modal-title"
					>
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
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"
					/>
				</div>
				<div class="modal-body">
					<div class="col">
						<div class="row g-0">
							<div class="col-md-4">
								<recipe-ingredients :recipe="recipe"/>
							</div>
							<div class="card-text col-md-8 p-4">
								<!--								hydration text content mismatch-->
								<div>{{ recipe.strInstructions }}</div>
								<button
									id="liveToastBtn"
									type="button"
									class="btn btn-primary mt-1 w-100"
									@click="saveMeal"
								>
									Save to favorites
								</button>
							</div>
							<div class="toast-container position-fixed bottom-0 end-0 p-3">
								<div
									id="liveToast"
									class="toast"
									role="alert"
									aria-live="assertive"
									aria-atomic="true"
								>
									<div class="toast-header">
										<strong class="me-auto">Recipe was successfully saved</strong>
										<button
											type="button"
											class="btn-close"
											data-bs-dismiss="toast"
											aria-label="Close"
										/>
									</div>
									<div class="toast-body">
										You can now browse it on
										<NuxtLink to="/favorites">
											Favorites
										</NuxtLink>
										page
									</div>
								</div>
							</div>
						</div>
						<div class="container-fluid text-center">
							<img
								:src="recipe.strMealThumb"
								class=""
								alt="meal thumbnail"
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
