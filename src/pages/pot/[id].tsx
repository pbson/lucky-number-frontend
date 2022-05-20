import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Modal, useTheme } from '@mui/material';
import { useRouter } from 'next/router'
import type { NextPage } from 'next';
import Confetti from 'react-confetti'

import Layout from "../../components/Layout";
import Countdown from '../../components/Timer';
import WheelComponent from '../../components/Wheel';
import { PrimaryButton } from '../../components/PrimaryButton/PrimaryButton.styled';

import { useWindowSize } from '../../hooks/useWindowSize';

import { ModalContainer } from './pot.styled';
import Image from 'next/image';

const Pot: NextPage = () => {
    const theme = useTheme();
    const size = useWindowSize();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [confetti, setConfetti] = useState(false);

    const [isWinner, setIsWinner] = useState(true);

    const [selectedMessage, setMessage] = useState(false);

    const segments = [
        '1',
        '2',
        '3',
        '4',
        '5',
    ]
    const segColors = [
        '#EE4040',
        '#F0CF50',
        '#815CD1',
        '#3DA5E0',
        '#34A24F'
    ]
    const onFinished = (winner) => {
        setTimeout(() => {
            handleOpen();
            setConfetti(true);
        }, 500);
    }
    return (
        <Layout>
            <Container maxWidth="xl">
                {(isWinner == true) &&
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
                    <Countdown
                        setMessage={setMessage}
                        timeTillDate="05 20 2022, 16:44:00 am"
                        timeFormat="MM DD YYYY, h:mm a"
                    />
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingTop: '50px'
                }}>
                    <WheelComponent
                        segments={segments}
                        segColors={segColors}
                        winningSegment='1'
                        onFinished={(winner) => onFinished(winner)}
                        contrastColor={theme.palette.grey[50]}
                        primaryColor={theme.palette.primary.main}
                        buttonText=''
                        isOnlyOnce={false}
                        size={290}
                        upDuration={300}
                        downDuration={3000}
                        fontFamily='Space Grotesk'
                        selectedMessage={selectedMessage}
                    />
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        {isWinner ?
                            <ModalContainer>
                                <Image
                                    src="/images/confetti.png"
                                    width={150}
                                    height={150}
                                />
                                <Typography id="modal-modal-title" variant="h3" component="h1" sx={{ mt: 4, fontWeight: 600 }}>
                                    Congratulation
                                </Typography>
                                <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2, mb: 4 }}>
                                    Congratulation on winning the pot. Click the button below to claim your reward.
                                </Typography>
                                <PrimaryButton>
                                    Claim !
                                </PrimaryButton>
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
        </Layout>
    );
};

export default Pot;
