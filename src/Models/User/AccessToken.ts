import { serializable } from "serializr";

class AccessToken {
    @serializable
    public accessToken: string | undefined;

    @serializable
    public accessTokenExpiresAt: Date | undefined;

    public constructor(accessToken?: AccessToken) {
        if (!accessToken){
            return;
        }

        Object.assign(this, accessToken);
    }
}

export default AccessToken;