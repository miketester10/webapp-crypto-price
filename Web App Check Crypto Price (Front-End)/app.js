'use strict';

const result = document.querySelectorAll('#result > div > p');
const invia = document.querySelector('#invia');
const input = document.querySelector('#input');

let old_price = 0
let current_price = 0
let ticker;
let price;
let symbol_global; // questa variabile mi serve per aggiornare symbol perchè ha lo scope globale e la metto come let così può cambiare il valore anche dopo esser stata inizalizzata

let interval = null;
let flag = false;

function pulisci_result() {
    result[0].classList.add('no-visible');
    result[1].classList.add('no-visible');
    result[2].classList.add('no-visible');
    result[3].classList.add('no-visible');
};

function controlla_simbolo() {
    return symbol_global
}

async function chiamata_api(symbol) {
    return fetch(`https://server-415302.oa.r.appspot.com/api/v1/ticker/${symbol}`)
    // return fetch(`http://localhost:8080/api/v1/ticker/${symbol}`) // per test in locale
    .then(response => {if (!response.ok) { throw new Error(response.statusText) } else { return response.json() } })
    .then(data => { // data sarebbe un oggetto ovvero response.json
        current_price = data['price'];
        let simbolo = controlla_simbolo(); // questa funzione mi serve per aggiornare symbol quando il simbolo cambia, perchè se scrivo solo let simbolo = symbol non funziona poiche symbol mantiene lo stesso valore iniziale 
        // console.log('simbolo vecchio: ', symbol);
        // console.log('simbolo di ritorno API: ', data['symbol']);
        // console.log('simbolo nuovo: ', simbolo);
        if (simbolo !== symbol && simbolo !== "") { 
            // console.log('////// ESCI DALLA FUNZIONE ///////');
            return
        }
        // console.log('------ CONTINUA LA FUNZIONE ------');
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
    
    }).catch(error => {
        console.log('ERRORE CATTURATO: ', error);
        result[0].classList.add('no-visible');
        result[1].classList.add('no-visible');
        result[2].classList.add('no-visible');
        result[3].classList.remove('no-visible');
        clearInterval(interval);
        interval = null; // per sicurezza mettere sempre uguale a null dopo aver fatto clearInterval
        flag = true; 
    });
};

function main() {
   
    invia.addEventListener('click', function() {

        symbol_global = input.value.toUpperCase();
        
        if (symbol_global !== '') {
            const symbol_local = symbol_global; // questa variabile mi serve con lo scope locale e come costante perchè non deve cambiare mai, ma cambia solo quando entro nell'if e viene inizializzata nuovamente
            
            if (interval) {
                clearInterval(interval);
                interval = null; // per sicurezza mettere sempre uguale a null dopo aver fatto clearInterval
                flag = true;
            };
            
            chiamata_api(symbol_local);
            flag = false;
            interval = setInterval(function() {
                if (!flag) {
                    chiamata_api(symbol_local);
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