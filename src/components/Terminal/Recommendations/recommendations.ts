// This file contains the function that returns the recommended command
import commands from "../commands.json";

// This function returns the recommended command
export const getRecommendation = (input: string) => {
    let possibleCommands = getRecommendations(input);

    return possibleCommands.length != 0 ? possibleCommands[0] : "";
}

// This function returns the recommended commands
export const getRecommendations = (input: string) => {
    // Sort the commands by length
    let commandList = commands.sort(
        (command1, command2) => command1.length - command2.length
    );

    let recommendations: string[] = commandList.filter((value) => {
        var tokens = value.split(" ").length;
        return tokens === 1;
    });
    if (input) {
        // Filter the commands that start with the input
        let possibleCommands = commandList.filter(
            (value: string) => {
                return value.startsWith(input);
            }
        );

        let inputTokens = possibleCommands.includes(input) ? input.split(" ").length + 1 : input.split(" ").length;

        possibleCommands = possibleCommands.filter((value) => {
            return value.split(" ").length === inputTokens;
        });

        // If there is a command that starts with the input, return the shortest one
        recommendations = possibleCommands;
    }

    return recommendations;
}