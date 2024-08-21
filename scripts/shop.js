import { updateGold, getGold, playerTanks, tanks } from './data.js';

function createTankButton(tank, menuContainer, titleLMNT,) {
  const mButton = document.createElement('button');
  mButton.classList.add('basic-button');
  mButton.textContent = tank.name;

  // Add an event listener to buy a tank.
  mButton.addEventListener('click', () => {
    if (getGold() >= tank.price) {
      // Check if the tank already exists in the playerTanks array.
      const tankExists = playerTanks.some(playerTank => playerTank.name === tank.name);
      if (!tankExists) {
        updateGold(-tank.price);
        playerTanks.push(tank);
        console.log(`${tank.name} has been purchased!`);
        refreshGoldDisplay();
        console.log(playerTanks);
      } else {
        console.log(`${tank.name} is already in your collection!`);
      };
    } else {
      console.log('Not enough gold to puchase this tank!')
    };
  });

  const mImage = document.createElement('img');
  mImage.src = tank.image;
  mImage.alt = tank.name;
  mImage.style.width = `150px`

  // Set the height of the image after it has loaded.
  mImage.onload = () => {
    mImage.style.height = `${mButton.offsetHeight * 1.5}px`;
  };

  mImage.style.border = '4px solid black'

  // Create a <p> element for the price
  const mPrice = document.createElement('p');
  mPrice.textContent = `${tank.price} gold`
  mPrice.classList.add('market-price');

  // Create a container div for each tank button and image.
  const tankContainer = document.createElement('div');
  tankContainer.appendChild(mButton);
  tankContainer.appendChild(mImage);
  tankContainer.appendChild(mPrice);
  tankContainer.classList.add('tank-container');

  // Apend tank container to menuContainer.
  menuContainer.appendChild(tankContainer);

  // Change the title.
  titleLMNT.textContent = 'Marketplace';
};

let goldDisplayElement = null;

export function handleMarketBtn(menuContainer, addBackButton, tanks, titleLMNT) {
  // Clear existing content inside the menuContainer.
  menuContainer.innerHTML = '';

  // Create a container for the current amount of gold.
  const goldContainer = document.createElement('div');
  goldContainer.classList.add('gold-container');
  menuContainer.appendChild(goldContainer);

  const goldP = document.createElement('p');
  goldP.textContent = `Current Gold Amount: ${getGold()}`
  goldContainer.appendChild(goldP);

  goldDisplayElement = goldP;

  // Create and append tank buttons and images.
  tanks.forEach(tank => createTankButton(tank, menuContainer, titleLMNT));

  addBackButton('mainMenu');

  window.scrollTo({top: 0, behavior: 'smooth'});
};

export function refreshGoldDisplay() {
  if (goldDisplayElement) {
    goldDisplayElement.textContent = `Current Gold Amount: ${getGold()}`;
  }
};