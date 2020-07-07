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
    currencyList = data.rates
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
    let fcurrency = fromCurrency.value;
    let tcurrency = toCurrency.value;

    let amountEur = Math.round(((amount / currencyList[fcurrency]) + Number.EPSILON) * 100) / 100;
    let convertedAmount = amountEur * currencyList[tcurrency];

    let formatAmount = formatCurrency(tcurrency, convertedAmount)
    document.getElementById("result").innerHTML = `your money is ${formatAmount}`;

}
convertButton.addEventListener("click", exchange)