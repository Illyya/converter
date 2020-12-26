let link = document.querySelector('#converter');

function job() {
  let newObjectCurrent = {
    'RUB': '1',
  };
  
  fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    .then(response => response.json())
    .then(data => {
      let localDataObjectValues = Object.values(data.Valute);
      for (let i = 0; i < localDataObjectValues.length; i++) {
        const code = localDataObjectValues[i].CharCode;
        const currentRate = localDataObjectValues[i].Value;
        newObjectCurrent[code] = currentRate;
      }
    })
  
  let val = document.getElementById('val'); // Получаем элемент ввода данных
  let currency1 = document.getElementById('cur1'); // Получаем первый селект
  let currency2 = document.getElementById('cur2'); // Получаем второй селект
  let result = document.getElementsByClassName('convert__result')[0]; // Получаем поле куда будем писать результат
  
  function summ() { // Делаем функцию
    let z = 0;
    if (currency1.value === currency2.value) { // Если оба значения в селектах равны
      result.innerText = val.value; // То просто вписываем данные из поля ввода
    } else {
      z = val.value * newObjectCurrent[currency1.value]; // Переводим сумму в рубли
      result.innerHTML = ((z / newObjectCurrent[currency2.value]) * 100 / 100).toFixed(4); // Делим на курс и округляем до сотых
    }
  };
  val.oninput = function () { // При вводе данных в поле вызываем функцию.
    summ();
  };
  currency1.onchange = function () { // При смене первого селекта вызываем функцию.
    summ();
  };
  currency2.onchange = function () { // При смене второго селекта вызываем функцию.
    summ();
  }
}

setTimeout(() => {
  job();  
}, 1000);

link.onclick = function () {
  setTimeout(() => {
    job();  
  }, 1000);
}
 