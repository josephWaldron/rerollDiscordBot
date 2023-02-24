const { EmbedBuilder, channelLink, isJSONEncodable } = require("@discordjs/builders");
const { GuildMember, Embed } = require("discord.js");
const fs = require('fs');
const csv = require('csv-parser');
let dict = {};
module.exports = {
    name: "guildMemberAdd",
    execute(member) {
        const { user, guild } = member;
        const welcomeChannel = member.guild.channels.cache.get('1057766027338981498');
        const welcomeMessage = `Welcome <@${user.id}> to ${guild.name}!`;

        const memberRoles = {
            bigman: '598917808386211853',
            average: '741742165214101534',
            detective: '1040778151502024794',
            studio: '1040778020014788641',
            mute: '1040776753519546468',
            DC: '1040776784565764116',
            npc: '1040776656928907305'
        };
        fs.createReadStream('roles.csv')
            .pipe(csv())
            .on('data', (row) => {
                // Get the first and second columns of the row
                const key = Object.values(row)[0];
                const value = Object.values(row)[1];

                // Add the data to the dictionary
                dict[key] = value;
            }).on('end', () => {
                if (user.id in dict) {
                    member.roles.add(memberRoles[dict[user.id]]);
                    member.roles.add('1059609386663821312');
                    const welcomeEmbed = new EmbedBuilder()
                        .setTitle("**Welcome Back!**")
                        .setDescription(welcomeMessage)
                        .setColor(0x037821)
                        .addFields({ name: 'Total members', value: `${guild.memberCount}` })
                        .addFields({ name: 'Assigned Role', value: `${[dict[user.id]]}` })
                        .setTimestamp();


                    if (user.id === '155762046200315904') {
                        member.roles.add('1057794241931251822');
                    } else if (user.id === '952068642185576518') {
                        member.roles.add('1057794241931251822');
                        //member.roles.add('598917808386211853');
                        //need to add king role
                    }
                    welcomeChannel.send({ embeds: [welcomeEmbed] });
                } else {
                    const welcomeEmbed = new EmbedBuilder()
                        .setTitle("**New Member!**")
                        .setDescription(welcomeMessage)
                        .setColor(0x6a329f)
                        .addFields({ name: 'Total members', value: `${guild.memberCount}` })
                        .setTimestamp();

                    welcomeChannel.send({ embeds: [welcomeEmbed] });
                }

            });
    }
}