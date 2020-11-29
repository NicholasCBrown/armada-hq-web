import _ from 'lodash';
import cards from 'constants/cards';

function sortIds(ids) {
  const sortedIds = ids.sort((a, b) => {
    const cardA = cards[a];
    const cardB = cards[b];
    const nameA = cardA.cardName;
    const nameB = cardB.cardName;
    if (nameA > nameB) return 1;
    if (nameA < nameB) return -1;
    return 0;
  });
  return sortedIds;
}

function deleteItem(items, i) {
  return items.slice(0, i).concat(items.slice(i + 1, items.length))
}

function removeObjective(list, objectiveType) {
  if (objectiveType === 'assault') list.assaultObjective = '';
  else if (objectiveType === 'defensive') list.defensiveObjective = '';
  else if (objectiveType === 'navigation') list.navigationObjective = '';
  return list;
}

function addObjective(list, id, objectiveType) {
  if (objectiveType === 'assault') list.assaultObjective = id;
  else if (objectiveType === 'defensive') list.defensiveObjective = id;
  else if (objectiveType === 'navigation') list.navigationObjective = id;
  return list;
}

function getEligibleNavigationObjectives(list) {
  const validObjectiveIds = [];
  const cardsById = Object.keys(cards);

  for (let i = 0; i < cardsById.length; i++) {
    const id = cardsById[i];
    const card = cards[id];
    if (card.cardType !== 'objective') continue;
    if (card.cardSubtype !== 'navigation') continue;
    validObjectiveIds.push(id);
  }

  return [sortIds(validObjectiveIds), []];
}

function getEligibleDefensiveObjectives(list) {
  const validObjectiveIds = [];
  const cardsById = Object.keys(cards);

  for (let i = 0; i < cardsById.length; i++) {
    const id = cardsById[i];
    const card = cards[id];
    if (card.cardType !== 'objective') continue;
    if (card.cardSubtype !== 'defense') continue;
    validObjectiveIds.push(id);
  }

  return [sortIds(validObjectiveIds), []];
}

function getEligibleAssaultObjectives(list) {
  const validObjectiveIds = [];
  const cardsById = Object.keys(cards);

  for (let i = 0; i < cardsById.length; i++) {
    const id = cardsById[i];
    const card = cards[id];
    if (card.cardType !== 'objective') continue;
    if (card.cardSubtype !== 'assault') continue;
    validObjectiveIds.push(id);
  }

  return [sortIds(validObjectiveIds), []];
}

function getEligibleSquadronIds(list) {
  const validSquadIds = [];
  const invalidSquadIds = [];
  const cardsById = Object.keys(cards);

  let milfCount = 0;
  let slaveCount = 0;
  for (let i = 0; i < list.squadrons.length; i++) {
    const squadron = list.squadrons[i];
    if (squadron.squadronId === 'cu' || squadron.squadronId === 'co') milfCount++;
    if (squadron.squadronId === 'du' || squadron.squadronId === 'ed') slaveCount++;
  }

  for (let i = 0; i < cardsById.length; i++) {
    const id = cardsById[i];
    const card = cards[id];
    if (card.cardType !== 'squadron') continue;
    if (list.uniques.includes(card.cardName)) continue;
    if ((id === 'cu' || id === 'co') && milfCount > 0) invalidSquadIds.push(id);
    else if ((id === 'du' || id === 'ed') && slaveCount > 0) invalidSquadIds.push(id);
    else if (card.faction !== list.faction) invalidSquadIds.push(id);
    else validSquadIds.push(id);
  }

  return [sortIds(validSquadIds), sortIds(invalidSquadIds)];
}

function getEligibleShipIds(list) {
  const validShipIds = [];
  const validHugeShipIds = [];
  const invalidShipIds = [];
  const cardsById = Object.keys(cards);

  for (let i = 0; i < cardsById.length; i++) {
    const id = cardsById[i];
    const card = cards[id];
    if (card.cardType !== 'ship') continue;
    if (card.cost < 0) continue;
    if (card.faction !== list.faction) invalidShipIds.push(id);
    else if (card.cardSubtype === 'huge') validHugeShipIds.push(id);
    else validShipIds.push(id);
  }

  return [
    [...sortIds(validShipIds), ...validHugeShipIds],
    sortIds(invalidShipIds)
  ];
}

