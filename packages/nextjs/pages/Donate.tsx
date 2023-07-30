import { useState } from "react";
import { BigNumber, ethers } from "ethers";
import type { NextPage } from "next";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const NUMBER_REGEX = /^\.?\d+\.?\d*$/;

const Donate: NextPage = () => {
  // const [proposals, setProposals] = useState([]);
  const [index, setIndex] = useState(ethers.BigNumber.from("0"));

  const { data: proposal } = useScaffoldContractRead({
    contractName: "Proposal",
    functionName: "getProposal",
  });

  const proposalArr = typeof proposal === "object" ? Object.values(proposal) : [];
  const [donation, setdonation] = useState("0");

  const { writeAsync: donated } = useScaffoldContractWrite({
    contractName: "Proposal",
    functionName: "donate",
    value: donation,
    args: [index],
  });

  const handleDonate = async (proposalIndex: BigNumber) => {
    setIndex(proposalIndex);
    await donated({ recklessArgs: [proposalIndex] });
  };

  const { writeAsync: canceled } = useScaffoldContractWrite({
    contractName: "Proposal",
    functionName: "cancelProposal",
    args: [index],
  });

  const handlecancel = async (proposalIndex: BigNumber) => {
    setIndex(proposalIndex);
    await canceled({ recklessArgs: [proposalIndex] });
  };

  const { writeAsync: finalize } = useScaffoldContractWrite({
    contractName: "Proposal",
    functionName: "finalize",
    args: [index],
  });

  const handlefinalyze = async (proposalIndex: BigNumber) => {
    setIndex(proposalIndex);
    await finalize({ recklessArgs: [proposalIndex] });
  };

  return (
    <>
      {proposalArr
        // proposal.end is a BigNumber, so we need to convert it to a number and then compare it to the current time (You have .toString() on BigNumber to convert it to a string human readable string instead of 0x)
        .filter(proposal => proposal.finalized === false)
        .map(proposal => (
          <div key={proposal.index.toString()} className="max-w-6xl mx-auto py-12">
            <div className="bg-white rounded-lg shadow-md w-full px-6 py-8 md:mx-4 mb-6 md:mb-0 text-center overflow-auto justify-between flex-row">
              <h2 className="text-2xl font-bold mb-6">{proposal.proposalName}</h2>
              <p className="text-gray-600 mb-4 whitespace-normal break-words">
                Description: {proposal.proposalDescription}
              </p>
              <p className="text-gray-600 mb-4">
                {/* Thats how use show user the ETH (it basically divides by 10^18 and returns string) */}
                {/* Please feel free to checkout docs */}
                Requested Amount: {ethers.utils.formatEther(proposal.requested_amount)} ETH
              </p>
              <div className="flex items-center justify-center text-gray-600 mb-4">
                <p className="mr-2">Beneficiary:</p>
                <Address address={proposal.beneficiary} />
              </div>
              <p className="text-gray-600 mb-8">Donations: {ethers.utils.formatEther(proposal.donations)} ETH</p>
              <input
                className="w-48 px-4 py-2 mb-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                placeholder="ETH Donation"
                value={donation}
                onChange={e => setdonation(e.target.value)}
              />
              <div className="flex justify-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="flex flex-row space-x-4">
                    <button
                      className="flex-shrink-0 inline-flex items-center justify-center px-4 py-2 font-medium text-white bg-blue-500 border border-transparent rounded-lg shadow-sm transition duration-200 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue focus:border-blue-700 mb-4"
                      onClick={() => handleDonate(proposal.index)}
                    >
                      Donate
                    </button>
                    <button
                      className="flex-shrink-0 inline-flex items-center justify-center px-4 py-2 font-medium text-white bg-blue-500 border border-transparent rounded-lg shadow-sm transition duration-200 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue focus:border-blue-700 mb-4"
                      onClick={() => handlecancel(proposal.index)}
                    >
                      Refund
                    </button>
                    <button
                      className="flex-shrink-0 inline-flex items-center justify-center px-4 py-2 font-medium text-white bg-blue-500 border border-transparent rounded-lg shadow-sm transition duration-200 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue focus:border-blue-700 mb-4"
                      onClick={() => handlefinalyze(proposal.index)}
                    >
                      Finalize
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Donate;
