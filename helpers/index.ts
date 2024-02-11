export function joinQueryParams(arr: (string | null)[]) {
  const filteredArr = arr.filter((item) => item !== null);
  return filteredArr.join(" and ");
}
