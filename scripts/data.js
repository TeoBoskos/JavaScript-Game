export const tanks = [
  { name: "Panzer II", image: "images/Panzer2.jpeg", price: 250, hp: 100, maxHP: 100, damage: 10 },
  { name: "Panzer 38(t)", image: "images/Panzer38t.jpg", price: 325, hp: 120, maxHP: 120, damage: 15 },
  { name: "Panzer III", image: "images/Panzer3.jpg", price: 500, hp: 160, maxHP: 160, damage: 30 },
  { name: "StuG III", image: "images/StuG3.jpg", price: 550, hp: 180, maxHP: 180, damage: 35 },
  { name: "Panzer IV", image: "images/Panzer4.jpg", price: 700, hp: 190, maxHP: 190, damage: 40 },
  { name: "Panther Ausf. D", image: "images/Panther.jpg", price: 950, hp: 220, maxHP: 220, damage: 50 },
  { name: "Tiger I", image: "images/Tiger1.jpg", price: 1200, hp: 250, maxHP: 250, damage: 60 },
  { name: "Tiger II", image: "images/Tiger2.jpg", price: 2000, hp: 300, maxHP: 300, damage: 70 },
];

export let playerTanks = [
  { name: "Panzer II", image: "images/Panzer2.jpeg", price: 250, hp: 100, maxHP: 100, damage: 10 }
];

export const battles = [
  { name: 'Battle of Białystok and Minsk', date: 'June 22 - July 9, 1941', standoffs: 2 },
  { name: 'Battle of Smolensk', date: 'July 10 - September 10, 1941', standoffs: 2 },
  { name: 'Battle of Kiev', date: 'August 23 - September 26, 1941', standoffs: 3 },
  { name: 'Battle of Leningrad', date: 'September 8, 1941 - January 27, 1942', standoffs: 2 },
  { name: 'Battle of Moscow', date: 'October 24, 1941 - February 3, 1942', standoffs: 4 },
  { name: 'Battle of Kursk', date: 'March 3 - April 21, 1942', standoffs: 3 },
  { name: 'Battle of Stalingrad', date: 'July 13, 1942 - December 2, 1942', standoffs: 4 },
  { name: 'Battle of the Caucasus', date: 'December 2, 1942 - March 27 1943', standoffs: 3 }
].map((battle, index) => {
  const enemyHP = 100 + (index * (160 / 7));
  return { ...battle, enemyHP: Math.round(enemyHP) };
});

export let xp;

let gold = 0;

export function updateGold(amount) {
  gold += amount;
  return gold;
}

// Function to get current gold amount
export function getGold() {
  return gold;
}

export { gold };