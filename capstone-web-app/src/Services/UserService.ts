import ConstantStrings from "../Constants/ConstantStrings";
import TokenService from "./TokenService";


export default class UserService {
    public changePassword(requestBody: any): Promise<any> {
        let tokenService = new TokenService();
        let bearerToken = tokenService.getAuthToken();

        let promise = new Promise((resolve, reject) => {
            fetch(`${ConstantStrings.baseAzureURL}User/ChangePassword`, {
                method: "PUT",
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearerToken
                }
            })
            .then(response => {
                if (response.status === 200){
                    resolve(true);
                }
                else {
                    reject("Response Status: " + response.status);
                }
            })
            .catch(reason => {
                reject(reason);
            })
        });
            return promise;
    }
    public updateInformation(requestBody: any ): Promise<any>{
        let tokenService = new TokenService();
        let bearerToken = "Bearer " + tokenService.getAuthToken();
 
        let promise = new Promise ((resolve, reject) => {
            fetch(`${ConstantStrings.baseAzureURL}Customer/UpdateByCustomer`, {
                method: "PUT",
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearerToken
                }
            })
            .then(response => {
                if (response.status === 200) {
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
            })
        });
        
        return promise;

    }
}