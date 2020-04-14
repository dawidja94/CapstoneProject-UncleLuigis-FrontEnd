var jwt = require('jsonwebtoken');

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
        localStorage.setItem("Email", apiResponse.email);
        localStorage.setItem("Customer ID", apiResponse.customerId);
        localStorage.setItem("Username", apiResponse.username);

        this.getAccessToken();
        this.getRefreshToken();
    }

    private getAccessToken(): string {
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

    private getRefreshToken(): string {
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

    public getAuthToken(): string {
        let bearerToken: string = "Bearer ";
        let accessToken = this.getAccessToken();
        let refreshToken = this.getRefreshToken();
        let decodedAccessToken= jwt.decode(accessToken, {complete: true});
        //let decodedRefreshToken = jwt.decode(refreshToken, {complete: true});
        let dateNow = new Date();

        if (decodedAccessToken.payload.exp * 1000 < dateNow.getTime()) {
            bearerToken += refreshToken;
        }
        else {
            bearerToken += accessToken;
        }
        
        return bearerToken;
    }
}