function solution(D) {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dateValues = Object.entries(D).map(([dateStr, value]) => ({
    date: new Date(dateStr),
    value,
  }));

  // Sort the dateValues array by date in ascending order
  dateValues.sort((a, b) => a.date - b.date);

  const output = {};

  // Iterate over each date in the sorted dateValues array
  for (let i = 0; i < dateValues.length; i++) {
    const dateObj = dateValues[i].date;
    const dayOfWeek = daysOfWeek[dateObj.getUTCDay()];
    const value = dateValues[i].value;

    // If this is the first date with this day of week, initialize its value to 0
    if (!output[dayOfWeek]) {
      output[dayOfWeek] = 0;
    }

    // Add the value for this date to the total for this day of week
    output[dayOfWeek] += value;

    // If there is a gap between this date and the next one, fill in the missing days
    if (i < dateValues.length - 1) {
      const nextDateObj = dateValues[i + 1].date;
      const daysBetween = (nextDateObj - dateObj) / (1000 * 60 * 60 * 24) - 1;

      for (let j = 1; j <= daysBetween; j++) {
        const missingDateObj = new Date(dateObj.getTime() + j * 24 * 60 * 60 * 1000);
        const missingDayOfWeek = daysOfWeek[missingDateObj.getUTCDay()];

        // If this is the first missing date with this day of week, initialize its value
        // to the average of the values of the previous and next dates with this day of week
        if (!output[missingDayOfWeek]) {
          const prevDayOfWeek = daysOfWeek[new Date(missingDateObj.getTime() - 24 * 60 * 60 * 1000).getUTCDay()];
          const nextDayOfWeek = daysOfWeek[new Date(missingDateObj.getTime() + 24 * 60 * 60 * 1000).getUTCDay()];
          const prevValue = output[prevDayOfWeek] || 0;
          const nextValue = output[nextDayOfWeek] || 0;
          output[missingDayOfWeek] = Math.round((prevValue + nextValue) / 2);
        }
      }
    }
  }

  // Add a "Sum" key to the output dictionary with the total of all values
  output.Sum = Object.values(output).reduce((acc, curr) => acc + curr, 0);

  return output;
}
