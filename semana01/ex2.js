const idade = Number(process.argv[2] ?? 21);

if (idade >= 18) {
  console.log('Pode jogar o CTF!');
} else {
  console.log('Espere mais um pouco...');
}
