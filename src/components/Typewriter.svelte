<script>
    import { onMount } from "svelte";

    const delay = 100; // Delay between each letter (in milliseconds)
    let typedText = "";
    let cursor = "";
    let i = 0;
    let isCursorVisible = true;

    var textList = [
        "a Software Developer",
        "a UX Enthusiast",
        "a Student",
        "a Learner",
        "Christoph Gruber",
    ];
    var textListIndex = 0;

    onMount(async () => {
        typeWriter();
        setInterval(toggleCursor, 500); // Blink cursor every 500ms
    });

    // Function to simulate typing effect
    function typeWriter() {
        let text = textList[textListIndex];
        if (i < text.length) {
            typedText += text.charAt(i);
            i++;
        } else {
            if (textListIndex < textList.length - 1) {
                textListIndex++;
                setTimeout(deleteText, 3000); // Wait for 1 second and start deleting
            }
            return;
        }
        setTimeout(typeWriter, delay);
    }

    // Function to simulate deleting effect
    function deleteText() {
        if (i > 0) {
            typedText = typedText.slice(0, -1);
            i--;
        } else {
            setTimeout(typeWriter, 1000); // Wait for 1 second and start typing again
            return;
        }
        setTimeout(deleteText, delay);
    }

    // Function to toggle cursor visibility
    function toggleCursor() {
        isCursorVisible = !isCursorVisible;
    }
</script>

<div class="">
    <span class="flex justify-end h-8 text-center">
        {typedText}
        {#if isCursorVisible}
            |
        {:else}
            &nbsp;
        {/if}
    </span>
</div>
