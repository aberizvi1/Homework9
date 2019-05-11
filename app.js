var tableData = data;

// select variables
var ufoTable = d3.select('#ufo-table');
var filterTable = d3.select('#filter-btn');

// Date Search

// function to grab user input, filter data and append table
function dateSelect() {
    // Prevent the page from refreshing
    event.preventDefault();

    // change date format to datetime
    tableData.forEach(row => row.datetime = new Date(row.datetime));

    // save user input
    // d3 object
    var userDate = d3.select('#datetime').property('value');
    console.log(userDate);
    // format to datetime
    var userDateFormatted = new Date(userDate);
    console.log(userDateFormatted);

    // filter data table by user input
    // add if else to enable non-date searches
    if (userDate !== '') {
        var newData = tableData.filter(function(row) {
            var rowDate = row.datetime;
            return rowDate.getTime() === userDateFormatted.getTime();
        });
    }

    else {
        var newData = tableData;
    };
    
    var finalData = filterSightings(newData);
    console.log(finalData);

    // populate table
    tableAppend(finalData);
};

// add filter for state input, country input and shape input
function buildFilter() {
    // add array to hold all filter key-value pairs
    var inputArray = {};

    // select input value, log input value, then append non-null values to array
    var stateInput = d3.select('#stateSelect').property('value');
    console.log(stateInput);
    if (stateInput !== '') {
        inputArray['state'] = stateInput;
    };
    
    // select input value, log input value, then append non-null values to array
    var countryInput = d3.select('#countrySelect').property('value');
    console.log(countryInput);
    if (countryInput !== '') {
        inputArray['country'] = countryInput.toLowerCase();
    };
   
    // select input value, log input value, then append non-null values to array
    var shapeInput = d3.select('#shapeSelect').property('value');
    console.log(shapeInput);
    if (shapeInput !== '') {
        inputArray['shape'] = shapeInput;
    };
    
    console.log(inputArray);
    return inputArray;
};

// filter array for state, country and shape inputs
function filterSightings(data, inputArray) {
    var inputArray = buildFilter();
    // filter sighting data with function
    return data.filter(function(sighting) {
        // for key in object, filter array
        return Object.keys(inputArray).every((key) => sighting[key] === inputArray[key]);
    });
};
    


//     filter by list of input[key] one at a time

//     var newData = data.filter(function (sighting) {
//         return sighting.state === stateInput &&
//                 sighting.country === countryInput &&
//                 sighting.shape === shapeInput
//       });
// }

// function to append table
function tableAppend(sightingList) {

    // format date to string
    sightingList.forEach(sighting => sighting.datetime = sighting.datetime.toDateString());

    // add data to table
    // select all tr elements
    var tableBody = d3.select("tbody").selectAll("tr").data(sightingList);

    // append new rows and merge with selected rows
    tableBody.enter().append("tr").merge(tableBody)
    // add html rows
    .html(function(sighting) {
      return `<td>${sighting.datetime}</td>
              <td>${sighting.city}</td>
              <td>${sighting.state}</td>
              <td>${sighting.country}</td>
              <td>${sighting.shape}</td>
              <td>${sighting.durationMinutes}</td>
              <td>${sighting.comments}</td>`;
    });
  
    // remove any extra rows
    tableBody.exit().remove();

};

// user input function section
// set function to act on datetime input
filterTable.on('click', dateSelect);


// Level 2: Multiple Search Categories (Optional)

// code to find unique states/country/shapes
var shapes = data.map(sighting => sighting.shape);
var uniqueShapes = Array.from(new Set(shapes));
console.log(uniqueShapes);

// append shapes to shapeSelect
d3.select("#shapeSelect").selectAll("option")
    .data(uniqueShapes).enter()
    .append("option")
    .text(function(shape) {
      return shape;
    });



// // 35 states, use text input for states
// var states = data.map(sighting => sighting.state);
// var uniqueStates = Array.from(new Set(states));
// console.log(uniqueStates);


// // only 2 countries, dropdown menu
// var countries = data.map(sighting => sighting.country);
// var uniqueCountries = Array.from(new Set(countries));
// console.log(uniqueCountries);