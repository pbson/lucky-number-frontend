import * as React from 'react';
import type { NextPage } from 'next';
import Layout from "../components/Layout";
import { Container, Box, Typography } from '@mui/material';
import { PrimaryButton } from '../components/PrimaryButton/PrimaryButton.styled';
import Image from 'next/image'
import styled from '@emotion/styled'
import CountUp from 'react-countup';
import Link from '../components/Link/index';

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
            <HomepageTitle variant="h3" >
              Win up to <br />
              <PercentageNumber start={0} end={500} duration={1.5} />
              <br />
              per turn with Lucky Number
            </HomepageTitle>
            <PlayerCountText variant="body1" >
              Current number of players: 4/5
            </PlayerCountText>
            <Link href='/pot/1'>
              <PrimaryButton>
                Join Now
              </PrimaryButton>
            </Link>
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
