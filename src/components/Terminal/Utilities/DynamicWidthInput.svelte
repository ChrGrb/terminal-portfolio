<script lang="ts">
    export let inputCommand: string;
    export let keyHandler: (event: KeyboardEvent) => void;

    let inputElement: HTMLInputElement;

    // Reset the focus to the input element, whenever a key was pressed
    const resetFocusToInput = (event: KeyboardEvent) => {
        // Make tab still go through the clickable elements on the page
        if (event.key !== "Tab") {
            // Handle the event if the input element was not in focus
            keyHandler(event);
            inputElement.focus();
        }
    };

    const addDynamicWidth = (node: HTMLInputElement, input: string) => {
        // Automatically set focus on the input element, as soon as element was loaded to DOM
        node.focus();

        return {
            // Function called as soon, as the input on the command input changes
            update(input: string) {
                // Get reference to the input measurer
                const measurer = document.getElementById("input-measurer");
                if (measurer === null) {
                    console.error("Measurer element not found");
                    return;
                }

                // Determine the width the input should have with the text that was written
                let inputWidth = updateInputNodeWidth(input, measurer);

                // Set the input width based on the measured width for input text
                node.style.width = `${inputWidth}px`;

                node.focus();
            },
        };
    };

    const updateInputNodeWidth = (inputText: string, measurer: HTMLElement) => {
        // Set the content of the hidden span to the input text
        measurer.textContent = inputText;

        // Make the hidden span visible just to measure its width
        measurer.classList.remove("hidden");

        // Set the input width based on the hidden span width
        let measuredWidth = measurer.offsetWidth;

        // Hide the hidden span again
        measurer.classList.add("hidden");

        return measuredWidth;
    };
</script>

<svelte:window on:keydown={resetFocusToInput} />

<input
    id="dynamic-width-input"
    type="text"
    bind:value={inputCommand}
    bind:this={inputElement}
    class="bg-transparent focus:border-none focus:outline-none w-0"
    use:addDynamicWidth={inputCommand}
    on:keydown={keyHandler}
/>

<span id="input-measurer" class="hidden whitespace-nowrap" />

<style>
    #dynamic-width-input {
        color: transparent;
        text-shadow: 0 0 0 #fff; /* Set the text shadow to match the desired text color */
    }

    #input-measurer {
        white-space: pre;
    }
</style>
