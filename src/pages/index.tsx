import React, { useState, useEffect } from 'react';
import Layout from "../components/Layout";
import { Container, Box, Typography } from '@mui/material';
import { PrimaryButton } from '../components/PrimaryButton/PrimaryButton.styled';
import Image from 'next/image'
import styled from '@emotion/styled'
import CountUp from 'react-countup';
import Web3 from "web3";
import {
  ABI,
  CONTRACT_ADDRESS,
} from "../utils/config";
import {
  useAddress,
} from "@thirdweb-dev/react";
import { useRouter } from 'next/router';
import { NextPage } from 'next';

const HomepageTitle = styled(Typography)`
    font-family: "Space Grotesk"
    font-style: normal;
    font-weight: 600;
    font-size: 100px;
    line-height: 100px;
    color: ${({ theme }) => theme.palette.grey[50]};
`;

const PercentageNumber = styled(CountUp)`
  color: ${({ theme }) => theme.palette.primary.main};
  &::after { 
    content: "%";
  }
`;

const PlayerCountText = styled(Typography)`
  margin-top: "30px"
  font-family: "Space Grotesk"
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 100px;
  color: ${({ theme }) => theme.palette.grey[200]};
`;

const Home: NextPage = () => {
  const [contract, setContract] = useState(null);
  const [web3, setWeb3] = useState(null);
  const userAddress = useAddress();
  const router = useRouter();
  const [joinRoomLoading, setJoinRoomLoading] = useState(false);
  const [ticketPrice, setTicketPrice] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const ethereum = window.ethereum;
      let w3 = new Web3(ethereum);
      setWeb3(w3);
      let contract = new w3.eth.Contract(ABI, CONTRACT_ADDRESS);
      setContract(contract);
      const ticket = await contract.methods.viewTicketPrice().call();
      setTicketPrice(ticket);
      console.log(ticketPrice);
    }
    fetchData();
  }, [])

  async function joinGame() {
    setJoinRoomLoading(true);
    const roomId = await contract.methods.getLastRoomOfPlayer().call({ from: userAddress });
    console.log(roomId);
    if (roomId != 0) {
      router.push(`/pot/${roomId}`);
    } else {
      await contract.methods
        .joinGame()
        .send({ from: userAddress, value: ticketPrice, gas: "500000" })
        .on('transactionHash', (txID) => {
          web3.eth.getTransactionReceipt(txID, function (e, data) {
            console.log(e, data)
          });
        })
        .on('receipt', async (receipt) => {
          console.log(receipt);
          if (receipt.status) {
            const roomId = await contract.methods
              .roomId()
              .call();
            router.push(`/pot/${roomId}`);
          } else {
            setJoinRoomLoading(false);
          }
        })
        .on('error', (error) => {
          setJoinRoomLoading(false);
        })
    }
  }
  return (
    <Layout>
      <Container maxWidth="xl">
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          paddingTop: '140px',
        }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%'
          }}>
            <HomepageTitle variant="h3" paddingBottom={10} >
              Win up to <br />
              <PercentageNumber start={0} end={500} duration={1} />
              <br />
              per turn with Lucky Number
            </HomepageTitle>
            {/* <PlayerCountText variant="body1" >
              Current number of players: 4/5
            </PlayerCountText> */}
            <PrimaryButton
              loading={joinRoomLoading}
              onClick={() => joinGame()}
            >
              Join Now
            </PrimaryButton>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '50%'
          }}>
            <Image
              src="/images/wheel.png"
              alt="Picture of the author"
              width={1800}
              height={1800}
            />
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default Home;
