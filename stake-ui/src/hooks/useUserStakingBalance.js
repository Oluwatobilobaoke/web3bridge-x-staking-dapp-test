import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

import { getReadOnlyProvider } from "../constants/providers";
import { getStakingPoolContract } from "../constants/contracts";

const useUserStakingBalance = (newBlock) => {
  const [stakedAmount, setStakedAmount] = useState("");
  const { address } = useWeb3ModalAccount();

  useEffect(() => {
    if (address) {
      const stakingContract = getStakingPoolContract(getReadOnlyProvider);
      stakingContract.stakedAmount(address).then((stakedAmount) => {
        setStakedAmount(ethers.formatUnits(stakedAmount, 18));
      });
    } else {
      setStakedAmount("0");
    }
  }, [address, newBlock]);

  return stakedAmount;
};

export default useUserStakingBalance;
