'use strict';

const result = document.querySelectorAll('#result > div > p');
const invia = document.querySelector('#invia');
const input = document.querySelector('#input');

let old_price = 0
let current_price = 0
let ticker;
let price;

let interval = null;
let flag = false;

let binanceSuccess = true;
let bybitSuccess = true;
let bitgetSuccess = true;
let gateioSuccess = true;
let poloniexSuccess = true;
let coinexSuccess = true;
let mexcSuccess = true;
let lbankSuccess = true;
let bingxSuccess = true;

function pulisci_result() {
    result[0].classList.add('no-visible');
    result[1].classList.add('no-visible');
    result[2].classList.add('no-visible');
    result[3].classList.add('no-visible');
};

function reimposta_success() {
    binanceSuccess = true;
    bybitSuccess = true;
    bitgetSuccess = true;
    gateioSuccess = true;
    poloniexSuccess = true;
    coinexSuccess = true;
    mexcSuccess = true;
    lbankSuccess = false;
    bingxSuccess = true;
}

async function api_binance(symbol) {
    symbol = symbol.toUpperCase();
    return fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`)
            .then(response => response.json())
            .then(data => {
                current_price = data.price;
                pulisci_result();
                if (current_price > old_price) {
                    ticker = result[0].querySelector('em');
                    ticker.textContent = symbol;
                    price = result[0].querySelector('b');
                    price.textContent = `${parseFloat(current_price)} `; 
                    old_price = current_price;
                    result[0].classList.remove('no-visible');
                } else if (current_price < old_price) {
                    ticker = result[1].querySelector('em');
                    ticker.textContent = symbol;
                    price = result[1].querySelector('b');
                    price.textContent = `${parseFloat(current_price)} `;
                    result[1].classList.remove('no-visible'); 
                    old_price = current_price;
                } else {
                    ticker = result[2].querySelector('em');
                    ticker.textContent = symbol;
                    price = result[2].querySelector('b');
                    price.textContent = `${parseFloat(current_price)} `; 
                    result[2].classList.remove('no-visible');
                    old_price = current_price;
                };
                return true;
            
            }).catch(error => {
                console.log('BINANCE ERRORE CATTURATO: ', error);
                return false;
            });
};

async function api_bybit(symbol) {
    symbol = symbol.toUpperCase();
    return fetch(`https://api.bybit.com/v5/market/tickers?category=spot&symbol=${symbol}USDT`)
            .then(response => response.json())
            .then(data => {  
                current_price = data['result']['list'][0]['lastPrice'];
                pulisci_result();
                if (current_price > old_price) {
                    ticker = result[0].querySelector('em');
                    ticker.textContent = symbol;
                    price = result[0].querySelector('b');
                    price.textContent = `${parseFloat(current_price)} `; 
                    old_price = current_price;
                    result[0].classList.remove('no-visible');
                } else if (current_price < old_price) {
                    ticker = result[1].querySelector('em');
                    ticker.textContent = symbol;
                    price = result[1].querySelector('b');
                    price.textContent = `${parseFloat(current_price)} `;
                    result[1].classList.remove('no-visible'); 
                    old_price = current_price;
                } else {
                    ticker = result[2].querySelector('em');
                    ticker.textContent = symbol;
                    price = result[2].querySelector('b');
                    price.textContent = `${parseFloat(current_price)} `; 
                    result[2].classList.remove('no-visible');
                    old_price = current_price;
                };
                return true;
            
            }).catch(error => {
                console.log('BYBIT ERRORE CATTURATO: ', error);
                return false;
            });
};

async function api_bitget(symbol) {
    symbol = symbol.toUpperCase();
    return fetch(`https://api.bitget.com/api/v2/spot/market/tickers?symbol=${symbol}USDT`)
    .then(response => response.json())
    .then(data => {
        current_price = data['data'][0]['lastPr'];
        pulisci_result();
        if (current_price > old_price) {
            ticker = result[0].querySelector('em');
            ticker.textContent = symbol;
            price = result[0].querySelector('b');
            price.textContent = `${parseFloat(current_price)} `; 
            old_price = current_price;
            result[0].classList.remove('no-visible');
        } else if (current_price < old_price) {
            ticker = result[1].querySelector('em');
            ticker.textContent = symbol;
            price = result[1].querySelector('b');
            price.textContent = `${parseFloat(current_price)} `;
            result[1].classList.remove('no-visible'); 
            old_price = current_price;
        } else {
            ticker = result[2].querySelector('em');
            ticker.textContent = symbol;
            price = result[2].querySelector('b');
            price.textContent = `${parseFloat(current_price)} `; 
            result[2].classList.remove('no-visible');
            old_price = current_price;
        };
        return true;
    
    }).catch(error => {
        console.log('BITGET ERRORE CATTURATO: ', error);
        return false;
    });
};

