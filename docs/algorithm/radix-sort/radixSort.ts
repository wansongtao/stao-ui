function radixSort(arr: number[], isAsc = true) {
  if (arr.length < 2) return arr;

  let max = Math.max(...arr);
  if (max < 0) {
    max = Math.abs(Math.min(...arr));
  }
  const radix = 10;
  let exp = 1;

  while(max / exp > 0) {
    const buckets: number[][] = [];
    arr.forEach((item) => {
      let index = Math.floor(Math.abs(item) / exp) % radix;
      if (item < 0) {
        index += radix;
      }

      if (buckets[index]) {
        buckets[index].push(item);
      } else {
        buckets[index] = [item];
      }
    });

    arr = [];
    buckets.forEach((v, i) => {
      if (!v) return;

      if (isAsc) {
        if (i < 10) {
          arr.push(...v);
          return;
        }
        arr.unshift(...v);
        return;
      }

      if (i < 10) {
        arr.unshift(...v);
        return;
      }
      arr.push(...v);
    });

    exp *= radix;
  }

  return arr;
}
