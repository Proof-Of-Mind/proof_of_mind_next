import { IMintCreaters } from "@/types";

const getUserTotal = (address: string) => {
    return fetch("api/captcha/total?address=" + address + "&projectId=0", {
        method: "GET",
        mode: "cors",
        cache: "default",
    });
};

const checkToken = (token: string, address: string) => {
    return fetch("api/captcha?token=" + token + "&address=" + address + "&projectId=0", {
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

export { getUserTotal, checkToken, mintCreates };