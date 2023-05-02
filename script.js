const form = document.querySelector("form");
const button = document.querySelector("button");

const dayLabel = document.querySelector("#day-label");
const monthLabel = document.querySelector("#month-label");
const yearLabel = document.querySelector("#year-label");

const dayInput = document.querySelector("#input-day");
const monthInput = document.querySelector("#input-month");
const yearInput = document.querySelector("#input-year");

const resultYears = document.querySelector("#result-year");
const resultMonths = document.querySelector("#result-month");
const resultDays = document.querySelector("#result-day");

const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const preventEnteringNegativeIntegersZeroAndLetters = (day, month, year) => {
  let previousDayValue = day.value;
  let previousMonthValue = month.value;
  let previousYearValue = year.value;

  day.addEventListener("input", (e) => {
    if (
      e.target.value &&
      (parseInt(e.target.value) < 1 || isNaN(parseInt(e.target.value)))
    ) {
      e.target.value = previousDayValue;
    } else {
      previousDayValue = e.target.value;
    }
  });

  month.addEventListener("input", (e) => {
    if (
      e.target.value &&
      (parseInt(e.target.value) < 1 || isNaN(parseInt(e.target.value)))
    ) {
      e.target.value = previousMonthValue;
    } else {
      previousMonthValue = e.target.value;
    }
  });

  year.addEventListener("input", (e) => {
    if (
      e.target.value &&
      (parseInt(e.target.value) < 1 || isNaN(parseInt(e.target.value)))
    ) {
      e.target.value = previousYearValue;
    } else {
      previousYearValue = e.target.value;
    }
  });
};

const calculateAge = (event) => {
  event.preventDefault();

  const date = new Date();
  const currentDay = date.getDay();
  const currentMonth = 1 + date.getMonth();
  const currentYear = date.getFullYear();

  const dayInputValue = dayInput.value;
  const monthInputValue = monthInput.value;
  const yearInputValue = yearInput.value;

  constResultDays = validateForm(
    dayInputValue,
    monthInputValue,
    yearInputValue
  );

  const birthDate = new Date(
    parseInt(yearInputValue),
    parseInt(monthInputValue) - 1,
    parseInt(dayInputValue)
  );

  let userYears = 0;
  let userMonths = 0;
  let userDays = 0;

  userYears =
    currentMonth + 1 > parseInt(monthInputValue) ||
    (currentMonth + 1 === parseInt(monthInputValue) &&
      currentDay >= parseInt(dayInputValue))
      ? currentYear - parseInt(yearInputValue)
      : currentYear - parseInt(yearInputValue) - 1;

  userMonths =
    currentDay - parseInt(dayInputValue) > 0
      ? currentMonth + 1 - parseInt(monthInputValue)
      : currentMonth + 1 > parseInt(monthInputValue)
      ? currentMonth - parseInt(monthInputValue)
      : 0;

  userDays =
    userMonths > 0
      ? currentDay - parseInt(dayInputValue)
      : daysInMonths[parseInt(monthInputValue)] - parseInt(dayInputValue);

  if (!isNaN(userYears) && !isNaN(userMonths) && !isNaN(userDays)) {
    resultYears.innerHTML = userYears;
    resultMonths.innerHTML = userMonths;
    resultDays.innerHTML = userDays;
  }
};

const validateForm = (day, month, year) => {
  const dayGroup = document.getElementById("dayGroup");
  const monthGroup = document.getElementById("monthGroup");
  const yearGroup = document.getElementById("yearGroup");
  const date = new Date();
  const currentYear = date.getFullYear();
  const requireMsg = "This field is required";
  const dayErrorField = document.querySelector("#dayError");
  const monthErrorField = document.querySelector("#monthError");
  const yearErrorField = document.querySelector("#yearError");
  let isValidDate = true;

  if (day > daysInMonths[month - 1]) {
    isValidDate = false;
  }

  if (day === "" || day > 31 || !isValidDate) {
    dayGroup.classList.add("input-error");
  } else {
    dayGroup.classList.remove("input-error");
  }

  day === "" ? (dayErrorField.innerHTML = requireMsg) : null;
  day > 31 ? (dayErrorField.innerHTML = "Must be a valid day") : null;
  !isValidDate ? (dayErrorField.innerHTML = "Must be a valid date") : null;

  if (month === "" || month > 12 || !isValidDate) {
    monthGroup.classList.add("input-error");
  } else {
    monthGroup.classList.remove("input-error");
  }

  month === "" ? (monthErrorField.innerHTML = requireMsg) : null;
  month > 12 ? (monthErrorField.innerHTML = "Must be a valid month") : null;

  if (year === "" || year > currentYear || !isValidDate) {
    yearGroup.classList.add("input-error");
  } else {
    yearGroup.classList.remove("input-error");
  }

  year === "" ? (yearErrorField.innerHTML = requireMsg) : null;
  year > currentYear
    ? (yearErrorField.innerHTML = "Must be in the past")
    : null;
};

form.addEventListener("submit", calculateAge);
preventEnteringNegativeIntegersZeroAndLetters(dayInput, monthInput, yearInput);
