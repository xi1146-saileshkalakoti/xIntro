import { holidayData } from "./calendarData";
import { createTable } from "./createTable";

document.addEventListener("DOMContentLoaded", function() {
  $("#holidayTableContainer").append(
    createTable(holidayData, "holidayContainer")
  );
});
