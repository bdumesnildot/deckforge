import { encode, decode, FormatType } from "deckstrings";
import { getAllCardsFilteredHash } from "./apiRequests";
import heroesList from "../data/heroesList";

const copyToClipboard = (text) => navigator.clipboard.writeText(text);

const convertDeckBeforeEncode = (deckToEncode, activeHeroName) => {
  const cards = deckToEncode.map((item) => [item.dbfId, item.quantity]);
  const hero = heroesList.filter((item) => item.name === activeHeroName);
  const deck = {
    cards,
    heroes: [hero[0].dbfId],
    format: FormatType.FT_STANDARD,
  };
  return deck;
};

const encodeDeck = (deck, activeHeroName) => {
  const convertedDeck = convertDeckBeforeEncode(deck, activeHeroName);
  const deckString = encode(convertedDeck);

  return deckString;
};

const decodeHash = (hash) => {
  try {
    const decodedText = decode(hash);
    return decodedText;
  } catch (err) {
    return undefined;
  }
};

const decodeDeck = async (hash) => {
  const { cards, heroes } = decodeHash(hash);
  const findHeroes = heroesList.find((item) => item.dbfId === heroes[0]);
  if (findHeroes === -1) {
    return undefined;
  }

  const dbfIdList = cards.map((item) => item[0]);
  const allCards = await getAllCardsFilteredHash(findHeroes.name);
  const findCountByDbfId = (dbfid) => {
    const found = cards.find((item) => item[0] === dbfid);

    return found[1];
  };

  const deckForgeCards = allCards
    .filter((card) => dbfIdList.includes(card.dbfId))
    .map((item) => ({
      cardId: item.cardId,
      dbfId: item.dbfId,
      name: item.name,
      cardSet: item.cardSet,
      type: item.type,
      rarity: item.rarity,
      cost: item.cost,
      attack: item.attack,
      health: item.health,
      text: item.text,
      flavor: item.flavor,
      artist: item.artist,
      elite: item.elite,
      playerClass: item.playerClass,
      img: item.img,
      quantity: findCountByDbfId(item.dbfId),
    }))
    .map((item) => {
      const newItem = { ...item };
      if (newItem.health === undefined) {
        delete newItem.health;
      }
      if (newItem.attack === undefined) {
        delete newItem.attack;
      }
      if (newItem.elite === undefined) {
        delete newItem.elite;
      }
      return newItem;
    })
    .sort((a, b) => a.cost - b.cost);

  const decks = {
    cards: allCards,
    heroes: findHeroes,
    deck: deckForgeCards,
  };

  return decks;
};

export { copyToClipboard, encodeDeck, decodeDeck, decodeHash };
