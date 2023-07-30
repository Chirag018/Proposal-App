import Link from "next/link";
import type { NextPage } from "next";

export const NUMBER_REGEX = /^\.?\d+\.?\d*$/;

const HomePage: NextPage = () => {
  return (
    <>
      <div className="bg-gray-100 h-screen flex flex-col py-24 items-center">
        <div className="max-w-4xl mx-auto px-6 pt-20 pb-12 text-center">
          <h1 className="text-5xl font-bold mb-6 text-blue-600">Proposals</h1>
          <p className="text-lg text-gray-700 mb-10">Funding for showcasing Proof of Work by extending knowledge towards Ethereum</p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/CreateProposal"
              className="btn btn-primary py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-200"
            >
              Create A Proposal
            </Link>
            <Link
              href="/Donate"
              className="btn btn-secondary py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-200"
            >
              Donate To A Proposal
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
