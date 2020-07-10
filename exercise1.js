'use strict';

const fs = require('fs');

let inputString = '';
let currentLine = 0;

// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}

// Read the file and print its contents.
fs.readFile('./'+process.argv[2], 'utf8', function(err, data) {
  if (err) throw err;
  inputString = data.replace(/\s*$/, '')
                  .split('\n')
                  .map(str => str.replace(/\s*$/, ''));
  console.log('Entrada:\n'+data);

  main();

});

function readLine() {
  return inputString[currentLine++];
}

function resolveStrings(stringArray) {
  let string1;
  let string2;
  let stringIncomplete;

  let canResolve;

  let response = stringArray.map( array => {
      string1 = array[0];
      string2 = array[1];
      stringIncomplete = array[2];

      let charOption1 = new Array(2);
      let charOption2 = new Array(2);
      
      for(let i = 0; i < stringIncomplete.length; i++) {
          
          canResolve = 'N';
          
          if (stringIncomplete[i] === '_') {
              if(string1[i] === string2[i]) {
                  return canResolve = 'N';
              }
              charOption1.push(string1[i]);
              charOption2.push(string2[i]);
          }
          
      }

      charOption1.forEach(char => {
          if (charOption2.includes(char)){
              return canResolve = 'Y';
          }
      });

      return canResolve;

  });

  return response
  
}

function main() {
  // create a file to save the result
  const ws = fs.createWriteStream('./result1.txt');

  // reads an integer C with the number of test cases
  const number = parseInt(readLine(), 10);
  
  // declare an array with a size of the number of test cases
  let stringArray = new Array(number);

  for(let i = 0; i < number ; i++){
      // creates an Array of string with the 2 words in
      // doubt and the word incomplete

      stringArray[i] = new Array(3);
      for(let j = 0; j < 3; j++) {
          stringArray[i][j] = readLine();
      }
  }
  
  // call the function to resolve
  let result = resolveStrings(stringArray);

  // write the response in the created file
  ws.write(result.toString().replace(/,/g, '\n'));
  
  // show on console the output result
  console.log('Saída:\n'+result.toString().replace(/,/g, '\n'))

  ws.end();
}
