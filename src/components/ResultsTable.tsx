import { ResultsHeader } from '@/components/ResultsHeader.tsx';
import { ResultList } from '@/components/ResultList.tsx';
import styled from 'styled-components';
import { Container } from '@/styles/Container.tsx';
import { useAppSelector } from '@/redux';

const StyledTable = styled('div')`
    position: relative;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

const ContestTitle = styled('h1')`
    position: sticky;
    top: 0;
    z-index: 110;
    background-color: #151c2c;
    height: 100px;
    display: flex;
    align-items: center;
    //padding-block: 30px;
    clear: both;
`;

export const ResultsTable = () => {
    const { contest } = useAppSelector(state => state.results);

    return (
        <StyledTable>
            <Container style={{flexGrow: 1}}>
                <ContestTitle>{contest!.name}</ContestTitle>
                <ResultsHeader />
                <ResultList />
            </Container>
        </StyledTable>
    );
};
