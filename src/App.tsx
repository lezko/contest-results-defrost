import { useEffect, useRef } from 'react';
import { useActions } from '@/redux/actions.ts';
import { useAppSelector } from '@/redux';
import { DefrostingState } from '@/redux/resultsSlice.ts';
import styled from 'styled-components';
import { ResultsTable } from '@/components/ResultsTable.tsx';

const StyledApp = styled('div')`
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
`;

export const App = () => {
    const { setDefrostingState, setContest, sortResults, defrostFullProblem, setCurrentResultIdx } = useActions();
    const {
        initialData,
        contest,
        defrostingState,
        currentResultIdx,
        currentProblemSubmissions,
    } = useAppSelector(state => state.results);

    useEffect(() => {
        // if (contest === null) {
        //     const contest = parseContest(tmpLog);
        //     setInitialData(JSON.parse(JSON.stringify(contest)));
        //
        //     setContest(contest);
        //     setCurrentResultIdx(contest.teams.length - 1);
        // }
    }, []);

    const timeoutRef = useRef<any>(null);
    const handleKeyDown = (e: any) => {
        if (e.keyCode === 78) {
            if (timeoutRef.current !== null) {
                clearInterval(timeoutRef.current);
                timeoutRef.current = null;
                sortResults();
                return;
            }

            if (defrostingState === DefrostingState.Idle) {
                if (currentProblemSubmissions.length) {
                    setDefrostingState(DefrostingState.Defrosting);
                } else {
                    setCurrentResultIdx(currentResultIdx - 1);
                }
            } else {
                if (currentProblemSubmissions.length) {
                    defrostFullProblem();
                    setDefrostingState(DefrostingState.Idle);
                    timeoutRef.current = setTimeout(() => {
                        sortResults();
                        timeoutRef.current = null;
                    }, 1000);
                } else {
                    setCurrentResultIdx(currentResultIdx - 1);
                }
            }
        }
        if (e.keyCode === 82) {
            // fixme disgusting
            const data = JSON.parse(JSON.stringify(initialData.contest));
            setContest(data);
            setCurrentResultIdx(data.teams.length - 1);
        }
    };

    return (
        <StyledApp tabIndex={0} onKeyDown={handleKeyDown}>
            {contest &&
              <ResultsTable />
            }
        </StyledApp>
    );
};
