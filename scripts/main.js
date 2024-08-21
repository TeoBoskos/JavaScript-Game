// Imports
import { handleMarketBtn, refreshGoldDisplay } from './shop.js';
import { tanks, battles, gold, updateGold, playerTanks, } from './data.js';

// Element variables.

const basicButton1 = document.querySelector('.first');
const basicButton2 = document.querySelector('.second');
const basicButton3 = document.querySelector('.third');
const menuContainer = document.querySelector('.menu-container');
const titleLMNT = document.querySelector('.titleLMNT');
const mainContainer = document.querySelector('.main-container');

const initialMenuHTML = menuContainer.innerHTML;

// This function adds a back button to return to the main menu.
function addBackButton(destination, battle = null) {
  const backButton = document.createElement('button');
  backButton.classList.add('back-menu');
  backButton.textContent = 'Go Back';
  menuContainer.appendChild(backButton);

  if (destination === 'mainMenu') {
    backButton.addEventListener('click', handleBackToMenu);
  } else if (destination === 'campaignMenu') {
    backButton.addEventListener('click', handleCampaignBtn);
  } else if (destination === 'battleMenu' && battle !== null) {
    backButton.addEventListener('click', () => loadBattleMenu(battle));
  };
};

function handleBackToMenu() {
  // Reload the initial menu content.
  menuContainer.innerHTML = `
    <button class="basic-button first">Campaign</button>
    <button class="basic-button second">Garage</button>
    <button class="basic-button third">Marketplace</button>
  `;

  titleLMNT.textContent = 'The Eastern Front';

  window.scrollTo({top: 0, behavior: 'smooth'});
};

// Event listener setup for the main container

mainContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('first')) {
    handleCampaignBtn();
  } else if (event.target.classList.contains('second')) {
    handleGarageBtn();
  } else if (event.target.classList.contains('third')) {
    handleMarketBtn(menuContainer, addBackButton, tanks, titleLMNT);
  }
});

// Handling the garage part of the project.

function createGarageElements() {
  titleLMNT.textContent = 'Garage';

  // Part 1.
  const tankSelectorContainer = document.createElement('div');
  tankSelectorContainer.classList.add('garage-container');

  const tankSelectorText = document.createElement('p');
  tankSelectorText.textContent = 'Current Tank:'

  const tankSelector = document.createElement('select');

  tankSelectorContainer.appendChild(tankSelectorText);
  tankSelectorContainer.appendChild(tankSelector);

  // Add a default option.
  const defaultOption = document.createElement('option');
  defaultOption.textContent = 'Select a tank';
  defaultOption.value = "";
  tankSelector.appendChild(defaultOption);

  // Part 2.
  const tankImgContainer = document.createElement('div');
  tankImgContainer.classList.add('currentTankImgContainer');

  const tankImg = document.createElement('img');
  tankImg.classList.add('currentTankImg');
  tankImgContainer.appendChild(tankImg);

  tankImg.src = 'images/default-tank-image.svg';
  tankImg.alt = 'No tank selected';

  // Part 3.
  const repairContainer = document.createElement('div');
  repairContainer.classList.add('garage-container');

  const repairText = document.createElement('p');
  repairText.textContent = 'Repair(-25 Gold):';

  const repairButton = document.createElement('button');
  repairButton.classList.add('basic-button');
  repairButton.addEventListener('click', () => console.log('It works!'));
  repairButton.textContent = '+25 HP'

  function repairSelectedTank() {
    if (!currentTank) {
      console.log('No tank selected!');
      return;
    }
  

    const repairCost = 25; // The amount of gold you have to pay.
    const repairAmount = 25; // The amount of repairs you're going to get.

    // Check if the tank is already at full HP.
    if (currentTank.hp === currentTank.maxHP) {
      console.log(`${currentTank.name} is already at maximum HP!`);
      return;
    };

    if (getGold() < repairCost) {
      console.log('Not enough gold to repair!');
      return;
    };

    updateGold(-repairCost);
    currentTank.hp = Math.min(currentTank.hp + repairAmount, currentTank.maxHP);

    // Update displays.
    updateTankDisplay();
    refreshGoldDisplay();
  };


  repairButton.addEventListener('click', repairSelectedTank);

  repairContainer.appendChild(repairText);
  repairContainer.appendChild(repairButton);

  // Part 4.
  const sellContainer = document.createElement('div');
  sellContainer.classList.add('garage-container');

  const sellText = document.createElement('p');
  sellText.textContent = 'Sell current tank:'

  const sellButton = document.createElement('button');
  sellButton.classList.add('basic-button');
  sellButton.addEventListener('click', () => console.log('It also works!'));
  sellButton.textContent = '+150 Gold'

  sellContainer.appendChild(sellText);
  sellContainer.appendChild(sellButton);

  // The garage container.
  const garageContainer = document.createElement('div');
  garageContainer.appendChild(tankSelectorContainer);
  garageContainer.appendChild(tankImgContainer);
  garageContainer.appendChild(repairContainer);
  garageContainer.appendChild(sellContainer);

  menuContainer.appendChild(garageContainer);

  // Populate tank selector
  playerTanks.forEach(tank => {
    const optionEl = document.createElement('option');
    optionEl.value = tank.name;
    optionEl.textContent = tank.name;
    tankSelector.appendChild(optionEl);
  });

  // Set the initial tank image
  tankImg.src = 'images/default-tank-image.svg';
  tankImg.alt = 'No tank selected';
  tankImg.style.width = '150px';
  tankImg.style.height = '100px';
  tankImg.style.border = '4px solid black';

  // Update tank image on selection change
  tankSelector.addEventListener('change', (event) => {
    const selectedTank = playerTanks.find(tank => tank.name === event.target.value);
    if (selectedTank) {
      console.log('something is selected');
      tankImg.src = selectedTank.image;
      tankImg.alt = selectedTank.name;
    } else {
      tankImg.src = 'images/default-tank-image.svg';
      tankImg.alt = 'No tank selected';
      console.log('nothing is selected');
    };

    onTankSelect(event);
  });
};

