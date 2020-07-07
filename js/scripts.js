let amountInput = document.getElementById('amount');
let convertButton = document.getElementById('convertButton');
let fromCurrency = document.getElementById("fromCurrencyList");
let toCurrency = document.getElementById("toCurrencyList");

const exchangeRate = {
    USD: 23208,
    AUD: 15964,
    CAD: 16915,
    CHF: 24399,
    EUR: 25950,
    GBP: 28600,
    JPY: 213.45,
    SGD: 16455,
    VND: 1
}

function formatCurrency(type, value) {
    const formatter = new Intl.NumberFormat(type, {
        currency: type,
        style: "currency"
    });
    return formatter.format(value);
}

function exchange() {
    let amount = amountInput.value;
    let fcurrency = fromCurrency.value;
    let tcurrency = toCurrency.value;
    //to vnd
    amountVnd = amount * exchangeRate[fcurrency];
    //out not vnd
    let convertedAmount = Math.round(((amountVnd / exchangeRate[tcurrency]) + Number.EPSILON) * 100) / 100;
    let formatAmount = formatCurrency(tcurrency, convertedAmount)
    document.getElementById("result").innerHTML = `your money is ${formatAmount}`;
}
convertButton.addEventListener("click", exchange)