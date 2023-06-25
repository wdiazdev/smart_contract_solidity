const {expect} = require('chai');
const {ethers} = require('hardhat');
const { describe } = require('mocha');

describe('GenesisContract', () =>{
    let counter;

    beforeEach( async () => {
        const Counter = await ethers.getContractFactory('GenesisContract')
        counter = await Counter.deploy("My Counter",1)
    });

    describe('Deployment', () =>{
        it('Sets the initial count', async () =>{
            expect(await counter.count()).to.equal(1);
        })
    
        it('Sets the initial name', async () =>{
            expect(await counter.name()).to.equal('My Counter')
        })
    })

    describe('Reads count and name', () =>{
        it('reads the name from the "name" public variable', async () =>{
            expect(await counter.name()).to.equal('My Counter')
        })

        it('reads the name from the "getName()" function', async () =>{
            expect(await counter.getName()).to.equal('My Counter')
        })

        it('reads the count from the "count" public variable', async () =>{
            expect(await counter.count()).to.equal(1)
        })

        it('reads the count from the "getCount()" function', async () =>{
            expect(await counter.getCount()).to.equal(1)
        })
    })

    describe('Counting', () =>{
        let transaction

        it('Increments the count', async () =>{
         transaction = await counter.increment()
           await transaction.wait()

           expect(await counter.count()).to.equal(2)

           transaction = await counter.increment()
           await transaction.wait()

           expect(await counter.count()).to.equal(3)
        })

        it('Decrements the count', async () =>{
          transaction = await counter.decrement()
           await transaction.wait()

           expect(await counter.count()).to.equal(0)

           await expect(counter.decrement()).to.be.reverted
        })
    })

});
