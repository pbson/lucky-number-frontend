import { Toolbar, AppBar } from '@mui/material';
import styled from '@emotion/styled'

export const StyledAppBar = styled(AppBar)`
    background: ${({ theme }) => theme.palette.background.default};
    position: static;
    padding-top: 30px;
`;

export const StyledToolbar = styled(Toolbar)`
    display: flex;
    justify-content: space-between;
    color: ${({ theme }) => theme.palette.grey[50]}
`

