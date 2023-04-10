<script lang="ts">
    import { each } from "svelte/internal";
    import { scale, slide } from "svelte/transition";
    import { getRecommendations } from "./recommendations";
    export let input: string;
    // Possibility to overwrite the used function for getting the recommendations
    export let getRecommendationsFunction = getRecommendations;
    export let recommendationSelectedHandler = () => {};

    // Reactive recommendations that change, whenever input changes
    $: inputRecommendations = getRecommendationsFunction(input);

    export let selectedRecommendation = "";

    const formatRecommendation = (recommendation: string) => {
        return recommendation.split(" ").at(-1);
    };

    const arrowKeyHandler = (event: KeyboardEvent) => {
        if (inputRecommendations.length === 0) return;

        let currentRecommendationIndex = inputRecommendations.indexOf(
            selectedRecommendation
        );

        if (event.key === "ArrowUp") {
            selectedRecommendation =
                inputRecommendations[
                    (((currentRecommendationIndex - 1) %
                        inputRecommendations.length) +
                        inputRecommendations.length) %
                        inputRecommendations.length
                ];
        }
        if (event.key === "ArrowDown") {
            selectedRecommendation =
                inputRecommendations[
                    (currentRecommendationIndex + 1) %
                        inputRecommendations.length
                ];
        }
    };
</script>

<svelte:window on:keydown={arrowKeyHandler} />

<!-- Recommendations -->
<div class="absolute bottom-0">
    {#if inputRecommendations.length > 0}
        <div
            class="ml-3 py-2 px-3 rounded-t-md bg-slate-100 text-slate-800 flex flex-col gap-1 justify-start mr-auto"
        >
            {#each inputRecommendations as recommendation}
                <div transition:slide={{ duration: 50 }}>
                    <input
                        type="radio"
                        id={"recommendation-" + recommendation}
                        bind:group={selectedRecommendation}
                        name="recommendation"
                        value={recommendation}
                        checked={selectedRecommendation === recommendation}
                        on:change={recommendationSelectedHandler}
                        on:click={recommendationSelectedHandler}
                        class="hidden peer"
                    />
                    <label
                        for={"recommendation-" + recommendation}
                        class="flex gap-3 bg-clip-text bg-slate-800 peer-checked:bg-gradient-to-tr from-orange-500 via-violet-500 to-blue-500 peer-checked:text-transparent group transition-all"
                    >
                        <div class="h-4 w-4 relative my-auto">
                            <div
                                id="command-line-icon"
                                class="absolute inset-0 opacity-0 group-peer-checked:opacity-100 bg-gradient-to-tr from-orange-500 to-violet-500 transition-all"
                            />
                            <div
                                id="command-line-icon"
                                class="h-4 w-4 my-auto bg-slate-800 opacity-100 group-peer-checked:opacity-0 transition-all"
                            />
                        </div>

                        <span class="text-lg"
                            >{formatRecommendation(recommendation)}</span
                        >
                    </label>
                </div>
            {/each}
        </div>
    {/if}
</div>

<svg xmlns="http://www.w3.org/2000/svg" height="0" width="0">
    <defs>
        <clipPath id="commandIconClip" clipPathUnits="objectBoundingBox">
            <path
                fill-rule="evenodd"
                d="M0.16,0 a0.16,0.16,0,0,0,-0.16,0.16 v0.68 a0.16,0.16,0,0,0,0.16,0.16 h0.68 a0.16,0.16,0,0,0,0.16,-0.16 V0.16 a0.16,0.16,0,0,0,-0.16,-0.16 H0.16 m0.011,0.251 a0.037,0.037,0,0,0,0,0.052 l0.2,0.197,-0.2,0.197 a0.037,0.037,0,0,0,0,0.053 a0.038,0.038,0,0,0,0.053,0 l0.227,-0.223 a0.037,0.037,0,0,0,0,-0.053 L0.225,0.251 a0.038,0.038,0,0,0,-0.053,0 m0.631,0.435 h-0.34 a0.037,0.037,0,0,0,-0.038,0.037 c0,0.021,0.017,0.037,0.038,0.037 h0.34 a0.037,0.037,0,0,0,0.038,-0.037 a0.037,0.037,0,0,0,-0.038,-0.037"
                clip-rule="evenodd"
            />
        </clipPath>
    </defs>
</svg>

<style>
    #command-line-icon {
        clip-path: url(#commandIconClip);
    }
</style>
