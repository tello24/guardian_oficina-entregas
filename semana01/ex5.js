const numeros = Array.from({ length: 20 }, (_, i) => i + 1);
const pares = numeros.filter((x) => x % 2 === 0);
console.log(pares.join(' '));
