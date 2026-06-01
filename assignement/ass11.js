// Values and Variables
// Declare variables called country, continent and population and assign their values according to your own country (population in millions).

// Log their values to the console.

var country ="india";
let continent ="asia";
let population = 1400;

console.log(country,continent,population);
// Basic Operators
// If your country's population is greater than 33 million, log a string like this to the console: 'Portugal's population is above average'. Otherwise, log a string like 'Portugal's population is  below average' - replace "Portugal" with the name of your country

if(population>33){
    
    console.log(`${country}'s population is above average`);
}
else{
    console.log(`${country}'s population is below average`);
}

// Divide the population of your country by 2 (rounded down) and log the result to the console.

console.log(Math.floor(population/2));

// Increase the population of your country by 1 and log the result to the console.

console.log(population+1);

// Decrease the population of your country by 2 and log the result to the console.

console.log(population-2);
// Your country's population is now 14 million. Log the result to the console.

console.log(population);
