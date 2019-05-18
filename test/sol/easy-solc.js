const solc = require('solc')

const easySolc = (contractName, src) => {
  const out = JSON.parse(solc.compile(JSON.stringify({
    language: 'Solidity',
    sources: {
      [ contractName + '.sol' ]: {
        content: src
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': [ '*' ]
        }
      }
    }
  })));
  if (out.errors && out.errors.length && out.errors.some(err => err.severity != 'warning')) {
    const toThrow = new Error('solc error, see "errors" property');
    toThrow.errors = out.errors;
    console.log(out.errors)
    throw toThrow;
  }
  const {
    abi,
    evm: {
      bytecode: {
        object: bytecode
      },
      deployedBytecode: {
        object: deployedBytecode
      }
    }
  } = out.contracts[contractName + '.sol'][contractName];
  return {
    abi,
    bytecode: '0x' + bytecode,
    deployedBytecode: '0x' + deployedBytecode
  };
};

module.exports = easySolc;
