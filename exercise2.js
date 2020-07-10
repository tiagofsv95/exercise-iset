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

function raplaceTag(stringArray) {
  let originalTag;
  let replaceTag;
  let stringTag;

  let response = stringArray.map( array => {
    originalTag = array[0];
    replaceTag = array[1];
    stringTag = array[2];

    let indexArray = []
    
    let finalString = stringTag;
  
    for(let i = 0; i < stringTag.length; i++) {
        if(indexArray.length%2 === 0 && stringTag[i] === '<'){
            indexArray.push(i);
        }
        if(Math.abs(indexArray.length%2 === 1) && stringTag[i] === '>') {
            indexArray.push(i);
        }
    }
    
    let replacedTag = [];

    for(let j = 0; j < indexArray.length/2; j++) {
    
      replacedTag.push(stringTag.substring(indexArray[2*j], indexArray[2*j+1] + 1), 
        stringTag.substring(indexArray[2*j], indexArray[2*j+1] + 1)
          .toLowerCase()
          .replace(new RegExp(originalTag.toLowerCase(), "g"), replaceTag));
      
      finalString = finalString.replace(replacedTag[2*j], replacedTag[2*j+1]);
    }

    return finalString;

  });

  return response;

}

function main() {
  // create a file to save the result
  const ws = fs.createWriteStream('./result2.txt');

  // lê um inteiro C com a quantidade de casos de testes
  const length = inputString.length;
  
  // declara um array com o número de casos de teste
  let stringArray = new Array(length/3);

  for(let i = 0; i < length/3 ; i++){
      
      stringArray[i] = new Array(3);
      for(let j = 0; j < 3; j++) {
          stringArray[i][j] = readLine();
      }
  }
  
  let result = raplaceTag(stringArray);

  ws.write(result.toString().replace(/,/g, '\n'));
  console.log('Saída:\n'+result.toString().replace(/,/g, '\n'))

  ws.end();
}
