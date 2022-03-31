import styled from 'styled-components';

export const StyledHeader = styled.header`
    display: flex;
    width: 100%;
    background-color: ${({theme}) => theme.colors.popupBg};
    position: absolute;
    top: 0;
    justify-content: flex-end;
`;