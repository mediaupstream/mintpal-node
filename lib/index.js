//
// Mintpal-node
// https://github.com/mediaupstream/mintpal-node
// 
// Copyright 2014 Derek Anderson
// Released under the MIT license
// 
//

var request = require('request')
var _ = require('underscore')

var Mintpal = function(options){

  this.urls = {
    summary: '{api_base}/{api_version}/market/summary/{exchange}',
    stats: '{api_base}/{api_version}/market/stats/{coin}/{exchange}',
    trades: '{api_base}/{api_version}/market/trades/{coin}/{exchange}',
    orders: '{api_base}/{api_version}/market/orders/{coin}/{exchange}/{type}',
    chartdata: '{api_base}/{api_version}/market/chartdata/{market_id}/{period}'
  }

  this.defaults = {
    api_base: 'https://api.mintpal.com',
    api_version: 'v1',
    exchange: '', // BTC or LTC markets
    coin: '', // DOGE? much option, many choice
    period: ''
  }

  _.extend(this.defaults, options || {})
  this._markets = null
  this._markets_expire = null

  this.init()

}

//
// Initialize the library, get's a cache of summary
// 
Mintpal.prototype.init = function(cb){
  var self = this;
  cb = cb || function(){};
  this._markets_expire = Date.now()
  this.summary(function(err, data){
    if (!err) self._markets = data
    cb(err)
  })
}

//
// Set defaults, these can be overriden in any of the methods below via the data object
//
Mintpal.prototype.set = function(key, val){
  if (typeof this.defaults[key] == 'undefined') return false
  this.defaults[key] = val
  return true
}

Mintpal.prototype.get = function(key){
  return this.defaults[key]
}

//
// Generic GET method for API requests
//
Mintpal.prototype._request = function(key, data, cb){
  data = data || {}
  if (typeof key != 'string') {
    throw new Error('Missing `key` for Mintpal._request')
  }
  if (typeof this.urls[key] == 'undefined') {
    throw new Error('The value of `key` is not valid for Mintpal._request')
  }
  var url = this.urls[key]
  var defaults = _.extend(_.clone(this.defaults), data)


  var ok = Object.keys(defaults)
  for(var i = 0; i < ok.length; i++){
    var _key = ok[i]
    var val = defaults[_key]
    var dataValue = false
    if (typeof data[_key] != 'undefined') dataValue = data[_key]
    var value = dataValue || val
    url = url.replace('{'+ _key +'}', value)
  }

  cb = cb || function(){}

  request(url, function(err, response, body){
    // attempt to json parse the response body
    var _body = body
    try {
      _body = JSON.parse(body)
    } catch (error){
      _body = body
    }
    cb(err, _body, response)
  })
}

//
// Market Summary
//
Mintpal.prototype.summary = function(exchange, cb){
  var data = { exchange: exchange }
  if (typeof exchange === 'function') {
    cb = exchange
    data = {}
  }
  this._request('summary', data, cb)
}

//
// Market Stats
//
Mintpal.prototype.stats = function(coin, exchange, cb){
  if (typeof exchange == 'function'){
    cb = exchange
    coin = coin.split('/')
    exchange = coin[1]
    coin = coin[0]
  }
  var data = {
    coin: coin,
    exchange: exchange
  }
  this._request('stats', data, cb)
}

//
// Market Trades
//
Mintpal.prototype.trades = function(coin, exchange, cb){
  if (typeof exchange == 'function'){
    cb = exchange
    coin = coin.split('/')
    exchange = coin[1]
    coin = coin[0]
  }
  var data = {
    coin: coin,
    exchange: exchange
  }
  this._request('trades', data, cb)
}

//
// Market Orders
//
Mintpal.prototype.orders = function(coin, exchange, type, cb){
  if (typeof exchange == 'function'){
    type = 'BUY'
    cb = exchange
    coin = coin.split('/')
    exchange = coin[1]
    coin = coin[0]
  } else if(typeof type == 'function'){
    cb = type
    if (exchange.toLowerCase() == 'buy' || exchange.toLowerCase() == 'sell'){
      type = exchange
      coin = coin.split('/')
      exchange = coin[1]
      coin = coin[0]
    }
  }
  var data = {
    coin: coin,
    exchange: exchange,
    type: type || 'BUY'
  }
  this._request('orders', data, cb)
}

//
// Market Chartdata
//
Mintpal.prototype._chartdata = function(market_id, period, cb){
  var data = {
    market_id: market_id,
    period: period || ''
  }
  this._request('chartdata', data, cb)
}

//
// Market Chart, helper method to get chart data from the coin 
// string name, eg 'DRK' instead of it's `market_id`
//
Mintpal.prototype.chart = function(coin, exchange, period, cb){
  
  var args = [].slice.call(arguments)

  coin = args.shift()
  cb = args.pop()

  arg1 = (args.length) ? args.shift() : ''
  arg2 = (args.length) ? args.shift() : ''
  
  // @example: `Mintpal.chart(21, 'MAX', cb)`
  if (!isNaN(coin)){
    period = arg1 
    this._chartdata(coin, period, cb)
    return;
  }

  // @example: `Mintpal.chart('DRK', 'BTC', '3dd', cb)`
  var n = coin.split('/')
  if (n.length < 2){ 
    coin = n[0]
    exchange = arg1
    period = arg2
  } else {
  // @example: `Mintpal.chart('DRK/BTC', '1dd', cb)
    coin = n[0]
    exchange = n[1]
    period = arg1
  }

  // override with defaults if needed
  coin = coin || this.get('coin')
  exchange = exchange || this.get('exchange')

  // get the market data @@todo expire _markets cache?
  var self = this
  var market = _.find(self._markets, function(d){
    return (d.code == coin && d.exchange == exchange)
  })

  if (!market) market = { market_id: null }
  
  this._chartdata(market.market_id, period, cb)
}


module.exports = Mintpal;