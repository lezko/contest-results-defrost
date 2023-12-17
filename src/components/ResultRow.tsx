import { ProblemStatus, TeamResult } from '@/types/TeamResult.ts';
import { FC } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useAppSelector } from '@/redux';
import { DefrostingState } from '@/redux/resultsSlice.ts';
import { countAccepted } from '@/utils/sortResults.ts';

interface Props {
    place: number;
    teamResult: TeamResult;
}

const StyledRow = styled('div')<{ $current: boolean; $problemsCount: number }>`
    display: grid;
    column-gap: 15px;
    row-gap: 5px;
    align-items: center;
    grid-template-columns: 20px 1fr 20px 70px repeat(${props => props.$problemsCount}, 50px);
    padding-block: 10px;
    padding-inline: 10px;
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
    border-top-color: ${props => props.$current ? 'white' : 'transparent'};
    border-bottom-color: ${props => props.$current ? 'white' : 'transparent'};
`;

const Name = styled('div')`
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Place = styled('div')`
    justify-self: center;
    color: #656565;
`;

const Penalty = styled('div')`
    justify-self: center;

`;

const ProblemsCount = styled('div')`
    justify-self: center;
`;

const statusColors = {
    [ProblemStatus.Accepted]: '#0e7c33',
    [ProblemStatus.Frozen]: '#ada30a',
    [ProblemStatus.Failed]: '#d90707',
};

const defrostAnimation = keyframes`
    from {
        //border-color: ;
    }
    to {
        border-color: transparent;
    }
`;

const animation = css`
    ${defrostAnimation} .5s linear infinite alternate;
`;

const Problem = styled('div')<{ $status?: ProblemStatus, $defrosting?: boolean }>`
    font-weight: 700;
    border-radius: 5px;
    //justify-self: center;
    border: 3px solid ${props => props.$status !== undefined ? statusColors[props.$status] : 'transparent'};
    text-align: center;
    padding: 1px 5px;
    color: #bdbcb9;
    animation: ${props => props.$defrosting ? animation : 'unset'};
    transition: .3s;
`;

export const ResultRow: FC<Props> = ({ place, teamResult }) => {
    const {
        contest,
        currentResultIdx,
        currentProblemSubmissions,
        defrostingState
    } = useAppSelector(state => state.results);

    const isCurrentResult = place - 1 === currentResultIdx;
    const currentProblem = currentProblemSubmissions.length ? currentProblemSubmissions[0].problem : '';

    const sign = {
        [ProblemStatus.Failed]: '- ',
        [ProblemStatus.Frozen]: '? ',
        [ProblemStatus.Accepted]: '+ ',
    };

    const problemsCount = countAccepted(teamResult.problems);

    return (
        <StyledRow $problemsCount={contest!.problems.length} $current={isCurrentResult}>
            <Place>{place}</Place>
            <Name title={contest!.teams[teamResult.teamIdx - 1].name}>{contest!.teams[teamResult.teamIdx - 1].name}</Name>
            <ProblemsCount>{problemsCount}</ProblemsCount>
            <Penalty>{teamResult.penalty}</Penalty>
            {teamResult.problems.map(p => {
                const currentDefrosting = isCurrentResult && defrostingState === DefrostingState.Defrosting && currentProblem === p.shortName;
                return (<Problem
                    $defrosting={currentDefrosting}
                    $status={(p.submissionsCount > 0 || p.status === ProblemStatus.Accepted) ? p.status : undefined}
                    key={p.shortName}
                >
                    <div>
                        {(p.submissionsCount > 0 || p.status === ProblemStatus.Accepted) &&
                            sign[p.status] + (p.submissionsCount || '')
                        }
                    </div>
                </Problem>);
            })}
        </StyledRow>
    );
};
