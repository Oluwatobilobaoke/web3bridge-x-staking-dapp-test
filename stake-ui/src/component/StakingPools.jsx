import { useEffect, useState } from "react";
import {
  Box,
  Card,
  TextField,
  Dialog,
  Flex,
  Text,
  Button,
} from "@radix-ui/themes";
import { formatEther } from "ethers";
import { getReadOnlyProvider } from "../constants/providers";
import useUserRewardTokenBalance from "../hooks/useUserRewardTokenBalance";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import useMyStakingPools from "../hooks/useMyStakingPools";

// let StakingPoolData = [
//   {
//     id: "0",
//     totalStakers: 20,
//     totalStaked: 33939393993,
//     rewardReserve: 1000,
//     rewardRate: 5,
//   },
//   {
//     id: "1",
//     totalStakers: 20,
//     totalStaked: 33939393993,
//     rewardReserve: 1000,
//     rewardRate: 5,
//   },
//   {
//     id: "2",
//     totalStakers: 20,
//     totalStaked: 33939393993,
//     rewardReserve: 1000,
//     rewardRate: 5,
//   },
// ];

// StakingPoolData = null;
const StakingPools = () => {
  const { isConnected, address } = useWeb3ModalAccount();

  let StakingPools = useMyStakingPools();

  StakingPools = StakingPools.data;

  console.log("StakingPoolData", StakingPools);

  return isConnected && address ? (
    <div className="mt-8">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                totalStakers
              </th>
              <th scope="col" className="px-6 py-3">
                totalStaked
              </th>
              <th scope="col" className="px-6 py-3">
                rewardReserve
              </th>
              <th scope="col" className="px-6 py-3">
                rewardRate
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {StakingPools?.map((data, key) => (
              <tr
                key={data.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td className="px-6 py-4 text-white">{data[0]}</td>
                <td className="px-6 py-4">{data[1]}</td>
                <td className="px-6 py-4">{data[2]}</td>
                <td className="px-6 py-4">{data[3]}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-x-4">
                    <Button
                      href="#"
                      className="font-medium text-white-600 dark:text-white hover:underline"
                      // onClick={}
                    >
                      Stake
                    </Button>
                    <Button
                      href="#"
                      className="font-medium text-white-600 dark:text-white hover:underline"
                      // onClick={}
                    >
                      Unstake
                    </Button>
                    <Button
                      href="#"
                      className="font-medium text-white-600 dark:text-white hover:underline"
                      // onClick={}
                    >
                      Claim Rewards
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!StakingPools?.length ? "No Staking Pool Available" : ""}
      </div>
    </div>
  ) : (
    <Text>Connect Wallet to create a pool</Text>
  );
};

export default StakingPools;
