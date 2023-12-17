import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ResultRow } from '@/components/ResultRow.tsx';
import { useAppSelector } from '@/redux';
import styled from 'styled-components';

const StyledList = styled('div')`
    & > *:nth-child(odd) {
        background-color: #162135;
    }
`;

export const ResultList = () => {
    const { results } = useAppSelector(state => state.results);
    const [animationParent] = useAutoAnimate();

    return (
        <StyledList ref={animationParent}>
            {results.map((r, i) =>
                <ResultRow key={r.teamIdx} place={i + 1} teamResult={r} />
            )}
        </StyledList>
    );
};
