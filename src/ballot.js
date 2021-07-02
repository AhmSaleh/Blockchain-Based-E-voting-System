import web3 from "./web3";

const address = "0x383ed8d23f404213103f007f726075d8e95804e9";

const api = [
  {
    constant: false,
    inputs: [
      {
        name: "candidateName",
        type: "string",
      },
    ],
    name: "addCandidate",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "index",
        type: "uint256",
      },
    ],
    name: "removeCandidate",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "candidateIndex",
        type: "uint256",
      },
    ],
    name: "vote",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    constant: true,
    inputs: [],
    name: "admin",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    name: "candidates",
    outputs: [
      {
        name: "name",
        type: "string",
      },
      {
        name: "votesCount",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "address",
      },
    ],
    name: "voters",
    outputs: [
      {
        name: "voted",
        type: "bool",
      },
      {
        name: "candidate",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "winnerName",
    outputs: [
      {
        name: "winnerName_",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "winningCandidate",
    outputs: [
      {
        name: "winningCandidate_",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

export default new web3.eth.Contract(api, address);
