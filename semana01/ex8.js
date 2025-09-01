function contagemRegressiva(n) {
  for (let i = n; i >= 0; i--) {
    console.log(i);
  }
}

const n = Number(process.argv[2] ?? 5);
contagemRegressiva(n);
