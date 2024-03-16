import {
  Box,
  Button,
  Container,
  Flex,
  Link,
  Text,
  Separator,
  Heading,
} from "@radix-ui/themes";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

import { configureWeb3Modal } from "./connection";

import Header from "./component/Header";
import HeroStats from "./component/HeroStats";
import CreatePool from "./component/CreatePool";
import StakingPools from "./component/StakingPools";

configureWeb3Modal();

function App() {
  const { isConnected } = useWeb3ModalAccount();

  return (
    <Container>
      <Header />
      <main className="mt-10 mb-4">
        {/* <HeroStats /> */}
        <Separator color="cyan" my="4" size="4" />
        <Text className="text-lg font-extrabold text-left ">Pool Creation</Text>
      </main>
      <CreatePool />
      <main className="border-solid mt-20"></main>
      <Text className="text-lg font-extrabold text-left ">
        Token Staking Pools
      </Text>
      <Separator color="cyan" my="10" size="4" />
      <StakingPools />
    </Container>
  );
}

export default App;

