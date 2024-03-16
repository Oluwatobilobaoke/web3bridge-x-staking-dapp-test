import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import {
  getRewardTokenContract,
  getStakingPoolContract,
} from "../constants/contracts";
import { getReadWriteProvider } from "../constants/providers";
import { toast } from "react-hot-toast";
import { ethers } from "ethers";

const useCreatePool = () => {
  const { walletProvider } = useWeb3ModalProvider();

  if (!walletProvider) {
    return;
  }
  const provider = getReadWriteProvider(walletProvider);

  const createPool = async (rewardRate) => {
    const signer = await provider.getSigner();

    const stakingPoolContract = getStakingPoolContract(signer);
    const rewardTokenContract = getRewardTokenContract(signer);

    let toastId = toast.loading("Approving staking pool creation");

    try {
      const reward = ethers.parseEther("100");

      const approveTx = await rewardTokenContract.approve(
        import.meta.env.VITE_staking_contract_address,
        reward
      );
      await approveTx.wait();

      // Call the create Pool function from the smart contract
      toast.loading("creating staking pool");
      const createPoolTx = await stakingPoolContract.createPool(rewardRate);
      await createPoolTx.wait();

      console.log(createPoolTx);
      toast.dismiss(toastId);
      toast.success("Staking Pool Created successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create pool");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return createPool;
};

export default useCreatePool;

// import { useWeb3ModalProvider } from "@web3modal/ethers/react";
// import { parseEther } from "ethers";
// import { useCallback, useState } from "react";
// import { toast } from "react-hot-toast";

// import {
//   getStakingPoolContract,
//   getTokenContract,
//   getRewardTokenContract,
// } from "../constants/contracts";
// import { getReadWriteProvider } from "../constants/providers";

// const useCreateStakePool = () => {
//   const { walletProvider } = useWeb3ModalProvider();
//   const [poolLoading, setPoolLoading] = useState(false);

//   // use callback to avoid creating a new function on every render
//   const stakingPool = useCallback(
//     async (rate) => {
//       if (rate <= 0) return console.error("rate is required");
//       setPoolLoading(true);

//       const toastId = toast.loading("Creating Staking Pool...");

//       try {
//         const provider = getReadWriteProvider(walletProvider);
//         const signer = await provider.getSigner();
//         const tokenContract = getTokenContract(signer);
//         const stakingContract = getStakingPoolContract(signer);
//         const rewardContract = getRewardTokenContract(signer);
//         const parsedAmount = parseEther("100").toString();

//         // approve staking contract to spend the token
//         const approveTx = await rewardContract.approve(
//           stakingContract.address,
//           parsedAmount
//         );

//         await approveTx.wait();
//         // Call the create Pool function from the smart contract
//         const createPooltx = await stakingContract.createPool(rate);
//         const receipt = await createPooltx.wait();
//         console.log(receipt);

//         toast.dismiss(toastId);
//         toast.success("Staking Pool Created successfully");
//       } catch (error) {
//         console.error(error);
//         toast.error("Failed");
//         toast.dismiss(toastId);
//       } finally {
//         setPoolLoading(false);
//       }
//     },
//     [walletProvider]
//   );

//   return { stakingPool, poolLoading };
// };

// export default useCreateStakePool;
