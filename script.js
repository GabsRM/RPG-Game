let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
const monstersStats = document.querySelector("#monstersStats");
const goToStorebtn = document.querySelector("#goToStorebtn");
const goToCavebtn = document.querySelector("#goToCavebtn");
const fightDragonbtn = document.querySelector("#fightDragonbtn");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const xpText = document.querySelector("#xpText");
const text = document.querySelector("#text");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const daggerWeapon = document.querySelector("#daggerWeapon");
const hammerWeapon = document.querySelector("#hammerWeapon");
const swordWeapon = document.querySelector("#swordWeapon");

function restartInventory() {
  daggerWeapon.style.display = "none";
  hammerWeapon.style.display = "none";
  swordWeapon.style.display = "none ";
}
restartInventory();
const weapons = [
  { name: "stick", power: 5 },
  { name: "dagger", power: 30 },
  { name: "claw hammer", power: 50 },
  { name: "sword", power: 100 },
];

const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15,
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60,
  },
  {
    name: "dragon",
    level: 20,
    health: 300,
  },
];

const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'You are in the town square. You see a sign that says "Store".',
  },
  {
    name: "store",
    "button text": [
      "Buy 10 health (10 gold)",
      "Buy weapon (30 gold)",
      "Go to town square",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store.",
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightFangedBeast, goTown],
    text: "you enter the cave. You see the monster",
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster.",
  },
  {
    name: "kill monster",
    "button text": [
      "Go to town square",
      "Go to town square",
      "Go to town square",
    ],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die &#x2620",
  },
  {
    name: "easterEgg",
    "button text": ["Pick 2", "Pick 8", "Go to town square"],
    "button functions": [pickTwo, pikcEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389",
  },
];
goToStorebtn.onclick = goStore;
goToCavebtn.onclick = goCave;
fightDragonbtn.onclick = fightDragon;

// locations
function goTown() {
  update(locations[0]);
  text.style.display = "black";
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function update(location) {
  monstersStats.style.display = "none";
  goToStorebtn.innerText = location["button text"][0];
  goToCavebtn.innerText = location["button text"][1];
  fightDragonbtn.innerText = location["button text"][2];
  goToStorebtn.onclick = location["button functions"][0];
  goToCavebtn.onclick = location["button functions"][1];
  fightDragonbtn.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monstersStats.style.display = "block";
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  xpText.innerText = xp;
  healthText.innerText = health;
  goldText.innerText = gold;
  restartInventory();
  goTown();
}

// Thing to buy
function buyHealth() {
  if (gold < 10) {
    text.innerText = "You don't have enough gold to buy health.";
    text.style.color = "#BF0501";
  } else {
    health += 10;
    gold -= 10;
    healthText.innerText = health;
    goldText.innerText = gold;
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      console.log(inventory);
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      updateInventory();
    } else {
      text.innerText = "You don't have enough money to buy a new weapon";
    }
  } else {
    text.innerText = "You already have the most powerful weapon";
  }
}

// Monsters
function fightSlime() {
  fighting = 0;
  goFight();
}

function fightFangedBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

// Monsters properties
function getMonsterAttackValue(level) {
  const hit = level * 5 - Math.floor(Math.random() * xp);
  return hit > 0 ? hit : 0;
}

/*this function returns true if either:
The random number generated is greater than 0.2 (with a probability of 80%).
The health is less than 20.*/
function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

// WIN or LOSE
function winGame() {
  update(locations[7]);
}
function lose() {
  update(locations[5]);
}

// Abilities
function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += "You attack it with your " + weapons[currentWeapon].name;
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -=
      weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    //Math.floor(Math.random() * xp): This generates a random number between 0 (inclusive) and xp (exclusive), and then floors it to an integer value.
    // Math.random() generates a random floating-point number between 0 and 1, which is then multiplied by xp.
    // + 1: This is added to the random value generated to ensure it's never 0.
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    health = 0;
    healthText.innerText = health;
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
}

function dodge() {
  text.innerHTML = "You dodge the attack from the " + monsters[fighting].name;
}

// Game secret
function pickTwo() {
  pick(2);
}

function pikcEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n"; // dispaly the array numbers
  }
  if (numbers.includes[guess]) {
    console.log("here");
    text.innerText = "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText = "Wrong! You lose 10 health!";
    health -= 10;
    health.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}

function easterEgg() {
  update(locations[6]);
}

function updateInventory() {
  switch (currentWeapon) {
    case 1:
      daggerWeapon.style.display = "block";
      break;
    case 2:
      hammerWeapon.style.display = "block";
      break;
    case 3:
      swordWeapon.style.display = "block";
      break;
  }
}
