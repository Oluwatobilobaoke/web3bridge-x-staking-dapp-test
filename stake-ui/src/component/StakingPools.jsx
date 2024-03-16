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
import { getReadOnlyProvider } from "../constants/providers";
import useUserRewardTokenBalance from "../hooks/useUserRewardTokenBalance";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import useMyStakingPools from "../hooks/useMyStakingPools";
import useStakeToken from "../hooks/useStakeToken";
import { toast } from "react-hot-toast";
import useUnstakeToken from "../hooks/useUnstakeToken";

const StakingPools = () => {
  const { isConnected, address } = useWeb3ModalAccount();

  let StakingPools = useMyStakingPools();

  StakingPools = StakingPools.data;

  console.log("StakingPoolData", StakingPools);

  const { stake, stakeLoading } = useStakeToken();
  const [amount, setAmount] = useState("");

  const { unstake, unstakeLoading } = useUnstakeToken();

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
            {StakingPools?.map((data, index) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td className="px-6 py-4 text-white">{data[0]}</td>
                <td className="px-6 py-4">{data[1]}</td>
                <td className="px-6 py-4">{data[2]}</td>
                <td className="px-6 py-4">{data[3]}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-x-4">
                    {/* <Button
                      href="#"
                      className="font-medium text-white-600 dark:text-white hover:underline"
                      // onClick={}
                    >
                      Stake
                    </Button> */}
                    <Dialog.Root>
                      <Dialog.Trigger>
                        <Button size="3" variant="soft" className="bg-blue">
                          Stake
                        </Button>
                      </Dialog.Trigger>

                      <Dialog.Content style={{ maxWidth: 450 }}>
                        <Dialog.Title>Stake into the Pool</Dialog.Title>
                        <Flex direction="column" gap="3">
                          <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                              Stake Amount
                            </Text>
                            <TextField.Input
                              placeholder="Enter your stake amount"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                            />
                          </label>
                        </Flex>

                        <Flex gap="3" mt="4" justify="end">
                          <Dialog.Close>
                            <Button variant="soft" color="gray">
                              Cancel
                            </Button>
                          </Dialog.Close>
                          <Dialog.Close>
                            <Button
                              variant="soft"
                              color="blue"
                              disabled={stakeLoading || unstakeLoading}
                              onClick={async () => {
                                if (amount <= 0)
                                  return toast.error(
                                    "Stake Amount must be greater than 0"
                                  );
                                await stake(index, amount);
                                setAmount("");
                              }}
                            >
                              Stake
                            </Button>
                          </Dialog.Close>
                        </Flex>
                      </Dialog.Content>
                    </Dialog.Root>
                    <Button
                      disabled={stakeLoading || unstakeLoading}
                      className="font-medium text-white-600 dark:text-white hover:underline"
                      onClick={async () => {
                        await unstake(index);
                      }}
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
