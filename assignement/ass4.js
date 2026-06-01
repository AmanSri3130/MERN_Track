// Functions
// Write a function called describeCountry which takes three parameters: country, population and capitalCity. Based on this input, the function returns a string with this format: 'Finland has 6 million people and its capital city is Helsinki'.

// Call this function 3 times, with input data for 3 different countries. Store the returned values in 3 different variables, and log them to the console.

function describeCountry(country, population, capitalCity) {
    console.log(`${country} has ${population} million people and its capital city is ${capitalCity}.`)
}

describeCountry('finland', 83767617391, 'helsinki');
describeCountry('india', 83767617391, 'delhi');
describeCountry('america', 83767617391, 'newyork');