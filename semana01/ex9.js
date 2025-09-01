const s = 'FLAG{aprendendo_js}';

console.log(s.toUpperCase());        // maiúsculas
console.log(s.includes('js'));       // contém "js"?
const m = s.match(/FLAG{(.+?)_js}/); // pega só "aprendendo"
console.log(m ? m[1] : '');
