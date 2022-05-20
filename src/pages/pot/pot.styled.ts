import { Box } from '@mui/material';
import styled from '@emotion/styled'

export const ModalContainer = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400;
    background-color: ${({ theme }) => theme.palette.grey[50]};
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    min-width: 300px;
`;