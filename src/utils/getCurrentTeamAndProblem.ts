import { Submission } from '@/types/Submission.ts';
import { ActualResult } from '@/types/ActualResult.ts';

export function getSubmissionsForTeam(teamIdx: number, actualResults: ActualResult[]): Submission[] {
    const submissions: Submission[] = [];
    const result = actualResults.find(r => r.teamIdx === teamIdx)!;

    for (const problem of result.problems) {
        let found = false;
        for (const s of problem.submissions) {
            if (s.frozen) {
                found = true;
                submissions.push(s);
                s.frozen = false;
            }
        }
        if (found) {
            break;
        }
    }

    return submissions;
}