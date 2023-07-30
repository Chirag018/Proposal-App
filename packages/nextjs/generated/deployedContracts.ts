const contracts = {
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        Proposal: {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "donations",
                  type: "uint256",
                },
              ],
              name: "Donations",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "string",
                  name: "proposalName",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "proposalDescription",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "beneficiary",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "req_amt",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "end",
                  type: "uint256",
                },
              ],
              name: "ProposalCreated",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "proposalId",
                  type: "uint256",
                },
              ],
              name: "cancelProposal",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_proposalName",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "_proposalDescription",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "_beneficiary",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_reqAmt",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_durationDays",
                  type: "uint256",
                },
              ],
              name: "createProposal",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "createProposals",
              outputs: [
                {
                  internalType: "uint256",
                  name: "index",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "proposalName",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "proposalDescription",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "beneficiary",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "req_amt",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "donations",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "start",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "end",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "finalized",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "proposalId",
                  type: "uint256",
                },
              ],
              name: "donate",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "donated",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "donationAmt",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "proposalId",
                  type: "uint256",
                },
              ],
              name: "finalize",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "getProposal",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "index",
                      type: "uint256",
                    },
                    {
                      internalType: "string",
                      name: "proposalName",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "proposalDescription",
                      type: "string",
                    },
                    {
                      internalType: "address",
                      name: "beneficiary",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "req_amt",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "donations",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "start",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "end",
                      type: "uint256",
                    },
                    {
                      internalType: "bool",
                      name: "finalized",
                      type: "bool",
                    },
                  ],
                  internalType: "struct Proposal.Proposals[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
