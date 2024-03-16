// import { ethers } from "ethers";
// import erc721 from "../constants/erc721.json";
// import multicallAbi from "../constants/multicall.json";
// import { readOnlyProvider } from "../constants/providers";
// import { useEffect, useMemo, useState } from "react";
// import { useWeb3ModalAccount } from "@web3modal/ethers/react";
// import useTransferEvent from "./useTransferEvent";

// const useMyNfts = () => {
//   const { address } = useWeb3ModalAccount();
//   const [data, setData] = useState([]);
//   const [idToAddress, setIdToAddress] = useState({});
//   const tokenIDs = useMemo(
//     () => [...Array.from({ length: 30 })].map((_, index) => index),
//     []
//   );
//   const handleEvent = useTransferEvent();

//   useEffect(() => {
//     (async () => {
//       const itf = new ethers.Interface(erc721);
//       const calls = tokenIDs.map((x) => ({
//         target: import.meta.env.VITE_contract_address,
//         callData: itf.encodeFunctionData("ownerOf", [x]),
//       }));

//       const multicall = new ethers.Contract(
//         import.meta.env.VITE_multicall_address,
//         multicallAbi,
//         readOnlyProvider
//       );

//       const callResults = await multicall.tryAggregate.staticCall(false, calls);

//       const validResponsesIndex = [];
//       const validResponses = callResults.filter((x, i) => {
//         if (x[0] === true) {
//           validResponsesIndex.push(i);
//           return true;
//         }
//         return false;
//       });

//       const decodedResponses = validResponses.map((x) =>
//         itf.decodeFunctionResult("ownerOf", x[1])
//       );

//       const ownedTokenIds = [];
//       const ownerAddressByIds = {};
//       decodedResponses.forEach((addr, index) => {
//         ownerAddressByIds[validResponsesIndex[index]] = addr.toString();
//         if (String(addr).toLowerCase() === String(address).toLowerCase())
//           ownedTokenIds.push(validResponsesIndex[index]);
//       });
//       setIdToAddress(() => ownerAddressByIds);
//       setData(ownedTokenIds);
//     })();
//   }, [address, tokenIDs, handleEvent]);

//   return { data, idToAddress };
// };

// export default useMyNfts;

import { ethers } from "ethers";
import erc20Abi from "../constants/erc20Abi.json";
import multicallAbi from "../constants/multicall.json";
import { readOnlyProvider } from "../constants/providers";
import { useEffect, useMemo, useState } from "react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import useTransferEvent from "./useTransferEvent";

const useMyStakingPools = () => {
  const { address } = useWeb3ModalAccount();

  const tokenIDs = useMemo(
    () => [...Array.from({ length: 30 })].map((_, index) => index),
    []
  );

  useEffect(() => {
    (async () => {
      const itf = new ethers.Interface(erc20Abi);
      const calls = tokenIDs.map((x) => ({
        target: import.meta.env.VITE_contract_address,
        callData: itf.encodeFunctionData("ownerOf", [x]),
      }));

      const multicall = new ethers.Contract(
        import.meta.env.VITE_multicall_address,
        multicallAbi,
        readOnlyProvider
      );

      const callResults = await multicall.tryAggregate.staticCall(false, calls);
    })();
  }, [address]);

  return { data, idToAddress };
};

export default useMyStakingPools;
