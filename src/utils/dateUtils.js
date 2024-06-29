// src/utils/dateUtils.js
export function getStartDate(days) {
    let pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - days);
    let formattedPastDate = pastDate.toISOString().slice(0, 10);
    return formattedPastDate;
  }
  