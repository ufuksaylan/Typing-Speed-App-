export const TextUtils = (() => {

  async function getRandomWords(wordNum) {
    console.log(wordNum);
    try {
      const response = await fetch(`https://random-word-api.vercel.app/api?words=${wordNum}`);
  
      if (!response.ok) {
        throw new Error(`Server Error: ${response.status} ${response.statusText}`);
      }
  
      const words = await response.json();
      
      return words.join(' ');
    } catch (error) {
      throw error;
    }
  }

  async function getRandomQuote() {
    try {
      const response = await fetch('https://api.quotable.io/quotes/random');

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const quote = data[0]['content'];
      return quote;

    } catch (error) {
      throw error;
    }
  }

  function addRandomPunctuations(text) {
    const punctuations = ['.', ',', '!', '?', ';', ':'];
    const words = text.split(' ');
    let result = '';
  
    for (let i = 0; i < words.length; i++) {
      result += words[i];
  
      // Add a random punctuation with a probability of 30% after each word (except the last one)
      if (i < words.length - 1 && Math.random() < 0.3) {
        const randomPunctuation = punctuations[Math.floor(Math.random() * punctuations.length)];
        result += randomPunctuation + ' ';
      } else {
        result += ' ';
      }
    }
  
    return result.trim(); // Trim to remove any leading/trailing whitespace
  }

  function addRandomNumbers(text) {
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const words = text.split(' ');
    let result = '';
  
    for (let i = 0; i < words.length; i++) {
      result += words[i];
  
      // Add a random number with a probability of 30% after each word (except the last one)
      if (i < words.length - 1 && Math.random() < 0.3) {
        const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
        result += randomNumber + ' ';
      } else {
        result += ' ';
      }
    }
  
    return result.trim(); // Trim to remove any leading/trailing whitespace
  }
  
  
  function getCharacterArray(arr) {
    return arr.split("");
  }

  return {
    getRandomQuote,
    getRandomWords,
    getCharacterArray, 
    addRandomPunctuations,
    addRandomNumbers
  }
})();


