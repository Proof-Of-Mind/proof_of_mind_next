interface BurnGold {
    p: string | undefined;
    projectId: number;
    signature: string;
    address: string | undefined;
    goldNonceList: GoldNonce[];
}

interface GoldNonce {
    goldId: number;
    message: string
}

export type { BurnGold, GoldNonce };