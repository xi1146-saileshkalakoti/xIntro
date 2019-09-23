export const createTable = (data, containerId) => {
  let tableContainer = document.createElement("div");
  tableContainer.setAttribute("id", containerId);
  for (let key in data) {
    let tableDiv = document.createElement("div");
    // Create Table
    let table = document.createElement("table");

    // Get Table Data
    let tableData = data[key];

    // Get and Set table title
    if (tableData.title) {
      let titleHead = document.createElement("thead");
      let headTr = document.createElement("tr");
      let headTh = document.createElement("th");
      headTh.innerHTML = tableData.title;
      headTh.setAttribute("colspan", tableData.body[0].length);
      headTr.appendChild(headTh);
      titleHead.appendChild(headTr);
      table.appendChild(titleHead);
    }

    // Get and set table column headers
    let thead = document.createElement("thead");
    let headersTr = document.createElement("tr");
    if (tableData.headers)
      tableData.headers.forEach(element => {
        let headersTh = document.createElement("th");
        headersTh.innerHTML = element;
        headersTr.appendChild(headersTh);
      });
    thead.appendChild(headersTr);
    table.appendChild(thead);

    // Get and set column body Data
    let tbody = document.createElement("tbody");
    if (tableData.body)
      tableData.body.forEach(element => {
        let bodyTr = document.createElement("tr");
        element.forEach(cell => {
          let dataTd = document.createElement("td");
          dataTd.innerHTML = cell;
          bodyTr.appendChild(dataTd);
        });
        tbody.appendChild(bodyTr);
      });
    table.appendChild(tbody);
    tableDiv.appendChild(table);
    tableContainer.appendChild(tableDiv);
  }
  return tableContainer;
};
