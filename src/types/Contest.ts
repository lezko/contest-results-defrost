import { Problem } from '@/types/Problem.ts';
import { Submission } from '@/types/Submission.ts';
import { Team } from '@/types/Team.ts';

export interface Contest {
    name: string;
    teams: Team[];
    problems: Problem[];
    submissions: Submission[];
}