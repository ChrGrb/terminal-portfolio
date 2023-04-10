<script lang="ts">
    export let navigationLinks = [
        {
            name: "about",
        },
        {
            name: "skills",
        },
        {
            name: "projects",
        },
        {
            name: "experience",
        },
    ];

    export let navigationElements: HTMLAnchorElement[] = [];
</script>

<!-- Links to navigate with the Astro Router -->
{#each navigationLinks as navigationLink, index}
    <a
        href={`/${navigationLink.name}`}
        class="hidden"
        bind:this={navigationElements[index]}>{navigationLink.name}</a
    >
{/each}
