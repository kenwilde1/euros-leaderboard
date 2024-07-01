import fixtures from "../data/fixtures";
import Flag from "react-flagkit";

const countryFlagMap = {
  Germany: "DE",
  Denmark: "DK",
  Switzerland: "CH",
  England: "GB-ENG",
  Slovakia: "SK",
  Spain: "ES",
  Georgia: "GE",
  France: "FR",
  Belgium: "BE",
  Slovenia: "SI",
  Portugal: "PT",
  Italy: "IT",
  Romania: "RO",
  Netherlands: "NL",
  Austria: "AT",
  Turkey: "TR",
};

const Placeholder = () => {
  return <div className="placeholder"></div>;
};

const Fixture = ({ fixture, index }) => {
  const day = new Date().getDate().toString();
  let date;

  if (fixture.day === day) {
    date = <span>Today, {fixture.time}</span>;
  } else if (fixture.day === (parseInt(day) + 1).toString()) {
    date = <span>Tomorrow, {fixture.time}</span>;
  } else {
    date = (
      <span>
        {fixture.dayOfWeek}, {fixture.time}
      </span>
    );
  }

  return (
    <div className="fixture">
      <div className="fixture-time">{date}</div>
      <div className="fixture-round">{fixture.round}</div>
      <div className="fixture-teams">
        <div className="fixture-home">
          <div className="fixture-flag">
            {fixture.home !== "TBD" ? (
              <Flag country={countryFlagMap[fixture.home]} size={20} />
            ) : (
              <Placeholder />
            )}
          </div>
          {fixture.home}
        </div>
        <div className="fixture-away">
          <div className="fixture-flag">
            {fixture.away !== "TBD" ? (
              <Flag country={countryFlagMap[fixture.away]} size={20} />
            ) : (
              <Placeholder />
            )}
          </div>
          {fixture.away}
        </div>
      </div>
    </div>
  );
};

export const LiveFixtures = () => {
  const startKey = new Date().getDate().toString();
  const keys = Object.keys(fixtures)
    .map(Number) // Convert keys to numbers
    .filter((key) => key >= startKey) // Filter keys based on the starting key
    .sort((a, b) => a - b); // Sort keys numerically

  // Step 2: Flatten the arrays
  const flattenedArray = keys.reduce((acc, key) => {
    return acc.concat(fixtures[key]);
  }, []);

  return (
    <div className="live-fixtures-container">
      {flattenedArray.map((fix, index) => (
        <Fixture fixture={fix} index={index + 1} />
      ))}
    </div>
  );
};
