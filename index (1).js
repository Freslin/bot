(async()=>{
    // default imports
    const events = require('events');
    const { exec } = require("child_process")
    const logs = require("discord-logs")
    const Discord = require("discord.js")
    const { 
        MessageEmbed, 
        MessageButton, 
        MessageActionRow, 
        Intents, 
        Permissions, 
        MessageSelectMenu 
    }= require("discord.js")
    const fs = require('fs');
    let process = require('process');
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // block imports
    const os = require("os-utils");
    let https = require("https")
    const synchronizeSlashCommands = require('@frostzzone/discord-sync-commands');
    
    // define s4d components (pretty sure 90% of these arnt even used/required)
    let s4d = {
        Discord,
        fire:null,
        joiningMember:null,
        reply:null,
        player:null,
        manager:null,
        Inviter:null,
        message:null,
        notifer:null,
        checkMessageExists() {
            if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
            if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
        }
    };

    // check if d.js is v13
    if (!require('./package.json').dependencies['discord.js'].startsWith("^13.")) {
      let file = JSON.parse(fs.readFileSync('package.json'))
      file.dependencies['discord.js'] = '^13.16.0'
      fs.writeFileSync('package.json', JSON.stringify(file, null, 4))
      exec('npm i')
      throw new Error("Seems you arent using v13 please re-run or run `npm i discord.js@13.16.0`");
    }

    // check if discord-logs is v2
    if (!require('./package.json').dependencies['discord-logs'].startsWith("^2.")) {
      let file = JSON.parse(fs.readFileSync('package.json'))
      file.dependencies['discord-logs'] = '^2.0.0'
      fs.writeFileSync('package.json', JSON.stringify(file, null, 4))
      exec('npm i')
      throw new Error("discord-logs must be 2.0.0. please re-run or if that fails run `npm i discord-logs@2.0.0` then re-run");
    }

    // create a new discord client
    s4d.client = new s4d.Discord.Client({
        intents: [
            Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0)
        ],
        partials: [
            "REACTION", 
            "CHANNEL"
        ]
    });

    // when the bot is connected say so
    s4d.client.on('ready', () => {
        console.log(s4d.client.user.tag + " is alive!")
    })

    // upon error print "Error!" and the error
    process.on('uncaughtException', function (err) {
        console.log('Error!');
        console.log(err);
    });

    // give the new client to discord-logs
    logs(s4d.client);

    // pre blockly code
    const discordModals = require('discord-modals');
    discordModals(s4d.client);
    const { Modal, TextInputComponent, showModal } = require('discord-modals');

    // blockly code
    await s4d.client.login('OTQ5NjUzNDIyMjk3MTkwNDA0.G07lzC.aB73bhtIsQSCJtaB7WS5R5O_TVrjY_yS8Dtmlg').catch((e) => {
            const tokenInvalid = true;
            const tokenError = e;
            if (e.toString().toLowerCase().includes("token")) {
                throw new Error("An invalid bot token was provided!")
            } else {
                throw new Error("Privileged Gateway Intents are not enabled! Please go to https://discord.com/developers and turn on all of them.")
            }
        });
    
    synchronizeSlashCommands(s4d.client, [
      {
          name: 'help',
      		description: 'A guide to the bot, and the server',
      		options: [
    
          ]
      },{
          name: 'makemagicquiz',
      		description: 'Make a magic quiz!',
      		options: [
              {
            type: 3,
        	name: 'question',
            required: true,
        	description: 'What is the question?',
            choices: [
    
            ]
        },{
            type: 3,
        	name: 'option1',
            required: true,
        	description: 'What is the 1st option?',
            choices: [
    
            ]
        },{
            type: 3,
        	name: 'option2',
            required: true,
        	description: 'What is the 2nd option?',
            choices: [
    
            ]
        },{
            type: 3,
        	name: 'option3',
            required: true,
        	description: 'What is the 3rd option?',
            choices: [
    
            ]
        },{
            type: 3,
        	name: 'option4',
            required: true,
        	description: 'What is the 4th option?',
            choices: [
    
            ]
        },
          ]
      },
    ],{
        debug: false,
    
    });
    
    s4d.client.on('interactionCreate', async (interaction) => {
              if ((interaction.commandName) == 'help') {
        let confirmation = new Modal()
            .setCustomId('1')
            .setTitle('Verification')
            .addComponents(
          new TextInputComponent()
              .setCustomId('3')
              .setLabel('Verification (Enter "YES" to continue.)')
              .setStyle(('SHORT'))
              .setMinLength(1)
              .setMaxLength(3)
              .setRequired(true)
              .setPlaceholder('YES'),
        );showModal(confirmation, {
                client: s4d.client,
                interaction: interaction
            })}
    
        });
    
    s4d.client.on('interactionCreate', async (interaction) => {
              if ((interaction.commandName) == 'makemagicquiz') {
        if ((interaction.member) == ((interaction.guild).members.cache.get(String('885454505003614229')) || await (interaction.guild).members.fetch(String('885454505003614229'))) || (interaction.member) == ((interaction.guild).members.cache.get(String('895894265396342795')) || await (interaction.guild).members.fetch(String('895894265396342795')))) {
          ((interaction.guild).members.cache.get(String('895894265396342795')) || await (interaction.guild).members.fetch(String('895894265396342795'))).send({content:String((['**Question:** ',interaction.options.getString('question'),'\n','**Option 1:** ',interaction.options.getString('option1'),'\n','**Option 2:** ',interaction.options.getString('option2'),'\n','**Option 3:** ',interaction.options.getString('option3'),'\n','**Option 4:** ',interaction.options.getString('option4')].join('')))});
        }
      }
    
        });
    
    s4d.client.on('modalSubmit', async (i) => {
    let member = i.guild.members.cache.get(i.member.user.id)
      if (((i.customId)) == '1') {
        if (((i.getTextInputValue('3'))) == 'YES') {
          let help = new MessageButton()
            help.setStyle("PRIMARY");help.setLabel('Help!');help.setCustomId('B1');await i.reply({
          components: [new MessageActionRow().addComponents(help)],
          ephemeral: true
          })} else {
          await i.reply({
          content: String('Sorry, but u failed miserably.'),
          ephemeral: true
          })}
      }
    
    });
    
    s4d.client.on('interactionCreate', async (i) => {
            let member = i.guild.members.cache.get(i.member.user.id)
            let interaction = i; if (!(i.isButton())) return;
              if (((i.customId)) == 'B1') {
        await i.update({ content: String('.'),components:[(new MessageActionRow()
        .addComponents(  new MessageButton()
          .setCustomId('B1')
          .setDisabled(true)
          .setStyle('SECONDARY'),
        ))]}).then(async m=>{
    
                    });
        ((i.channel)).send({ content: String('There you go!'),
        components:[(new MessageActionRow()
            .addComponents(
            new MessageSelectMenu()
            .setCustomId('Help_Menu')
            .setPlaceholder('Know more about the server.')
            .setMaxValues(1)
            .setMinValues(1)
            .setDisabled(false)
    
    
            .addOptions(  {
          value:'About_server',
          label:'About Server',
          emoji:'🧚',
          description:'Check out the purpose of the server.',
          default:false,},
          {
          value:'Roles',
          label:'Division of Roles',
          emoji:'📝',
          description:'Take the test, what are you categorized into?',
          default:false,},
        ))
        )]}).then(async m=>{
    
                    });
      }
    
        });
    
    const http = require('http');
    const server = http.createServer((req, res) => {
        res.writeHead(200);
        res.end('This site was created to keep bot on 25/8');
    });
    server.listen(3000);
    
    return s4d
})();