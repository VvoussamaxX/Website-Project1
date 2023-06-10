const availabilities = {
  Oussama: ["Monday Tuesday Wednesday Thursday Friday Saturday Sunday (9am to 21pm)"],
  Ilias: ["Monday Tuesday Wednesday Thursday Friday Sunday (9am to 21pm)"],
  Rayane: ["Monday Tuesday Wednesday Thursday Friday (9am to 16pm)"],
  Ashley: ["Monday Tuesday Wednesday Thursday Friday Sunday (9am to 23pm)"],
  Dan: ["Monday Tuesday Wednesday Thursday Friday Saturday Sunday (9am to 21pm)"],
  Laura: ["Tuesday Sunday (9am to 14pm)"],
};

// Function to populate options
function populateOptions(selectElement, options) {
  selectElement.innerHTML = "";
  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.text = option;
    selectElement.appendChild(optionElement);
  });
}

// Function to populate day options based on selected coach
function populateDayOptions() {
  const coachSelect = document.getElementById("coach");
  const daySelect = document.getElementById("day");
  const selectedCoach = coachSelect.value;
  const coachAvailability = availabilities[selectedCoach][0]; // Assuming only one availability string per coach

  // Extract days from availability string
  const days = coachAvailability.match(/(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/g);

  // Populate day options
  populateOptions(daySelect, days);

  // Populate time options when day is selected
  populateTimeOptions();
}

// Function to populate time options based on selected coach and day
function populateTimeOptions() {
  const coachSelect = document.getElementById("coach");
  const daySelect = document.getElementById("day");
  const timeSelect = document.getElementById("time");
  const selectedCoach = coachSelect.value;
  const selectedDay = daySelect.value;
  const coachAvailability = availabilities[selectedCoach][0]; // Assuming only one availability string per coach

  // Extract time range from availability string
  const timeRange = coachAvailability.match(/(\d+am|\d+pm)/g);

  // Generate time slots within the range
  const startTime = convertTo24Hour(timeRange[0]);
  const endTime = convertTo24Hour(timeRange[1]);
  const timeSlots = generateTimeSlots(startTime, endTime);

  // Populate time options
  populateOptions(timeSelect, timeSlots);
}

// Helper function to convert time to 24-hour format
function convertTo24Hour(time) {
  const [hour, period] = time.split(/am|pm/);
  const hour24 = period.toLowerCase() === "pm" ? parseInt(hour, 10) + 12 : parseInt(hour, 10);
  return hour24.toString().padStart(2, "0") + ":00";
}

// Helper function to generate time slots
function generateTimeSlots(startTime, endTime) {
  const timeSlots = [];
  let currentTime = startTime;

  while (currentTime <= endTime) {
    timeSlots.push(currentTime);
    currentTime = incrementTimeByOneHour(currentTime);
  }

  return timeSlots;
}

// Helper function to increment time by one hour
function incrementTimeByOneHour(time) {
  const [hour, minutes] = time.split(":");
  let newHour = parseInt(hour, 10) + 1;
  let newTime = newHour.toString().padStart(2, "0") + ":" + minutes;

  if (newHour === 24) {
    newHour = "00";
    newTime = newHour + ":" + minutes;
  }

  return newTime;
}

// Attach event listeners to coach and day selection
const coachSelect = document.getElementById("coach");
const daySelect = document.getElementById("day");
coachSelect.addEventListener("change", populateDayOptions);
daySelect.addEventListener("change", populateTimeOptions);

// Populate day and time options on page load
populateDayOptions();
