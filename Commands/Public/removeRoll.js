const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits } = require("discord.js");
const memberRoles = {
    bigman: '598917808386211853',
    average: '741742165214101534',
    detective: '1040778151502024794',
    studio: '1040778020014788641',
    mute: '1040776753519546468',
    DC: '1040776784565764116',
    npc: '1040776656928907305'
};
module.exports = {
    data: new SlashCommandBuilder()
        .setName("remove-roll")
        .setDescription("Removes rolls from all users with roll role")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // only allowed for admin users
    execute(interaction) {
        guild = interaction.guild;
        const role = guild.roles.cache.get('1059609386663821312');
        const members = guild.members.cache;
        const usersWithRole = members.filter(member => member.roles.cache.has(role.id));
        const usersWithRoleArray = Array.from(usersWithRole.values());
        const memberRolesArray = Object.values(memberRoles);
        for (let i = 0; i < usersWithRoleArray.length; i++) {
            usersWithRoleArray[i].roles.remove(memberRolesArray);
            // console.log("Removing roles from " + usersWithRoleArray[i].user.username + "");
        }

        interaction.reply({ content: "Roles removes", ephemeral: true }); //only visible to self
    },
};