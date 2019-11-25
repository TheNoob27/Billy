//const db = require('quick.db')
const Discord = require('discord.js')

module.exports.run = async (client, message, args, colors) => {

  let enemycount = 0
  setup()
  
  
function setup() {
  
  let game = {
    players: [],
    playerlist: [],
    rounds: null,
    team: null,
    enemyteam: []
  }
  
  let embed = new Discord.RichEmbed()
  .setColor(colors.color)
  .setDescription("A new game is starting! React with ⚔️ to join! \n"+message.author.username+", React with ✅ to start, but the game will start automatically in 5 minutes.")
  .addField("Players", "​")
  message.channel.send(embed).then(async msg => {
    await msg.react("⚔️")
    await msg.react("✅")
    
    let filter = (r, user) => ["⚔️", "✅"].includes(r.emoji.name) && !user.bot
    let collector = msg.createReactionCollector(filter, {time: 300000})
    let players = []
    
    collector.on("collect", r => {
      let user = r.users.last()
      
      if (r.emoji == "⚔️") {
        let find = game.players.find(player => player.id == user.id)
        if (find) return;
        
        game.players.push({
          id: user.id,
          level: 1,
          hp: 100,
          tag: user.tag
        })
        game.playerlist.push(user.id)
        
          players.push(user.tag)
        
        msg.edit(embed = new Discord.RichEmbed()
                 .setColor(colors.color)
                 .setDescription("A new game is starting! React with ⚔️ to join! \n React with ✅ to start, but the game will start automatically in 5 minutes.")
                 .addField("Players", "**"+ game.playerlist.join("\n") +"**")
                             )
      } else {
        if (user.id != message.author.id) return
        collector.stop()
      }
      
    })
    
    collector.on("end", () => {
      let rounds = Math.ceil(Math.random() * 5) + 10
      game.rounds = rounds
      let teams = ["Humans", "Orcs"]
      game.team = teams[Math.floor(Math.random() * teams.length)]
      let orcs = ["Grunt", "Smasher", "Warrior", "Assassin", "Blademaster", "Elite Blademaster", "Warlord", "Tyrant", "Mage", "Archer", "KorKron Elite"] //orcs
    let humans = ["Soldier", "Knight", "Assassin", "Captain", "Mage", "Archer", "Giant", "Guard", "Royal Guard"] // humans
    game.enemyteam = game.team == "Humans" ? orcs : humans
      
      message.channel.send("Game starting (well it isnt, but it wouldve been starting now lol). There will be "+rounds+" enemies to fight and stuff, and ur on the "+ game.team+" team.")
    })
  })

  }
  
  function play(game) {
    let enemy = getenemy(game)
    
    let embed = new Discord.RichEmbed()
    .setTitle("Field of Battle")
    .addField("Enemy #"+(enemycount + 1), "You and your team have encountered a "+ enemy + "!")
    
    let filter = (r, user) => ["⚔️", "✅"].includes(r.emoji.name) && game.players.includes()
    let collector = embed.createReactionCollector(filter, {time: 300000})
  }

  
  function getenemy(game) {
    let enemy = {
      name: null,
      hp: null,
      damage: null
    }
    
    let enemies = game.enemyteam
    enemy.name = enemies[Math.floor(Math.random() * enemies)]
    
    let e = enemy.name
    
    if (e == "Soldier" || e == "Grunt") {
      enemy.hp = 100
      enemy.damage = 11
    } else if (e == "Mage") {
      enemy.hp = 155
      enemy.damage = 16
    } else if (e == "Archer") {
      enemy.hp = 165
      enemy.damage = 15
    } else if (e == "Knight" || e == "Smasher") {
      enemy.hp = 225
      enemy.damage = 18
    } else if (e == "Captain" || e == "Warrior") {
      enemy.hp
    }
    
    return enemy
  }
}
module.exports.help = {
  name: "play",
  aliases: ["battle"],
  description: "Play a game that is supposed to mimic FOB.",
  usage: `b!play`,
  category: "Soon"
}