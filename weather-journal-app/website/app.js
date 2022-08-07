// Personal API Key for OpenWeatherMap API
const apiKey = "654b2d064a32fb15896dde41d2dd584f&units=imperial";

/* Global Variables */
const zip = document.querySelector("#zip");
const FeelElement = document.querySelector("#feelings");
const generateButton = document.querySelector("#generate");
let date = document.querySelector("#date");
let temp = document.querySelector("#temp");
let content = document.querySelector("#content");

let countryName = document.createElement("h1");
countryName.className = "Country";

const apiurl = `https://api.openweathermap.org/data/2.5/weather?zip=`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();

// Event listener to add function to existing HTML DOM element
generateButton.addEventListener("click", () => {
  // add conditions to prevent invaild data
  if (zip.value === "" || isNaN(parseInt(zip.value))) {
    alert("please enter zip code as number");
  } else if (FeelElement.value === "" || isNaN(FeelElement.value) === false) {
    alert("please enter your feeling");
  } else {
    getWeatherData(apiurl).then((data) => {
      const requiredData = {
        date: newDate,
        temp: data.main.temp,
        feel: FeelElement.value,
        name: data.name,
      };

      // POST DATA
      postData("http://localhost:3030/postData", requiredData);

      // retrieveData function
      retrieveData();
    });
  }
});

/* Function to GET Web API Data*/
const getWeatherData = async (apiURL) => {
  const res = await fetch(`${apiURL}${zip.value}&appid=${apiKey}`);
  const allData = await res.json();
  try {
    if (allData.cod != 200) {
      alert(allData.message);
    } else {
      console.log(` all data form  wearther API `);
      console.log(allData);
      return allData;
    }
    
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });

  try {
    const newData = await res.json();
    console.log(`the Required data are :`);
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to GET Project Data */
const retrieveData = async () => {
  const request = await fetch("http://localhost:3030/all");
  try {
    // Transform into JSON
    const allData = await request.json();

    // Write updated data to DOM elements
    countryName.innerText = allData.name;
    document.querySelector("#entryHolder").prepend(countryName);
    date.innerHTML =  ` Date: <i> ${allData.date} </i>`;
    temp.innerHTML = `Temp: <i>${Math.round(allData.temp)} °F </i>`;
    content.innerHTML = `
    Your Feeling:
    <i>${allData.feel}</i>
    `;
  
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