function handleGarageBtn() {
  menuContainer.innerHTML = '';

  createGarageElements();

  addBackButton('mainMenu');

  window.scrollTo({top: 0, behavior: 'smooth'})
};

// The function creates the buttons for the campaign menu.
function generateCampaignMenu(battle) {
  const cButton = document.createElement('button');
  cButton.classList.add('campaign-menu-button');
  cButton.textContent = battle.name;
  cButton.addEventListener('click',() => loadBattleMenu(battle));

  const battleContainer = document.createElement('div');
  battleContainer.classList.add('battle-container');
  battleContainer.appendChild(cButton);

  menuContainer.appendChild(battleContainer);
};

// The function that generates the campaign menu.
function handleCampaignBtn() {
  menuContainer.innerHTML = '';

  titleLMNT.textContent = 'Campaign';

  battles.forEach(battle => generateCampaignMenu(battle));

  addBackButton('mainMenu');

  window.scrollTo({top: 0, behavior: 'smooth'});
};

// The function that generates the menu HTML for each battle.
function loadBattleMenu(battle) {
  menuContainer.innerHTML = '';
  titleLMNT.textContent = battle.name;

  // Generate standoff buttons.
  for (let i = 0; i < battle.standoffs; i++) {
    const standoffButton = document.createElement('button');
    standoffButton.classList.add('basic-button');
    standoffButton.textContent = `Standoff #${i + 1}`;
    standoffButton.addEventListener('click', ((currentBattle, currentIndex) => {
      return () => {
        loadStandoffOptions(currentBattle, currentIndex);
      };
    }) (battle, i));
    menuContainer.appendChild(standoffButton);
  };

  // Display battle information.
  const battleInfo = document.createElement('div');
  battleInfo.classList.add('battle-info');
  battleInfo.textContent = `Welcome to the ${battle.name}. The date is ${battle.date} and you must defeat the enemy within that time!`;
  menuContainer.appendChild(battleInfo);

  addBackButton('campaignMenu');

  window.scrollTo({top: 0, behavior: 'smooth'});
};

let currentEnemyHP;

