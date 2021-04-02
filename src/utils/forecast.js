const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5c674efc48904b6b51e7715e14dab460&query=' + encodeURIComponent(longitude) +',' + encodeURIComponent(latitude) + '&units=m'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Cannot connect', undefined)
        }else if (body.error){
            callback('Cannot find location, please try a new location', undefined)
            console.log(url)
        }else{
            callback(undefined, 'The current weather is ' + body.current.weather_descriptions[0] + ', the temperature is ' + body.current.temperature + 'c')
        }
    })
}

module.exports = forecast