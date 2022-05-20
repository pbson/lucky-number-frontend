import { Container, Box, Typography } from "@mui/material";
import styled from '@emotion/styled';
import Image from 'next/image'

const FooterDiv = styled.footer`
    background-color: #0F282A;
    color: #FFF;
    text-align: center;
    padding-bottom: 30px;
`;

const FooterContainer = styled(Container)`
    background-color: #0F282A;
    padding-top: 30px;
`;

const Footer = () => {
    return (
        <Box sx={{
            backgroundColor: "#0F282A",
            paddingTop: '30px',
            marginTop: '50px'
        }}>
            <FooterContainer>
                <FooterDiv>
                    <Image
                        src="/images/savvycom.svg"
                        alt="Picture of the author"
                        width={500}
                        height={50}
                    />
                    <Typography sx={{
                        paddingTop: '30px',
                        fontWeight: 400,
                        fontSize: '18px',
                        lineHeight: '24px',
                        color: 'hsla(0,0%,100%,.65)'
                    }}>
                        Savvycom is a leading Software Development, Technology Consulting and Software Outsourcing Services Company.
                        We're specialized in End-to-End Software Development, Technology Consulting Services and Cloud Devops.
                    </Typography>
                </FooterDiv>
            </FooterContainer>
        </Box>
    );
}

export default Footer;