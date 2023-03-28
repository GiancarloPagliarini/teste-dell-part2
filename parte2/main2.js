/* Essa parte do código está utilizando o Document Object Model (DOM) 
do HTML para acessar e armazenar elementos da página web em constantes. 
Para facilitar a identificação dessas constantes, 
a convenção utilizada foi adicionar o sufixo "El" no final de seus nomes. */
const originCityEl = document.querySelector('#originCity')
const destinyCityEl = document.querySelector('#destinyCity')
const typeTruckEl = document.querySelector('#typeTruck')
const btnAddItemEl = document.querySelector('#btnAddItem')
const btnDeleteAllItemsEl = document.querySelector('.btn-reset-all')
const selectedItemsEl = document.querySelector('#select-items')
const quantityItemsEl = document.querySelector('#quantity-items')
const ulListResultEl = document.querySelector('#ulListResultEl')
const btnRegisterEl = document.querySelector('.btn-register')
const totalWeightEl = document.querySelector('.totalWeight')
const imageTruckEl = document.querySelector('.truckImage')
const nameTruckEl = document.querySelector('.nameTruck')
const containerTypeTruckEl = document.querySelector('.container-type-Truck')
const btnFinalizationEl = document.querySelector('#btn-finalization')
const resEl = document.querySelector('#res')
const divResultEl = document.querySelector('.div-result')
const resNegativeEl = document.querySelector('#res-negative')
const divResultNegativeEl = document.querySelector('.div-result-negative')
const lineBar = document.querySelector('.line-bar')

/* A variável typeTruck está sendo declarada como uma variável global. 
Para que ela possa ser acessada e alterada em qualquer lugar do código, 
sem a necessidade de ser passada como parâmetro em todas as funções que precisam utilizá-la. 
Essa estratégia é útil para evitar erros de escopo */  
let typeTruck

// Objeto que armazena as cidades com as distâncias entre elas
const distances = {
  "porto alegre": { 'aracaju': 3045,"são paulo": 1114, "rio de janeiro": 1536, "belo horizonte": 1924, "fortaleza": 4305, "manaus": 4445, "salvador": 3229, "curitiba": 722 },
  "são paulo": { 'aracaju': 1990, "porto alegre": 1114, "rio de janeiro": 434, "belo horizonte": 584, "fortaleza": 2773, "manaus": 3495, "salvador": 1552, "curitiba": 408 },
  "rio de janeiro": { 'aracaju': 1660, "porto alegre": 1536, "são paulo": 434, "belo horizonte": 434, "fortaleza": 2873, "manaus": 4356, "salvador": 1213, "curitiba": 856 },
  "belo horizonte": { 'aracaju': 1280, "porto alegre": 1924, "são paulo": 584, "rio de janeiro": 434, "fortaleza": 2622, "manaus": 4066, "salvador": 584, "curitiba": 1055 },
  "aracaju": { "porto alegre": 3045, "são paulo": 1990, "rio de janeiro": 1660, "belo horizonte": 1280, "fortaleza": 1185, "manaus": 3715, "salvador": 355, "curitiba": 2345 },
  "fortaleza": { "porto alegre": 4305, "são paulo": 2773, "rio de janeiro": 2873, "belo horizonte": 2622, "aracaju": 1185, "manaus": 2840, "salvador": 1374, "curitiba": 3819 },
  "manaus": { "porto alegre": 4445, "são paulo": 3495, "rio de janeiro": 4356, "belo horizonte": 4066, "aracaju": 3715, "fortaleza": 2840, "salvador": 4257, "curitiba": 4345 },
  "salvador": { "porto alegre": 3229, "são paulo": 1552, "rio de janeiro": 1213, "belo horizonte": 584, "aracaju": 355, "fortaleza": 1374, "manaus": 4257, "curitiba": 1781 },
  "curitiba": { "porto alegre": 722, "são paulo": 408, "rio de janeiro": 856, "belo horizonte": 1055, "aracaju": 2345, "fortaleza": 3819, "manaus": 4345, "salvador": 1781 }
}

// Objeto que armazena os custos por km para cada modalidade de transporte
const costs = {
  "caminhão pequeno": 4.87,
  "caminhão médio": 11.92,
  "caminhão grande": 27.44,
}

/* Aqui foi adicionado um evento de click no botão dentro do modal, 
esse botão cria os itens que serão transportados. A criação de cada item é representada pelo objeto "register", que possui um nome 
(valor do item selecionado pelo usuário) e um id gerado aleatoriamente pela função "generatorID". 
O id é utilizado posteriormente para permitir que o usuário remova o item, se desejar. */
btnAddItemEl.addEventListener('click', function () {
  
  let register = {
    nome: selectedItemsEl.value,
    id: generatorID()
  }

  createRegister(register)
})

/* Esta função gera um número pseudo-aleatório para utilizarmos no ID do nosso item */
function generatorID() {
  return Math.floor(Math.random() * 3000)
}

