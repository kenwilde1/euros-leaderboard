const matchPredictions = [
  {
    id: "GERSCO",
    home: "Germany",
    away: "Scotland",
    homeGoals: 3,
    awayGoals: 1,
  },
  {
    id: "HUNSUI",
    home: "Hungary",
    away: "Switzerland",
    homeGoals: 0,
    awayGoals: 1,
  },
  { id: "SPACRO", home: "Spain", away: "Croatia", homeGoals: 2, awayGoals: 1 },
  { id: "ITAALB", home: "Italy", away: "Albania", homeGoals: 1, awayGoals: 0 },
  {
    id: "POLNET",
    home: "Poland",
    away: "Netherlands",
    homeGoals: 0,
    awayGoals: 2,
  },
  {
    id: "SLODEN",
    home: "Slovenia",
    away: "Denmark",
    homeGoals: 0,
    awayGoals: 3,
  },
  { id: "SERENG", home: "Serbia", away: "England", homeGoals: 0, awayGoals: 1 },
  {
    id: "ROMUKR",
    home: "Romania",
    away: "Ukraine",
    homeGoals: 0,
    awayGoals: 2,
  },
  {
    id: "BELSLO",
    home: "Belgium",
    away: "Slovakia",
    homeGoals: 2,
    awayGoals: 1,
  },
  { id: "AUTFRA", home: "Austria", away: "France", homeGoals: 0, awayGoals: 2 },
  { id: "TURGEO", home: "Turkey", away: "Georgia", homeGoals: 2, awayGoals: 0 },
  {
    id: "PORCZE",
    home: "Portugal",
    away: "Czechia",
    homeGoals: 3,
    awayGoals: 1,
  },
  {
    id: "CROALB",
    home: "Croatia",
    away: "Albania",
    homeGoals: 2,
    awayGoals: 0,
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
    homeGoals: 1,
    awayGoals: 2,
  },
  {
    id: "SLOSER",
    home: "Slovenia",
    away: "Serbia",
    homeGoals: 2,
    awayGoals: 3,
  },
  {
    id: "DENENG",
    home: "Denmark",
    away: "England",
    homeGoals: 1,
    awayGoals: 2,
  },
  { id: "SPAITA", home: "Spain", away: "Italy", homeGoals: 2, awayGoals: 1 },
  {
    id: "SLOUKR",
    home: "Slovakia",
    away: "Ukraine",
    homeGoals: 1,
    awayGoals: 1,
  },
  { id: "POLAUT", home: "Poland", away: "Austria", homeGoals: 1, awayGoals: 1 },
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
    homeGoals: 1,
    awayGoals: 3,
  },
  {
    id: "BELROM",
    home: "Belgium",
    away: "Romania",
    homeGoals: 2,
    awayGoals: 0,
  },
  {
    id: "SUIGER",
    home: "Switzerland",
    away: "Germany",
    homeGoals: 1,
    awayGoals: 3,
  },
  {
    id: "SCOHUN",
    home: "Scotland",
    away: "Hungary",
    homeGoals: 2,
    awayGoals: 1,
  },
  { id: "CROITA", home: "Croatia", away: "Italy", homeGoals: 2, awayGoals: 2 },
  { id: "ALBSPA", home: "Albania", away: "Spain", homeGoals: 0, awayGoals: 4 },
  {
    id: "NETAUT",
    home: "Netherlands",
    away: "Austria",
    homeGoals: 2,
    awayGoals: 1,
  },
  { id: "FRAPOL", home: "France", away: "Poland", homeGoals: 3, awayGoals: 0 },
  {
    id: "ENGSLO",
    home: "England",
    away: "Slovenia",
    homeGoals: 2,
    awayGoals: 0,
  },
  { id: "DENSER", home: "Denmark", away: "Serbia", homeGoals: 2, awayGoals: 1 },
  {
    id: "SLOROM",
    home: "Slovakia",
    away: "Romania",
    homeGoals: 2,
    awayGoals: 1,
  },
  {
    id: "UKRBEL",
    home: "Ukraine",
    away: "Belgium",
    homeGoals: 1,
    awayGoals: 3,
  },
  {
    id: "GEOPOR",
    home: "Georgia",
    away: "Portugal",
    homeGoals: 0,
    awayGoals: 4,
  },
  { id: "CZETUR", home: "Czechia", away: "Turkey", homeGoals: 2, awayGoals: 2 },
  {},
  {},
  {
    id: "SUIITA",
    home: "Switzerland",
    away: "Italy",
    homeGoals: 1,
    awayGoals: 1,
  },
  {
    id: "GERDEN",
    home: "Germany",
    away: "Denmark",
    homeGoals: 2,
    awayGoals: 0,
  },
  {
    id: "ENGSLO2",
    home: "England",
    away: "Slovakia",
    homeGoals: 0,
    awayGoals: 0,
  },
  { id: "SPAGEO", home: "Spain", away: "Georgia", homeGoals: 3, awayGoals: 0 },
  { id: "FRABEL", home: "France", away: "Belgium", homeGoals: 2, awayGoals: 1 },
  {
    id: "PORSLO",
    home: "Portugal",
    away: "Slovenia",
    homeGoals: 2,
    awayGoals: 0,
  },
  {
    id: "ROMNET",
    home: "Romania",
    away: "Netherlands",
    homeGoals: 1,
    awayGoals: 2,
  },
  { id: "AUTTUR", home: "Austria", away: "Turkey", homeGoals: 3, awayGoals: 1 },
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
    awayGoals: 1,
  },
  {},
  {
    id: "ENGSUI",
    home: "England",
    away: "Switzerland",
    homeGoals: 0,
    awayGoals: 1,
  },
  {
    id: "NETTUR",
    home: "Netherlands",
    away: "Turkey",
    homeGoals: 2,
    awayGoals: 1,
  },
];

const highestScoringTeam = "Portugal";
const bestDefence = "England";
const topGoalscorer = "Mbappe";

const semiFinalist = "Portugal, Germany, England, France";
const finalists = "France vs Portugal";
const totalYellowCards = "148";
const totalRedCards = "3";
const totalPenalties = "3";
const quarterFinalists =
  "Portugal, Netherlands, Germany, Spain, England, Croatia, Belgium, France";

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
  winner: "Portugal",
};