async function api_gateio(symbol) {
    symbol = symbol.toUpperCase();
    return fetch(`https://api.gate.io/api2/1/ticker/${symbol}_USDT`)
    .then(response => response.json())
    .then(data => {
        current_price = data['last'];
        pulisci_result();
        if (current_price > old_price) {
            ticker = result[0].querySelector('em');
            ticker.textContent = symbol;
            price = result[0].querySelector('b');
            price.textContent = `${parseFloat(current_price)} `; 
            old_price = current_price;
            result[0].classList.remove('no-visible');
        } else if (current_price < old_price) {
            ticker = result[1].querySelector('em');
            ticker.textContent = symbol;
            price = result[1].querySelector('b');
            price.textContent = `${parseFloat(current_price)} `;
            result[1].classList.remove('no-visible'); 
            old_price = current_price;
        } else {
            ticker = result[2].querySelector('em');
            ticker.textContent = symbol;
            price = result[2].querySelector('b');
            price.textContent = `${parseFloat(current_price)} `; 
            result[2].classList.remove('no-visible');
            old_price = current_price;
        };
        return true;
    
    }).catch(error => {
        console.log('GATE.IO ERRORE CATTURATO: ', error);
        return false;
    });
};

async function api_poloniex(symbol) {
    symbol = symbol.toUpperCase();
    return fetch(`https://api.poloniex.com/markets/${symbol}_USDT/price`)
    .then(response => response.json())
    .then(data => {
        current_price = data['data'][0]['lastPr'];
        pulisci_result();
        if (current_price > old_price) {
            ticker = result[0].querySelector('em');
            ticker.textContent = symbol;
            price = result[0].querySelector('b');
            price.textContent = `${parseFloat(current_price)} `; 
            old_price = current_price;
            result[0].classList.remove('no-visible');
        } else if (current_price < old_price) {
            ticker = result[1].querySelector('em');
            ticker.textContent = symbol;
            price = result[1].querySelector('b');
            price.textContent = `${parseFloat(current_price)} `;
            result[1].classList.remove('no-visible'); 
            old_price = current_price;
        } else {
            ticker = result[2].querySelector('em');
            ticker.textContent = symbol;
            price = result[2].querySelector('b');
            price.textContent = `${parseFloat(current_price)} `; 
            result[2].classList.remove('no-visible');
            old_price = current_price;
        };
        return true;
    
    }).catch(error => {
        console.log('POLONIEX ERRORE CATTURATO: ', error);
        return false;
    });
};

async function api_coinex(symbol) {
    symbol = symbol.toUpperCase();
    return fetch(`https://api.coinex.com/v1/market/ticker?market=${symbol}USDT`)
    .then(response => response.json())
    .then(data => {
        current_price = data['data']['ticker']['last'];
        pulisci_result();
        if (current_price > old_price) {
            ticker = result[0].querySelector('em');
            ticker.textContent = symbol;
            price = result[0].querySelector('b');
            price.textContent = `${parseFloat(current_price)} `; 
            old_price = current_price;
            result[0].classList.remove('no-visible');
        } else if (current_price < old_price) {
            ticker = result[1].querySelector('em');
            ticker.textContent = symbol;
            price = result[1].querySelector('b');
            price.textContent = `${parseFloat(current_price)} `;
            result[1].classList.remove('no-visible'); 
            old_price = current_price;
        } else {
            ticker = result[2].querySelector('em');
            ticker.textContent = symbol;
            price = result[2].querySelector('b');
            price.textContent = `${parseFloat(current_price)} `; 
            result[2].classList.remove('no-visible');
            old_price = current_price;
        };
        return true;
    
    }).catch(error => {
        console.log('COINEX ERRORE CATTURATO: ', error);
        return false;
    });
};

async function api_mexc(symbol) {
    symbol = symbol.toUpperCase();
    return fetch(`https://www.mexc.com/open/api/v2/market/ticker?symbol=${symbol}_USDT`)
    .then(response => response.json())
    .then(data => {
        current_price = data['data'][0]['last'];
        pulisci_result();
        if (current_price > old_price) {
            ticker = result[0].querySelector('em');
            ticker.textContent = symbol;
            price = result[0].querySelector('b');
            price.textContent = `${parseFloat(current_price)} `; 
            old_price = current_price;
            result[0].classList.remove('no-visible');
        } else if (current_price < old_price) {
            ticker = result[1].querySelector('em');
            ticker.textContent = symbol;
            price = result[1].querySelector('b');
            price.textContent = `${parseFloat(current_price)} `;
            result[1].classList.remove('no-visible'); 
            old_price = current_price;
        } else {
            ticker = result[2].querySelector('em');
            ticker.textContent = symbol;
            price = result[2].querySelector('b');
            price.textContent = `${parseFloat(current_price)} `; 
            result[2].classList.remove('no-visible');
            old_price = current_price;
        };
        return true;
    
    }).catch(error => {
        console.log('MEXC ERRORE CATTURATO: ', error);
        return false;
    });
};

