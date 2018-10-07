/* Compile script by Stephen Grider https://github.com/StephenGrider/EthereumCasts
*  Modified by: Micael Persson
*/
/* eslint-disable */

const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const goaliePath = path.resolve(__dirname, 'contracts', 'Goalie.sol');

const source = fs.readFileSync(goaliePath, 'utf8');
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':', '') + '.json'),
    output[contract]
  );
}