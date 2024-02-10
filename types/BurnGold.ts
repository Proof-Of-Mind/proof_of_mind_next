interface BurnGold {
    p: string;
    projectId: number;
    signature: string;
    address: string;
    goldNonceList: GoldNonce[];
}

interface GoldNonce {
    goldId: number;
    message: string
}

export type { BurnGold, GoldNonce };