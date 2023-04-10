<script lang="ts">
    import Input from "./Input.svelte";
    import PopupRecommendations from "./Recommendations/PopupRecommendations.svelte";
    import LogoContainer from "./Utilities/LogoContainer.svelte";
    import TerminalWrapper from "./Utilities/TerminalWrapper.svelte";
    import commands from "./commands.json";
    import NavigationLinks from "./Utilities/NavigationLinks.svelte";
    import IconWrapper from "./Utilities/IconWrapper.svelte";

    import AOS from "aos";
    import "aos/dist/aos.css";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    let inputCommand: string = "";
    let inputRecommendation: string;

    let logoAnimation: () => Promise<void>;
    let terminalAnimation: () => Promise<void>;
    let animateWrongInput: () => Promise<void>;
    let showTerminalOutput = true;

    let navigationLinks: { name: string }[];
    let navigationElements: HTMLAnchorElement[];

    let commandEnteredHandler = async () => {
        if (inputCommand.length === 0) {
            return;
        }

        if (!validateCommand(inputCommand)) {
            await animateWrongInput();
            inputCommand = "";
            return;
        }

        let commandType = inputCommand.split(" ")[0];

        switch (commandType) {
            case "cd":
                showTerminalOutput = false;
                await logoAnimation();
                await terminalAnimation();

                let page = inputCommand.split(" ")[1];

                let link =
                    navigationElements[
                        navigationLinks.findIndex((link) => link.name === page)
                    ];
                fireLinkClick(link);

                break;
            case "ls":
                console.log("about", "skills", "projects", "experience");

                break;
            case "help":
                console.log("cd", "ls", "help");

                break;
        }

        inputCommand = "";
    };

    let validateCommand = (command: string) => {
        if (
            command.split(" ")[0] === "cd" &&
            command.split(" ")[1] === undefined
        ) {
            return false;
        }

        return commands.includes(command);
    };

    let fireLinkClick = (node: HTMLAnchorElement) => {
        node.click();
    };

    let inputRecommendationSelectedHandler = () => {
        inputCommand = inputRecommendation;
    };

    onMount(() => {
        AOS.init({
            duration: 700,
            easing: "ease-out-quad",
        });
    });
</script>

<NavigationLinks bind:navigationLinks bind:navigationElements />

<div data-aos="fade-up" data-aos-duration="600">
    <TerminalWrapper bind:animateNavigation={terminalAnimation}>
        <svelte:fragment slot="content">
            <div
                class="basis-1/2 pt-10 transition-all"
                class:opacity-0={!showTerminalOutput}
                class:opacity-100={showTerminalOutput}
            >
                <p
                    class="text-4xl font-bold mb-10"
                    data-aos="fade-left"
                    data-aos-delay="600"
                >
                    Welcome to my portfolio
                </p>
                <div class="text-xl font-light flex flex-col gap-3">
                    <p data-aos="fade-up" data-aos-delay="800">
                        use <IconWrapper
                            imagePath="/assets/chevron-up-solid.svg"
                        />
                        and <IconWrapper
                            imagePath="/assets/chevron-down-solid.svg"
                        />
                        to select a recommendation
                    </p>
                    <p data-aos="fade-up" data-aos-delay="850">
                        press <IconWrapper
                            imagePath="/assets/arrow-left-arrow-right.svg"
                        /> to confirm the recommendation
                    </p>
                    <p data-aos="fade-up" data-aos-delay="900">
                        confirm the input with <IconWrapper
                            imagePath="/assets/arrow-turn-down.svg"
                        />
                    </p>
                </div>
            </div>
            <LogoContainer bind:animateNavigation={logoAnimation} />
        </svelte:fragment>

        <svelte:fragment slot="recommendations">
            <span data-aos="fade" data-aos-delay="1700">
                <PopupRecommendations
                    bind:input={inputCommand}
                    bind:selectedRecommendation={inputRecommendation}
                    bind:recommendationSelectedHandler={inputRecommendationSelectedHandler}
                />
            </span>
        </svelte:fragment>

        <!-- Text Input -->
        <svelte:fragment slot="input">
            <Input
                bind:inputCommand
                bind:commandEnteredHandler
                bind:inputRecommendation
                bind:animateWrongInput
            />
        </svelte:fragment>
    </TerminalWrapper>
</div>
