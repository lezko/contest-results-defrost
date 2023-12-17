import { Contest } from '@/types/Contest.ts';
import { ProblemStatus, TeamResult } from '@/types/TeamResult.ts';
import { sortResults } from '@/utils/sortResults.ts';
import { ActualResult } from '@/types/ActualResult.ts';

export function defrostInitial(contest: Contest, actualResults: ActualResult[], freezeStartTime: number): TeamResult[] {
    const problems: TeamResult['problems'] = [];
    for (const problem of contest.problems) {
        problems.push({
            shortName: problem.shortName,
            status: ProblemStatus.Frozen,
            submissionsCount: 0
        });
    }

    const results: TeamResult[] = [];
    for (const team of contest.teams) {
        results.push({
            teamIdx: team.idx,
            penalty: 0,
            problems: JSON.parse(JSON.stringify(problems)),
        });
    }

    for (const result of results) {
        const actualResult = actualResults.find(r => r.teamIdx === result.teamIdx)!;
        for (const problem of result.problems) {
            const actualProblem = actualResult.problems.find(p => p.shortName === problem.shortName)!;
            if (actualProblem.submissions.length === 0) {
                continue;
            }
            const lastSubmission = actualProblem.submissions[actualProblem.submissions.length - 1];
            const problemData = contest.problems.find(p => p.shortName === lastSubmission.problem)!;
            problem.submissionsCount = actualProblem.submissions.length;

            if (lastSubmission.time < freezeStartTime) {
                problem.status = lastSubmission.status === 'OK' ? ProblemStatus.Accepted : ProblemStatus.Failed;
                if (problem.status === ProblemStatus.Accepted) {
                    result.penalty += Math.floor(lastSubmission.time / 60) + (actualProblem.submissions.length - 1) * problemData.penalty;
                    problem.submissionsCount--;
                }
            }
        }
    }

    return sortResults(results);
}