let amountInput = document.getElementById('amount');
let convertButton = document.getElementById('convertButton');
let fromCurrency = document.getElementById("fromCurrencyList");
let toCurrency = document.getElementById("toCurrencyList");
let currencyList = {};


async function callApi() {
    let url = "http://data.fixer.io/api/latest?access_key=0f2611ea1f1ff407b0040f536eebae82"
    const response = await fetch(url);
    let result = await fetch(url);
    let data = await result.json();
    console.log(data)
    if (data.success) {
        document.getElementById("notification").innerHTML = `API is working , using latest exchange`;
        currencyList = data.rates
    } else {
        document.getElementById("notification").innerHTML = `API sever is down, using 7 / 7 / 2020 exchange rate`;
        currencyList = {
            EUR: 1,
            VND: 26162,
            USD: 1.13,
            JPY: 121.43,
        }
    }
}
callApi();



function formatCurrency(type, value) {
    const formatter = new Intl.NumberFormat(type, {
        currency: type,
        style: "currency"
    });
    return formatter.format(value);
}

function exchange() {
    console.log(currencyList["VND"])

    let amount = amountInput.value;
    if (amount > 0) {
        let fcurrency = fromCurrency.value;
        let tcurrency = toCurrency.value;

        let amountEur = amount / currencyList[fcurrency];
        let convertedAmount = Math.round(((amountEur * currencyList[tcurrency]) + Number.EPSILON) * 100) / 100;

        let formatAmount = formatCurrency(tcurrency, convertedAmount)
        document.getElementById("result").innerHTML = `your money is ${formatAmount}`;
    } else {
        alert("Invalid Input")
    }
}
convertButton.addEventListener("click", exchange)