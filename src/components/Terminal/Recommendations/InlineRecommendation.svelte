<script lang="ts">
    import { fade } from "svelte/transition";
    import { getRecommendation } from "./recommendations";
    export let input: string;
    export let inputRecommendation: string;
    // Possibility to overwrite the used function for getting the recommendations
    export let getRecommendationFunction = getRecommendation;

    // React recommendation that changes, whenever input changes
    $: inputRecommendation = getRecommendationFunction(input);
</script>

<!-- Use key to make the text change transitionable -->
{#key inputRecommendation}
    <span
        id="input-recommendations"
        class="w-full opacity-50 absolute inset-0"
        transition:fade={{ duration: 200 }}>{inputRecommendation}</span
    >
{/key}
