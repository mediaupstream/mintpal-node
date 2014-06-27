# Mintpal

[Mintpal.com](https://www.mintpal.com/) NodeJS API client. Fully supports the __v1__ API features: [Mintpal.com API](https://www.mintpal.com/api).

[![NPM](https://nodei.co/npm/mintpal.png?downloads=true&stars=true)](https://nodei.co/npm/mintpal/)

[![Build Status](https://travis-ci.org/mediaupstream/mintpal-node.svg?branch=master)](https://travis-ci.org/mediaupstream/mintpal-node)

## Example Usage

```javascript
var Mintpal = require('mintpal');
var client = new Mintpal();

// fetch current stats for DRK/BTC
client.stats('DRK', 'BTC', function(err, data){ })

// fetch a market summary for LTC
client.summary('LTC', function(err, data){ })

// see last 100 trades for LTC/BTC
client.trades('LTC/BTC', function(err, data){ })

// get chart data for Dogecoin (last 24 hours)
client.chart('DOGE/BTC', '1dd', function(err, data){ })

```
   
## Mintpal.com API documentation

For detailed API info, check out the official v1 API docs: [https://www.mintpal.com/api](https://www.mintpal.com/api)

## API Methods

* [`Mintpal`](#Mintpal)
* [`summary`](#summary)
* [`stats`](#stats)
* [`trades`](#trades)
* [`orders`](#orders)
* [`chart`](#chart)


<a name="Mintpal" />
### new Mintpal(options)

@options _Object_:

- `exchange` set a default exchange, example: LTC or BTC
- `coin` set a default coin, example: 'DOGE'
- `period` default time period to use for `chart` method calls
- `api_version` defaults to `v1`

```javascript
var mintpal = new Mintpal({
  exchange: 'BTC',
  coin: 'DOGE'
})
```
   

<a name="summary" />
### Mintpal.summary(exchange, callback)

- `exchange` (optional) summary data by exchange (LTC or BTC)
- `callback` receives `error, data, response`

Provides an overview of all our markets. Data refreshes every minute.

```javascript
mintpal.summary(function(err, data){
  console.log(data)
})
```

```javascript
[
  {
    "market_id": "88",
    "coin": "365Coin",
    "code": "365",
    "exchange": "BTC",
    "last_price": "0.20000001",
    "yesterday_price": "0.20000001",
    "change": "0.00",
    "24hhigh": "0.21500024",
    "24hlow": "0.20000000",
    "24hvol": "0.163",
    "top_bid": "0.20000001",
    "top_ask": "0.20499999"
  },
  ...
]
```

<a name="stats" />
### Mintpal.stats(coin, exchange, callback)

- `coin` The coin you're interested in, example: DOGE
- `exchange` (optional) exchange example: LTC or BTC

Provides the statistics for a single market. Data refreshes every minute.

```javascript
mintpal.summary('DOGE', 'BTC', function(err, data){
  console.log(data)
})
// or shorthand
mintpal.summary('DOGE/BTC', function(){})

```

```javascript
[
  {
    "market_id": "16",
    "coin": "Dogecoin",
    "code": "DOGE",
    "exchange": "BTC",
    "last_price": "0.00000049",
    "yesterday_price": "0.00000050",
    "change": "-2.00",
    "24hhigh": "0.00000052",
    "24hlow": "0.00000046",
    "24hvol": "37.989",
    "top_bid": "0.00000049",
    "top_ask": "0.00000050"
  }
]
```

<a name="trades" />
### Mintpal.trades(coin, exchange, callback)

- `coin` The coin you're interested in, example: DOGE
- `exchange` (optional) exchange example: LTC or BTC

Fetches the last 100 trades for a given market.


```javascript
mintpal.trades('DOGE', 'BTC', function(err, data){
  console.log(data)
})
// or shorthand
mintpal.trades('DOGE/BTC', function(){})

```

```javascript
[{
   "count":"100",
   "trades":[{
      "type":"1",
      "price":"0.00000023",
      "amount":"412128.80177019",
      "total":"0.09478962",
      "time":"1394498289.2727"
   },
   ...
}]
```

<a name="orders" />
### Mintpal.orders(coin, exchange, type, callback)

- `coin` The coin you're interested in, example: DOGE
- `exchange` (optional) exchange example: LTC or BTC
- `type` (optional) example: BUY or SELL (default is BUY)

Fetches the 50 best priced orders of a given type for a given market.


```javascript
mintpal.orders('DOGE', 'BTC', 'BUY', function(err, data){
  console.log(data)
})
// or shorthand
mintpal.orders('DOGE/BTC', 'SELL', function(){})

```

```javascript
[{
   "count":"23",
   "type":"BUY",
   "orders":[{
      "price":"0.00000023",
      "amount":"22446985.14519785",
      "total":"5.16280655"
   },
   ...
}]
```

<a name="chart" />
### Mintpal.chart(coin, exchange, period, callback)

- `coin` The coin you're interested in, example: DOGE
- `exchange` (optional) exchange example: LTC or BTC
- `period` (optional) time period filter examples: 6hh, 1dd, 3dd, 7dd, max  default is 6hh

chart data that we use for our candlestick graphs for a market for a given time period.

```javascript
mintpal.chart('DOGE', 'BTC', '6hh', function(err, data){
  console.log(data)
})
// or shorthand
mintpal.chart('DOGE/BTC', 'max', function(){})

```

```javascript
[
  {
    "date":"2014-02-09 14:20",
    "open":"0.00000006",
    "close":"0.00000006",
    "high":"0.00000006",
    "low":"0.00000003",
    "exchange_volume":"0.00002145",
    "coin_volume":"608.50000000"
  },
  ...
]
```


## Contributing

Fork and clone the repository. Install dependencies with:
    
    npm install

Run the existing test spec with `npm test`.


## Roadmap

- Implement the v2 beta API see: [https://www.mintpal.com/api/v2](https://www.mintpal.com/api/v2})
- Node Streams?
- Promises API support?
- ???


#### Support this project

<script data-gittip-username="mediaupstream" data-gittip-widget="button" src="//gttp.co/v1.js"></script>
  
BTC 1EkGJfpcAi6oeq1ooEjgzHVuRvc1HdvuXu   
LTC LKPvk8RQsoYpmS9ajoXVoMUtAVpTJ8R9zH   
CRYPT Esug5bcsMkQ9m2kMPtLpz2thwXSjyMtxkw   