/* Esta função gera um número pseudo-aleatório 
que foi utilizado para simular a funcionalidade de cálculo de peso total */
function generatorRandomWeight() {
  let max = 10000
  let min = 200
  
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/* Esta função é responsável por criar os itens. Caso o input não esteja preenchido, é gerado um alerta para o usuário. 
Em seguida, a função chama a função 'createTagLi', que é responsável por criar o elemento visualmente.
O elemento é então adicionado como filho do elemento 'ulListResultEl', que é a lista em que os itens serão exibidos. */
function createRegister(register) {
  if (quantityItemsEl.value) {
    
    let li = createTagLi(register)

    ulListResultEl.appendChild(li)
    
    } else {
      alert('Você precisa digitar algum valor!')
    }
}
 
/* Esta é a função responsável por criar o elemento visual que será inserido como filho do 'ulListResultEl', 
no caso um elemento 'li'. Esse elemento 'li' contém um parágrafo que exibe a quantidade selecionada pelo usuário 
e o nome do item selecionado, além de um botão que permite ao usuário excluir o item da lista, caso desejado, lembrando
que o botão recebe um atributo 'onclick' que recebe a função 'deleteItem' deletando o item referente ao seu id  */
function createTagLi(register) {
  
  let li = document.createElement('li')
  li.classList.add('d-flex', 'justify-content-between', 'mb-3')
  li.id = register.id
  
  let imagePackage = document.createElement('img')
  imagePackage.classList.add('imagePackage')
  imagePackage.setAttribute('src', 'images/package.png')

  let p = document.createElement('p')
  p.innerHTML = `<strong>${quantityItemsEl.value}</strong> ${register.nome}`
  p.appendChild(imagePackage)
  
  let btnDelete = document.createElement('button')
  btnDelete.classList.add('btn', 'btn-danger')
  btnDelete.innerHTML = 'excluir'
  btnDelete.setAttribute('onclick', 'deleteItem('+register.id+')')

  li.appendChild(p)
  li.appendChild(btnDelete)
    
  return li
}

/* Função que deleta o item referente ao seu ID. Primeiro o usuário recebe uma pergunta para confirmar
a ação, caso ele aceite, o item é deletado */
function deleteItem(idRegister) {
  let confirmation = window.confirm('Você tem certeza que deseja excluir este item?') 
  if(confirmation) {
    let li = document.getElementById(idRegister)
    if(li) {
      ulListResultEl.removeChild(li)
    }
  }
}

/* Aqui fica nosso botão para o usuário 'encerrar o programa'.
Quando o usuário clicar irá limpar todas suas alterações */
btnDeleteAllItemsEl.addEventListener('click', () => {
  let confirmation = window.confirm('Você tem certeza que deseja limpar todo o cadastro?')

  if(confirmation) {
    ulListResultEl.innerHTML = ''
    totalWeightEl.innerHTML = ''
    nameTruckEl.innerHTML = ''
    typeTruckEl.value = ''
    containerTypeTruckEl.classList.add('d-none')
    btnFinalizationEl.classList.add('d-none')
    lineBar.classList.add('d-none')
    divResultEl.classList.add('d-none')
    divResultNegativeEl.classList.add('d-none')
    originCityEl.value = ''
    destinyCityEl.value = ''
  }
})

/* Nesta função, é adicionado um ouvinte de eventos ao botão de "cadastrar transporte". Quando o usuário clica neste botão, 
a função identifica o peso total dos itens por meio de um número pseudo-aleatório gerado pela função "generatorRandomWeight()" e, em seguida, 
identifica a melhor modalidade de caminhão para este tipo de transporte */
btnRegisterEl.addEventListener('click', function () {
  let wheightNumber = generatorRandomWeight()

    totalWeightEl.innerHTML = `Peso total: <strong>${wheightNumber} kg</strong>`

    if(wheightNumber <= 1000) {
      containerTypeTruckEl.classList.remove('d-none')
      imageTruckEl.setAttribute('src', 'images/caminhao-pequeno.gif')
      nameTruckEl.innerHTML = `Para essa viagem, o <strong>caminhão pequeno</strong> é o mais adequado.`

      typeTruckEl.value = 'caminhão pequeno'
      typeTruck = 'caminhão pequeno'

    } else if (wheightNumber <= 4000) {
      containerTypeTruckEl.classList.remove('d-none')
      imageTruckEl.setAttribute('src', 'images/caminhao-medio.gif')
      nameTruckEl.innerHTML = `Para essa viagem, o <strong>caminhão médio</strong> é o mais adequado.`

      typeTruckEl.value = 'caminhão médio'
      typeTruck = 'caminhão médio'

    } else {
      containerTypeTruckEl.classList.remove('d-none')
      imageTruckEl.setAttribute('src', 'images/caminhao-grande.gif')
      nameTruckEl.innerHTML = `Para essa viagem, o <strong>caminhão grande</strong> é o mais adequado.`

      typeTruckEl.value = 'caminhão grande'
      typeTruck = 'caminhão grande'
    }

    btnFinalizationEl.classList.remove('d-none')
    lineBar.classList.remove('d-none')
})

/* A função 'calcularCusto' é responsável por calcular o custo do trecho com base na distância e na modalidade selecionada. 
Ela recebe esses valores como parâmetros e armazena o resultado na variável 'custoTotal'. 
Essa função será utilizada na função 'consultarTrecho' para exibir o custo total do transporte. */
function calcularCusto(distancia, modalidade) {
  let custoPorKm = costs[modalidade];
  let custoTotal = distancia * custoPorKm;
  return custoTotal.toFixed(2);
}

/*
A função 'consultarTrecho' é responsável por consultar trechos por modalidade, onde a cidade de origem, destino e a modalidade são passados como
parâmetros. A função realiza cinco verificações utilizando a estrutura condicional 'if'. O primeiro 'if' verifica se a propriedade 'cidadeOrigem'
existe no objeto 'distances'. Em seguida, dentro do objeto 'distances', verifica se a 'cidadeOrigem' possui a cidade de destino desejada. Neste caso não é
necessário fazer a verificação da modalidade, já que a mesma é identificada pelo programa e preenchida automaticamente. Caso essas 2 verificações sejam
verdadeiras, o custo total é calculado e exibido no elemento 'resEl', contendo informações sobre a cidade de origem, cidade destino, 
a modalidade selecionada e o custo total.
*/
function consultarTrecho(cidadeOrigem, cidadeDestino, modalidade) {
  if (distances.hasOwnProperty(cidadeOrigem) && distances[cidadeOrigem].hasOwnProperty(cidadeDestino)) {

    let distancia = Number(distances[cidadeOrigem][cidadeDestino]);
    let custoTotal = calcularCusto(distancia, modalidade);
    
    divResultEl.style = "display: block"
    divResultNegativeEl.style = "display: none"
    resEl.innerHTML = `De <strong>${cidadeOrigem}</strong> para <strong>${cidadeDestino}</strong>, utilizando um <strong>${modalidade}</strong>, a distância é de <strong>${distancia} km</strong> e o custo será de <strong>R$ ${custoTotal}</strong>.`
    
  } else if (distances.hasOwnProperty(cidadeOrigem) == false) {
    
    divResultEl.style = "display: none"
    divResultNegativeEl.style = "display: block"
    resNegativeEl.innerHTML = `A cidade <strong>"${originCityEl.value}"</strong> como "Cidade origem" não foi encontrada em nosso banco de dados.`
    
  } else if (distances[cidadeOrigem].hasOwnProperty(cidadeDestino) == false) {
    
    divResultEl.style = "display: none"
    divResultNegativeEl.style = "display: block"
    resNegativeEl.innerHTML = `A cidade <strong>"${destinyCityEl.value}"</strong> como "Cidade destino" não foi encontrada em nosso banco de dados.`
    
  } else {
    
    divResultEl.style = "display: none"
    divResultNegativeEl.style = "display: block"
    resNegativeEl.innerHTML = `Tivemos um erro em nosso servidor, tente mais tarde.`
  }
}
/* Esses outros 3 ifs são utilizados para tratar possíveis erros na execução da função. Caso a cidade de origem não exista no objeto distances, o
programa apresentará um erro ao usuário informando que a cidade de origem não existe. Da mesma forma, se a cidade destino informada não existir 
no objeto distances, também será apresentada uma mensagem de erro específica. O último if é um tratamento de erro mais genérico, 
que é acionado caso ocorra algum outro erro não previsto nos ifs anteriores. */

/* Aqui estou adicionando um ouvinte ao input originCityEl.
Dentro dessa função, criamos uma variável 'text' que armazena o valor do campo de entrada,
mas em minúsculas usando o método toLowerCase(). Em seguida, 
definimos o atributo 'data-value' do elemento originCityEl com o valor da variável 'text'. 
A propriedade 'data-value' é usada posteriormente para acessar o valor do campo de entrada. */
originCityEl.addEventListener('input', () => {
  let text = originCityEl.value.toLowerCase()
  originCityEl.dataset.value = text;
})

// O mesmo ocorre para a destinyCityEl (cidade destino)
destinyCityEl.addEventListener('input', () => {
  let text = destinyCityEl.value.toLowerCase()
  destinyCityEl.dataset.value = text;
})

// O mesmo ocorre para a typeTruckEl (modalidade)
typeTruckEl.addEventListener('input', () => {
  let text = typeTruckEl.value.toLowerCase()
  typeTruckEl.dataset.value = text;
})

/* Ao clicar no botão 'finalizar cadastro', a função recupera os valores preenchidos nos inputs e armazena nas variáveis correspondentes. 
Em seguida, as variáveis são passadas como argumentos para a função 'consultarTrecho', que calcula o custo do trecho com base na distância 
e na modalidade escolhida */
btnFinalizationEl.addEventListener('click', () => {
  let originCity = originCityEl.dataset.value
  let destinyCity = destinyCityEl.dataset.value

  divResultEl.classList.remove('d-none')
  divResultNegativeEl.classList.remove('d-none')

  consultarTrecho(originCity, destinyCity, typeTruck);
})