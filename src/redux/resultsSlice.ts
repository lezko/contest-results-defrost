import { Contest } from '@/types/Contest.ts';
import { ProblemStatus, TeamResult } from '@/types/TeamResult.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { defrostInitial } from '@/utils/defrost.ts';
import { sortResults } from '@/utils/sortResults.ts';
import { Submission } from '@/types/Submission.ts';
import { getActualResults } from '@/utils/getActualResults.ts';
import { ActualResult } from '@/types/ActualResult.ts';
import { getSubmissionsForTeam } from '@/utils/getCurrentTeamAndProblem.ts';

export enum DefrostingState {
    Idle, Defrosting
}

export interface ResultsState {
    initialData: {
        contest: Contest | null;
        freezeStartTime: number;
    };
    contest: Contest | null;
    currentResultIdx: number;
    currentProblemSubmissions: Submission[];
    defrostingState: DefrostingState;
    results: TeamResult[];
    actualResults: ActualResult[];
}

const initialState: ResultsState = {
    initialData: null,
    contest: null,
    currentResultIdx: 0,
    currentProblemSubmissions: [],
    defrostingState: DefrostingState.Idle,
    results: [],
    actualResults: [],
};

const resultsSlice = createSlice({
    name: 'results',
    initialState,
    reducers: {
        setInitialData(state, action: PayloadAction<ResultsState['initialData']>) {
            state.initialData = action.payload;
        },
        setContest(state, action: PayloadAction<Contest>) {
            state.contest = action.payload;
            state.actualResults = getActualResults(action.payload, state.initialData.freezeStartTime);
            state.results = defrostInitial(action.payload, state.actualResults, state.initialData.freezeStartTime);
        },

        setCurrentResultIdx(state, action: PayloadAction<number>) {
            state.currentResultIdx = action.payload;
            if (state.currentResultIdx >= 0) {
                state.currentProblemSubmissions = getSubmissionsForTeam(state.results[state.currentResultIdx].teamIdx, state.actualResults);
            }
        },
        defrostFullProblem(state) {
            const result = state.results.find(r => r.teamIdx === state.currentProblemSubmissions[0].teamIdx)!;
            const problemResult = result.problems.find(p => p.shortName === state.currentProblemSubmissions[0].problem)!;

            const lastSubmission = state.currentProblemSubmissions[state.currentProblemSubmissions.length - 1];
            problemResult.status = lastSubmission.status === 'OK' ? ProblemStatus.Accepted : ProblemStatus.Failed;

            const problem = state.contest!.problems.find(p => p.shortName === lastSubmission.problem)!;
            if (lastSubmission.status === 'OK') {
                result.penalty += Math.floor(lastSubmission.time / 60) + (state.currentProblemSubmissions.length - 1) * problem.penalty;
                problemResult.submissionsCount--;
            }
        },
        setDefrostingState(state, action: PayloadAction<DefrostingState>) {
            state.defrostingState = action.payload;
        },
        sortResults(state) {
            state.results = sortResults(state.results);
            state.currentProblemSubmissions = getSubmissionsForTeam(state.results[state.currentResultIdx].teamIdx, state.actualResults);
        },
        setResults(state, action: PayloadAction<TeamResult[]>) {
            state.results = action.payload;
        },
        setTeamResult(state, action: PayloadAction<TeamResult>) {
            for (let i = 0; i < state.results.length; i++) {
                if (state.results[i].teamIdx === action.payload.teamIdx) {
                    state.results[i] = action.payload;
                }
            }
        },
    }
});

export const resultsActions = resultsSlice.actions;
export const resultsReducer = resultsSlice.reducer;