const getRandomInt = () => {
  const minCeiled = Math.ceil(1);
  const maxFloored = Math.floor(Number.MAX_SAFE_INTEGER);
  return (
    Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) % 100000000
  );
};

module.exports = { getRandomInt };
