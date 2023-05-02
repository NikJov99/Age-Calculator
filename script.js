const form = document.querySelector("form");
const button = document.querySelector("button");

const dayLabel = document.querySelector("#day-label");
const monthLabel = document.querySelector("#month-label");
const yearLabel = document.querySelector("#year-label");

const dayInput = document.querySelector("#input-day");
const monthInput = document.querySelector("#input-month");
const yearInput = document.querySelector("#input-year");

const calculateAge = (event) => {
  event.preventDefault();

  const date = new Date();

  const currentDate = date.getDate();
  const currentMonth = 1 + date.getMonth();
  const currentYear = date.getFullYear();

  const dayInputValue = document.querySelector("#input-day").value;
  const monthInputValue = document.querySelector("#input-month").value;
  const yearInputValue = document.querySelector("#input-year").value;

  if (dayInputValue && monthInputValue && yearInputValue) {
    if (dayInputValue < 1 || dayInputValue > 31) {
      dayLabel.classList.add("label-active");
      dayInput.classList.add("input-active");
    } else {
      dayLabel.classList.remove("label-active");
      dayInput.classList.remove("input-active");
    }

    if (monthInputValue < 1 || monthInputValue > 12) {
      monthLabel.classList.add("label-active");
      monthInput.classList.add("input-active");
    } else {
      monthLabel.classList.remove("label-active");
      monthInput.classList.remove("input-active");
    }

    if (yearInputValue > currentYear) {
      yearLabel.classList.add("label-active");
      yearInput.classList.add("input-active");
    } else {
      yearLabel.classList.remove("label-active");
      yearInput.classList.remove("input-active");
    }
  }
};

form.addEventListener("submit", calculateAge);
