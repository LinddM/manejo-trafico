/* eslint-disable no-unused-vars */
var arrivals
var departures
var circulation

var exitTimes = 0
var carsQuantity = 0
var historic = []

// eslint-disable-next-line no-undef
var circulationLabel = new PointText(new Point(200, 50))
// eslint-disable-next-line no-undef
var averageExitLabel = new PointText(new Point(200, 300))

function arrivalsAndDepartures () {
  setTimeout(() => {
    circulation = departures / arrivals
    circulationLabel.justification = 'left'
    circulationLabel.fillColor = 'black'
    circulationLabel.content = `Circulacion: ${circulation} \nEntradas: ${arrivals} \nSalidas: ${departures}`

    arrivals = departures = 0
    arrivalsAndDepartures()

    historic.push(circulation)
  // eslint-disable-next-line no-undef
  }, 1000 * timeFrame)
}

arrivalsAndDepartures()

function exitAverageTimes () {
  setTimeout(() => {
    averageExitLabel.justification = 'left'
    averageExitLabel.fillColor = 'black'

    averageExitLabel.content = `Tiempo promedio del sistema: ${Math.floor(exitTimes / carsQuantity)}ms`

    if (carsQuantity === 15) {
      exitTimes = 0
      carsQuantity = 0
    }
    exitAverageTimes()
  }, 1000 * timeFrame)
}

exitAverageTimes()
