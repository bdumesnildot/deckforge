export const findCardInDeck = (deck, card) => {
  return deck.findIndex((item) => item.cardId === card.cardId);
};

export const countQuantityCardsInDeck = (deck) => {
  return deck.reduce((acc, cur) => acc + cur.quantity, 0);
};

const addQuantityCardToDeck = (deck, setDeck, index) => {
  const updateQuantityCardToDeck = [...deck];
  if (
    updateQuantityCardToDeck[index].quantity < 2 &&
    !updateQuantityCardToDeck[index].elite
  ) {
    updateQuantityCardToDeck[index].quantity += 1;
    setDeck(updateQuantityCardToDeck);
  }
};

export const removeQuantityCardToDeck = (deck, setDeck, index) => {
  const updateQuantityCardToDeck = [...deck];
  if (index !== -1 && countQuantityCardsInDeck(deck) !== 0) {
    if (updateQuantityCardToDeck[index].quantity === 2) {
      updateQuantityCardToDeck[index].quantity -= 1;
      setDeck(updateQuantityCardToDeck);
    } else {
      updateQuantityCardToDeck.splice(index, 1);
      setDeck(updateQuantityCardToDeck);
    }
  }
};

const addNewCardToDeck = (deck, setDeck, card) => {
  const newCard = {
    cardId: card.cardId,
    dbfId: card.dbfId,
    name: card.name,
    cardSet: card.cardSet,
    type: card.type,
    rarity: card.rarity,
    cost: card.cost,
    attack: card.attack,
    health: card.health,
    text: card.text,
    flavor: card.flavor,
    artist: card.artist,
    elite: card.elite,
    playerClass: card.playerClass,
    img: card.img,
    quantity: 1,
  };

  if (card.health === undefined) {
    delete newCard.health;
  }
  if (card.attack === undefined) {
    delete newCard.attack;
  }
  if (card.elite === undefined) {
    delete newCard.elite;
  }

  const filteredDeckCards = [...deck, newCard].sort((a, b) => a.cost - b.cost);

  setDeck(filteredDeckCards);
};

export const addUpdateDeck = (deck, setDeck, card) => {
  const newCardQuantity = 1;
  const quantityDeckActualy = countQuantityCardsInDeck(deck);
  const quantityDeckTotal = quantityDeckActualy + newCardQuantity;

  if (quantityDeckTotal <= 30) {
    if (findCardInDeck(deck, card) !== -1) {
      addQuantityCardToDeck(deck, setDeck, findCardInDeck(deck, card));
    } else {
      addNewCardToDeck(deck, setDeck, card);
    }
  }
};
