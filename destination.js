document.addEventListener("DOMContentLoaded", function() {
  let destination = JSON.parse(localStorage.getItem("destination")) || [];
  let conty = document.getElementById("conty");

  if (destination.length > 0) {
    displayDestination(destination[0]);

    let from = document.getElementById("city");
    let startDate = document.getElementById("startDate");
    let endDate = document.getElementById("endDate");
    let NoOfPerson = document.getElementById("NoOfperson");

    NoOfPerson.addEventListener("input", function() {
      let numOfPersons = Number(NoOfPerson.value);
      if (numOfPersons > 0 && numOfPersons <= 6) {
        updateAmountDisplay(destination[0], numOfPersons);
      } else {
        let amountDisplay = document.getElementById("amountDisplay");
        amountDisplay.innerText = '';
      }
    });

    let bookBtn = document.getElementById("bookBtn");
    bookBtn.addEventListener("click", function() {
      let startDateValue = document.getElementById("startDate").value;
      let endDateValue = document.getElementById("endDate").value;
      let numOfPersons = Number(NoOfPerson.value);

      // Validate input fields
      if (!startDateValue || !endDateValue || !numOfPersons) {
        alert("Please fill in all fields: Start Date, End Date, Number of Persons");
        return;
      }

      // Validate number of persons
      if (numOfPersons <= 0 || numOfPersons > 6 || isNaN(numOfPersons)) {
        alert("Number of persons must be between 1 and 6.");
        return;
      }

      // Validate dates
      let startDate = new Date(startDateValue);
      let endDate = new Date(endDateValue);
      let today = new Date();

      if (startDate < today) {
        alert("Start Date must be today or later.");
        return;
      }

      if (startDate >= endDate) {
        alert("Start Date must be before End Date.");
        return;
      }

      // Check for overlapping bookings and availability
      let totalPersonsForDates = getTotalPersonsForDates(destination[0].id, startDate, endDate);
      if (totalPersonsForDates + numOfPersons > 50) {
        alert("Only " + (50 - totalPersonsForDates) + " seats are available for the selected dates. Please choose different dates or reduce the number of persons.");
        return;
      }

      // Record the booking
      recordBooking(destination[0].id, startDateValue, endDateValue, numOfPersons);

      // Proceed with booking logic
      let totalAmount = destination[0].price * numOfPersons;
      alert(`Your booking is completed. Thank you for choosing Tourist Hub.\nBooking Details:\nDestination: ${destination[0].name}\nStart Date: ${startDateValue}\nEnd Date: ${endDateValue}\nNumber of Persons: ${numOfPersons}\nTotal Amount: ₹ ${totalAmount}/-`);
    });
  } else {
    console.error("No destination data available");
  }

  // Function to display destination information
  function displayDestination(destination) {
    let imgdiv = document.createElement("div");

    let backImage = document.createElement("img");
    backImage.setAttribute("src", destination.image);

    let place = document.createElement("h3");
    place.innerText = destination.name;

    let position = document.createElement("h6");
    position.textContent = destination.location;

    let amountDisplay = document.createElement("p");
    amountDisplay.setAttribute("id", "amountDisplay");

    imgdiv.append(backImage, place, position, amountDisplay);
    conty.innerHTML = ''; // Clear previous content
    conty.append(imgdiv);

    updateAmountDisplay(destination, 1); // Initialize amount display for 1 person
  }

  // Function to update amount display based on number of persons
  function updateAmountDisplay(destination, numOfPersons) {
    let amountDisplay = document.getElementById("amountDisplay");
    let totalAmount = destination.price * numOfPersons;
    amountDisplay.innerText = `Total Price: ₹ ${totalAmount}/- for ${numOfPersons} Persons`;
  }

  // Function to check total persons booked for the given dates
  function getTotalPersonsForDates(destinationId, newStartDate, newEndDate) {
    let bookings = getBookingsFromLocalStorage();
    let totalPersons = 0;

    for (let booking of bookings) {
      if (booking.destinationId === destinationId) {
        let start = new Date(booking.start);
        let end = new Date(booking.end);

        if (newStartDate < end && newEndDate > start) {
          totalPersons += booking.persons;
        }
      }
    }

    return totalPersons;
  }

  // Function to retrieve bookings from localStorage
  function getBookingsFromLocalStorage() {
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    return bookings;
  }

  // Function to record a new booking in localStorage
  function recordBooking(destinationId, startDate, endDate, numOfPersons) {
    let bookings = getBookingsFromLocalStorage();
    bookings.push({ destinationId: destinationId, start: startDate, end: endDate, persons: numOfPersons });
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }
});
