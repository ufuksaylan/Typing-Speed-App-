import { graphController } from "./graph.js";

export const ScreenController = (() => {
  
  let letters; 
  let charIndex = 0;
  let mistakes = 0;
  let timePassed = 0;
  let words;
  let mode = "timeMod"

  const timerField = document.querySelector(".stats .time h3")
  const content = document.querySelector(".content p");
  const input = document.querySelector("#input-field");
  const wpmField = document.querySelector(".stats .words-min h3");
  const cpmField = document.querySelector(".stats .chars-min h3");
  const accuracy = document.querySelector(".stats .accuracy h3")
  const tryAgain = document.querySelector(".try-again");
  
  let timer; 
  let maxTime = parseInt(timerField.innerText); 
  let timeLeft = maxTime; 
  let isTyping = 0; 
  let controller = false;

  function getLetters() {
    return letters;
  }
  function setLetters(letterArr) {
    letters = letterArr;
  }
  function setMode(change) {
    mode = change; 
  }

  function setWords(letterArr) {
    words = letterArr;
    letters = words.split("")
  }

  function getWords() {
    return words;
  }

  function setMaxTime(time) {
    timeLeft = maxTime = time;
    timerField.innerText = maxTime;
  }

  function setController(value) {
    controller = value;
  }

  function calculateWPM() {
    // Get the total number of correct characters typed (excluding mistakes)
    const correctChars = charIndex - mistakes;

    // Assuming an average word length of 5 characters
    const avgWordLength = 5;

    // Calculate the total number of correct words typed
    const correctWords = Math.floor(correctChars / avgWordLength);

    // Calculate WPM by dividing the number of correct words by the time taken in minutes
    const wpm = Math.floor(correctWords / (maxTime - timeLeft) * 60);

    return wpm;
  }

  function initTimer() {
    if (timeLeft > 0){
      timeLeft--; 
      timerField.innerText = timeLeft;
    } else {
      clearInterval(timer)
    }
  }

  function printParagraph() {

    content.innerHTML = "";

    letters.forEach(span => {
      let spanTag = `<span>${span}</span>`;
      content.innerHTML += spanTag;
    });

    content.querySelectorAll("span")[0].classList.add("active");
  }
 

  function updateCharacterStatus(chars, typedChar) {
    if (typedChar == null) {
      charIndex--; 

      if ( chars[charIndex].classList.contains("incorrect")){
        mistakes--; 
      }
      
      chars[charIndex].classList.remove("correct", "incorrect");
    } else {
      if (chars[charIndex].innerText === typedChar) {
        chars[charIndex].classList.add("correct");
      } else {
        mistakes++;
        chars[charIndex].classList.add("incorrect");
      }
      charIndex++;
    }

    chars.forEach(span => span.classList.remove("active"));
    chars[charIndex].classList.add("active");

  }

  function timeMod() {

    const chars = content.querySelectorAll("span");
    let typedChar= input.value.split("")[charIndex];

    if (charIndex === chars.length - 1) {
      input.value = "";
      clearInterval(timer)
      graphController.storeData(accuracy.innerText, wpmField.innerText, cpmField.innerText);
      controller = true;
      return;
    }

    if (!isTyping){
      timer = setInterval(() => {
        timePassed++;
        timerField.innerText = timePassed;
      }, 1000)
      isTyping = true;
    }

    updateCharacterStatus(chars, typedChar);

    cpmField.innerText = charIndex - mistakes;


    const wordsTyped = (charIndex - mistakes) / 5; // Assuming an average of 5 characters per word
    const minutesPassed = timePassed / 60; // Converting timePassed from seconds to minutes
    const wpm = Math.floor(wordsTyped / minutesPassed);

    wpmField.innerText = wpm
    accuracy.innerText = Math.floor(((charIndex - mistakes) / charIndex ) * 100);
  }


  function inputTyping() {
    if (controller) {
      return;
    }

    const chars = content.querySelectorAll("span");
    let typedChar= input.value.split("")[charIndex];

    if (mode === "wordMode") {
      console.log("ahey ahey ahey");
      timeMod();
      return; 
    }

    if (charIndex === chars.length  || timeLeft === 0) {
      input.value = "";
      clearInterval(timer)
      graphController.storeData(accuracy.innerText, wpmField.innerText, cpmField.innerText);
      controller = true;
      return;
    }

    if (!isTyping){
      timer = setInterval(initTimer, 1000)
      isTyping = true;
    }

    updateCharacterStatus(chars, typedChar);

    cpmField.innerText = charIndex - mistakes;
    wpmField.innerText = calculateWPM();
    accuracy.innerText = Math.floor(((charIndex - mistakes) / charIndex ) * 100);
  }

  function resetGame(printParagraphForReset= () => {}) {
    controller = false; 
    input.value = "";

    if (mode === "wordMode") {
      timePassed = 0;
      timerField.innerText = 0; 
      charIndex = mistakes = isTyping = 0;

      printParagraphForReset(); 
    }
    else {
      maxTime = parseInt(document.querySelector(".time-settings .selected").dataset.time)
      timerField.innerText = maxTime;

      timeLeft = maxTime, 
      charIndex = mistakes = isTyping = 0;
      timerField.innerText = timeLeft;
      mistakes = 0;
      printParagraphForReset();

      
    }
    cpmField.innerText = 0;
    wpmField.innerText = 0; 
    accuracy.innerText = 0; 
  }

  document.addEventListener("keydown", () => input.focus())

  input.addEventListener("input", inputTyping);

  tryAgain.addEventListener("click", () => {
    resetGame(() => {
      printParagraph();
    })
  });

  window.onload = function() {
    document.getElementById('input-field').value = '';
  }

  return {
    printParagraph,
    setLetters, 
    setMaxTime, 
    getLetters,
    getWords, 
    setWords,
    setMode,
    resetGame
  }

})();