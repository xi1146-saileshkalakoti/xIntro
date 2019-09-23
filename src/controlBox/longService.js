import { longServiceData } from "./longServiceData";
import { createTable } from "./createTable";

document.addEventListener("DOMContentLoaded", function() {
  $("#longServiceTableContainer").append(
    createTable(longServiceData, "longServiceContainer")
  );
});
