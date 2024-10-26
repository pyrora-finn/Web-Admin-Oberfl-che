const { Client, GatewayIntentBits } = require('discord.js');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const db = new sqlite3.Database('database.db');

// Bot-Token hier einfügen
const TOKEN = 'DEIN_DISCORD_BOT_TOKEN';

client.once('ready', () => {
    console.log(`Bot ist eingeloggt als ${client.user.tag}`);
});

// Anmeldesystem
client.on('messageCreate', async (message) => {
    // Ignoriere Nachrichten vom Bot selbst
    if (message.author.bot) return;

    // Anmeldebefehl
    if (message.content.startsWith('!login')) {
        const args = message.content.split(' ').slice(1);
        const username = args[0];
        const password = args[1];

        if (!username || !password) {
            return message.channel.send('Bitte benutze den Befehl so: `!login <Benutzername> <Passwort>`');
        }

        db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
            if (err) {
                return message.channel.send('Ein Fehler ist aufgetreten.');
            }
            if (user && bcrypt.compareSync(password, user.password)) {
                message.channel.send(`Willkommen, ${username}! Du bist eingeloggt.`);
            } else {
                message.channel.send('Ungültiger Benutzername oder Passwort.');
            }
        });
    }
});

// Bot anmelden
client.login(TOKEN);
