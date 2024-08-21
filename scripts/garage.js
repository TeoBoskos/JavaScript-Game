import { tanks } from './data.js';

export function createGarageElements(menuContainer, titleLMNT, addBackButton) {
  titleLMNT.textContent = 'Garage';

  // Part 1.
  const tankSelectorContainer = document.createElement('div');
  tankSelectorContainer.classList.add('garage-container');

  const tankSelectorText = document.createElement('p');
  tankSelectorText.textContent = 'Current Tank:'

  const tankSelector = document.createElement('select');

  tankSelectorContainer.appendChild(tankSelectorText);
  tankSelectorContainer.appendChild(tankSelector);

  // Part 2.
  const tankImgContainer = document.createElement('div');
  tankImgContainer.classList.add('currentTankImgContainer');

  const tankImg = document.createElement('img');
  tankImg.classList.add('currentTankImg');
  tankImgContainer.appendChild(tankImg);

  // Part 3.
  const repairContainer = document.createElement('div');
  repairContainer.classList.add('garage-container');

  const repairText = document.createElement('p');
  repairText.textContent = 'Repair(-25 Gold):';

  const repairButton = document.createElement('button');
  repairButton.classList.add('basic-button');
  repairButton.addEventListener('click', () => console.log('It works!'));
  repairButton.textContent = '+25 HP'

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
  tanks.forEach(tank => {
    const optionEl = document.createElement('option');
    optionEl.value = tank.name;
    optionEl.textContent = tank.name;
    tankSelector.appendChild(optionEl);
  });

  // Set the initial tank image
  tankImg.src = tanks[0].image;
  tankImg.alt = tanks[0].name;
  tankImg.style.width = '150px';
  tankImg.style.height = '100px';
  tankImg.style.border = '4px solid black';

  // Update tank image on selection change
  tankSelector.addEventListener('change', (event) => {
    const selectedTank = tanks.find(tank => tank.name === event.target.value);
    tankImg.src = selectedTank.image;
    tankImg.alt = selectedTank.name;

    addBackButton(menuContainer, 'mainMenu');

    onTankSelect(event);
  });
};

export function handleGarageBtn(menuContainer, titleLMNT, addBackButton) {
  menuContainer.innerHTML = '';

  createGarageElements(menuContainer, titleLMNT, addBackButton);

  window.scrollTo({top: 0, behavior: 'smooth'})
};

export function onTankSelect(event, setCurrentTank, updateTankDisplay) {
  const selTankName = event.target.value;
  const selTank = tanks.find(tank => tank.name === selTankName);
  setCurrentTank(selTank);
  updateTankDisplay(selTank);
};