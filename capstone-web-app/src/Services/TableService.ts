import ConstantStrings from "../Constants/ConstantStrings";
import TokenService from "./TokenService";

export default class TableService {
    public getAvailableTables(requestBody: any): Promise<any> {
        console.log(requestBody);

        let promise = new Promise((resolve, reject) => {
            fetch(`${ConstantStrings.baseAzureURL}Table/GetAvailableTables`, {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                if (response.status === 200) {
                    console.log("Get tables status 200");
                    return response.json();
                }
                else {
                    reject("Response Status: " + response.status);
                }
            })
            .then((data): any => {
                resolve(data);
            })
            .catch(reason => {
                reject(reason);
            });
        });  

        return promise;
    }

    public reserveTable(requestBody: any): Promise<any> {
        console.log(requestBody);
        let tokenService = new TokenService();
        let bearerToken = "Bearer " + tokenService.getAccessToken();

        let promise = new Promise((resolve, reject) => {
            fetch(`${ConstantStrings.baseAzureURL}Table/ReserveTable`, {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearerToken
                }
            })
            .then(response => {
                if (response.status === 200) {
                    console.log("Reserve table status 200");
                    return response.json();
                }
                else {
                    reject("Response Status: " + response.status);
                }
            })
            .then((data): any => {
                resolve(data);
            })
            .catch(reason => {
                reject(reason);
            });
        });  

        return promise;
    }
}