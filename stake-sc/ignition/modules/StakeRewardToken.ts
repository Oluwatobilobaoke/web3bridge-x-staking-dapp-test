import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const initialOwner = "0x77158c23cc2d9dd3067a82e2067182c85fa3b1f6";

const StakeRewardTokenModule = buildModule("StakeRewardTokenModule", (m) => {
  const rewardToken = m.contract("ERC20Token", [initialOwner, "Premio", "PMI"]);

  return { rewardToken };
});

export default StakeRewardTokenModule;


// npx hardhat ignition deploy ./ignition/modules/StakeRewardToken.ts --network sepolia
// 0xB41ebA4E68a21A63102e35Cb6D62E6EA8a1A21Df