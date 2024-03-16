import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const initialOwner = "0x77158c23cc2d9dd3067a82e2067182c85fa3b1f6";

const StakeTokenModule = buildModule("StakeTokenModule", (m) => {
  const stakeToken = m.contract("ERC20Token", [initialOwner, "BOOLA", "BLA"]);

  return { stakeToken };
});



export default StakeTokenModule;



// npx hardhat ignition deploy ./ignition/modules/StakeToken.ts --network sepolia

// 0xa43219063de1caefd06b4dbb9e4941cb40f96ce5;
