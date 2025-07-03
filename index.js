const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

const TOKEN = 'MTM4OTcyMjY2MDE0OTEzNzYwMA.GKNwjf.-wGaPa1taI6h89BuQe1OU2ym2tx9XBynh6kCwU';

client.once('ready', () => {
  console.log(`Bot listo como ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith('!rol')) {
    const args = message.content.split(' ');
    const nombreRol = args.slice(1).join(' ');

    if (!nombreRol) return message.reply('Escribe el nombre del rol.');

    const rol = message.guild.roles.cache.find(r => r.name.toLowerCase() === nombreRol.toLowerCase());
    if (!rol) return message.reply(`No encontré el rol **${nombreRol}**.`);

    const miembro = message.member;

    if (miembro.roles.cache.has(rol.id)) {
      await miembro.roles.remove(rol);
      message.reply(`Rol **${nombreRol}** quitado.`);
    } else {
      await miembro.roles.add(rol);
      message.reply(`Rol **${nombreRol}** asignado.`);
    }
  }
});

client.login(TOKEN);
