<div id="cursor" class="w-1 h-full bg-slate-100 rounded-lg blink" />

<style>
    @keyframes blink {
        0%,
        100% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
    }

    .blink {
        animation: blink 1s linear infinite;
    }
</style>
