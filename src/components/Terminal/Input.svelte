<script lang="ts">
    import Cursor from "./Utilities/Cursor.svelte";
    import DynamicWidthInput from "./Utilities/DynamicWidthInput.svelte";
    import InlineRecommendation from "./Recommendations/InlineRecommendation.svelte";

    export let inputCommand: string = "";
    export let inputRecommendation: string = "";
    export let commandEnteredHandler: () => void;
    export const animateWrongInput = async () => {
        startFalseInputAnimation = true;
        await new Promise((r) => setTimeout(r, 1000));
        startFalseInputAnimation = false;
    };

    let startFalseInputAnimation = false;

    let keyHandler = (event: KeyboardEvent) => {
        if (event.key === "Enter") {
            commandEnteredHandler();
        }

        if (event.key === "Tab") {
            inputCommand = inputRecommendation;
        }

        if (event.ctrlKey && event.key === "c") {
            inputCommand = "";
        }
    };
</script>

<div
    class="w-full h-full flex justify-start align-center relative"
    class:animate-shake={startFalseInputAnimation}
>
    <DynamicWidthInput bind:inputCommand bind:keyHandler />

    <Cursor />

    <InlineRecommendation bind:input={inputCommand} bind:inputRecommendation />
</div>
