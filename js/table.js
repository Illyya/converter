let table = document.querySelector('table');
let tbody = document.getElementById('tbody');

function buildingTable(data) {
  let arrayOfCurrencies = Object.values(data);
  
  for (let i = 0; i < arrayOfCurrencies.length; i++) { //создание строк
    const currencyData = arrayOfCurrencies[i],
      tr = document.createElement('tr');
          
    for (let j = 0; j < 3; j++) { //создание ячеек внутри строк
      const td = document.createElement('td');

      switch (j) {
        case 0:
          td.textContent = currencyData.CharCode
          break;
        case 1:
          td.textContent = currencyData.Name
          break;
        case 2:
          td.textContent = `${currencyData.Value.toFixed(3)}${' р.'}`
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
