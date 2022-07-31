# BLOCKCHAIN

## Truffle

### Installing truffle
Here make sure to first install truffle globally using
``` npm i truffle -g ```

### Testing with truffle
``` truffle test ```

### New Migration with truffle on rinkeby
``` truffle migrate --network rinkeby ```
This won't work when all the scripts in the migration folder have been successfully run.

### Migration when same Contracts have been updated
``` truffle migrate --network rinkeby --reset```
This resets all the migrations.

## PROJECT CONVENTIONS

| Identifier      | Rules | Example   |
| :---:        |    :----:   |          :---: |
| contract file name      | **UpperCamelCase**       | ```GovernmentOfficial.sol ```  |
| Contract name   | **UpperCamelCase** must be same as the file name        |  ``` contract GovernmentOfficial{ }```       |
| function name | **lowerCamelCase** Must be a verb phrase indicating the task being performed by the function  | ```function createMinedBatch(){ }``` | 
| variable name | **snake_case**  The name should clearly imply the data stored in the variable|   ``` uint256 mine_id; ```|
| Constants | **ALL_CAPS_SNAKE_CASE** | ``` uint MAX_LENGTH =10; ``` |


 



