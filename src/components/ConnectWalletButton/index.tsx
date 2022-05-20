import {
    useMetamask,
    useWalletConnect,
    useCoinbaseWallet,
    useNetwork,
    useAddress,
    useDisconnect,
} from "@thirdweb-dev/react";
import { PrimaryButton } from '../PrimaryButton/PrimaryButton.styled';
import { IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import * as React from 'react';

export const ConnectWallet = () => {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const connectWithMetamask = useMetamask();
    const disconnectWallet = useDisconnect();
    const address = useAddress();
    const network = useNetwork();

    // If a wallet is connected, show address, chainId and disconnect button
    if (address) {
        return (
            address && (
                <div>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Address: {address}</MenuItem>
                        <MenuItem onClick={handleClose}>Chain ID: {network[0].data.chain && network[0].data.chain.id}</MenuItem>
                        <MenuItem onClick={handleClose}><PrimaryButton onClick={disconnectWallet}>Disconnect</PrimaryButton></MenuItem>
                    </Menu>
                </div>
            )
        );
    }

    // If no wallet is connected, show connect wallet options
    return (
        <div>
            <PrimaryButton onClick={() => connectWithMetamask()} variant="contained">Connect MetaMask</PrimaryButton>
        </div>
    );
};