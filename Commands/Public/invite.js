const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, Guild } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("invite")
        .setDescription("Returns a permanent invite link for the server"),
    execute(interaction) {
        interaction.reply({ content: 'https://discord.gg/cZx4vaehZT' }); //only visible to self
    },
};