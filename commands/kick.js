

module.exports = {
    name: "kick",
    description: "Kicks a member from the server",

    async run (client, message, args) {
        if(message.channel.type === 'dm') return;
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You don't have the **permission** to do that!")
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send('I don\'t have the **permission** to do that.')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!args[0]) return message.reply('Please specify a user to kick!')

        if(!member) return message.channel.send('Can\'t seem to find this user...')
        if(member.id === message.author.id) return message.channel.send('Bruh, you can\'t kick yourself!')
        if(member.id === client.user.id) return message.channel.send('Nuh uh. Why would I kick myself!?')
        if(!member.kickable) return message.channel.send('This user can\'t be kicked. It is either because they are a mod/admin, or their highest role is higher than mine')
        
        let reason = args.slice(" ")
                
        if(reason.length <= 1){
            reason = "Not Given"
        } else{
            reason = args.slice(1).join(" ");
        }

        member.kick(reason)
        .catch(err => {
            if(err) return message.channel.send('Something went wrong, maybe try again later')
        })


        const kickembed = new Discord.MessageEmbed()
        .setTitle('Member Kicked')
        .setThumbnail(member.user.displayAvatarURL())
        .addField('User Kicked', member)
        .addField('Kicked by', message.author)
        .addField('Reason', reason)
        .setFooter('Time kicked')
        .setTimestamp()
        message.channel.send(kickembed);

	 var embed = new Discord.MessageEmbed()
    	.setTitle(`You were kicked from **${message.guild}**`)
    	.addField('Reason:', reason, true)
	    .setTimestamp()
	
	try {
        member.send(embed);
    	} catch(err) {
        console.warn(err);
   	}
 	
	message.channel.send(`**${member}** has been kicked by **${message.author}**!`)
     }
    }