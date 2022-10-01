// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import { IShop } from "./interfaces/IShop.sol";

contract Shop is Ownable, IShop {
	mapping(uint256 => uint256) internal itemPricesInUsd;
  AggregatorV3Interface public priceFeed;
	address payable public admin;

	constructor(address _priceFeedAddress) {
		admin = payable(msg.sender);
		priceFeed = AggregatorV3Interface(_priceFeedAddress);
	}

	// Only the owner can set price for the item
	function setItemPriceInUsd(uint256 itemId, uint256 itemPriceInUsd) external onlyOwner {
		itemPricesInUsd[itemId] = itemPriceInUsd;
		emit itemPriceSet(itemId, itemPriceInUsd);
	}

	function getItemPriceInUsd(uint256 itemId) public view returns (uint256) {
		return itemPricesInUsd[itemId];
	}

	function getItemPriceInEth(uint256 itemId) public view returns (uint256) {
		uint256 itemPriceInEth = (getItemPriceInUsd(itemId)  * 10 ** 20) / uint256(getLatestPriceEthUsd());
		return itemPriceInEth;
	}

	function getTotalAmountInUsd(uint256[] calldata itemIds, uint256[] calldata amounts) public view returns (uint256) {
		uint256 length = itemIds.length;
		require(amounts.length == length, "length not mactch");
		uint256 totalAmount = 0;

		for (uint256 i = 0; i < length; ++i) {
			totalAmount = totalAmount + itemPricesInUsd[itemIds[i]] * amounts[i];
		}
		return totalAmount;
	}

	function getTotalAmountInEth(uint256[] calldata itemIds, uint256[] calldata amounts) public view returns (uint256) {
		// pricefeed is 8 decimals
		// Eth is 18 decimals
		// Usd is 6 decimals
		// multiple with 10 ** (8 -6 + 18) = 10**20 to convert totalAmount into Eth wei
		uint256 totalAmount = (getTotalAmountInUsd(itemIds, amounts) * 10 ** 20) / uint256(getLatestPriceEthUsd());
		return totalAmount;
	}

	function buyItems(uint256[] calldata itemIds, uint256[] calldata amounts) payable external {
		uint256 payAmountInEth = getTotalAmountInEth(itemIds, amounts);
		require(msg.value == payAmountInEth, "pay amount not correct");
		// TODO: write transfer logic here if the items are on the blockchain (NFT, tokens)

		emit itemsBought(itemIds, amounts, payAmountInEth);
	}

	function getLatestPriceEthUsd() public view returns (int) {
		(
			/*uint80 roundID*/,
			int price,
			/*uint startedAt*/,
			/*uint timeStamp*/,
			/*uint80 answeredInRound*/
		) = priceFeed.latestRoundData();
		return price;
  }

	// only admin can use withdraw
	function withdraw() public {
		uint amount = address(this).balance;
		(bool success, ) = admin.call{value: amount}("");
		require(success, "Failed to send Ether");
	}
}