const API_BASE_URL = window.APP_CONFIG?.apiBaseUrl ?? "http://127.0.0.1:8000";

const datasetSelect = document.getElementById("dataset-select");
const errorMessage = document.getElementById("error");
const loadingMessage = document.getElementById("loading");
const tableWrap = document.getElementById("table-wrap");
const tableHead = document.getElementById("table-head");
const tableBody = document.getElementById("table-body");

function setError(message) {
  if (!message) {
    errorMessage.hidden = true;
    errorMessage.textContent = "";
    return;
  }

  errorMessage.hidden = false;
  errorMessage.textContent = message;
}

function setLoading(isLoading) {
  loadingMessage.hidden = !isLoading;
}

function clearTable() {
  tableHead.innerHTML = "";
  tableBody.innerHTML = "";
  tableWrap.hidden = true;
}

function renderTable(rows) {
  if (!rows.length) {
    clearTable();
    return;
  }

  const columns = Object.keys(rows[0]);

  tableHead.innerHTML = "";
  tableBody.innerHTML = "";

  const headerRow = document.createElement("tr");
  for (const column of columns) {
    const headerCell = document.createElement("th");
    headerCell.textContent = column;
    headerRow.appendChild(headerCell);
  }
  tableHead.appendChild(headerRow);

  rows.forEach((row) => {
    const bodyRow = document.createElement("tr");
    for (const column of columns) {
      const cell = document.createElement("td");
      const value = row[column];
      cell.textContent = value == null ? "" : String(value);
      bodyRow.appendChild(cell);
    }
    tableBody.appendChild(bodyRow);
  });

  tableWrap.hidden = false;
}

async function fetchDatasetRows(datasetName) {
  if (!datasetName) {
    clearTable();
    return;
  }

  setLoading(true);
  setError("");

  try {
    const response = await fetch(`${API_BASE_URL}/datasets/${datasetName}?limit=100`);
    if (!response.ok) {
      throw new Error("Unable to load dataset rows from backend API.");
    }

    const data = await response.json();
    const rows = data.rows ?? [];
    renderTable(rows);
  } catch (fetchError) {
    clearTable();
    setError(fetchError.message);
  } finally {
    setLoading(false);
  }
}

async function fetchDatasets() {
  setError("");

  try {
    const response = await fetch(`${API_BASE_URL}/datasets`);
    if (!response.ok) {
      throw new Error("Unable to load dataset list from backend API.");
    }

    const data = await response.json();
    const datasets = data.datasets ?? [];

    datasetSelect.innerHTML = "";

    if (!datasets.length) {
      datasetSelect.disabled = true;
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "No datasets found";
      datasetSelect.appendChild(option);
      clearTable();
      return;
    }

    datasets.forEach((dataset, index) => {
      const option = document.createElement("option");
      option.value = dataset;
      option.textContent = dataset;
      if (index === 0) {
        option.selected = true;
      }
      datasetSelect.appendChild(option);
    });

    datasetSelect.disabled = false;
    await fetchDatasetRows(datasets[0]);
  } catch (fetchError) {
    datasetSelect.disabled = true;
    datasetSelect.innerHTML = '<option value="">No datasets found</option>';
    clearTable();
    setError(fetchError.message);
  }
}

datasetSelect.addEventListener("change", async (event) => {
  await fetchDatasetRows(event.target.value);
});

fetchDatasets();