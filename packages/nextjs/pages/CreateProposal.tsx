import { useState } from "react";
import { NextPage } from "next";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { ethers } from "ethers";

export const NUMBER_REGEX = /^\.?\d+\.?\d*$/;

const CreateProposal: NextPage = () => {
  const [proposalName, setProposalName] = useState("");
  const [proposalDescription, setProposalDescription] = useState("");
  const [beneficiary, setBeneficiary] = useState("");
  const [requestedAmt, setReqAmt] = useState("0");
  const [duration, setDuration] = useState("0");

  const { writeAsync: createProposal } = useScaffoldContractWrite({
    contractName: "Proposal",
    functionName: "createProposal",
    args: [
      proposalName,
      proposalDescription,
      beneficiary,
      NUMBER_REGEX.test(requestedAmt) ? ethers.utils.parseEther(requestedAmt) : undefined,
      // Convert ethers.BigNumber to bigint using toBigInt()
      NUMBER_REGEX.test(duration) ? ethers.BigNumber.from(duration).toBigInt() : undefined,
    ],
  });
  

  const handleProposal = async () => {
    await createProposal();
  };

  return (
    <>
      <div className="flex flex-col items-center pt-10">
        <div className="flex flex-col items-center">
          <label className="text-gray-600 font-medium mb-2">Proposal Name:</label>
          <input
            type="text"
            className="border border-gray-400 rouded-lg py-2 px-3 mb-4 w-full"
            placeholder="Write ur Proposal"
            onChange={e => setProposalName(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start w-1/2">
          <label htmlFor="" className="text-gray-600 font-medium mb-2">
            Proposal Description{" "}
          </label>
          <textarea
            className="border border-gray-400 rouded-lg py-2 px-3 mb-4 w-full resize-none h-20 overflow-y-auto"
            placeholder="Proposal description"
            onChange={e => setProposalDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start w-1/2">
          <label htmlFor="" className="text-gray-600 font-medium mb-2">
            Beneficiary{" "}
          </label>
          <input
            className="border border-gray-400 rouded-lg py-2 px-3 mb-4 w-full resize-none h-20 overflow-y-auto"
            type="text"
            placeholder="Beneficiary adderss"
            onChange={e => setBeneficiary(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start w-1/2">
          <label htmlFor="" className="text-gray-600 font-medium mb-2">
            Amount in ETH{" "}
          </label>
          <input
            value={requestedAmt}
            className="border border-gray-400 rouded-lg py-2 px-3 mb-4 w-full resize-none h-20 overflow-y-auto"
            placeholder="Rquested amt in ETH"
            onChange={e => setReqAmt(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start w-1/2">
          <label htmlFor="" className="text-gray-600 font-medium mb-2">
            Duration{" "}
          </label>
          <input
            type="number"
            value={parseInt(duration)}
            className="border border-gray-400 rouded-lg py-2 px-3 mb-4 w-full resize-none h-20 overflow-y-auto"
            placeholder="Proposal Duration"
            onChange={e => setDuration(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white font-medium py-2 px-4 rounded-lg transition duration-200 hover:bg-blue-600"
          onClick={handleProposal}
        >
          Create Proposal
        </button>
        <div className="flex flex-col items-start w-1/2 py-4"></div>
      </div>
    </>
  );
};

export default CreateProposal;
