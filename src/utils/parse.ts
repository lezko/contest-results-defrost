import { Problem } from '@/types/Problem.ts';
import { Team } from '@/types/Team.ts';
import { Submission } from '@/types/Submission.ts';
import { Contest } from '@/types/Contest.ts';

export function parseProblem(str: string): Problem {
    const parts = str.slice(3).split(',');
    return {
        shortName: parts[0],
        fullName: parts[1],
        penalty: +parts[2],
    };
}

export function parseTeam(str: string): Team {
    const parts = str.slice(3).split(',');
    return {
        idx: +parts[0],
        name: parts[3],
    };
}

export function parseSubmission(str: string): Submission {
    const parts = str.slice(3).split(',');
    return {
        teamIdx: +parts[0],
        problem: parts[1],
        totalCount: +parts[2],
        time: +parts[3],
        status: parts[4],
        frozen: false,
    };
}

export function parseContest(str: string): Contest {
    const lines = str.split('\n').map(s => s.trim());
    const contest: Contest = {
        name: '',
        teams: [],
        problems: [],
        submissions: [],
    };
    for (const line of lines) {
        if (line.startsWith('@contest')) {
            contest.name = line.slice(10, -1);
        }
        if (line.split(' ')[0] === '@p') {
            contest.problems.push(parseProblem(line));
        }
        if (line.split(' ')[0] === '@t') {
            contest.teams.push(parseTeam(line));
        }
        if (line.split(' ')[0] === '@s') {
            contest.submissions.push(parseSubmission(line));
        }
    }
    return contest;
}
