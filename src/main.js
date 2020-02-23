'use strict';

// Here we have our array of words. When you play a game, you're guessing one of these words. These are randomly selected, as we'll see below.
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

// This is the hangman gallows. Where your missed guesses are visually displayed, as a hangman. In the console you will see this array. Which is constructed of 'pipes' and basic characters. You get 10 wrong guesses.
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


// Here we have our Objects, so we can use object-oriented programming. These properties are declared here, and are able to be used throughout the program. This streamlines coding and enables expansion of coding scope. You can add/modify things more easily.
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

// This function selects a random word from the word array up top.
function getRandomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

// Here we set 'Player1' to the object 'hangManGame'.
let Player1 = hangManGame;

// This is where that random function comes into play. We're setting the word property to the range of the word array up top.
Player1.word = words[getRandomInt(0,words.length-1)];
let wordLength = Player1.word.length;

// This will give us blank spaces to fill in with correct letters. Using a for loop we can add a space for each letter of the word that is randomly chosen.
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

// This function will check your guess(letter) against the word that's selected for you to guess. If you guess correctly, we console.log a 'Good Guess! You're on FIRE!'. Also, if you guess wrong 10 times, your game is over!
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

// Here we print the gallows on the DOM (HTML) visually. Whenever you guess wrong, the images in the 'img' folder will be presented. Each wrong guess gives you more man on your hangman. 10 guesses till you're hung.
function printGallows() {
  console.log(gallowsStr[Player1.wrongs]);  
  if (Player1.wrongs>0){
  let imageStr = `<img src="img/${Player1.wrongs}.png" />`;
  $("#gallows").html(imageStr);
  }
  console.log(Player1.wrongs);

}

// Here we attach the 'blanks' to the DOM (HTML). And we have the 'inputBox' also being attached to the DOM. You can see jQuery in action here, with the '$()'. That is basically 'document.getElementById("")'. Then if you won, a message is displayed on the page, stating that you won!
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
