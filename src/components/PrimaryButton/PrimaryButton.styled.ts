import { Button } from '@mui/material';
import styled from '@emotion/styled'

export const PrimaryButton = styled(Button)<any>`
    padding: 20px;
    font-size: 14px;
    line-height: 20px;
    border-radius: 8px;
    width: 200px;
    height: 50px;
    font-style: normal;
    font-weight: 700;
    font-size: ${props =>
        props.isJoinButton ? '24px' : '14px'
    };
    background: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.grey[900]};
    &:hover {
        background: ${({ theme }) => theme.palette.primary.dark};
    }
`;
