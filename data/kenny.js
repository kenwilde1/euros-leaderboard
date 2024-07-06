const matchPredictions = [
  {
    id: "GERSCO",
    home: "Germany",
    away: "Scotland",
    homeGoals: 3,
    awayGoals: 0,
  },
  {
    id: "HUNSUI",
    home: "Hungary",
    away: "Switzerland",
    homeGoals: 1,
    awayGoals: 2,
  },
  { id: "SPACRO", home: "Spain", away: "Croatia", homeGoals: 2, awayGoals: 2 },
  { id: "ITAALB", home: "Italy", away: "Albania", homeGoals: 1, awayGoals: 0 },
  {
    id: "POLNET",
    home: "Poland",
    away: "Netherlands",
    homeGoals: 1,
    awayGoals: 3,
  },
  {
    id: "SLODEN",
    home: "Slovenia",
    away: "Denmark",
    homeGoals: 1,
    awayGoals: 2,
  },
  { id: "SERENG", home: "Serbia", away: "England", homeGoals: 0, awayGoals: 2 },
  {
    id: "ROMUKR",
    home: "Romania",
    away: "Ukraine",
    homeGoals: 0,
    awayGoals: 1,
  },
  {
    id: "BELSLO",
    home: "Belgium",
    away: "Slovakia",
    homeGoals: 3,
    awayGoals: 0,
  },
  { id: "AUTFRA", home: "Austria", away: "France", homeGoals: 0, awayGoals: 2 },
  { id: "TURGEO", home: "Turkey", away: "Georgia", homeGoals: 0, awayGoals: 0 },
  {
    id: "PORCZE",
    home: "Portugal",
    away: "Czechia",
    homeGoals: 3,
    awayGoals: 0,
  },
  {
    id: "CROALB",
    home: "Croatia",
    away: "Albania",
    homeGoals: 4,
    awayGoals: 1,
  },
  {
    id: "GERHUN",
    home: "Germany",
    away: "Hungary",
    homeGoals: 2,
    awayGoals: 0,
  },
  {
    id: "SCOSUI",
    home: "Scotland",
    away: "Switzerland",
    homeGoals: 0,
    awayGoals: 2,
  },
  {
    id: "SLOSER",
    home: "Slovenia",
    away: "Serbia",
    homeGoals: 0,
    awayGoals: 0,
  },
  {
    id: "DENENG",
    home: "Denmark",
    away: "England",
    homeGoals: 1,
    awayGoals: 3,
  },
  { id: "SPAITA", home: "Spain", away: "Italy", homeGoals: 2, awayGoals: 2 },
  {
    id: "SLOUKR",
    home: "Slovakia",
    away: "Ukraine",
    homeGoals: 1,
    awayGoals: 1,
  },
  { id: "POLAUT", home: "Poland", away: "Austria", homeGoals: 2, awayGoals: 1 },
  {
    id: "NETFRA",
    home: "Netherlands",
    away: "France",
    homeGoals: 1,
    awayGoals: 3,
  },
  {
    id: "GEOCZE",
    home: "Georgia",
    away: "Czechia",
    homeGoals: 0,
    awayGoals: 2,
  },
  {
    id: "TURPOR",
    home: "Turkey",
    away: "Portugal",
    homeGoals: 0,
    awayGoals: 3,
  },
  {
    id: "BELROM",
    home: "Belgium",
    away: "Romania",
    homeGoals: 4,
    awayGoals: 1,
  },
  {
    id: "SUIGER",
    home: "Switzerland",
    away: "Germany",
    homeGoals: 1,
    awayGoals: 2,
  },
  {
    id: "SCOHUN",
    home: "Scotland",
    away: "Hungary",
    homeGoals: 1,
    awayGoals: 0,
  },
  { id: "CROITA", home: "Croatia", away: "Italy", homeGoals: 2, awayGoals: 1 },
  { id: "ALBSPA", home: "Albania", away: "Spain", homeGoals: 0, awayGoals: 3 },
  {
    id: "NETAUT",
    home: "Netherlands",
    away: "Austria",
    homeGoals: 2,
    awayGoals: 1,
  },
  { id: "FRAPOL", home: "France", away: "Poland", homeGoals: 3, awayGoals: 1 },
  {
    id: "ENGSLO",
    home: "England",
    away: "Slovenia",
    homeGoals: 1,
    awayGoals: 0,
  },
  { id: "DENSER", home: "Denmark", away: "Serbia", homeGoals: 2, awayGoals: 2 },
  {
    id: "SLOROM",
    home: "Slovakia",
    away: "Romania",
    homeGoals: 1,
    awayGoals: 0,
  },
  {
    id: "UKRBEL",
    home: "Ukraine",
    away: "Belgium",
    homeGoals: 1,
    awayGoals: 2,
  },
  {
    id: "GEOPOR",
    home: "Georgia",
    away: "Portugal",
    homeGoals: 0,
    awayGoals: 4,
  },
  { id: "CZETUR", home: "Czechia", away: "Turkey", homeGoals: 0, awayGoals: 0 },
  {},
  {},
  {
    id: "SUIITA",
    home: "Switzerland",
    away: "Italy",
    homeGoals: 1,
    awayGoals: 2,
  },
  {
    id: "GERDEN",
    home: "Germany",
    away: "Denmark",
    homeGoals: 2,
    awayGoals: 1,
  },
  {
    id: "ENGSLO2",
    home: "England",
    away: "Slovakia",
    homeGoals: 2,
    awayGoals: 0,
  },
  { id: "SPAGEO", home: "Spain", away: "Georgia", homeGoals: 3, awayGoals: 0 },
  { id: "FRABEL", home: "France", away: "Belgium", homeGoals: 2, awayGoals: 1 },
  {
    id: "PORSLO",
    home: "Portugal",
    away: "Slovenia",
    homeGoals: 3,
    awayGoals: 1,
  },
  {
    id: "ROMNET",
    home: "Romania",
    away: "Netherlands",
    homeGoals: 1,
    awayGoals: 2,
  },
  { id: "AUTTUR", home: "Austria", away: "Turkey", homeGoals: 2, awayGoals: 1 },
  {
    id: "SPAGER",
    home: "Spain",
    away: "Germany",
    homeGoals: 2,
    awayGoals: 2,
  },
  {
    id: "PORFRA",
    home: "Portugal",
    away: "France",
    homeGoals: 1,
    awayGoals: 2,
  },
  {},
  {
    id: "ENGSUI",
    home: "England",
    away: "Switzerland",
    homeGoals: 0,
    awayGoals: 0,
  },
  {
    id: "NETTUR",
    home: "Netherlands",
    away: "Turkey",
    homeGoals: 1,
    awayGoals: 2,
  },
];

const highestScoringTeam = "Portugal";
const bestDefence = "Germany";
const topGoalscorer = "Mbappe";

const semiFinalist = "France, Germany, Croatia, Portugal";
const finalists = "France vs Portugal";
const totalYellowCards = "55";
const totalRedCards = "3";
const totalPenalties = "4";
const quarterFinalists =
  "Germany, France, Portugal, England, Croatia, Spain, Ukraine, Belgium";

export default {
  matchPredictions,
  highestScoringTeam,
  bestDefence,
  topGoalscorer,
  semiFinalist,
  finalists,
  totalYellowCards,
  totalPenalties,
  totalRedCards,
  quarterFinalists,
  winner: "France",
};
