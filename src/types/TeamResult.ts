export enum ProblemStatus {
    Frozen, Accepted, Failed
}

export interface TeamResult {
    teamIdx: number;
    penalty: number;
    problems: {
        shortName: string;
        status: ProblemStatus;
        submissionsCount: number;
    }[];
}