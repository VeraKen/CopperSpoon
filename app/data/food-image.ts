export const foodImage = (title: string, cuisineOrCountry = "") => {
  const keywords = `${title},${cuisineOrCountry}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ",")
    .replace(/^,+|,+$/g, "");
  let hash = 2166136261;
  for (const char of `${title}|${cuisineOrCountry}`) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  const lock = Math.abs(hash % 100000) + 1;
  return `https://loremflickr.com/1200/800/${keywords}?lock=${lock}`;
};