// The function that generates the HTML for each battle.
function loadStandoffOptions(battle, standoffIndex) {
  currentEnemyHP = battle.enemyHP;

  menuContainer.innerHTML = '';
  titleLMNT.textContent = `${battle.name}-Standoff ${standoffIndex + 1}`;

  const initiationBtn = document.createElement('button');
  initiationBtn.classList.add('initiation-btn');
  initiationBtn.textContent = 'Start Battle!';
  menuContainer.appendChild(initiationBtn);

  const actions = ['Fire', 'Take cover'];
  const actionButtons = actions.map(action => {
    const actionBtn = document.createElement('button');
    actionBtn.classList.add('basic-button');
    actionBtn.textContent = action;
    actionBtn.style.display = 'none';
    menuContainer.appendChild(actionBtn);
    return actionBtn;
  });

  initiationBtn.addEventListener('click', () => {
    actionButtons.forEach(button => {
      button.style.display = 'block';
      button.addEventListener('click', () => handleAction(button.textContent, battle, standoffIndex));
    });
    initiationBtn.style.display = 'none';
    startEnemyFire();
  });

  const cTankInfoContainer = document.createElement('div');
  cTankInfoContainer.classList.add('c-tank-info-container');
  menuContainer.appendChild(cTankInfoContainer);

  const infoP1 = document.createElement('p');
  infoP1.classList.add('tank-name');
  infoP1.textContent = `Tank name: ${currentTank.name}`;
  const infoP2 = document.createElement('p');
  infoP2.classList.add('tank-HP');
  infoP2.textContent = `HP: ${currentTank.hp}`;
  cTankInfoContainer.appendChild(infoP1);
  cTankInfoContainer.appendChild(infoP2);

  const cEnemyInfoContainer = document.createElement('div');
  cEnemyInfoContainer.classList.add('c-enemy-info-container');
  menuContainer.appendChild(cEnemyInfoContainer);

  const eInfoP = document.createElement('p');
  eInfoP.classList.add('en-hp');
  eInfoP.textContent = `The enemy currently sits at ${battle.enemyHP}HP`;
  cEnemyInfoContainer.appendChild(eInfoP);

  addBackButton('battleMenu', battle);
};

let enemyFireIntervalID;

let playerIsTakingCover = false;

// This function will handle what will happen when, for instance, you fire.
function handleAction(action, battle, standoffIndex) {
  if (currentEnemyHP <= 0) {
    console.log('The enemy is destroyed!');
    return;
  };

  if (action === 'Fire' && playerIsTakingCover) {
    console.log(`You can't fire while taking cover!`);
    return;
  };

  if (action === 'Fire') {
    currentEnemyHP -= currentTank.damage;
    updateEnemyHPDisplay(currentEnemyHP);

    if (currentEnemyHP <= 0) {
      console.log('Done!');
      clearInterval(enemyFireIntervalID);
      const eInfoP = document.querySelector('.en-hp');
      eInfoP.textContent = 'The enemy has been destroyed!';
      updateGold(100);
      refreshGoldDisplay();

      // Hide action buttons.
      document.querySelectorAll('.basic-button').forEach(button => {
        button.style.display = 'none';
      });

      // Hide initiation button.
      const startBattleButton = document.querySelector('.initiation-btn')
      if (startBattleButton) {
        startBattleButton.style.display = 'none';
      };
    };
  } else if (action === 'Take cover') {
    console.log('Taking cover!');
    playerIsTakingCover = true;
    setTimeout(() => {
      playerIsTakingCover = false;
      console.log('No longer taking cover!');
    }, 10000);
  };
};

function updateEnemyHPDisplay(hp) {
  const eInfoP = document.querySelector('.en-hp');
  if (eInfoP) {
    eInfoP.textContent = `The enemy currently sits at ${hp}HP`;
  }
};

// Get the current tank into the battle.

let currentTank = {};

// This function will handle the tank selection.
function onTankSelect(event) {
  const selTankName = event.target.value;
  const selTank = tanks.find(tank => tank.name === selTankName);
  currentTank = selTank;
  updateTankDisplay();
};

function updateTankDisplay() {
  const infoP1 = document.querySelector('.c-tank-info-container .tank-name');
  const infoP2 = document.querySelector('.c-tank-info-container .tank-HP');

  if (infoP1 && infoP2 && currentTank) {
    infoP1.textContent = `Tank name: ${currentTank.name}`;
    infoP2.textContent = `HP: ${currentTank.hp}`;
  };
};

// When this function is called, the battle starts.
function startEnemyFire() {
  
  console.log('So it begins...')

  clearInterval(enemyFireIntervalID);

  enemyFireIntervalID = setInterval(() => {
    if (currentTank.hp > 0 && !playerIsTakingCover) {
      const damage = 10;
      currentTank.hp -= damage;
      console.log(`Enemy fired, your HP is ${currentTank.hp}`);
      updateTankDisplay();

      if (currentTank.hp <= 0) {
        console.log('Your tank has been destroyed!');
        clearInterval(enemyFireIntervalID);
      }
    } else if (playerIsTakingCover) {
      console.log(`You're taking cover, the enemy cannot hit you!`);
    };
  }, 5000);
};