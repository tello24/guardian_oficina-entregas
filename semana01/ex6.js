const usuario = {
  nome: 'Alice',
  idade: 22,
  admin: true, // false p dar user comum
};

console.log(usuario.admin ? 'Bem-vindo, administrador' : 'Bem-vindo, usuário comum');
