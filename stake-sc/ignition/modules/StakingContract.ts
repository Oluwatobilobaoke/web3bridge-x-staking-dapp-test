import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const stakeToken = "0xa43219063de1caefd06b4dbb9e4941cb40f96ce5";
const stakeRewardToken = "0xB41ebA4E68a21A63102e35Cb6D62E6EA8a1A21Df";

const StakeRewardTokenModule = buildModule("StakeRewardTokenModule", (m) => {
  const rewardToken = m.contract("StakingPool", [stakeToken, stakeRewardToken]);

  return { rewardToken };
});

export default StakeRewardTokenModule;

// npx hardhat ignition deploy ./ignition/modules/StakeRewardToken.ts --network sepolia
// 0x1ddfa38613be576b546b4642768292cdc0991573;
