import { Submission } from '@/types/Submission.ts';

export interface ActualResult {
    teamIdx: number;
    penalty: number;
    problems: {
        shortName: string;
        submissions: Submission[];
    }[];
}
