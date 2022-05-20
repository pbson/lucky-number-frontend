import React from 'react';
import { useRouter } from 'next/router';

import styled from '@emotion/styled';

interface LinkProps {
    children: React.ReactNode;
    href: string;
    style?: any;
    target?: string;
}

const LinkWrapper = styled('a')`
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

const Link: React.FC<LinkProps> = ({ children, target = '_self', href = '', style = {}, ...restProps }) => {
    const router = useRouter();

    const handleClick = (e: React.SyntheticEvent) => {
        e.preventDefault();
        router.push(href);
    };

    return (
        <LinkWrapper target={target} style={style} href={href} onClick={handleClick} {...restProps}>
            {children}
        </LinkWrapper>
    );
};
export default Link;
