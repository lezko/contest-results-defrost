import { Contest } from '@/types/Contest.ts';
import { ActualResult } from '@/types/ActualResult.ts';
import { Submission } from '@/types/Submission.ts';

export function getActualResults(contest: Contest, freezeStartTime: number): ActualResult[] {
    const problems: ActualResult['problems'] = [];
    for (const problem of contest.problems) {
        problems.push({
            shortName: problem.shortName,
            submissions: [],
        });
    }

    const results: ActualResult[] = [];
    for (const team of contest.teams) {
        results.push({
            teamIdx: team.idx,
            penalty: 0,
            problems: JSON.parse(JSON.stringify(problems)),
        });
    }

    for (const result of results) {
        for (const problem of result.problems) {
            const submissions: Submission[] = [];
            for (const s of contest.submissions) {
                if (s.teamIdx === result.teamIdx && s.problem === problem.shortName) {
                    if (s.status !== 'CE') {
                        submissions.push(s);
                    }
                    if (s.status === 'OK') {
                        const problemData = contest.problems.find(p => p.shortName === s.problem)!;
                        result.penalty += Math.floor(s.time / 60) + (submissions.length - 1) * problemData.penalty;
                        break;
                    }
                }
            }

            if (submissions.length) {
                const lastSubmission = submissions[submissions.length - 1];
                if (lastSubmission.time >= freezeStartTime) {
                    for (const submission of submissions) {
                        submission.frozen = true;
                    }
                }
            }

            problem.submissions = submissions;
        }
    }

    return results;
}