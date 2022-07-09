export function arrSize(arr: any[]) {
  let i = 0;
  arr.forEach((e) => {
    if (e) {
      i++;
    }
  });

  return i;
}
