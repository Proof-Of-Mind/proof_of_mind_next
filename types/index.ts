import IMintCreaters from "./MintCreates"
import IClaimSilver from "./ClaimSilver"
import IUserCreatesReq from "./UserCreatesReq"
import IUserCreates from "./UserCreates"
import IGoldCreates from "./GoldCreates"
import IRevealGold from "./RevealGold"
import IUserInfo from "./UserInfo"
import { BurnGold as IBurnGold, GoldNonce as IGoldNonce } from "./BurnGold"

export type {
    IUserInfo,
    IMintCreaters,
    IClaimSilver,
    IUserCreatesReq,
    IUserCreates,
    IGoldCreates,
    IRevealGold,
    IBurnGold,
    IGoldNonce
}