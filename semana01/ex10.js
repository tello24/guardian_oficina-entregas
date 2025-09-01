let dados = '{"user":"alice","flag":"GUARDIAN{JS0N_L3AK3D}"}';
const obj = JSON.parse(dados);
console.log(obj.flag);
