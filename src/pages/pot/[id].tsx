import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Modal, useTheme, Icon } from '@mui/material';
import { useRouter } from 'next/router'
import type { NextPage } from 'next';
import Confetti from 'react-confetti'
import Layout from "../../components/Layout";
import WheelComponent from '../../components/Wheel';
import { PrimaryButton } from '../../components/PrimaryButton/PrimaryButton.styled';
import { useWindowSize } from '../../hooks/useWindowSize';
import { ModalContainer } from './pot.styled';
import Image from 'next/image';
import Web3 from "web3";
import {
    ABI,
    CONTRACT_ADDRESS,
} from "../../utils/config";
import {
    useAddress,
} from "@thirdweb-dev/react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Pot: NextPage = () => {
    const [contract, setContract] = useState<any>();
    const router = useRouter();
    const theme = useTheme();
    const size = useWindowSize();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [confetti, setConfetti] = useState(false);
    const [winner, setWinner] = useState(false);
    const [isWinner, setIsWinner] = useState(null);
    const [segments, setSegments] = useState(null);
    const [isClaimed, setIsClaimed] = useState(null);
    const [roomId, setRoomId] = useState(null);
    const [claimRewardLoading, setClaimRewardLoading] = useState(false);

    const segColors = [
        '#EE4040',
        '#F0CF50',
        '#815CD1',
        '#3DA5E0',
        '#34A24F'
    ]

    const userAddress = useAddress();

    useEffect(() => {
        async function fetchData() {
            const { id } = router.query
            setRoomId(id);
            const ethereum = window.ethereum;
            let w3 = new Web3(ethereum);
            let contract = new w3.eth.Contract(ABI, CONTRACT_ADDRESS)
            setContract(contract)
            const result = await contract.methods
                .viewRoom(id)
                .call()
            setSegments(result.addressPlayers);
            console.log(result);
            if (result.winner != '0x0000000000000000000000000000000000000000') {
                setWinner(result.winner);
                result.winner == userAddress ? setIsWinner(true) : setIsWinner(false)
                setIsClaimed(result.isClaimed);
            }
        }
        if (!router.isReady) return;
        fetchData();
    }, [router.isReady, userAddress]);

    const onFinished = (winner) => {
        handleOpen();
        if (winner == userAddress) {
            setConfetti(true);
        }
    }

    async function claimReward() {
        setClaimRewardLoading(true);
        await contract.methods
            .claimReward(roomId)
            .send({ from: userAddress })
            .on('receipt', (receipt) => {
                console.log(receipt);
                if (receipt.status) {
                    setIsClaimed(false);
                    setClaimRewardLoading(false);
                } else {
                    setIsClaimed(true);
                    setClaimRewardLoading(false);
                }
                console.log(receipt);
            })
            .on('error', (error) => {
                setIsClaimed(true);
                setClaimRewardLoading(false);
            })
    }

    return (
        <Layout>
            <Container maxWidth="xl">
                {(winner) &&
                    <div className="div">
                        <Confetti
                            height={size.height >= 768 ? size.height : 768}
                            width={size.width >= 1024 ? size.width : 1024}
                            numberOfPieces={500}
                            run={confetti}
                            recycle={false}
                            tweenDuration={5000}
                        />
                    </div>
                }
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingTop: '50px'
                }}>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingTop: '50px'
                }}>
                    {(segments != null) && userAddress && segments &&
                        <WheelComponent
                            segments={segments}
                            segColors={segColors}
                            winningSegment={winner}
                            onFinished={(winner) => onFinished(winner)}
                            contrastColor={theme.palette.grey[50]}
                            primaryColor={theme.palette.primary.main}
                            buttonText='Result'
                            isOnlyOnce={false}
                            size={290}
                            upDuration={100}
                            downDuration={1000}
                            fontFamily='Space Grotesk'
                            isWinner={winner}
                            setOpen={setOpen}
                        />
                    }
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        {isWinner && userAddress ?
                            <ModalContainer>
                                <Image
                                    src="/images/confetti.png"
                                    width={150}
                                    height={150}
                                />
                                <Typography id="modal-modal-title" variant="h3" component="h1" sx={{ mt: 4, fontWeight: 600 }}>
                                    Congratulation
                                </Typography>
                                {isClaimed ? 
                                <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2, mb: 4 }}>
                                    Congratulation on winning the pot. Click the button below to claim your reward.
                                </Typography> 
                                : <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2, mb: 4 }}>
                                    Congratulation on winning the pot. You have successfully claimed your reward.
                                </Typography>
                                }

                                {isClaimed ?
                                    <PrimaryButton
                                        onClick={claimReward}
                                        loading={claimRewardLoading}
                                    >
                                        Claim !
                                    </PrimaryButton>
                                    :
                                    <CheckCircleIcon color='success' fontSize="large" />
                                }
                            </ModalContainer>
                            :
                            <ModalContainer>
                                <Image
                                    src="/images/sad-face.gif"
                                    width={100}
                                    height={100}
                                />
                                <Typography id="modal-modal-title" variant="h3" component="h1" sx={{ mt: 4, fontWeight: 600 }}>
                                    Too bad
                                </Typography>
                                <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2, mb: 4 }}>
                                    You did not win this pot. Better luck next time
                                </Typography>
                            </ModalContainer>
                        }
                    </Modal>
                </Box>
            </Container>
        </Layout >
    );
};

export default Pot;
