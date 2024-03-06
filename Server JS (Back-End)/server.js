'use strict';

const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;

app.use(cors());

// Definizione delle configurazioni API
let symbol = '';
const apiConfigs = [
  {
    url: () => `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`,
    parseFn: (data) => data['price'],
  },
  {
    url: () => `https://api.bybit.com/v5/market/tickers?category=spot&symbol=${symbol}USDT`,
    parseFn: (data) => data['result']['list'][0]['lastPrice'],
  },
  {
    url: () => `https://api.bitget.com/api/v2/spot/market/tickers?symbol=${symbol}USDT`,
    parseFn: (data) => data['data'][0]['lastPr'],
  },
  {
    url: () => `https://api.gate.io/api2/1/ticker/${symbol}_USDT`,
    parseFn: (data) => data['last'], 
  },
  {
    url: () => `https://api.poloniex.com/markets/${symbol}_USDT/price`,
    parseFn: (data) => data['price'], 
  },
  {
    url: () => `https://api.coinex.com/v1/market/ticker?market=${symbol}USDT`,
    parseFn: (data) => data['data']['ticker']['last'], 
  },
  {
    url: () => `https://www.mexc.com/open/api/v2/market/ticker?symbol=${symbol}_USDT`,
    parseFn: (data) => data['data'][0]['last'], 
  },
  {
    url: () => {symbol = symbol.toLowerCase(); return `https://api.lbkex.com/v1/ticker.do?symbol=${symbol}_usdt`}, // solo per questa API metto il simbolo in minuscolo perchè l'API lo vuole così sennò non trova la crypto
    parseFn: (data) => data['ticker']['latest'], 
  },
  {
    url: () => `https://open-api-vst.bingx.com/openApi/swap/v2/quote/price?&symbol=${symbol}-USDT`,
    parseFn: (data) => data['data']['price'], 
  }
];

// Funzione per cercare il ticker attraverso le API
const findTicker = async (ticker) => {
  symbol = ticker.toUpperCase();
  for (const { url, parseFn } of apiConfigs) {
    try {
      const response = await axios.get(url());
      const price = parseFn(response.data) // con Axios response è già in json quindi non c'è bisogno di fare response.json(), ma posso direttamente applicare la mia funzione parseFn per estrarre il prezzo
      if (price !== undefined && price != 0) {
        return { symbol, price };
      }
    } catch (error) {
      console.error(`Errore nella chiamata API ${url()}, errore: ${error.message}. Provo la prossima API...`);
    }
  }
  throw new Error('Ticker non trovato in nessuna API');
};

// Route per /api/v1/ticker/:ticker
app.get('/api/v1/ticker/:ticker', async (req, res) => {
//   console.log(req.params); 
//   console.log(req.url);
  const ticker  = req.params.ticker;
  try {
    const result = await findTicker(ticker);
    res.json(result);
  } catch (error) {
    res.status(404).json({ errore: error.message });
  }
});

// Route per qualsiasi altre richieste diverse da /api/v1/ticker/:ticker
app.get('*', (req, res) => {
  res.status(404).json({ errore: 'Pagina non trovata' });
});

// Avvia il server
app.listen(PORT, () => {
  console.log(`Il server è in ascolto sulla porta ${PORT}`);
});
