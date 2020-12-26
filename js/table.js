let link = document.querySelector('#currentRate');
let table = document.querySelector('table');

function buildingTable(data) {
  let tbody = document.querySelector('tbody');
  let a = Object.values(data);
  //создание строк
  for (let i = 0; i < a.length; i++) {
    const dataUser = a[i],
      tr = document.createElement('tr');
    //создание ячеек внутри строки
    for (let j = 0; j < 3; j++) {
      const td = document.createElement('td');
      j == 0 ? td.textContent = dataUser.CharCode : null;
      j == 1 ? td.textContent = dataUser.Name : null;
      j == 2 ? td.textContent = `${dataUser.Value}${' р.'}` : null;
      tr.append(td);
    }
    tbody.append(tr);
  }
}

function loadTable() {
  fetch('https://www.cbr-xml-daily.ru/daily_json.js')
  .then(response => response.json())
  .then(data => buildingTable(data.Valute))
}

link.onclick = function () {
  loadTable();
}

window.onload = function () {
  loadTable();
}
