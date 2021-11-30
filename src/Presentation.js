import { countryCodes } from "./country-codes"

const Presentation = ({ weather, requestError, location }) => {
  if (weather === null) return <div>NO WEATHER</div>

  const degreesToCompass = (deg) => {
    let val = Math.round((deg / 22.5) + .5)
    let compass = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]
    return compass[(val % 16)]
  }

  const getCountry = (code) => {
    const cObjArr = countryCodes.filter(c => {
      return c.code === code
    })

    console.log('cObj is', cObjArr)
    return cObjArr[0].country
  }

  console.log("Weather is", weather)

  const { main, name, sys, wind } = weather
  const { description, icon } = weather.weather[0]
  const { country } = sys
  const { humidity, temp } = main
  const { deg, speed } = wind
  const windDirection = degreesToCompass(deg)

  const src = `../icons/${icon}.png`
  const countryName = getCountry(country)

  return (
    <div className="presentation-section">
      <div className="presentation-city">
        {requestError ? <p>No city with name {location}</p>
          : <p>Weather in {name}, {countryName}</p>}
      </div>

      <div className="presentation-weather" style={{ display: requestError ? 'none' : 'grid' }}>
        <div className="presentation-text">
          <p><strong>Temperature:</strong> </p>
          <p><strong>Humidity:</strong> </p>
          <p><strong>Wind speed:</strong> </p>
          <p><strong>Description:</strong> </p>
        </div>

        <div className="presentation-value">
          <p>{Math.round(temp)} &#176;C</p>
          <p>{humidity} %</p>
          <p>{Math.round(speed)} m/s {windDirection}</p>
          <p>{description}</p>
        </div>
      </div>

      <div className="presentation-image" style={{ display: requestError ? 'none' : 'block' }}>
        <img src={src} alt={icon} width="100" height="100" />
      </div>
    </div>
  )
}

export default Presentation
