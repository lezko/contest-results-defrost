import styled from 'styled-components';
import { useAppSelector } from '@/redux';

const StyledHeader = styled('header')<{$problemsCount: number}>`
    color: #656565;
    font-size: .9rem;
    display: grid;
    grid-template-columns: 20px 1fr 20px 70px repeat(${props => props.$problemsCount}, 50px);
    column-gap: 15px;
    position: sticky;
    top: 100px;
    padding-block: 20px;
    padding-inline: 10px;
    z-index: 100;
    background-color: #151c2c;
`;

const HeaderItem = styled('div')`
    //padding-block: 15px;
`;

export const ResultsHeader = () => {
    const {contest} = useAppSelector(state => state.results);

    return (
        <StyledHeader $problemsCount={contest!.problems.length}>
            <HeaderItem style={{placeSelf: 'center'}}>№</HeaderItem>
            <HeaderItem>Участник</HeaderItem>
            <HeaderItem style={{placeSelf: 'center'}}>=</HeaderItem>
            <HeaderItem style={{placeSelf: 'center'}}>Штраф</HeaderItem>
            {contest!.problems.map(p =>
                <HeaderItem key={p.shortName} style={{placeSelf: 'center', color: '#c7cace'}}>{p.shortName}</HeaderItem>
            )}
        </StyledHeader>
    );
};
