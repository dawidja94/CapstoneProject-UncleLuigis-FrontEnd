export default class TokenService {
    
    public handleAuthTokens(apiResponse: any) {
        let accessToken: string[] = apiResponse.accessToken.split(".");
        let refreshToken: string[] = apiResponse.refreshToken.split(".");

        for (let i = 0; i < 3; i++) {
            accessToken[i] = btoa(accessToken[i]);
            localStorage.setItem("at" + i, accessToken[i]);

            refreshToken[i] = btoa(refreshToken[i]);
            localStorage.setItem("rt" + i, refreshToken[i]);
        }

        localStorage.setItem("First name", apiResponse.firstName);
        localStorage.setItem("Last name", apiResponse.lastName);
        localStorage.setItem("Phone number", apiResponse.phoneNumber);

        this.getAccessToken();
        this.getRefreshToken();
    }

    public getAccessToken(): string {
        let accessParts: string[] = [];
        let accessToken: string = "";

        for (let i = 0; i < 3; i++) {
            accessParts.push(localStorage.getItem("at" + i) as string);
            accessToken += atob(accessParts[i]);

            if (i !== 2) {
                accessToken += ".";
            }
        }

        return accessToken;
    }

    public getRefreshToken(): string {
        let refreshParts: string[] = [];
        let refreshToken: string = "";

        for (let i = 0; i < 3; i++) {
            refreshParts.push(localStorage.getItem("rt" + i) as string);
            refreshToken += atob(refreshParts[i]);

            if (i !== 2) {
                refreshToken += ".";
            }
        }

        return refreshToken;
    }
}