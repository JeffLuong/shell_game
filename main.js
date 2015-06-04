$(document).ready(function(){
  game.initiate();
  $('#start').on('click', function (){
    game.start();
  });
  $('#reset').on('click', function (){
    game.reset();
  });
});

var board = {
  display: function (string) {
    $('#display').text(string);
    $('#wins').text(game.wins);
  },
};

var game = {
  gameSpeed: 500,
  wins: 0,
  initiate: function () {
    cards.genCards();
    $('#wins').text(game.wins);
  },

  start: function () {
    $("#ball").fadeOut(500);
    $("#display").fadeOut(500);
    var times = 0;
    var timerId = setInterval(function(){
      cards.shuffle();
      times++;
      if (times === cards.numsOfShuffle){
        clearInterval(timerId);
      }
    }, this.gameSpeed);
  },

  reset: function () {
    $('#board > div:nth-child(1)').removeClass().attr('class', "left");
    $('#board > div:nth-child(2)').removeClass().attr('class', "middle");
    $('#board > div:nth-child(3)').removeClass().attr('class', "right");
    this.wins = 0;
    $('#wins').text(this.wins);
    $('#display').fadeOut(500);
    this.gameSpeed = 500;
    cards.numsOfShuffle = 4;
  },

  winLose: function (that) {
    var $divClicked = $(that);
    if ($divClicked.children().length){
      $("#display").fadeIn(500);
      this.wins += 1;
      board.display("You win!");
      cards.numsOfShuffle += 1;
      this.gameSpeed -= 50;
    } else {
      $("#display").fadeIn(500);
      board.display("You lose! Ahhh Haaa!")
    }
    $("#ball").fadeIn(500);
  },
};

var cards = {
  numOfCards: 3,
  arrCards: [],
  numsOfShuffle: 4,
  shuffle: function () {
    var randNum = Math.floor(Math.random()*this.arrCards.length);
    var randNum2 = Math.floor(Math.random()*this.arrCards.length);
    while (randNum == randNum2) {
      randNum2 = Math.floor(Math.random()*this.arrCards.length);
    }
    var store = this.arrCards[randNum].currentClass;
    this.arrCards[randNum].swapClass(this.arrCards[randNum2].currentClass);
    this.arrCards[randNum2].swapClass(store);
  },

  genCards: function () {
    var classArray = ["left", "middle", "right"];
    for (var i = 0; i < this.numOfCards; i++) {
      $cardDiv = $('<div class="' + classArray[i] + '">');
      $('#board').append($cardDiv);
      this.arrCards.push(
        {
          $el: $cardDiv,
          currentClass: classArray[i],
          swapClass: function (newClass) {
            var currentClass = this.currentClass;
            this.$el.removeClass(currentClass);
            this.$el.attr('class', newClass);
            this.currentClass = newClass;
          },
        }
      );
      $cardDiv.on('click', function(){
        game.winLose(this);
      });
    };
    $ballHolder = $('#board div:nth-child(2)');
    this.arrCards[1].ball = true;
    $ballDiv = $('<div id="ball">');
    $ballIris = $('<span class="iris">');
    $ballHolder.append($ballDiv);
    $ballDiv.append($ballIris);
  },
};
