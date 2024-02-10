interface MintCreaters {
    signature: string;
    address: string;
    projectId: number;
    typedMessage: {
        type: number;
        p: string;
        message: string
    }
}

export default MintCreaters;