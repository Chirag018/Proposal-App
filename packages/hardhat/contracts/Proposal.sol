//SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;

contract Proposal {
	constructor() {}

	struct Proposals {
		uint index;
		string proposalName;
		string proposalDescription;
		address beneficiary;
		uint req_amt;
		uint donations;
		uint start;
		uint end;
		bool finalized;
	}
	mapping(uint => mapping(address => bool)) public donated;
	mapping(uint => mapping(address => uint)) public donationAmt;

	Proposals[] public createProposals;

	event ProposalCreated(
		string proposalName,
		string proposalDescription,
		address beneficiary,
		uint req_amt,
		uint end
	);
	event Donations(uint donations);

	function createProposal(
		string memory _proposalName,
		string memory _proposalDescription,
		address _beneficiary,
		uint _reqAmt,
		uint _durationDays
	) public {
		uint endTime = block.timestamp + (_durationDays * 1 minutes);
		createProposals.push(
			Proposals({
				proposalName: _proposalName,
				proposalDescription: _proposalDescription,
				beneficiary: _beneficiary,
				req_amt: _reqAmt,
				start: block.timestamp,
				end: endTime,
				finalized: false,
				index: createProposals.length,
				donations: 0
			})
		);
		emit ProposalCreated(
			_proposalName,
			_proposalDescription,
			_beneficiary,
			_reqAmt,
			endTime
		);
	}

	function getProposal() public view returns (Proposals[] memory) {
		Proposals[] memory proposals = new Proposals[](createProposals.length);
		for (uint i = 0; i < createProposals.length; i++) {
			Proposals memory proposal = createProposals[i];
			proposals[i] = proposal;
		}
		return proposals;
	}

	function donate(uint proposalId) public payable {
		Proposals storage proposal = createProposals[proposalId];
		require(block.timestamp < proposal.end, "Donation period has ended");
		donated[proposalId][msg.sender] = true;
		donationAmt[proposalId][msg.sender] += msg.value;
		uint amt = msg.value;
		proposal.donations += amt;
		emit Donations(proposal.donations);
	}

	function finalize(uint proposalId) public payable {
		Proposals storage proposal = createProposals[proposalId];
		require(!proposal.finalized, "already finalized");
		require(
			block.timestamp >= proposal.end,
			"donation period has not ended yet"
		);
		proposal.finalized = true;
		(bool sent, ) = proposal.beneficiary.call{ value: proposal.donations }(
			""
		);
		require(sent, "failed to send ether");
		delete proposal.donations;
	}

	function cancelProposal(uint256 proposalId) public payable {
		Proposals storage proposal = createProposals[proposalId];
		require(donated[proposalId][msg.sender], "sender has not donated yet");
		require(!proposal.finalized, "proposal has already been finalized");
		require(block.timestamp < proposal.end, "donation period has ended");
		uint256 amount = donationAmt[proposalId][msg.sender];
		donationAmt[proposalId][msg.sender] = 0;
		donated[proposalId][msg.sender] = false;
		proposal.donations -= amount;
		(bool sent, ) = msg.sender.call{ value: amount }("");
		require(sent, "Failed to send Ether!!");
	}
}
