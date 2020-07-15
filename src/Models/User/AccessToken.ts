import { serializable, date } from "serializr";

class AccessToken {
    @serializable
    public accessToken: string | undefined;

    @serializable(date())
    public accessTokenExpiresAt: Date | undefined;

    public constructor(accessToken?: AccessToken) {
        if (!accessToken) {
            return;
        }

        Object.assign(this, accessToken);
    }

    public getAccessToken(): string | undefined {
        return this.accessToken;
    }

    public setAccessToken(accessToken: string | undefined): void {
        this.accessToken = accessToken;
    }

    public getAccessTokenExpiresAt(): Date | undefined {
        return this.accessTokenExpiresAt;
    }

    public setAccessTokenExpiresAt(accessTokenExpiresAt: Date | undefined): void {
        this.accessTokenExpiresAt = accessTokenExpiresAt;
    }
}

export default AccessToken;