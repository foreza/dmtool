module.exports = {
  routes: [
    { uri: '/dm', file: 'dm' },
    { uri: '/room', file: 'room' },
    { uri: '/', file: 'index' }
  ],
  navigation: {
    dashboard: [
      // { uri: '/', name: 'Dashboard', icon: 'ra-tower' },
      { uri: '/characters', name: 'Characters', icon: 'ra-double-team' },
      { uri: '/characters/template', name: 'Character Template', icon: 'ra-player-shot' },
    ]
  },
  characters: {
    template: [
      { name: 'Name', type: 'string', default: 'John Doe' },
      { name: 'Level', type: 'number', default: 1 },
      { name: 'Race', type: 'options', values: ['Aarakocra', 'Aasimar', 'Aetherborn', 'Aven', 'Bugbear', 'Centaur', 'Changeling', 'Dragonborn', 'Dwarf', 'Elf', 'Firbolg', 'Genasi', 'Gith', 'Gnome', 'Goblin', 'Goliath', 'Half-elf', 'Half-orc', 'Halfling', 'Hobgoblin', 'Human', 'Kenku', 'Khenra', 'Kobold', 'Kor', 'Lizardfolk', 'Merfolk', 'M cont.', 'Minotaur', 'Naga', 'Orc', 'Revenant', 'Shifter', 'Siren', 'Tabaxi', 'Tiefling', 'Tortle', 'Triton', 'Vampire', 'Vedalken', 'Warforged', 'Yuan-Ti Pureblood'] },
      { name: 'Alignment', type: 'options', values: ['Chaotic Evil', 'Chaotic Good', 'Chaotic Neutral', 'Lawful Evil', 'Lawful Good', 'Lawful Neutral', 'Neutral', 'Neutral Evil', 'Neutral Good']},
      { name: 'Background', type: 'options', values: ['Acolyte', 'Anthropologist', 'Archaeologist', 'Black Fist Double Agent', 'Caravan Specialist', 'Charlatan', 'City Watch', 'Clan Crafter', 'Cloistered Scholar', 'Cormanthor Refugee', 'Courtier', 'Criminal/Spy', 'Dissenter', 'Dragon Casualty', 'Earthspur Miner', 'Entertainer', 'Faction Agent', 'Far Traveler', 'Folk Hero', 'Gate Urchin', 'Gladiator(Entertainer)', 'Guild Artisan', 'Guild Merchant', 'Harborfolk', 'Haunted One', 'Hermit', 'Hillsfar Merchant', 'Hillsfar Smuggler', 'Inheritor', 'Initiate', 'Inquisitor', 'Investigator', 'Iron Route Bandit', 'Knight (Noble)', 'Knight of the Order', 'Mercenary Veteran', 'Mulmaster Aristocrat', 'Noble', 'Outlander', 'Phlan Insurgent', 'Phlan Refugee', 'Sage', 'Sailor/Pirate', 'Secret Identity', 'Shade Fanatic', 'Soldier', 'Stojanow Prisoner', 'Ticklebelly Nomad', 'Trade Sheriff', 'Urban Bounty Hunter', 'Urchin', 'Uthgardt Tribe Member', 'Vizier', 'Waterdhavian Noble']},
      { name: 'Class', type: 'options', values: ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin','Ranger','Rogue','Sorcerer','Warlock','Wizard']},
      { name: 'HP', type: 'number', default: 10 },
      { name: 'MaxHP', type: 'number', default: 10 },
      { name: 'Spells', type: 'spells', values: [
        { name: 'Cause Fear' },
        { name: 'Armor of Agathys' }
      ]}, 
      { name: 'Proficiencies', 
        type: 'proficiencies',
        skills: [
          { name: 'Animal Handling' },
          { name: 'Perception' }
        ],
        languages: [
          { name: 'Common' },
          { name: 'Draconic' }
        ]
      },
      { name: 'stats',
        type: 'stats',
        values: [
          { name: 'Strength', type: 'number', default: 4 },
          { name: 'Constitution', type: 'number', default: 4 },
          { name: 'Dexterity', type: 'number', default: 4 },
          { name: 'Intelligence', type: 'number', default: 4 },
          { name: 'Wisdom', type: 'number', default: 4 },
          { name: 'Charisma', type: 'number', default: 4 },
        ]
      }
    ]
  }
}