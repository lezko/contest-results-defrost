export interface Submission {
    status: string;
    problem: string;
    teamIdx: number;
    time: number;
    totalCount: number;
    frozen?: boolean;
}