import { ProblemStatus, TeamResult } from '@/types/TeamResult.ts';

export function sortResults(results: TeamResult[]): TeamResult[] {
    return results.sort((a, b) => {
        const acceptedA = countAccepted(a.problems);
        const acceptedB = countAccepted(b.problems);
        if (acceptedA === acceptedB) {
            return a.penalty - b.penalty;
        }
        return acceptedB - acceptedA;
    });
}

export function countAccepted(problems: TeamResult['problems']) {
    return problems.reduce((n, p) => {
        if (p.status === ProblemStatus.Accepted) {
            n++;
        }
        return n;
    }, 0);
}