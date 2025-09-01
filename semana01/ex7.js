function maiorNumero(arr) {
  if (arr.length === 0) return undefined;
  return arr.reduce((max, n) => (n > max ? n : max), arr[0]);
}

const listaligadamachion = [3, 7, 2, 9];
console.log(maiorNumero(listaligadamachion)); // 9

