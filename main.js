const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '&';

const fs = require('fs');

const DiscordRPC = require('discord-rpc'); // Requiring the discord-rpc package.




client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command); 
}

client.once('ready', () => {
    console.log('Bot online'); 
});

client.on('guildMemberAdd', guildMember =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Unregistered Members');
    guildMember.roles.add(welcomeRole);

    guildMember.guild.channels.cache.get('841236479224840212').send(`Hey <@${guildMember.user.id}>, welcome to ~•𝐵𝑒𝓁𝓁𝑒 Â𝓂𝑒•~! check out <#841236954292420608> and <#841237225362030592> and submit your form in <#841237280726712370> :heart_exclamation: <@${842818415270035457}>`);
})

client.on('message',message => {
    if(!message.content.startsWith(prefix)||message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

        if (command === 'ping'){
        client.commands.get('ping').execute(message,args);
    }
    
        else if(command){
            (command == 'rules'){
                client.commands.get('rules').execute(message,args,Discord);
        }
    
    
});


client.login(process.env.token);
 