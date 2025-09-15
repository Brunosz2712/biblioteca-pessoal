📚 Biblioteca Pessoal

Aplicativo mobile desenvolvido em React Native com Expo, que permite organizar a sua biblioteca de livros de forma simples e prática.

✨ O que o app faz
📖 Gerenciamento de livros: cadastrar, editar e remover livros.
⭐ Favoritos: marcar livros que você mais gosta.
🔍 Busca: filtrar por status (quero ler, lendo, lido) ou gênero.
👤 Autenticação: criação de conta e login via Firebase Auth.
☁️ Armazenamento: dados persistidos no Firestore.
🎨 Interface clara e moderna com NativeBase.
🧭 Navegação fluida com React Navigation (stacks e abas).
🧱 Tecnologias utilizadas

Expo SDK 54
React 18.2 + React Native 0.76
Firebase 10 (Auth + Firestore)
React Navigation 7
NativeBase 3
TypeScript 5

▶️ Demonstração do fluxo

O usuário cria uma conta ou faz login.
Na Home, visualiza a lista de livros cadastrados.
Pode adicionar novos livros pelo botão +.
Em cada livro é possível ver detalhes, editar ou remover.
A aba de Favoritos mostra apenas os livros marcados.
A aba de Perfil exibe informações do usuário e permite sair da conta.

🚀 Como rodar
Clone o repositório

git clone https://github.com/seu-usuario/biblioteca-pessoal.git
cd biblioteca-pessoal

Instale as dependências
npm install

Configure o Firebase
Crie um projeto no console do Firebase
Copie as chaves para src/services/firebase.ts

Inicie o app
npx expo start -c

Escaneie o QR Code no Expo Go (Android/iOS) ou rode no emulador.

📸 Telas principais
Tela de Login e Registro
Tela de Home (lista de livros)
Tela de Adicionar Livro
Tela de Detalhes do Livro
Tela de Favoritos
Tela de Perfil do Usuário

👥 Autor
Bruno da Silva Souza -> RM:94346 2TDSPG 
Desenvolvido como projeto de estudo utilizando React Native, Firebase e Expo.