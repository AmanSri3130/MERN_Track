// Basic Operators
// If your country split in half, and each half would contain half the population, then how many people would live in each half?

// Increase the population of your country by 1 and log the result to the console.

// Finland has a population of 6 million. Does your country have more people than Finland?

// The average population of a country is 33 million people. Does you country have less people than the average country?

// Based on the variables you created, create a new variable description which contains a string with this format: 'Portugal is in Europe, and its 11 million people speak portuguese'.

const pop=100000;
const half=pop/2;
console.log(half);
pop++;
console.log(pop);
const finland=6;
const avg=33;
console.log(pop>finland);
console.log(pop<avg);
const description=`Portugal is in Europe, and its ${pop} million people speak portuguese`;
console.log(description);

// Strings and Template Literals
// Create a variable called 'myName' and set it equal to your name. Create a variable called 'myAge' and set it equal to your age. Using template literals, create a string that says "My name is [name] and I am [age] years old". Store the string in a variable called 'myString' and log it to the console.
const myName="Neha";
const myAge=21;
const myString=`My name is ${myName} and I am ${myAge} years old`;
console.log(myString);
