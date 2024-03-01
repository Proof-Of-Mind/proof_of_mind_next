import { IBurnGold, IClaimSilver, IMintCreaters, IRevealGold, IUserCreatesReq } from "@/types";

const getUserTotal = (address: string) => {
    return fetch("api/captcha/total?address=" + address + "&projectId=0", {
        method: "GET",
        mode: "cors",
        cache: "default",
    });
};

const getUserInfo = (projectId: number, address: string) => {
    return fetch("api/user/info/" + projectId + "/" + address, {
        method: "GET",
        mode: "cors",
        cache: "default",
    })
}

const getReferralCode = (projectId: number, address: string) => {
    return fetch("api/user/getReferralCode/" + projectId + "/" + address, {
        method: "GET",
        mode: "cors",
        cache: "default",
    })
}

const setReferralCode = ({
    p,
    projectId,
    signature,
    address,
    referralCode }: { p: string, projectId: number, signature: string, address: string, referralCode: string }) => {
    return fetch("api/user/setReferral", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ p, projectId, signature, address, referralCode }),
        mode: "cors",
        cache: "default",
    })
}

// const checkToken = (token: string, address: string) => {
//     return fetch("api/captcha?token=" + token + "&address=" + address + "&projectId=0", {
//         method: "GET",
//         mode: "cors",
//         cache: "default",
//     })
// }

const getReqId = (address: string, projectId: number) => {
    return fetch("api/captcha/req/" + projectId + "/" + address, {
        method: "GET",
        mode: "cors",
        cache: "default",
    })
}

const checkToken = ({
    token,
    address,
    reqId,
    projectId,
}: {
    token: string;
    address: string;
    reqId: string;
    projectId: number;
}) => {
    return fetch("api/captcha", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, address, reqId, projectId }),
        mode: "cors",
        cache: "default",
    })
}

const checkTokenV3 = (token: String) => {
    return fetch("api/captcha?token=" + token, {
        method: "GET",
        mode: "cors",
        cache: "default",
    })
}

const getCurrentStage = (projectId: number) => {
    return fetch("api/captcha/currentStage/" + projectId, {
        method: "GET",
        mode: "cors",
        cache: "default",
    })

}

const getHolders = (projectId: number) => {
    return fetch("api/captcha/holders/" + projectId, {
        method: "GET",
        mode: "cors",
        cache: "default",
    })

}

const mintCreates = (mintReq: IMintCreaters) => {
    return fetch("api/user/claimCreates", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(mintReq),
        mode: "cors",
        cache: "default",
    })
}

const getSilverCount = (projectId: number, linkId: string) => {
    return fetch("api/user/silver/count/" + projectId + "/" + linkId, {
        method: "GET",
        mode: "cors",
        cache: "default",
    })
}

const getGoldDetail = (projectId: number, address: string, mintId: number) => {
    return fetch("api/user/gold/detail/" + projectId + "/" + address + "/" + mintId, {
        method: "GET",
        mode: "cors",
        cache: "default",
    })
}

const getGoldPairDetail = (projectId: number, address: string, mintId: number) => {
    return fetch("api/user/gold/pairDetail/" + projectId + "/" + address + "/" + mintId, {
        method: "GET",
        mode: "cors",
        cache: "default",
    })
}

const checkAlreadyClaimSilver = (projectId: number, address: string, link: string) => {
    return fetch("api/user/silver/check/" + projectId + "/" + address + "/" + link, {
        method: "GET",
        mode: "cors",
        cache: "default",
    })
}

const claimSilverShare = (claimSilver: IClaimSilver) => {
    return fetch("api/user/claimSilverShare", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(claimSilver),
        mode: "cors",
        cache: "default",
    })
}

const revealGold = (revealGold: IRevealGold) => {
    return fetch("api/user/gold/revealGold", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(revealGold),
        mode: "cors",
        cache: "default",
    })
}

const burnGold = (burnGold: IBurnGold) => {
    return fetch("api/user/gold/burnGoldKey", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(burnGold),
        mode: "cors",
        cache: "default",
    })
}

const getUserCreates = (userCreateReq: IUserCreatesReq) => {
    return fetch("api/user/getCreates?address=" + userCreateReq.address + "&projectId=" + userCreateReq.projectId + "&type=" + userCreateReq.type + "&pageNum=" + userCreateReq.pageNum, {
        method: "GET",
        mode: "cors",
        cache: "default",
    })
}

export { burnGold, checkAlreadyClaimSilver, checkToken, checkTokenV3, getCurrentStage, getHolders, claimSilverShare, getGoldDetail, getGoldPairDetail, getReferralCode, getSilverCount, getUserCreates, getUserInfo, getReqId, getUserTotal, setReferralCode as setUserReferralCode, mintCreates, revealGold };

