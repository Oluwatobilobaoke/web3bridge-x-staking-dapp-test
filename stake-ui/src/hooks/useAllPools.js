import { useEffect, useState } from "react";
import { readOnlyProvider } from "../constants/providers";
import { ethers } from "ethers";
import Abi from "../constants/stakingAbi.json";
import MulticallAbi from "../constants/multicall.json";

import { getStakingPool } from "../constants/stakingContract";

const useAllPools = () => {
  const [data, setData] = useState([]);
  const [numOfPool, setNumOfPool] = useState(0);

  const contract = getStakingPool(readOnlyProvider);

  useEffect(() => {
    (async () => {
      contract
        .id()
        .then((res) => setNumOfPool(Number(res)))
        .catch((err) => console.log(err));

      const poolIDs = [...Array.from({ length: numOfPool + 1 })].map(
        (_, index) => index
      );

      console.log(poolIDs);

      const itf = new ethers.Interface(Abi);
      const calls = poolIDs.map((x) => ({
        target: import.meta.env.VITE_stake_pool_contract_address,
        callData: itf.encodeFunctionData("getPoolByID", [x]),
      }));

      //multicall
      const multicall = new ethers.Contract(
        import.meta.env.VITE_multicall_address,
        MulticallAbi,
        readOnlyProvider
      );

      const callResults = await multicall.tryAggregate.staticCall(false, calls);
      const validResponsesIndex = [];
      const validResponses = callResults.filter((x, i) => {
        if (x[0] === true) {
          validResponsesIndex.push(i);
          return true;
        }
        return false;
      });

      const decodedResponses = validResponses.map((x) =>
        itf.decodeFunctionResult("getPoolByID", x[1])
      );
      setData(decodedResponses);
      console.log("====================================");
      console.log(decodedResponses);
      console.log("====================================");
    })();
  }, [numOfPool]);
  return data;
};

export default useAllPools;
