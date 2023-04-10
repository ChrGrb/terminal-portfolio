<script lang="ts">
    import lottie, { type AnimationItem } from "lottie-web";
    import { onMount } from "svelte";

    let logoAnimation: AnimationItem;
    let lottieElement: HTMLElement;
    let startShiftAnimation = false;
    let showLottie = false;

    onMount(() => {
        // Create the lottie animation after the component has been mounted
        logoAnimation = lottie.loadAnimation({
            container: lottieElement,
            renderer: "svg",
            loop: false,
            autoplay: false,
            path: "../../assets/lottie/logo-animation.json",
        });
    });

    // This function runs the animation before navigating to a new page
    export const animateNavigation = async () => {
        startShiftAnimation = true;

        await new Promise((r) => setTimeout(r, 1000));

        showLottie = true;
        logoAnimation.play();

        await new Promise((r) => setTimeout(r, 1500));
    };
</script>

<div
    class="h-full basis-1/2 relative flex justify-center align-middle my-auto"
    class:animate-shift={startShiftAnimation}
>
    <div
        class="my-auto bg-clip-text bg-gradient-to-tr from-orange-500 from-20% via-violet-500 via-70% to-blue-500 to-90% text-transparent tracking-widest font-semibold pl-[45%] transition-all duration-600"
    >
        <!-- Logo in Text -->
        <p class:opacity-0={showLottie} class:opacity-100={!showLottie}>
            ..<br />
            ^^^^^^^.<br />
            ^^^^^^^^^^^.<br />
            ^^^^^^^^^^^^^.<br />
            ^^^^^^^^^^^^^^&quot;<br />
            ^^^^^^^^^^^^^^^^<br />
            ^^^^^^^^^^^^^^^^-<br />
            ^^^^^^^^^^^^^^^^^<br />
            ^^^^^^^^^^^^^^^^^<br />
            ^^^^^^^^^^^^^^^^^<br />
            ^^^^^^^^^^^^^^^^<br />
            ^^^^^^^^^^^^^^^'<br />
            ^^^^^^^^^^^^^^<br />
            ^^^^^^^^^^^^'<br />
            ^^^^^^^^^&quot;<br />
            ^^^&quot;-'
        </p>
        <!-- Lottie Animation -->
        <div
            class="absolute inset-0 mx-auto transition-all ease duration-600"
            class:opacity-0={!showLottie}
            class:opacity-100={showLottie}
        >
            <div
                id="logo-lottie"
                class="h-full w-full"
                bind:this={lottieElement}
            />
        </div>
    </div>
</div>
