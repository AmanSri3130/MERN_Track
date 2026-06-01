// Function Declarations vs. Expressions
// The world population is 7900 million people. Create a function declaration called percentageOfWorld1 which receives a population value, and returns the percentage of the world population that the given population represents. For example, China has 1441 million people, so it's about 18.2% of the world population.

// To calculate the percentage, divide the given population value by 7900 and then multiply by 100.

// Call percentageOfWorld1 for 3 populations of countries of your choice, store the results into variables, and log them to the console.

// Create a function expression which does the exact same thing, called percentageOfWolrd2, and also call it with 3 country populations (can be the same population


function percentageOfWorld1(population) {
    return (population / 7900) * 100;
}

const china = percentageOfWorld1(1441);
const india = percentageOfWorld1(1380);
const usa = percentageOfWorld1(331);

console.log(china, india, usa);

const percentageOfWorld2 = function(population) {
    
}
const china2 = percentageOfWorld2(1441);
const india2 = percentageOfWorld2(1380);
const usa2 = percentageOfWorld2(331);

console.log(china2, india2, usa2);

