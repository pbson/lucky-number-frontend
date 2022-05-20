import { Button } from '@mui/material';
import styled from '@emotion/styled'

export const CountdownWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`;

export const CountdownItem = styled.div`
    color: ${({ theme }) => theme.palette.grey[50]};
    font-size: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    line-height: 30px;
    margin: 10px;
    padding-top: 10px;
    position: relative;
    width: 100px;
    height: 100px;
    span {
        color:${({ theme }) => theme.palette.grey[50]};
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
    }
`;

export const CountdownSvg = styled.svg`
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
`;