<script setup>
import { useRoute } from 'vue-router';

const { recipe, tiny } = defineProps({
	recipe: {
		type: Object,
		required: true,
	},
	tiny: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits([ 'on-change-favorites' ]);

const route = useRoute();
</script>

<template>
	<div
		class="card m-2 p-4"
	>
		<favorite-icon
			:recipe="recipe"
			@handle-favorites="() => { emit('on-change-favorites') }"
		/>
		<div class="row g-0">
			<div class="col-md-4">
				<img
					:src="recipe.strMealThumb"
					class="img-fluid rounded-start"
					:class="{ 'w-50': tiny }"
					alt="meal thumbnail"
				>
			</div>
			<div class="col-md-8">
				<div class="card-body pt-0">
					<h5 class="card-title">
						{{ recipe.strMeal }}
					</h5>
					<slot />
					<button
						type="button"
						class="btn btn-info w-100"
						:class="tiny ? 'mt-4' : 'mt-1'"
					>
						<NuxtLink :to="`/details/${route.name}/${recipe.idMeal}`">
							Watch recipe details
						</NuxtLink>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
