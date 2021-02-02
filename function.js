const from_ammountEl = document.getElementById('from_ammount');
const to_ammountE0 = document.getElementById('to_ammount0');
const to_ammountE1 = document.getElementById('to_ammount1');
const to_ammountE2 = document.getElementById('to_ammount2');
const to_ammountE3 = document.getElementById('to_ammount3');
const to_ammountE4 = document.getElementById('to_ammount4');
 
/* корзина с выбранными товарами */
const selectedCart = [
    { price: 20 },
    { price: 45 },
    { price: 67 },
    { price: 1305 }
];

/* функция расчета общей цены товаров в корзине*/
function totalCart() {
    let totalCost = 0;
    for (let i in selectedCart) {
        totalCost += selectedCart[i].price;
    }
    return totalCost;
}
 /* функцию расчета общей цены для каждого типа валюты */
function calculate() { // -> считаем общую цену для каждой валюты (по текущему курсу)
	
	from_ammountEl.value = totalCart(); // вызываем функцию общей цены товаров (в базовой валюте - доллар)
	
	fetch(`https://api.exchangerate-api.com/v4/latest/${"USD"}`) // запрос к API с долларовой валютой
		.then(res => res.json())
		.then(res => {

		// RUB -> расчет общей цены в рублях
		const rate0 = res.rates["RUB"];
		to_ammountE0.value = (from_ammountEl.value * rate0).toFixed(2);
	
		// EUR -> расчет общей цены в евро
		const rate1 = res.rates["EUR"];
		to_ammountE1.value = (from_ammountEl.value * rate1).toFixed(2);
	
		// USD -> расчет общей цены в долларах
		const rate2 = res.rates["USD"];
		to_ammountE2.value = (from_ammountEl.value * rate2).toFixed(2);
		
		// GBP -> расчет общей цены в фунтах
		const rate3 = res.rates["GBP"];
		to_ammountE3.value = (from_ammountEl.value * rate3).toFixed(2);
		
		// JPY -> расчет общей цены в иенах
		const rate4 = res.rates["JPY"];
		to_ammountE4.value = (from_ammountEl.value * rate4).toFixed(2);

		const totalCartPrice = { // формируем объект с полученными значениями для каждой валюты
			RUB: to_ammountE0.value,
			EUR: to_ammountE1.value,
			USD: to_ammountE2.value,
			GBP: to_ammountE3.value,
			JPY: to_ammountE4.value
		}
		console.log(totalCartPrice); // выводим объект в консоли
	})
}

calculate(); // вызываем функцию расчета общей цены для каждого типа валюты