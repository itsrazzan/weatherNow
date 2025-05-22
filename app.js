// ==============================
// 🌤️ WEATHER APP MAIN SCRIPT
// ==============================

class WeatherNow {
  constructor(apiKey) {
    this.API_KEY = apiKey;
    this.storageKey = "weatherHistory";

    // Initialize after DOM loads
    document.addEventListener("DOMContentLoaded", () => {
      this.initializeElements();
      this.setupEventListeners();
      this.loadSavedWeather();

      // Start UI updates
      this.updateGreeting();
      setInterval(() => this.updateGreeting(), 60000);

      this.updateClock();
      setInterval(() => this.updateClock(), 1000);

      this.updateDate();
      setInterval(() => this.updateDate(), 60000);
    });
  } // akhir constructor

  // ====== Initialize Elements =====//
  initializeElements() {
    // ambil DOM elements
    this.searchButton = document.querySelector("#search-button");
    this.searchInput = document.querySelector("#search-kota");
    this.weatherResult = document.getElementById("weather-result");
    this.greetingElement = document.querySelector("#greeting");
    this.clockElement = document.getElementById("clock");
    this.dateElement = document.getElementById("date");
    this.usernameElement = document.getElementById("username");
    this.editButton = document.getElementById("edit-name");
    this.greetingTextElement = document.getElementById("greeting-text");
  }

  // ====== Setup Event Listeners =====//
  setupEventListeners() {
    // Search button click
    this.searchButton.addEventListener("click", () => {
      const city = this.searchInput.value.trim();
      if (city) {
        this.getWeather(city);
        this.searchInput.value = ""; // hapus input on click
      }
    });

    // Enter key to search
    this.searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const city = this.searchInput.value.trim();
        if (city) {
          this.getWeather(city);
          // hapus input field on click
          this.searchInput.value = "";
        }
      }
    });

    // Add name editing functionality
    this.editButton.addEventListener("click", () => {
      this.usernameElement.contentEditable = "true";
      this.usernameElement.focus();
    });

    this.usernameElement.addEventListener("blur", () => {
      this.usernameElement.contentEditable = "false";
      const newName = this.usernameElement.textContent.trim();
      if (newName && newName.length > 0) {
        localStorage.setItem("username", newName);
      }
    });

    this.usernameElement.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        this.usernameElement.blur();
      }
    });
  }

  // ======Get Weather dari API =====//
  async getWeather(city) {
    const API_URL = `https://api.weatherapi.com/v1/current.json?key=${this.API_KEY}&q=${city}`;

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("City not found");

      // Remove any existing error message first
      const existingError = this.weatherResult.querySelector(".error-tag");
      if (existingError) {
        existingError.remove();
      }

      const data = await response.json();

      // Create weather data object
      const weatherData = {
        city: data.location.name,
        country: data.location.country,
        temp: data.current.temp_c,
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
        timestamp: new Date().toISOString(),
      };

      // call Save to localStorage
      this.saveToLocalStorage(weatherData);
      // call Display result at the top
      this.displayWeatherResult(weatherData, true);
    } catch (error) {
      console.error("Error:", error);

      // Create error message div
      const errorDiv = document.createElement("div");
      errorDiv.className = "error-tag";
      errorDiv.innerHTML = `
        <p>Could not find weather data for "${city}". Please check the city name.</p>
        <img src="assets/errorAnimation.gif" alt="Error" class="error-animation">
    `;

      // Insert error at the top
      this.weatherResult.insertBefore(errorDiv, this.weatherResult.firstChild);

      // Remove after 8 seconds
      setTimeout(() => {
        errorDiv.remove();
      }, 8000); //hilang dalam 8 detik
    }
  }

  // Save to localStorage
  saveToLocalStorage(weatherData) {
    const saved = JSON.parse(localStorage.getItem(this.storageKey)) || [];
    saved.unshift(weatherData); // Add new result to the beginning
    if (saved.length > 100) saved.pop(); // simpan maksimal 100 data
    localStorage.setItem(this.storageKey, JSON.stringify(saved));
  }

  // Display weather result
  displayWeatherResult(weatherData, isNew = false) {
    const resultDiv = document.createElement("div");
    resultDiv.className = `weather-result-item ${isNew ? "new-result" : ""}`;

    // Format date and time separately
    const dateTime = new Date(weatherData.timestamp);
    const date = dateTime.toLocaleDateString();
    const time = dateTime.toLocaleTimeString();

    resultDiv.innerHTML = `
    <h2>${weatherData.city}, ${weatherData.country}</h2>
    <p>${weatherData.temp}°C - ${weatherData.condition}</p>
    <div class="weather-info">
      <div class="weather-icon">
        <img src="https:${weatherData.icon}" alt="${weatherData.condition}" />
      </div>
      <div class="time-stamp">
        <div class="date">${date}</div>
        <div class="time">${time}</div>
      </div>
    </div>
  `;

    if (isNew) {
      this.weatherResult.insertBefore(resultDiv, this.weatherResult.firstChild);
    } else {
      this.weatherResult.appendChild(resultDiv);
    }
  }

  // fungsi panggil data dari localStorage
  loadSavedWeather() {
    const savedResults =
      JSON.parse(localStorage.getItem(this.storageKey)) || [];
    savedResults.forEach((result) => this.displayWeatherResult(result));
  }

  // ===== Addtional Features For UI =====//

  
  // Change welcome greeting based on time//
  updateGreeting() {
    const currentHour = new Date().getHours();
    const defaultName = "Razzan"; // Nama Default
    const username = localStorage.getItem("username") || defaultName;
    let greeting = "";

    if (currentHour < 12) {
      greeting = "Good Morning";
    } else if (currentHour < 18) {
      greeting = "Good Afternoon";
    } else {
      greeting = "Good Evening";
    }

    this.greetingTextElement.textContent = greeting;
    this.usernameElement.textContent = username;
  }

  // Realtime clock
  updateClock() {
    const now = new Date();
    // show time 2 Digits
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    // show format 12 hours
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // convert to 12-hour format
    this.clockElement.innerHTML = `${formattedHours}:${minutes}:${seconds} <span class="ampm">${ampm}</span>`;
  }

  // function update Date&Day
  updateDate() {
    const today = new Date();

    // get formatted
    const day = today.toLocaleDateString("en-US", { weekday: "long" });
    const month = today.toLocaleDateString("en-US", { month: "long" });
    const date = today.getDate();

    // change Date & Day
    this.dateElement.innerHTML = `${day}, ${month} ${date}`;
  }
}
// Initialize the application
const weatherApp = new WeatherNow("8972a33631c74c71b30144950252005");
