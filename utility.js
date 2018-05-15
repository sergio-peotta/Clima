var getCelsius = (fahrenheit, callback) => {
    var celsius = (fahrenheit - 32) / 1.8;
    return Math.round(celsius * 10) / 10;
};

module.exports.getCelsius = getCelsius;
