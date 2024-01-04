import { TextUtils } from "./textUtils.js";
import { ScreenController } from "./screenController.js";

async function activateQuotes() {
  const timeSettings = document.querySelector(".time-settings");
  timeSettings.classList.add("hide");

  const wordsSettings = document.querySelector(".words-settings");
  wordsSettings.classList.add("hide")

  document.querySelector("#time").classList.remove("selected");
  document.querySelector("#words").classList.remove("selected");
  document.querySelector("#quotes").classList.add("selected");

  document.querySelector(".words-specifier").classList.add("hide");
  
  let wordArr = await TextUtils.getRandomQuote(); 

  ScreenController.resetGame();

  ScreenController.setWords(wordArr);
  ScreenController.setLetters(TextUtils.getCharacterArray(wordArr))
  ScreenController.setMode("wordMode");
  ScreenController.printParagraph();

}

function activateTimeMode() {
  document.querySelector(".words-specifier").classList.remove("hide");


  const timeSettings = document.querySelector(".time-settings");
  timeSettings.classList.remove("hide");

  document.querySelector(".words-settings").classList.add("hide");

  document.querySelector("#words").classList.remove("selected");
  document.querySelector("#quotes").classList.remove("selected");
  document.querySelector("#time").classList.add("selected");
  
  ScreenController.setMode("timeMode");

  ScreenController.resetGame();

  setTime();
}

function activateWordsMod() {
  document.querySelector(".words-specifier").classList.remove("hide");

  
  const wordsSettings = document.querySelector(".words-settings");
  wordsSettings.classList.remove("hide")

  document.querySelector(".time-settings").classList.add("hide");

  document.querySelector("#words").classList.add("selected");
  document.querySelector("#quotes").classList.remove("selected");
  document.querySelector("#time").classList.remove("selected");

  ScreenController.setMode("wordMode");

  ScreenController.resetGame();

  setWord();
}

function addEventListenerToSpecifiers(text, specifierFunction) {
  const specifierSpans = document.querySelectorAll(`${text}`);

  // Add click event listener to each span
  specifierSpans.forEach((span) => {
    span.addEventListener("click", function () {
      // Remove the "selected" class from all specifier spans
      specifierSpans.forEach((s) => s.classList.remove("selected"));

      // Add the "selected" class to the clicked span
      this.classList.add("selected");

      specifierFunction();
    });
  });
}

function setTime() {
  const selectedTime = document.querySelector(".time-settings .selected").dataset.time;
  ScreenController.setMaxTime(selectedTime);

  switch (parseInt(selectedTime)) {
    case 15:
      setTimeAndGetNewWords(50);
      break;
    case 30: 
      setTimeAndGetNewWords(100);
      break;
    case 60: 
      setTimeAndGetNewWords(200);
      break;
    default:
      setTimeAndGetNewWords(300);
      break;
  }
}

async function setWord() {
  const selectedWords = document.querySelector(".words-settings .selected").dataset.word;
  setTimeAndGetNewWords(parseInt(selectedWords));

}
async function setTimeAndGetNewWords(word) {
  let words = await TextUtils.getRandomWords(`${word}`)
  const letters = TextUtils.getCharacterArray(words);
  ScreenController.setLetters(letters);
  ScreenController.setWords(words);
  ScreenController.printParagraph();
}

async function addPunctuationOrNumber() {
  if (this.classList.contains("selected")) {
    this.classList.remove("selected");

    if (document.querySelector("#time").classList.contains("selected")) {
      setTime();
    }
    else {
      setWord();
    }
  }
  else {
    if (this.id === "punctuation") {
      this.classList.add("selected");
  
      ScreenController.setWords(TextUtils.addRandomPunctuations(ScreenController.getWords()));
      ScreenController.printParagraph();
    }
    else {
      this.classList.add("selected");
  
      ScreenController.setWords(TextUtils.addRandomNumbers(ScreenController.getWords()));
      ScreenController.printParagraph();
    }
  }
}


async function main() {

  const inputField = document.querySelector("#input-field");
  const timeMod = document.querySelector("#time");
  const wordsMod = document.querySelector("#words");
  const quotesMod = document.querySelector("#quotes");

  quotesMod.addEventListener("click", activateQuotes);
  wordsMod.addEventListener("click", activateWordsMod);
  timeMod.addEventListener("click", activateTimeMode);

  inputField.addEventListener("keydown", function(event) {
    console.log(event.key)
    if (event.key === "Enter") {
      ScreenController.resetGame(ScreenController.printParagraph());
    } 
    
    if (event.key === "Escape") {
      const modes = document.querySelector(".modes .selected"); 

      if (modes.id === "words") {
        activateWordsMod();
      } else if (modes.id === "time") {
        activateTimeMode();
      } else {
        activateQuotes();
      }
    }
  });


  addEventListenerToSpecifiers(".time-settings .specifier", setTime);
  addEventListenerToSpecifiers(".words-settings .specifier", setWord)

  const punctuation = document.querySelector("#punctuation");
  punctuation.addEventListener("click", addPunctuationOrNumber);

  const numbers = document.querySelector("#numbers");
  numbers.addEventListener("click", addPunctuationOrNumber);

  let words = await TextUtils.getRandomWords(100);
  let letterArr = TextUtils.getCharacterArray(words);

  ScreenController.setLetters(letterArr);
  ScreenController.printParagraph(letterArr);
  console.log(words)

}

main()