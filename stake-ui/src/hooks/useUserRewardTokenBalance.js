import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { ethers } from "ethers";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { getReadOnlyProvider } from "../constants/providers";
import { getRewardTokenContract } from "../constants/contracts";

const useUserRewardTokenBalance = () => {
  const [rewardBalance, setRewardBalance] = useState("0");
  const { address } = useWeb3ModalAccount();

  useEffect(() => {
    if (typeof address === "undefined") {
      setRewardBalance("0");
      return;
    }

    const contract = getRewardTokenContract(getReadOnlyProvider);
    contract
      .balanceOf(address)
      .then((res) => {
        setRewardBalance(ethers.formatUnits(res, 18));
      })
      .catch((err) => {
        toast("Could not fetch balance");
        console.error("Error:", err);
      });
  }, [address]);

  return rewardBalance;
};

export default useUserRewardTokenBalance;
