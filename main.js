'use strict';

let words = ["abruptly","absurd","abyss","affix","askew","avenue","awkward","axiom","azure","bagpipes",
"bandwagon","banjo","bayou","beekeeper","bikini","blitz","blizzard","boggle","bookworm","boxcar",
"boxful","buckaroo","buffalo","buffoon","buxom","buzzard","buzzing","buzzwords","caliph","cobweb",
"cockiness","croquet","crypt","cycle","daiquiri","dirndl","disavow","dizzying","duplex","dwarves",
"embezzle","equip","espionage","exodus","faking","fishhook","fixable","fjord","flapjack","flopping",
"fluffiness","flyby","foxglove","frazzled","frizzled","fuchsia","funny","gabby","galaxy","galvanize",
"gazebo","gizmo","glowworm","glyph","gnarly","gnostic","gossip","grogginess","haiku","haphazard","hyphen",
"iatrogenic","icebox","injury","ivory","ivy","jackpot","jaundice","jawbreaker","jaywalk","jazziest","jazzy",
"jelly","jigsaw","jinx","jiujitsu","jockey","jogging","joking","jovial","joyful","juicy","jukebox","jumbo",
"kayak","kazoo","keyhole","khaki","kilobyte","kiosk","kitsch","kiwifruit","klutz","knapsack","larynx","lengths",
"lucky","luxury","lymph","marquis","matrix","megahertz","microwave","mnemonic","mystify","naphtha","nightclub",
"nowadays","numbskull","nymph","onyx","ovary","oxidize","oxygen","pajama","peekaboo","phlegm","pixel","pizazz",
"pneumonia","polka","pshaw","psyche","puppy","puzzling","quartz","queue","quips","quixotic","quiz","quizzes",
"quorum","razzmatazz","rhubarb","rhythm","rickshaw","schnapps","scratch","shiv","snazzy","sphinx","spritz",
"squawk","staff","strength","strengths","stretch","stronghold","stymied","subway","swivel","syndrome",
"thriftless","thumbscrew","topaz","transcript","transgress","transplant","triphthong","twelfth","twelfths",
"unknown","unworthy","unzip","uptown","vaporize","vixen","vodka","voodoo","vortex","voyeurism","walkway",
"waltz","wave","wavy","waxy","wellspring","wheezy","whiskey","whizzing","whomever","wimpy","witchcraft",
"wizard","woozy","wristwatch","wyvern","xylophone","yachtsman","yippee","yoked","youthful","yummy","zephyr",
"zigzag","zigzagging","zilch","zipper","zodiac","zombie"];

const gallowsStr = [``,
`                   _____`,
`                        |
                         |
                         |
                         |
                    _____|`,
`                   ------
                         |
                         |
                         |
                         |
                    _____|`,
`                   ------
                     |   |
                         |
                         |
                         |
                    _____|`,
`
                    ------
                     |   |
                     O   |
                         |
                         |
                    _____|`,
`
                    ------
                     |   |
                     O   |
                    /    |
                         |
                    _____|`,
`
                    ------
                     |   |
                     O   |
                    /|   |
                         |
                    _____|`, 
`
                    ------
                     |   |
                     O   |
                    /|\\  |
                         |
                    _____|`,
`
                    ------
                     |   |
                     O   |
                    /|\\  |
                    /    |
                    _____|`,
`
                    ------
                     |   |
                     O   |
                    /|\\  |
                    / \\  |
                    _____|`];

let hangManGame = {
  word : "",
  correctLetters: [],
  wrongLetters: [],
  guesses : 0,
  wrongs : 0,
  wins : 0,
  losses : 0,
  gameOver: false,

}

function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

let Player1 = hangManGame;

Player1.word = words[getRandomInt(0,words.length-1)];
let wordLength = Player1.word.length;

let blanks = "";
  for (let i = 0;i<wordLength;i++){
    blanks += "_ ";
  }


function playerTurn(blanks) {
  console.log("Hint: " + blanks + " Wrong guesses: " + Player1.wrongLetters);

  let currentGuess = prompt("enter your guess");
//   rl.question('Enter your guess ', currentGuess => {
//       rl.pause();
//       console.log(currentGuess);
//     rl.close();
//   });
  
  return currentGuess;
}

function checkCorrect(currentGuess){
   if (currentGuess === Player1.word) {
    console.log("You win, daddy!");
    Player1.wins++;
    Player1.word="";
    Player1.gameOver=true;
  }
}

function checkGuess(currentGuess) {
  Player1.guesses++;
      if (Player1.word.includes(currentGuess)) {
      Player1.correctLetters.push(currentGuess);
      console.log("Good Guess! You're on FIRE!");
    } else {
      Player1.wrongLetters.push(currentGuess);Player1.wrongs ++;
      if (Player1.wrongs===10){
        Player1.gameOver=true;
        console.log("You lose, sucka");
        $("#usedLetters").html("You lose, sucka");
        printGallows();
        console.log("The word was: "+ Player1.word);
        $("#actualWord").html("The word was " + Player1.word);
      } else console.log("Guess again, n00b");
           
    }
}

function generateHint() {
   blanks = "";
  for (let i = 0;i<wordLength;i++){
    if (Player1.correctLetters.includes(Player1.word.charAt(i))) {
      blanks += Player1.word.charAt(i) + " ";
    } else blanks += "_ ";
  } 
  
  return(blanks);
}

function gameWon(blanks){
  let strippedUnderscores = blanks.split("_");
  let strippedSpaces = strippedUnderscores.join("").split(" ");
  let userWord = strippedSpaces.join("");
  if (userWord==Player1.word) {
    return true;
  } else return false;
}

function printGallows() {
  console.log(gallowsStr[Player1.wrongs]);  
  if (Player1.wrongs>0){
  let imageStr = `<img src="img/${Player1.wrongs}.png" />`;
  $("#gallows").html(imageStr);
  }
  console.log(Player1.wrongs);

}

 generateHint();
 $("#blanks").html(blanks);
// this handles user input in the command line box
// at the bottom of the screen
$('#inputBox').on('keyup', function(e) {
  if (e.keyCode === 13) {
    if (!Player1.gameOver){
      let guess = this.value;
      this.value ="";
      let usedLetters = $("#usedLetters").html() + " " + guess;
      $("#usedLetters").html(usedLetters);
      checkCorrect(guess);
      if(!Player1.gameOver){
        checkGuess(guess);
      }
      generateHint();
      $("#blanks").html(blanks);
      printGallows();
    
      if (gameWon(blanks)){
        Player1.gameOver=true;
        console.log("You win, you big winner, you!");
        $("#usedLetters").html('<span color="blue">You win, you big winner, you!</span>');
      }
      
    } 
  }

});
