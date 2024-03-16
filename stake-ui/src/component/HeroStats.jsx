import { useEffect, useState } from "react";
import { Box, Card, Flex, Text } from "@radix-ui/themes";
import { formatEther } from "ethers";
// import { getReadOnlyProvider } from "../constants/providers";
// import { getTokenContract } from "../constants/contracts";
// import useGetLatestBlock from "../hooks/useGetLatestBlock";

const HeroStats = () => {
  // const [reward, setReward] = useState < string > "";
  // const blockNumber = useGetLatestBlock();

  // useEffect(() => {
  //   const tokenContract = getTokenContract(getReadOnlyProvider);

  //   tokenContract
  //     .balanceOf(import.meta.env.VITE_staking_contract)
  //     .then((res) => {
  //       setReward(parseFloat(formatEther(res.toString())).toFixed(2));
  //     })
  //     .catch((err) => {
  //       console.error("Error:", err);
  //     });
  // }, [blockNumber]);

  return (
    <Flex gap="5" direction="rows">
      <Card size="1" style={{ width: 200 }}>
        <Flex gap="3" align="center">
          <Box>
            <Text as="div" size="2" weight="bold">
              Total Staked
            </Text>
            <Text as="div" size="2" color="gray">
              Engineering
            </Text>
          </Box>
        </Flex>
      </Card>
      <Card size="1" style={{ width: 200 }}>
        <Flex gap="3" align="center">
          <Box>
            <Text as="div" size="2" weight="bold">
              Your Stake
            </Text>
            <Text as="div" size="2" color="gray">
              Engineering
            </Text>
          </Box>
        </Flex>
      </Card>
      <Card size="1" style={{ width: 200 }}>
        <Flex gap="3" align="center">
          <Box>
            <Text as="div" size="2" weight="bold">
              Your Reward
            </Text>
            <Text as="div" size="2" color="gray">
              Engineering
            </Text>
          </Box>
        </Flex>
      </Card>
    </Flex>
  );
};

export default HeroStats;
