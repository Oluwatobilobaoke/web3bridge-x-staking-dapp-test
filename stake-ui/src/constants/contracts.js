import { ethers } from "ethers";
import StakingAbi from "./stakingPoolAbi.json";
import TokenAbi from "./erc20Abi.json";

const stakingPoolAddress = import.meta.env.VITE_staking_contract_address;
const tokenAddress = import.meta.env.VITE_token_contract_address;
const rewardTokenAddress = import.meta.env.VITE_reward_token_contract_address;

export const getStakingPoolContract = (providerOrSigner) => {
  return new ethers.Contract(stakingPoolAddress, StakingAbi, providerOrSigner);
};

export const getTokenContract = (providerOrSigner) => {
  return new ethers.Contract(tokenAddress, TokenAbi, providerOrSigner);
};
export const getRewardTokenContract = (providerOrSigner) => {
  return new ethers.Contract(rewardTokenAddress, TokenAbi, providerOrSigner);
};
