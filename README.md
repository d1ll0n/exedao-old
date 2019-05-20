# EXEdao

##Inspiration
We wanted a dynamic DAO that wasn't limited to executing a handful of immutable functions that are determined at deployment.

##What it does
Deploys a contract with an immutable list of owner addresses and the number of these addresses that must approve execution. Members of the DAO can submit bytecode and once the threshold (specified in constructor) of signatories has been met, the contract will rewrite the bytecode to remove unsafe operations (SSTORE, DELEGATECALL), deploy the code as a new contract, execute it (by calling the fallback method) and then cause it to self-destruct.

The reason SSTORE and DELEGATECALL are disallowed is because if the signers had access to these opcodes, they could theoretically rewrite the contract storage to either remove one of the signatories or change the signature threshold for execution.

A function called kill that calls selfdestruct() is injected into the bytecode in our web compiler. Kill can optionally be replaced with an empty function so that the contract is not actually destroyed. This could be useful if you wanted to deploy a new contract from the DAO and transfer its funds in the process.

