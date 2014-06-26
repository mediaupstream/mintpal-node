//
// @module mintpal-node
// 
// A helper library for interaction with the Mintpal REST API,
// currently only supporting v1 of their API: https://www.mintpal.com/api
//

var request = require('request')
var _ = require('underscore')

var Mintpal = function(options){
  var self = this

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
    coin: ''
  }

  _.extend(this.defaults, options || {})

  // A quick cache of the markets, only to make the chartdata method better
  this._markets = null

  this.market_summary(function(err, data){
    if (!err) self._markets = data
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
    var key = ok[i]
    var val = this.defaults[key]
    var dataValue = false
    if (typeof data[key] != 'undefined') dataValue = data[key]
    var value = dataValue || val
    url = url.replace('{'+ key +'}', value)
  }

  cb = cb || function(){} // oops!
  console.log('> requesting ', url)
  request(url, function(err, response, body){
    // attempt to json parse the response body
    try {
      var _body = JSON.parse(body)
    } catch (error){
      var _body = body
    }
    cb(err, _body, response)
  })
}

//
// Market Summary
//
Mintpal.prototype.market_summary = function(exchange, cb){
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
Mintpal.prototype.chartdata = function(market_id, period, cb){
  var _period = period;
  if (typeof period == 'function') {
    cb = period
    _period = '6hh';
  }
  var data = {
    market_id: market_id,
    period: _period
  }
  this._request('chartdata', data, cb)
}

//
// Market Chart (in case you don't know the coins market_id :P)
//
Mintpal.prototype.chart = function(coin, exchange, period, cb){
  coin = coin || this.defaults.coin
  exchange = exchange || this.defaults.exchange
  var self = this
  var market = _.find(self._markets, function(d){
    return (d.code == coin && d.exchange == exchange)
  })
  if (!market) {
    market = { market_id: null }
  }
  this.chartdata(market.market_id, period, cb)
}


module.exports = Mintpal;