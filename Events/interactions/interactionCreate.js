const { CommandInteraction } = require("discord.js");

module.exports = {
    name: "interactionCreate",

    execute(interaction, client) {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) {
            interaction.reply({ content: "There was an error while executing this command!" });
        }

        command.execute(interaction, client);
    },
};