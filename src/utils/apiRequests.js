import axios from "axios";

const options = {
  params: { collectible: "1" },
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_HS_API_KEY,
    "X-RapidAPI-Host": "omgvamp-hearthstone-v1.p.rapidapi.com",
  },
};

// GET ALL CARDS FROM A HERO CLASS ------------------------

const standardCardsSet = [
  "Basic",
  "Core",
  "Forged in the Barrens",
  "United in Stormwind",
  "Fractured in Alterac Valley",
  "Voyage to the Sunken City",
  "Murder at Castle Nathria",
  "March of the Lich King",
  "Path of Arthas",
  "Festival of Legends",
];

const getNeutralCardSet = async () => {
  return axios
    .get(
      `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/classes/neutral`,
      options
    )
    .then((res) => {
      const allNeutralCardSet = res.data;
      const filteredNeutralCardsSet = allNeutralCardSet
        .filter((item) => standardCardsSet.includes(item.cardSet))
        .filter((item) => item.text && item.img);
      return filteredNeutralCardsSet;
    })
    .catch((err) => console.error("ErrorNeutralCardSet :", err));
};

const getHeroCardSet = async (hero) => {
  return axios
    .get(
      `https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/classes/${hero}`,
      options
    )
    .then((res) => {
      const allHeroCardSet = res.data;
      const filteredHeroCardsSet = allHeroCardSet
        .filter((item) => standardCardsSet.includes(item.cardSet))
        .filter((item) => item.text && item.img);
      return filteredHeroCardsSet;
    })
    .catch((err) => console.error("ErrorHeroCardSet :", err));
};

export const getAllCardsFiltered = async (hero, neutralCards) => {
  let isNeutral = neutralCards;
  if (isNeutral.length === 0) {
    isNeutral = getNeutralCardSet();
  }
  return Promise.all([isNeutral, getHeroCardSet(hero)])
    .then((item) => {
      const filteredCards = [...item[0], ...item[1]].sort(
        (a, b) => a.cost - b.cost
      );
      const neutralCardsSet = [...item[0]];
      return {
        filteredCards,
        neutralCardsSet,
      };
    })
    .catch((err) => console.error("ErrorAllCards :", err));
};

export const getAllCardsFilteredHash = async (hero) => {
  return Promise.all([getNeutralCardSet(), getHeroCardSet(hero)])
    .then((item) => {
      const filteredCards = [...item[0], ...item[1]].sort(
        (a, b) => a.cost - b.cost
      );
      return filteredCards;
    })
    .catch((err) => console.error("ErrorAllCards :", err));
};
