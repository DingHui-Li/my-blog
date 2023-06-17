export default function (query) {
  let pagation = {
    page: Number(query?.page || 1),
    size: Number(query?.size || 10),
  };
  let filter = {};
  Object.keys(query).forEach((key) => {
    if (!pagation[key] && query[key] !== "") {
      filter[key] = query[key];
    }
  });

  return { pagation, filter };
}
