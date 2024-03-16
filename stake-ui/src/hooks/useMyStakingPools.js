import { useEffect, useState } from "react";
import { getReadOnlyProvider } from "../constants/providers";
import {
  getMultiCallContract,
  getStakingPoolContract,
} from "../constants/contracts";
import {
  decodeStakingPoolResult,
  encodeStakingPoolCall,
} from "../utils/callEncoder";
import usePoolNumbers from "./usePoolNumbers";
import { formatEther } from "ethers";

const useMyStakingPools = () => {
  const totalPools = usePoolNumbers();
  const [poolDetails, setPoolDetails] = useState([]);
  const multicallContract = getMultiCallContract(getReadOnlyProvider);
  const stakingPoolContract = getStakingPoolContract(getReadOnlyProvider);

  const convertArray = (array) => {
    return array.map((subArray) => {
      const convertedArray = subArray.map((value, index) => {
        if (index === 1 || index === 2) {
          // Convert second and third values
          return formatEther(value);
        } else {
          return value;
        }
      });
      return convertedArray;
    });
  };
  const fetchPoolDetails = async () => {
    try {
      // Fetch only if totalPools is greater than 0
      if (totalPools > 0) {
        const calls = [];
        for (let i = 0; i < totalPools; i++) {
          calls.push({
            target: stakingPoolContract.target,
            callData: encodeStakingPoolCall("getPoolByID", [i]),
          });
        }

        const response = await multicallContract.tryAggregate.staticCall(
          false,
          calls
        );

        const decodedResponse = response.map((res) =>
          decodeStakingPoolResult("getPoolByID", res[1])
        );
        let result = decodedResponse.map((res) => res.toString().split(","));

        result = convertArray(result);

        setPoolDetails({ isLoading: false, data: result });
      } else {
        setPoolDetails({ isLoading: false, data: [] });
      }
    } catch (error) {
      console.error("Error fetching pool details:", error);
      setPoolDetails({ isLoading: false, data: [] });
    }
  };

  useEffect(() => {
    fetchPoolDetails();
  }, [totalPools]);


  return poolDetails;
};

export default useMyStakingPools;
