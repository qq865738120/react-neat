function max(arr: any[]): number {
  return arr.reduce((accu, curr) => {
    if (curr > accu) return curr;
    return accu;
  });
}

export function getDepth(arr: any[]): number {
  const eleDepths = [];
  arr.forEach(ele => {
    let depth = 0;
    if (Array.isArray(ele)) {
      depth = getDepth(ele);
    }
    eleDepths.push(depth);
  });
  return 1 + max(eleDepths);
}