function isRequirementsMet(requirements, shipCard) {
  if (requirements instanceof Array) {
    const operator = requirements[0];
    if (operator instanceof Object) {
      if ('cardNameIncludes' in operator) {
        return shipCard.cardName.includes(operator.cardNameIncludes);
      } else return _.isMatch(shipCard, operator);
    } else if (operator === 'NOT') {
      let operand = requirements[1];
      if (operand instanceof Array) {
        // requiremtns: ['NOT', [...]]
        operand = isRequirementsMet(operand, shipCard);
      } else {
        return !_.isMatch(shipCard, operand);
      }
    } else if (operator === 'AND' || operator === 'OR') {
      let leftOperand = requirements[1];
      let rightOperand = requirements[2];
      if (leftOperand instanceof Array) {
        leftOperand = isRequirementsMet(leftOperand, shipCard);
      } else if (leftOperand instanceof Object) {
        leftOperand = _.isMatch(shipCard, leftOperand);
      }
      if (rightOperand instanceof Array) {
        rightOperand = isRequirementsMet(rightOperand, shipCard);
      } else if (rightOperand instanceof Object) {
        rightOperand = _.isMatch(shipCard, rightOperand);
      }
      if (operator === 'OR') {
        // requirements: ['OR', {cardName: 'Whatever'}, {cardType: 'Whatever'}]
        return leftOperand || rightOperand
      } else { // operator === 'AND'
        // requirements: ['AND', {cardName: 'Whatever'}, {cardType: 'Whatever'}]
        return leftOperand && rightOperand;
      }
    } else {
      /// emptty array of requirements
      return true;
    }
  } else {
    return _.isMatch(shipCard, requirements)
  }
}

function getEligibleUpgradeIds(list, shipIndex, upgradeIndex) {
  const validUpgradeIds = [];
  const invalidUpgradeIds = [];

  const cardsById = Object.keys(cards);
  const shipCard = cards[list.ships[shipIndex].shipId];
  const ship = list.ships[shipIndex];
  const upgradeType = ship.upgradeBar[upgradeIndex];
  let hasOpenWeaponsTeam = false;
  let hasOpenOffensiveRetro = false

  for (let i = 0; i < ship.upgradeBar.length; i++) {
    const type = ship.upgradeBar[i];
    if (type === 'weapons team' && ship.equippedUpgrades[i] === null)
      hasOpenWeaponsTeam = true;
    if (type === 'offensive retrofit' && ship.equippedUpgrades[i] === null)
      hasOpenOffensiveRetro = true;
  }
  const hasBoardingTeamSlotOpen = hasOpenWeaponsTeam && hasOpenOffensiveRetro;

  for (let i = 0; i < cardsById.length; i++) {
    const id = cardsById[i];
    const card = cards[id];
    if (card.cardType !== 'upgrade') continue;
    if (
      !card.cardSubtype.includes(upgradeType) &&
      !(hasBoardingTeamSlotOpen && card.cardSubtype === 'boarding team')
    ) continue;
    if (
      card.cardSubtype === 'boarding team' &&
      (upgradeType !== 'weapons team' && upgradeType !== 'offensive retrofit')
    ) continue;
    if (card.cost < 0) continue;
    if (list.uniques.includes(card.displayName ? card.displayName : card.cardName)) continue;
    if (ship.equippedUpgrades.includes(id)) continue;
    if (card.faction && shipCard.faction !== card.faction) continue;
    if (card.isMod && ship.numMods > 0) { invalidUpgradeIds.push(id); continue; }

    for (let j = 0; j < ship.upgradeBar.length; j++) shipCard[ship.upgradeBar[j]] = true;

    for (let j = 0; j < shipCard.tags.length; j++) shipCard[shipCard.tags[j]] = true;

    for (let j = 0; j < ship.equippedUpgrades.length; j++) {
      const id = ship.equippedUpgrades[j];
      if (id && cards[id].cardSubtype === 'commander') {
        shipCard.isFlagship = true;
        break;
      } else shipCard.isFlagship = false;
    }

    if (isRequirementsMet(card.requirements, shipCard)) validUpgradeIds.push(id);
    else invalidUpgradeIds.push(id);
  }

  return [
    sortIds(validUpgradeIds),
    sortIds(invalidUpgradeIds)
  ];
}

function createShipHash(ship) {
  let hash = ship.shipId;
  for (let i = 0; i < ship.equippedUpgrades.length; i++) {
    const upgradeId = ship.equippedUpgrades[i];
    if (upgradeId) hash += upgradeId;
    else hash += '0';
  }
  return hash;
}

