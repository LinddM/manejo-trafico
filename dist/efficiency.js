/* eslint-disable no-unused-vars */
var arrivals
var departures
var circulation

var exitTimes = 0
var exitSpeeds = 0
var carsQuantity = 0
var historic = []

// eslint-disable-next-line no-undef
var circulationLabel = new PointText(new Point(10, 20))
// eslint-disable-next-line no-undef
var averageExitLabel = new PointText(new Point(795, 20))
// eslint-disable-next-line no-undef
var averageSpeedLabel = new PointText(new Point(795, 40))

function arrivalsAndDepartures () {
  setTimeout(() => {
    circulation = departures / arrivals
    circulationLabel.justification = 'left'
    circulationLabel.fillColor = 'black'
    circulationLabel.content = `Circulacion: ${circulation.toFixed(2)} \nEntradas: ${arrivals} \nSalidas: ${departures}`

    arrivals = departures = 0
    arrivalsAndDepartures()

    historic.push(circulation)
  // eslint-disable-next-line no-undef
  }, 1000 * timeFrame)
}

arrivalsAndDepartures()

function exitAverageTimes () {
  setTimeout(() => {
    averageExitLabel.justification = 'right'
    averageExitLabel.fillColor = 'black'

    averageSpeedLabel.justification = 'right'
    averageSpeedLabel.fillColor = 'black'

    averageExitLabel.content = `Tiempo promedio del sistema: ${Math.floor(exitTimes / carsQuantity)}ms`
    averageSpeedLabel.content = `Velocidad promedio del sistema: ${(Math.floor(exitSpeeds / carsQuantity))}m/s`

    if (carsQuantity === 15) {
      exitTimes = 0
      carsQuantity = 0
    }
    exitAverageTimes()
    // eslint-disable-next-line no-undef
  }, 1000 * timeFrame)
}

exitAverageTimes()
