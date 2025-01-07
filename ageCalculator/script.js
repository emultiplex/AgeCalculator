const ageCalculator = () => {
  const today = new Date();
  const inputDate = new Date(document.getElementById("date_input").value);
  const birthDetails = {
    year: inputDate.getFullYear(),
    month: inputDate.getMonth() + 1,
    date: inputDate.getDate(),
  };

  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDate = today.getDate();

  if (isFutureDate(birthDetails, currentYear, currentMonth, currentDate)) {
    alert("You are not Born Yet");
    displaceResult("-", "-", "-");
    return;
  }

  const { years, months, days } = calculateAge(
    birthDetails,
    currentYear,
    currentMonth,
    currentDate
  );
  displaceResult(years, months, days);
};

const isFutureDate = (birthDetails, currentYear, currentMonth, currentDate) => {
  return (
    birthDetails.year > currentYear ||
    (birthDetails.year === currentYear &&
      (birthDetails.month > currentMonth ||
        (birthDetails.month === currentMonth &&
          birthDetails.date > currentDate)))
  );
};

function getDaysInMonth(year, month) {
  const isLeapYear = year % 4 === 0 && (year % 100 != 0 || year % 400 === 0);
  const getDaysInMonth = [
    31,
    isLeapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  return getDaysInMonth[month - 1];
}

const calculateAge = (birthDetails, currentYear, currentMonth, currentDate) => {
  let years = currentYear - birthDetails.year;
  let months;
  let days;

  if (currentMonth < birthDetails.month) {
    years--;
    months = 12 - (birthDetails.month - currentMonth);
  } else {
    months = currentMonth - birthDetails.month;
  }

  if (currentDate < birthDetails.date) {
    months--;
    const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const daysInLastMonth = getDaysInMonth(currentYear, lastMonth);
    console.log(getDaysInMonth(lastMonth, currentYear));
    days = daysInLastMonth - (birthDetails.date - currentDate);
    console.log(days);
    console.log(birthDetails);
  } else {
    days = currentDate - birthDetails.date;
  }
  return { years, months, days };
};

const displaceResult = (bYear, bMonth, bdate) => {
  document.getElementById("years").textContent = bYear;
  document.getElementById("months").textContent = bMonth;
  document.getElementById("days").textContent = bdate;
};
document.getElementById("btn_age").addEventListener("click", ageCalculator);