async function api_lbank(symbol) {
    symbol = symbol.toLowerCase();
    return fetch(`https://api.lbkex.com/v1/ticker.do?symbol=${symbol}_usdt`)
    .then(response => response.json())
    .then(data => {
        current_price = data['ticker']['latest'];
        pulisci_result();
        if (current_price > old_price) {
            ticker = result[0].querySelector('em');
            ticker.textContent = symbol;
            price = result[0].querySelector('b');
            price.textContent = `${parseFloat(current_price)} `; 
            old_price = current_price;
            result[0].classList.remove('no-visible');
        } else if (current_price < old_price) {
            ticker = result[1].querySelector('em');
            ticker.textContent = symbol;
            price = result[1].querySelector('b');
            price.textContent = `${parseFloat(current_price)} `;
            result[1].classList.remove('no-visible'); 
            old_price = current_price;
        } else {
            ticker = result[2].querySelector('em');
            ticker.textContent = symbol;
            price = result[2].querySelector('b');
            price.textContent = `${parseFloat(current_price)} `; 
            result[2].classList.remove('no-visible');
            old_price = current_price;
        };
        return true;
    
    }).catch(error => {
        console.log('LBANK ERRORE CATTURATO: ', error);
        return false;
    });
};

async function api_bingx(symbol) {
    symbol = symbol.toUpperCase();
    return fetch(`https://open-api-vst.bingx.com/openApi/swap/v2/quote/price?&symbol=${symbol}-USDT`)
    .then(response => response.json())
    .then(data => {
        current_price = data['data']['price'];
        pulisci_result();
        if (current_price > old_price) {
            ticker = result[0].querySelector('em');
            ticker.textContent = symbol;
            price = result[0].querySelector('b');
            price.textContent = `${parseFloat(current_price)} `; 
            old_price = current_price;
            result[0].classList.remove('no-visible');
        } else if (current_price < old_price) {
            ticker = result[1].querySelector('em');
            ticker.textContent = symbol;
            price = result[1].querySelector('b');
            price.textContent = `${parseFloat(current_price)} `;
            result[1].classList.remove('no-visible'); 
            old_price = current_price;
        } else {
            ticker = result[2].querySelector('em');
            ticker.textContent = symbol;
            price = result[2].querySelector('b');
            price.textContent = `${parseFloat(current_price)} `; 
            result[2].classList.remove('no-visible');
            old_price = current_price;
        };
        return true;
    
    }).catch(error => {
        console.log('BINGX ERRORE CATTURATO: ', error);
        return false;
    });
};

async function fetchData(symbol){
   
    // chiamata iniziale
    binanceSuccess = await api_binance(symbol);

    // se fallisce chiamata a API Binance faccio chiamata a API Bybit
    if (!binanceSuccess) {
        bybitSuccess = await api_bybit(symbol);
    }
    
    // se fallisce chiamata a API Bybit faccio chiamata a API Bitget
    if (!bybitSuccess) {
        bitgetSuccess = await api_bitget(symbol);
    }

    // se fallisce chiamata a API Bitget faccio chiamata a API Gate.io
    if (!bitgetSuccess) {
        gateioSuccess = await api_gateio(symbol);
    }

    // se fallisce chiamata a API Gate.io faccio chiamata a API Poloniex
    if (!gateioSuccess) {
        poloniexSuccess = await api_poloniex(symbol);
    }

    // se fallisce chiamata a API Poloniex faccio chiamata a API Coinex
    if (!poloniexSuccess) {
        coinexSuccess = await api_coinex(symbol);
    }

    // se fallisce chiamata a API Coinex faccio chiamata a API Mexc
    if (!coinexSuccess) {
        mexcSuccess = await api_mexc(symbol);
    }

    // se fallisce chiamata a API Mexc faccio chiamata a API Lbank
    if (!mexcSuccess) {
        lbankSuccess = await api_lbank(symbol);
    }

    // se fallisce chiamata a API Lbank faccio chiamata a API Bingx
    if (!lbankSuccess) {
        bingxSuccess = await api_bingx(symbol);
    }

    // fine (Se non viene trovata nessuna crypto dopo che ha chiamato tutte le API)
    if (!binanceSuccess && !bybitSuccess && !bitgetSuccess && !gateioSuccess && !poloniexSuccess && !coinexSuccess && !mexcSuccess && !lbankSuccess && !bingxSuccess) {
        result[0].classList.add('no-visible');
        result[1].classList.add('no-visible');
        result[2].classList.add('no-visible');
        result[3].classList.remove('no-visible');
        clearInterval(interval);
        interval = null;
        flag = true;  
    };
};

function main() {
   
    invia.addEventListener('click', function() {
        let symbol = input.value.toUpperCase();  
        reimposta_success();

        if (symbol !== '') {
            if (interval) {
                clearInterval(interval);
                interval = null;
                flag = true;
            };
            
            fetchData(symbol);
            flag = false;
            interval = setInterval(function() {
                if (!flag) {
                    fetchData(symbol);
                };
            }, 3200);

            input.value = ''; 
        } else {
            alert('Il campo non può essere vuoto. Inserisci un ticker.');
            return;
        };
    });
};

main();