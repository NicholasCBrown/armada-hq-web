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

function getEligibleSquadronIds(list) {
  const validSquadIds = [];
  const invalidSquadIds = [];
  const cardsById = Object.keys(cards);

  for (let i = 0; i < cardsById.length; i++) {
    const id = cardsById[i];
    const card = cards[id];
    if (card.cardType !== 'squadron') continue;
    if (card.faction !== list.faction) invalidSquadIds.push(id);
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
    if (card.faction !== list.faction) invalidShipIds.push(id);
    else if (card.cardSubtype === 'huge') validHugeShipIds.push(id);
    else validShipIds.push(id);
  }

  return [
    [...sortIds(validShipIds), ...validHugeShipIds],
    sortIds(invalidShipIds)
  ];
}

function addShip(list, shipId) {
  const card = cards[shipId];
  list.pointTotal += card.cost;
  const index = list.shipHashes.indexOf(shipId);

  if (index > -1) {
    list.ships[index].count++;
  } else {
    const ship = {
      shipId,
      count: 1,
      hasUniques: false,
      totalCost: card.cost,
      shipHash: shipId,
      upgradeBar: [...card.upgradeBar],
      equippedUpgrades: [],
      extraEquippedUpgrades: []
    };
    for (let i = 0; i < card.upgradeBar.length; i++) {
      ship.equippedUpgrades.push(null);
      ship.extraEquippedUpgrades.push(null);
    }
    list.ships.push(ship);
    list.shipHashes.push(shipId);
  }

  return list;
}

function addSquadron(list, squadronId) {
  const card = cards[squadronId];
  list.pointTotal += card.cost;
  const index = list.squadronHashes.indexOf(squadronId);

  if (index > -1) {
    list.squadrons[index].count++;
  } else {
    const squad = { squadronId, count: 1 };
    list.squadrons.push(squad);
    list.squadronHashes.push(squadronId);
  }

  return list;
}

function decrementShipCount(list, shipIndex) {
  const ship = list.ships[shipIndex];

  list.pointTotal -= ship.totalCost;
  if (ship.count === 1) {
    list.shipHashes = deleteItem(list.shipHashes, shipIndex);
    list.ships = deleteItem(list.ships, shipIndex);
  } else {
    list.ships[shipIndex].count -= 1;
  }

  return list;
}

function decrementSquadronCount(list, squadronIndex) {
  const squad = list.squadrons[squadronIndex];

  list.pointTotal -= cards[squad.squadronId].cost;
  if (squad.count === 1) {
    list.squadronHashes = deleteItem(list.squadronHashes, squadronIndex);
    list.squadrons = deleteItem(list.squadrons, squadronIndex);
  } else {
    list.squadrons[squadronIndex].count -= 1;
  }

  return list;
}

export {
  addShip,
  addSquadron,
  decrementShipCount,
  decrementSquadronCount,
  getEligibleShipIds,
  getEligibleSquadronIds
};
