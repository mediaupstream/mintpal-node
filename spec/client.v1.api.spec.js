var Mintpal = require('../index')

describe('Mintpal v1 Client API call', function () {

    var mintpal = new Mintpal()

    beforeEach(function() {})


    it('Provides an overview of all the markets', function(done) {

        mintpal.summary(function(err, body, response){
            expect(err).toBeNull()
            expect(response.statusCode).toEqual(200)
            expect(body).not.toBeNull()
            expect((typeof body)).toBe('object')
            expect(body.error).not.toBeDefined()
            done()
        })

    })

    it('Provides an overview of the LTC market', function(done) {

        mintpal.summary('LTC', function(err, body, response){
            expect(err).toBeNull()
            expect(response.statusCode).toEqual(200)
            expect(body).not.toBeNull()
            expect((typeof body)).toBe('object')
            expect(body.error).not.toBeDefined()
            expect(body.length).toBeGreaterThan(0)
            done()
        })
        
    })

    it('Provides an overview of the BTC market', function(done) {

        mintpal.summary('BTC', function(err, body, response){
            expect(err).toBeNull()
            expect(response.statusCode).toEqual(200)
            expect(body).not.toBeNull()
            expect((typeof body)).toBe('object')
            expect(body.error).not.toBeDefined()
            expect(body.length).toBeGreaterThan(0)
            done()
        })
        
    })

    it('Provides the statistics for a single market', function(done) {

        mintpal.stats('DRK', 'BTC', function(err, body, response){
            expect(err).toBeNull()
            expect(response.statusCode).toEqual(200)
            expect(body).not.toBeNull()
            expect((typeof body)).toBe('object')
            expect(body.error).not.toBeDefined()
            expect(body.length).toBeGreaterThan(0)
            expect(body[0].code).toEqual('DRK')
            expect(body[0].exchange).toEqual('BTC')
            done()
        })
    })

    it('Provides the statistics for a single market using shorthand syntax', function(done){

        mintpal.stats('DRK/BTC', function(err, body, response){
            expect(err).toBeNull()
            expect(response.statusCode).toEqual(200)
            expect(body).not.toBeNull()
            expect((typeof body)).toBe('object')
            expect(body.error).not.toBeDefined()
            expect(body.length).toBeGreaterThan(0)
            expect(body[0].code).toEqual('DRK')
            expect(body[0].exchange).toEqual('BTC')
            done()
        })
    })

    it('Fetches the last 100 trades for a given market', function(done) {

        mintpal.trades('DRK', 'BTC', function(err, body, response){
            expect(err).toBeNull()
            expect(response.statusCode).toEqual(200)
            expect(body).not.toBeNull()
            expect((typeof body)).toBe('object')
            expect(body.error).not.toBeDefined()
            expect(body.trades.length).toEqual(100)
            done()
        })
        
    })

    it('Fetches the last 100 trades for a given market using shorthand', function(done) {

        mintpal.trades('DRK/BTC', function(err, body, response){
            expect(err).toBeNull()
            expect(response.statusCode).toEqual(200)
            expect(body).not.toBeNull()
            expect((typeof body)).toBe('object')
            expect(body.error).not.toBeDefined()
            expect(body.trades.length).toEqual(100)
            done()
        })
        
    })

    it('Fetches the 50 best priced BUY orders for a market', function(done) {

        mintpal.orders('DRK', 'BTC', 'BUY', function(err, body, response){
            expect(err).toBeNull()
            expect(response.statusCode).toEqual(200)
            expect(body).not.toBeNull()
            expect((typeof body)).toBe('object')
            expect(body.error).not.toBeDefined()
            expect(body.orders).toBeDefined()
            expect(body.type).toEqual('BUY')
            done()
        })
        
    })

    it('Fetches the 50 best priced SELL orders for a market using shorthand', function(done) {

        mintpal.orders('DRK/BTC', 'SELL', function(err, body, response){
            expect(err).toBeNull()
            expect(response.statusCode).toEqual(200)
            expect(body).not.toBeNull()
            expect((typeof body)).toBe('object')
            expect(body.error).not.toBeDefined()
            expect(body.orders).toBeDefined()
            expect(body.type).toEqual('SELL')
            done()
        })
        
    })

    it('Fetches the 50 best priced BUY orders for a market using shorthand', function(done) {

        mintpal.orders('DRK/BTC', function(err, body, response){
            expect(err).toBeNull()
            expect(response.statusCode).toEqual(200)
            expect(body).not.toBeNull()
            expect((typeof body)).toBe('object')
            expect(body.error).not.toBeDefined()
            expect(body.orders).toBeDefined()
            expect(body.type).toEqual('BUY')
            done()
        })
        
    })


    it('Fetches chartdata for a given market id (private method)', function(done) {
        var drk_code = 21
        mintpal._chartdata(drk_code, '6hh', function(err, body, response){
            expect(err).toBeNull()
            expect(response.statusCode).toEqual(200)
            expect(body).not.toBeNull()
            expect(Array.isArray(body)).toEqual(true)
            done()
        })
        
    })

    it('Fetches chart for a given market id shorthand 1', function(done) {
        var drk_code = 25
        mintpal.chart(drk_code, function(err, body, response){
            expect(err).toBeNull()
            expect(response.statusCode).toEqual(200)
            expect(body).not.toBeNull()
            expect(Array.isArray(body)).toEqual(true)
            done()
        })
        
    })

    it('Fetches chart for a given market id shorthand 2', function(done) {
        var drk_code = 5
        mintpal.chart(drk_code, '6hh', function(err, body, response){
            expect(err).toBeNull()
            expect(response.statusCode).toEqual(200)
            expect(body).not.toBeNull()
            expect(Array.isArray(body)).toEqual(true)
            done()
        })
        
    })

    it('Fetches chart for a given market id shorthand 3', function(done) {
        mintpal.chart('DRK/BTC', function(err, body, response){
            expect(err).toBeNull()
            expect(response.statusCode).toEqual(200)
            expect(body).not.toBeNull()
            expect(Array.isArray(body)).toEqual(true)
            done()
        })
        
    })

    it('Fetches chart for a given market id shorthand 4', function(done) {
        mintpal.chart('DRK/BTC', '6hh', function(err, body, response){
            expect(err).toBeNull()
            expect(response.statusCode).toEqual(200)
            expect(body).not.toBeNull()
            expect(Array.isArray(body)).toEqual(true)
            done()
        })
        
    })

    it('Fetches chart for a given market id shorthand 5', function(done) {
        mintpal.chart('DRK', 'BTC', function(err, body, response){
            expect(err).toBeNull()
            expect(response.statusCode).toEqual(200)
            expect(body).not.toBeNull()
            expect(Array.isArray(body)).toEqual(true)
            done()
        })
        
    })

    it('Fetches chart for a given market id shorthand 6', function(done) {
        mintpal.chart('DRK', 'BTC', '6hh', function(err, body, response){
            expect(err).toBeNull()
            expect(response.statusCode).toEqual(200)
            expect(body).not.toBeNull()
            expect(Array.isArray(body)).toEqual(true)
            done()
        })
        
    })


})