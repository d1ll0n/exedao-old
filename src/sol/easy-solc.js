import * as wrapper from 'solc/wrapper'
const solc = wrapper(window.Module)

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
  if (out.errors && out.errors.length) {
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

export default easySolc;
