var Mintpal = require('../index')

describe('Mintpal v1 API call', function () {

    var mintpal = new Mintpal()
    
    beforeEach(function() {

    })


    it('Provides an overview of all the markets', function(done) {

        mintpal.market_summary(function(err, body, response){
            expect(err).toBeNull()
            expect(response.statusCode).toEqual(200)
            expect(body).not.toBeNull()
            expect((typeof body)).toBe('object')
            expect(body.error).not.toBeDefined()
            done()
        })

    })

    it('Provides an overview of the LTC market', function(done) {

        mintpal.market_summary('LTC', function(err, body, response){
            expect(err).toBeNull()
            expect(response.statusCode).toEqual(200)
            expect(body).not.toBeNull()
            expect((typeof body)).toBe('object')
            expect(body.error).not.toBeDefined()
            done()
        })
        
    })

    it('Provides an overview of the BTC market', function(done) {

        mintpal.market_summary('BTC', function(err, body, response){
            expect(err).toBeNull()
            expect(response.statusCode).toEqual(200)
            expect(body).not.toBeNull()
            expect((typeof body)).toBe('object')
            expect(body.error).not.toBeDefined()
            done()
        })
        
    })

    it('Provides the statistics for a single market (DRK/BTC)', function(done) {

        mintpal.stats('DRK', 'BTC', function(err, body, response){
            expect(err).toBeNull()
            expect(response.statusCode).toEqual(200)
            expect(body).not.toBeNull()
            expect((typeof body)).toBe('object')
            expect(body.error).not.toBeDefined()
            done()
        })
        
    })

    it('Fetches the last 100 trades for a given market (DRK/BTC)', function(done) {

        mintpal.trades('DRK', 'BTC', function(err, body, response){
            expect(err).toBeNull()
            expect(response.statusCode).toEqual(200)
            expect(body).not.toBeNull()
            expect((typeof body)).toBe('object')
            expect(body.error).not.toBeDefined()
            done()
        })
        
    })

    it('Fetches the 50 best priced orders of a given type for a given market (DRK/BTC)', function(done) {

        mintpal.orders('DRK', 'BTC', 'BUY', function(err, body, response){
            expect(err).toBeNull()
            expect(response.statusCode).toEqual(200)
            expect(body).not.toBeNull()
            expect((typeof body)).toBe('object')
            expect(body.error).not.toBeDefined()
            done()
        })
        
    })

    it('Fetches chart for a given market (DRK/BTC)', function(done) {

        mintpal.chart('DRK', 'BTC', '6hh', function(err, body, response){
            expect(err).toBeNull()
            expect(response.statusCode).toEqual(200)
            expect(body).not.toBeNull()
            expect((typeof body)).toBe('object')
            expect(body.error).not.toBeDefined()
            done()
        })
        
    })

    it('Fetches chart for a given market id (DRK/BTC)', function(done) {
        var drk_code = 21
        mintpal.chartdata(drk_code, '1DD', function(err, body, response){
            expect(err).toBeNull()
            expect(response.statusCode).toEqual(200)
            expect(body).not.toBeNull()
            expect((typeof body)).toBe('object')
            expect(body.error).not.toBeDefined()
            done()
        })
        
    })



})