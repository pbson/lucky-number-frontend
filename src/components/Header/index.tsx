import { Typography, AppBar, Container } from "@mui/material";
import { StyledToolbar, StyledAppBar } from "./Header.styled";
import { ConnectWallet } from '../ConnectWalletButton';
import Link from "../Link";

const Header = () => {
    return (
        <Container maxWidth="xl">
            <StyledAppBar position="static" elevation={0}>
                <StyledToolbar>
                    <Link href='/'>
                        <Typography variant="h4">Lucky number</Typography>
                    </Link>
                    <ConnectWallet />
                </StyledToolbar>
            </StyledAppBar>
        </Container>
    );
}

export default Header;