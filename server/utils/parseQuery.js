export default function (query) {
  let pagination = {
    page: Number(query?.page || 1),
    size: Number(query?.size || 10),
  };
  let filter = {};
  Object.keys(query).forEach((key) => {
    if (!pagination[key] && query[key] !== "") {
      filter[key] = query[key];
    }
  });

  return { pagination, filter };
}
