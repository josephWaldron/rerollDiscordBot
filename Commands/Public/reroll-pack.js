const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, CommandInteractionOptionResolver } = require("discord.js");
const { GuildMember } = require("discord.js");
const fs = require("fs");
const csv = require('csv-parser');

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
        .setName("reroll-pack")
        .setDescription("rolls")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    execute(interaction) {
        guild = interaction.guild;
        const role = guild.roles.cache.get('1059609386663821312');
        const members = guild.members.cache;
        const usersWithRole = members.filter(member => member.roles.cache.has(role.id));
        const usersWithRoleArray = Array.from(usersWithRole.values());
        //const memberRolesArray = Object.values(memberRoles);
        // new Promise((resolve, reject) => {
        //     for (let i = 0; i < usersWithRoleArray.length; i++) {
        //         usersWithRoleArray[i].roles.remove(memberRolesArray);
        //         console.log("Removing roles from " + usersWithRoleArray[i].user.username + "");
        //     }
        //     resolve();
        // }).then(() => {
        const userIds = usersWithRoleArray.map(user => user.id);
        shuffleArray(userIds);
        new Promise((resolve, reject) => {
            assignRoles(userIds, roles);
            resolve();
        }).then(() => {
            interaction.reply({ content: "Roles have been updated.", ephemeral: true }); //only visible to self
        });
        // });

    },
};

const roles = ['bigman', 'average', 'detective', 'studio', 'mute', 'DC', 'npc'];

function assignRoles(names, roles) {
    const assignments = {};
    let i = 0;
    for (const name of names) {
        const role = roles[i % roles.length];
        if (!assignments[role]) {
            assignments[role] = [];
        }
        assignments[role].push(name);
        i++;
    }

    let csv = '';
    for (const role in assignments) {
        for (const name of assignments[role]) {
            csv += `${name},${role}\n`;
            guild.members.cache.get(name).roles.add(memberRoles[role]);
            // console.log(`Assigning ${name} to ${role}`);

        }
    }

    fs.writeFileSync('roles.csv', csv);
}
const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};
//first is test and extra npc added
// const names = ['952068642185576518', '237277740179521536', '302264494439006209', '392734602730536960', '177523943702265857', '292895186147606528', '233345963924652033', '155762046200315904', '488493882342899712', '930269130135847032', '302593004353486848'];