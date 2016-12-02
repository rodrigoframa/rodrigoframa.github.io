(function() {
  var questions = [{
    question: " 1 - Durante a resolução de um problema cotidiano, você prefere:",
    choices: [" Seguir uma lógica para resolução do problema",
              " Tentar resolver da forma mais prática e rápida possível",
              " Provar de forma matemática qual é a possível resolução"],
   }, {
    question: " 2 - O seu tipo predileto de trabalho é aquele que você precisa:",
    choices: [" Virar a noite programando para entregar o trabalho pronto no próximo dia",
              " Montar estrutura física e lógica do projeto, conectando seus componentes e verificando se forma de funcionamento está de acordo com a desejada",
              " Realizar vários cálculos com objetivo de verificar soluções para problemas específicos"],
   }, {
    question: " 3 - Qual seria o seu local de trabalho ideal no futuro?",
    choices: [" Em um escritório gerenciando projetos de softwares ",
              " Em uma indústria projetando e gerenciando a melhor forma de funcionamento das máquinas ",
              " Em uma grande empresa gerenciando qual a melhor forma de comunicação por meio de redes de telecomunicações"],
  }, {
    question: " 4 - Qual o seu nível de programação?",
    choices: [" Alto, sou capaz de programar em várias linguagens de programação",
              " Médio, programo mais ou menos e consigo me desenrolar bem",
              " Baixo, odeio programar mas realizo o trabalho quando necessário"],
  }, {
    question: " 5 - Em relação a eletrônicos em geral: ",
    choices: [" Você quer entender a sua forma de funcionamento e poder contrololar os componentes",
              " Você gosta de entender como é feita a comunicação interna de cada componente e sua forma de funcionamento",
              " Você não está nem aí para seu funcionamento"],
  }, {
         
    question: " 6 - Em relação a redes, qual a sua afinidade?",
    choices: [" Média, entendo a estrutura e resolver alguns problemas ",
              " Baixa, entendo a estrutura e forma de funcionamento, mas acho chato ",
              " Alta, entendo a estrutura e sou capaz de configurar os componentes necessários para melhor funcionamento da rede"],
  }];
  
  var questionCounter = 0; //Contador dasquestões
  var selections = []; //Vetor contendo opções
  var quiz = $('#quiz'); //Div da Quiz
  
  // Exibe questão
  displayNext();
  
  // Handler do botão next
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspende o click listener durante animação de passagem da pergunta
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // Se nenhuma opção for escolhida, mostrar:
    if (isNaN(selections[questionCounter])) {
      alert('Por favor, escolha uma resposta!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Handler do botão next
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Handler para botão Reiniciar Quiz
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animação quando botão é selecionado (hover)
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Cria e retornas as div's que contem as questões e'
  // as respostas selecionadas
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Questão ' + (index + 1) + '/6 :</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Cria lista de respostas escolhidas a partir dos botões Radios
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<ul>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Ler as respostas selecionadas e armazena valor em array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Exibe próximo elemento solicitado
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controla exibição do botão prev
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Calcula score e mostra resultado
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numTi = 0;
    var numAuto = 0;
    var numTele =0;
    for (var i = 0; i < selections.length/2; i++) {
      if (selections[i] === 0) {
        numTi= numTi+3;
      }
      else if (selections[i]===1){
          numAuto=numAuto+3;
      }
      else{
          numTele=numTele+3;
      }
      
    }

    for (var i = 3; i < selections.length; i++) {
      if (selections[i] === 0) {
        numTi= numTi+10;
      }
      else if (selections[i]===1){
          numAuto=numAuto+10;
      }
      else{
          numTele=numTele+10;
      }
      
    }

    //Calcula Percentuais:
    total = numTi+numAuto+numTele;
    percTi = (numTi/total)*100;
    percAuto = (numAuto/total)*100;
    percTele = (numTele/total)*100;

    //Verifica qual habilitação

    if (numTi>numAuto && numTi>numTele){
        score.append('Parece que você possui maior aptidão para TI!');
        
    }
    else if(numAuto>numTi && numAuto>numTele){
        score.append('Parece que você possui maior aptidão para Automação!');
    }
    else if(numTele>numTi && numTele>numAuto){
        score.append('Parece que você possui maior aptidão para Telecomunicações');
    }
    else if(numTi==numAuto && numTi!=numTele){
        score.append('Você parece em dúvida entre TI e Automação.');
    }
    else if(numTi==numTele && numTi!=numAuto){
        score.append('Você parece em dúvida entre TI e Telecomunicação.');
    }
    else if(numTele==numAuto && numTi!=numTele ){
        score.append('Você parece em dúvida entre Telecomunicações e TI')
    }
    else{
        score.append('Você parece em dúvida entre todas as Habilitações');
    }

    score.append('<br><br> Você possui os seguintes percentuais para cada habilitação: ' );
        score.append('<br> Software e Ti: ' + parseFloat(percTi.toFixed(2) )+ '%');
        score.append('<br> Automação e controle: ' + parseFloat(percAuto.toFixed(2)) + '%');
        score.append('<br> Telecomunicações: ' + parseFloat(percTele.toFixed(2))  + '%');


    return score;
  }
})();