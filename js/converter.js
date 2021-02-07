const newObjectCurrent = {
  'RUB': '1',
};
const inputValue = document.getElementById('inputValue');
const result = document.getElementsByClassName('converter__result')[0];
const listValute1 = document.getElementById('list-valute-1');
const listValute2 = document.getElementById('list-valute-2');
let inputChecked1 = null;
let inputChecked2 = null;


function createListValute(numberListValute, code) { // функция создания списка валюты
  const li = document.createElement('li');
  const input = document.createElement('input');
  const label = document.createElement('label');

  li.classList.add('converter__valute');

  input.classList.add('converter__input-checkbox');
  input.setAttribute('type', 'radio');
  input.setAttribute('name', `valute${numberListValute}`);
  input.setAttribute('id', `${code}${numberListValute}`);
  input.setAttribute('value', `${code}`);

  if (code == 'USD' && numberListValute == 1) {
    input.setAttribute('checked', 'true');
  }

  label.classList.add('converter__label');
  label.setAttribute('for', `${code}${numberListValute}`);
  label.innerText = code;

  li.append(input, label);
  
  if (numberListValute == 1) {
    listValute1.append(li);
  } else {
    listValute2.append(li);
  } 
}

fetch('https://www.cbr-xml-daily.ru/daily_json.js')
  .then(response => response.json())
  .then(data => {
    let localDataObjectValues = Object.values(data.Valute);

    for (let i = 0; i < localDataObjectValues.length; i++) {
      const code = localDataObjectValues[i].CharCode;
      const currentRate = localDataObjectValues[i].Value;
      newObjectCurrent[code] = currentRate;

      createListValute(1, code);
      createListValute(2, code);    
    }
  })

function conversion() { 
  let translationIntoRubles = 0;

  inputChecked1 = listValute1.querySelector('input:checked');
  inputChecked2 = listValute2.querySelector('input:checked');    

  if (inputChecked1.value === inputChecked2.value) {
    result.innerText = inputValue.value;
  } else {
    translationIntoRubles = inputValue.value * newObjectCurrent[inputChecked1.value]; // переводим в рубли
    result.innerHTML = ((translationIntoRubles / newObjectCurrent[inputChecked2.value]) * 100 / 100).toFixed(3); // делим на курс и округляем до тысячных
  }
};

inputValue.oninput = function () {
  conversion();
};

listValute1.onclick = function () {
  inputValue.value ? conversion() : null;
};

listValute2.onclick = function () {
  inputValue.value ? conversion() : null;
};