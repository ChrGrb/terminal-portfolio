<script lang="ts">
    let startZoomAnimation = false;

    export const animateNavigation = async () => {
        startZoomAnimation = true;

        await new Promise((r) => setTimeout(r, 1500));
    };
</script>

<div
    class="flex flex-col rounded-md overflow-hidden bg-slate-800 h-full relative shadow-md max-h-[80vh] max-w-[70em] mx-auto"
    class:animate-zoom={startZoomAnimation}
>
    <div class="flex justify-start gap-2 px-3 py-2 bg-slate-200">
        <div class="rounded-lg bg-red-600 h-3 w-3" />
        <div class="rounded-lg bg-yellow-600 h-3 w-3" />
        <div class="rounded-lg bg-green-600 h-3 w-3" />
    </div>

    <div class="h-full aspect-video flex flex-col justify-end text-slate-100">
        <div class="w-full h-full relative">
            <div class="flex justify-between align-middle p-10 h-full">
                <slot name="content" />
            </div>

            <slot name="recommendations" />
        </div>

        <!-- Seperator -->
        <div class="bg-slate-200 h-[2px] w-full" />

        <!-- Text Input -->
        <div class="px-3 py-2" data-id="type">
            <slot name="input" />
        </div>
    </div>
</div>
