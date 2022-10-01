// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IShop {
	event itemPriceSet(uint256 itemId, uint256 price);
	event itemsBought(uint256[] itemIds, uint256[] amounts, uint256 totalAmountInEth);
}