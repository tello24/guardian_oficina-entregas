const n = Number(process.argv[2] ?? 3);

for (let i = 1; i <= 10; i++) {
  console.log(`${n} x ${i} = ${n * i}`);
}
