# Goalie
A prototype to demonstrate how one might use web technologies to interact with a decentralised application on the ethereum blockchain.

## Application concept
The purpose of the application is to allow a user to track their goals and incentivize themself to complete them. It works by making users stake an amount of ether to the goal with a deadline. It only allows users to withdraw their money after a friend has approved that the goal is completed and the deadline has passed.

If the goal is not approved and the deadline has passed a beneficiary set by the goal owner can withdraw the money instead of the owner.

### Requirements
1. A user should be able to save a goal on the blockchain.
2. A goal should be able to hold money until the goal is completed.
3. A goal must be approved by a friend to release money back to the owner.
4. If the goal is not approved the money should be released to a third party beneficiary.

## Architecture
The application can be split in two main parts:

### Ethereum contracts
The part on the blockchain consists of two contracts, GoalieFactory and Goalie.

* GoalieFactory is responsible for deploying instances of the goalies and keeping track of their addresses on the blockchain.
* Goalie contains the main application state and logic such as description, owner/friend/beneficiary addresses and the functions to approve and complete the goal. It also hold the balance of ether staked by the owner.

The reasoning for this is that iterating over data is very expensive on the blockchain, by storing the goalies as separate instances on the blockchain and just keeping track of the addresses in the factroy, the amount of data having to be iterated over can be minimized. This lessens the gas costs for the users as more and more goals are added.

### Next.js frontend
The frontend applications is built using [Next.js](https://nextjs.org/) and [React](https://reactjs.org/).
[Semantic UI React](https://github.com/Semantic-Org/Semantic-UI-React) is used to build the UI components.

There are 3 pages/views `index.jsx` is the home page and shows a list of goals, `GoalieDetails.jsx` shows all details of a specific goal and `GoalieNew.jsx` shows a form where the user can add new goals.

### Design history
I've made many tries over the years to make this application work. It used to be really hard (still is somewhat) to figure out how to design an application in Solidity. You can't really use the knowledge from web development and since running code on ethereum costs actual money you really have to think about how to avoid rising gas costs, for example avoiding storing state and loops as much as possible. The information available on google is not very good, although it has gotten much better the last year. On top of that the software was incredibly buggy and sometimes your code should've worked but bugs in the platform caused it not to, it made it very hard to learn since I was never sure if I was doing something wrong or if it's was a bug from the ethereum developers. I tried asking around at forums and chats for help but no one really responded, it was part in what made me give up for while.

This summer I made another try using a couple specialised ethereum development tools [Truffle](https://github.com/trufflesuite/truffle) and [Drizzle](https://github.com/trufflesuite/drizzle). I figured they would help me learn and build my application but they turned out to be another layer of possible bugs. After A LOT of trial and error I finally managed to get a working prototype but the code looked like a mess and the application looked the same. The frameworks had helped me understand some parts of ethereum but I still felt really lost and wasn't sure how to fix my code, it was like a house of cards.

Luckily I happend to find a course at Udemy.com by a man named Stephen Grider ([Link](https://www.udemy.com/ethereum-and-solidity-the-complete-developers-guide/)). He went over the concepts from the bottom up, with as little abstraction layers as possible. After watching it all I found myself much more understanding about the concepts in ethereum and decided to do a complete rewrite using Next.js and Semantic-UI as used by Mr Grider. What had taken months to patch together took about a week to rewrite and get up to par in features with my old design (a few more weeks to fix bugs and design after that though).

The current design is faster, there is less lines of code and it's much easier to read and it was actually quite fun in the end.

## Testing
See test documentation
* Test report 
* Test cases

## Run locally
Note: to fully use the application the browser plugin [MetaMask](https://metamask.io/) is required.

Before starting make sure you have wallet with ether, preferably on a testnet. I've used MetaMask and collected ether from a faucet [https://faucet.rinkeby.io/](https://faucet.rinkeby.io/) in my development process. You also need to set up an account with Infura [https://infura.io/](https://infura.io/).

Then copy the mnemonic from your wallet/MetaMask and the infura API-key for the rinkeby test network to the `.env` file.

Steps: 
1. Run `npm install`.
2. Run `node ethereum/compile.js` to compile the contracts.
3. Run `node ethereum/deploy.js`.
4. Copy the address from the terminal window to the file `etherum/factory.js`.
5. Run `npm run build` to build the Next.js application.
6. Run `npm start` to start the application in production mode or `npm run dev` to start in dev mode.

## Possible future improvments
Some features I would like to add if I work more on this in the future.
* Make it possible to have multiple friends to confirm a goal is complete.
* Improve the design and think more about how the applications is supposed to be used.
* Add more serverside logic to enable a social layer and better filtering options.
  (By social layer I mean implementing a tradional database so users can keep track of their friends and possible beneficiaries, it's probably possible to build on the blockchain but I think it will be wiser to do it tradionally and keep the ethereum part as small as possible).