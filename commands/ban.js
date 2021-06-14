const Discord = require('discord.js');

module.exports = {
    name: "ban",
    description: "bans a member from the server",

    async run (client, message, args) {
          if(message.channel.type === 'dm') return;
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("You don't have the **permission** to do that!")
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('I don\'t have the **permission** to do that.')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.reply('Please specify a user to ban!')

        if(!member) return message.channel.send('Can\'t seem to find this user...')
        if(member.id === client.user.id) return message.channel.send('Nuh uh. Why would I ban myself!?')
        if(member.id === message.author.id) return message.channel.send('Bruh, you can\'t ban yourself!')
        if(!member.bannable) return message.channel.send('This user can\'t be banned. It is either because they are a mod/admin, or their highest role is higher than mine')

        reason = args.slice(" ")
                
        if(reason.length <= 1){
            reason = "Not Given"
        } else{
            reason = args.slice(1).join(" ")
        }

        member.ban()
        .catch(err => {
            if(err) return message.channel.send('Something went wrong')
        })
	

        const banembed = new Discord.MessageEmbed()
        .setTitle('Member Banned')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('User Banned', member)
        .addField('Banned by', message.author)
        .addField('Reason', reason)
        .setFooter('Time kicked')
        .setTimestamp()
        message.channel.send(banembed);

  	var embed = new Discord.MessageEmbed()
    	.setTitle(`You were banned from **${message.guild}**`)
    	.addField('Reason:', reason, true)
	.setTimestamp()
	
	try {
        member.send(embed);
    	} catch(err) {
        console.warn(err);
   	}

	message.channel.send(`**${member}** has been banned by **${message.author}**!`).then((m)=> m.delete({timeout: 7500}))
    }
}