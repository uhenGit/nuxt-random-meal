<script setup>
defineProps({
	recipe: {
		type: Object,
		required: true,
	},
	tiny: {
		type: Boolean,
		default: false,
	},
});
</script>

<template>
	<div
		class="card mx-2 p-4"
	>
		<favorite-icon :recipe="recipe"/>
		<div class="row g-0">
			<div class="col-md-4">
				<img
					:src="recipe.strMealThumb"
					class="img-fluid rounded-start"
					:class="{ 'w-50': tiny }"
					alt="meal image"
				>
			</div>
			<div class="col-md-8">
				<div class="card-body pt-0">
					<h5 class="card-title">
						{{ recipe.strMeal }}
					</h5>
					<template v-if="!tiny">
						<recipe-ingredients :recipe="recipe"/>
					</template>
					<button
						type="button"
						class="btn btn-info w-100"
						:class="tiny ? 'mt-4' : 'mt-1'"
						data-bs-toggle="modal"
						data-bs-target="#recipeDetails"
					>
						Watch recipe details
					</button>
					<details-modal :recipe="recipe"/>
				</div>
			</div>
		</div>
	</div>
</template>
