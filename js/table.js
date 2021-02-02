let table = document.querySelector('table');

function buildingTable(data) { // построение таблицы
  let tbody = document.querySelector('tbody');
  let a = Object.values(data);
  
  for (let i = 0; i < a.length; i++) { //создание строк
    const dataUser = a[i],
      tr = document.createElement('tr');
          
    for (let j = 0; j < 3; j++) { //создание ячеек внутри строк
      const td = document.createElement('td');

      switch (j) {
        case 0:
          td.textContent = dataUser.CharCode
          break;
        case 1:
          td.textContent = dataUser.Name
          break;
        case 2:
          td.textContent = `${dataUser.Value}${' р.'}`
          break;
      
        default:
          break;
      }
      
      tr.append(td);
    }

    tbody.append(tr);
  }
}

fetch('https://www.cbr-xml-daily.ru/daily_json.js')
  .then(response => response.json())
  .then(data => buildingTable(data.Valute))