import styled from 'styled-components';

const StyledContainer = styled('div')`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
`;

export const Container = (props: any) => {
    return (
        <StyledContainer {...props}>
            {props.children}
        </StyledContainer>
    );
};