function equipUpgrade(list, shipIndex, upgradeIndex, upgradeId) {
  const ship = list.ships[shipIndex];
  const upgradeCard = cards[upgradeId];
  ship.equippedUpgrades[upgradeIndex] = upgradeId;
  if (upgradeCard.addsUpgradeSlot) {
    ship.upgradeBar.push(upgradeCard.addsUpgradeSlot[0]);
    ship.equippedUpgrades.push(null);
  }
  if (upgradeCard.isMod) ship.numMods++;
  if (upgradeCard.isUnique) list.uniques.push(upgradeCard.displayName ? upgradeCard.displayName : upgradeCard.cardName);
  if (upgradeCard.cardSubtype === 'commander') list.commander = upgradeId;
  list.shipHashes[list.shipHashes.indexOf(ship.shipHash)] = createShipHash(ship);
  ship.shipHash = createShipHash(ship);
  list.pointTotal -= ship.totalCost;
  ship.totalCost = cards[ship.shipId].cost;
  for (let i = 0; i < ship.equippedUpgrades.length; i++) {
    const id = ship.equippedUpgrades[i];
    if (id) ship.totalCost += cards[id].cost;
  }
  list.pointTotal += ship.totalCost;
  return list;
}

function unequipUpgrade(list, shipIndex, upgradeIndex) {
  const ship = list.ships[shipIndex];
  list.pointTotal -= ship.totalCost;
  const upgradeCard = cards[ship.equippedUpgrades[upgradeIndex]];
  if (upgradeCard.addsUpgradeSlot) {
    const upgradeTypeToRemove = upgradeCard.addsUpgradeSlot[0];
    for (let i = ship.upgradeBar.length - 1; i > -1; i--) {
      if (ship.upgradeBar[i] === upgradeTypeToRemove) {
        const extraUpgradeCard = cards[ship.equippedUpgrades[i]];
        if (extraUpgradeCard) {
          ship.totalCost -= extraUpgradeCard.cost;
          if (extraUpgradeCard.isUnique) {
            const name = extraUpgradeCard.displayName ? extraUpgradeCard.displayName : extraUpgradeCard.cardName;
            list.uniques = deleteItem(list.uniques, list.uniques.indexOf(name));
          }
        }
        if (extraUpgradeCard.isMod) ship.numMods--;
        ship.equippedUpgrades = deleteItem(ship.equippedUpgrades, i);
        ship.upgradeBar = deleteItem(ship.upgradeBar, i);
        break;
      }
    }
  }

  if (upgradeCard.isUnique) {
    const name = upgradeCard.displayName ? upgradeCard.displayName : upgradeCard.cardName;
    list.uniques = deleteItem(list.uniques, list.uniques.indexOf(name));
  }

  if (upgradeCard.isMod) ship.numMods--;

  if (upgradeCard.cardSubtype === 'commander') list.commander = '';

  ship.totalCost -= upgradeCard.cost;
  ship.equippedUpgrades[upgradeIndex] = null;
  list.pointTotal += ship.totalCost;

  list.shipHashes[list.shipHashes.indexOf(ship.shipHash)] = createShipHash(ship);
  ship.shipHash = createShipHash(ship);

  return list;
}

function copyShip(list, shipIndex) {
  const ship = list.ships[shipIndex];
  const shipCard = cards[ship.shipId];
  const newShip = {
    shipId: ship.shipId,
    count: 1,
    hasUniques: false,
    totalCost: shipCard.cost,
    upgradeBar: [...shipCard.upgradeBar],
    equippedUpgrades: [],
    numMods: 0
  };
  for (let i = 0; i < shipCard.upgradeBar.length; i++) {
    newShip.equippedUpgrades.push(null);
  }
  newShip.shipHash = createShipHash(ship);
  list.ships.push(newShip);
  list.shipHashes.push(ship.shipHash);
  list.pointTotal += newShip.totalCost;

  for (let i = 0; i < shipCard.upgradeBar.length; i++) {
    const upgradeId = ship.equippedUpgrades[i];
    if (!upgradeId || cards[upgradeId].isUnique) continue;
    list = equipUpgrade(list, list.ships.length - 1, i, upgradeId);
  }

  return list;
}

function addShip(list, shipId) {
  const card = cards[shipId];
  list.pointTotal += card.cost;
  const ship = {
    shipId,
    count: 1,
    hasUniques: false,
    totalCost: card.cost,
    upgradeBar: [...card.upgradeBar],
    equippedUpgrades: [],
    numMods: 0
  };
  for (let i = 0; i < card.upgradeBar.length; i++) {
    ship.equippedUpgrades.push(null);
  }
  ship.shipHash = createShipHash(ship);
  list.ships.push(ship);
  list.shipHashes.push(ship.shipHash);

  return list;
}

