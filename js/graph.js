export const graphController = (() => {
  function readDataFromLocalStorage() {
    const storedDataString = localStorage.getItem('typingData');

    if (storedDataString) {
      return JSON.parse(storedDataString);
    }

    return [];
  }

  // Function to store data in local storage
  function storeData(accuracy, wpm, cpm) {
    const currentDate = new Date().toISOString();

    // Create an object to hold the new data point
    const newData = {
      accuracy: accuracy,
      wpm: wpm,
      cpm: cpm,
      date: currentDate
    };

    let existingData = readDataFromLocalStorage();

    existingData.push(newData);

    localStorage.setItem('typingData', JSON.stringify(existingData));
  }

  function generateTableRows(tableBody) {    
    // Clear existing rows
    tableBody.innerHTML = "";

    let data = readDataFromLocalStorage();
    // Loop through the data array and create rows
    data.forEach((item) => {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${item.accuracy}%</td>
        <td>${item.wpm}</td>
        <td>${item.cpm}</td>
        <td>${new Date(item.date).toLocaleString()}</td>
      `;
      tableBody.appendChild(newRow);
    });
  }

  function generateTable() {
    const data = readDataFromLocalStorage();
    generateTableRows(data);
  }

  function getLastDataEntry() {
    let data = readDataFromLocalStorage();

    if (data.length > 0) {
      return data[data.length - 1];
    }

    return null; // Return null if no data entries are found
  }

  return {
    storeData,
    generateTableRows, 
    generateTable,
    getLastDataEntry
  };
})();