function addSquadron(list, squadronId) {
  const card = cards[squadronId];
  list.pointTotal += card.cost;
  const index = list.squadronHashes.indexOf(squadronId);

  if (card.isUnique) list.uniques.push(card.cardName);

  if (index > -1) {
    list.squadrons[index].count++;
  } else {
    const squad = { squadronId, cost: card.cost, count: 1 };
    list.squadrons.push(squad);
    list.squadronHashes.push(squadronId);
  }

  return list;
}

function deleteShip(list, shipIndex) {
  const ship = list.ships[shipIndex];

  ship.equippedUpgrades.forEach(id => {
    if (!id) return;
    const card = cards[id];
    const name = card.displayName ? card.displayName : card.cardName;
    if (list.uniques.includes(name)) list.uniques = deleteItem(list.uniques, list.uniques.indexOf(name));
  });

  if (list.commander) {
    const card = cards[list.commander];
    const name = card.displayName ? card.displayName : card.cardName;
    if (!list.uniques.includes(name)) list.commander = '';
  }

  list.pointTotal -= ship.totalCost;
  list.shipHashes = deleteItem(list.shipHashes, shipIndex);
  list.ships = deleteItem(list.ships, shipIndex);

  return list;
}

function decrementSquadronCount(list, squadronIndex) {
  const squad = list.squadrons[squadronIndex];
  const card = cards[squad.squadronId];
  list.pointTotal -= card.cost;
  if (squad.count === 1) {
    if (list.uniques.includes(card.cardName)) {
      list.uniques = deleteItem(list.uniques, list.uniques.indexOf(card.cardName));
    }
    list.squadronHashes = deleteItem(list.squadronHashes, squadronIndex);
    list.squadrons = deleteItem(list.squadrons, squadronIndex);
  } else {
    list.squadrons[squadronIndex].count -= 1;
  }

  return list;
}

function generateText(list) {
  let text = `Name: ${list.title}\n`;
  text += `Faction: ${list.faction}\n`;
  if (list.commander) {
    const commanderCard = cards[list.commander];
    text += `Commander: ${commanderCard.dispalyName ? commanderCard.displayName : commanderCard.cardName}\n\n`;
  } else text += 'Commander:\n\n';
  text += `Assault: ${list.assaultObjective}\n`;
  text += `Defense: ${list.defensiveObjective}\n`;
  text += `Navigation: ${list.navigationObjective}\n\n`;

  for (let i = 0; i < list.ships.length; i++) {
    const ship = list.ships[i];
    const shipCard = cards[ship.shipId];
    text += `${shipCard.displayName ? shipCard.displayName : shipCard.cardName} (${shipCard.cost})\n`;
    for (let j = 0; j < ship.equippedUpgrades.length; j++) {
      const upgradeId = ship.equippedUpgrades[j];
      if (!upgradeId) continue;
      const upgradeCard = cards[upgradeId];
      text += `• ${upgradeCard.displayName ? upgradeCard.displayName : upgradeCard.cardName} (${upgradeCard.cost})\n`;
    }
    text += `= ${ship.totalCost}\n\n`;
  }

  text += 'Squadrons:\n';
  let squadTotal = 0;
  for (let i = 0; i < list.squadrons.length; i++) {
    const squadron = list.squadrons[i];
    const squadronCard = cards[squadron.squadronId];
    squadTotal += squadronCard.cost * squadron.count;
    if (squadron.count > 1) {
      text += `• ${squadron.count}× ${squadronCard.displayName ? squadronCard.displayName : squadronCard.cardName} (${squadronCard.cost * squadron.count})\n`;
    } else {
      text += `• ${squadronCard.displayName ? squadronCard.displayName : squadronCard.cardName} (${squadronCard.cost})\n`;
    }
  }
  text += `= ${squadTotal} Points \n\n`;

  text += `Total Points: ${list.pointTotal}`;

  return text;
}

export {
  addShip,
  copyShip,
  deleteShip,
  addSquadron,
  equipUpgrade,
  unequipUpgrade,
  decrementSquadronCount,
  addObjective,
  removeObjective,
  generateText,
  getEligibleShipIds,
  getEligibleUpgradeIds,
  getEligibleSquadronIds,
  getEligibleAssaultObjectives,
  getEligibleDefensiveObjectives,
  getEligibleNavigationObjectives
};
