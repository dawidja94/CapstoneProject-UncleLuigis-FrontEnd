import ConstantStrings from "../Constants/ConstantStrings";
import TokenService from "./TokenService";

export default class MenuService {
    public getAllFoodMenuItems(): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            fetch(`${ConstantStrings.baseAzureURL}Food/GetAllFood`)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
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

    public getAllBeverageMenuItems(): Promise<any> {
        let promise = new Promise((resolve, reject) => {
            fetch(`${ConstantStrings.baseAzureURL}Beverage/GetAllBeverage`)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
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

    // Requires Authorization Bearer Token.
    public addToCart(requestBody: any): Promise<any> {
        let tokenService = new TokenService();
        let bearerToken = tokenService.getAuthToken();

        let promise = new Promise((resolve, reject) => {
            fetch(`${ConstantStrings.baseAzureURL}CarryOut/AddToCart`, {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearerToken
                }
            })
            .then(response => {
                if (response.status === 200) {
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

    // Requires Authorization Bearer Token.
    public getAllCarryOutsInCart(customerId: number): Promise<any> {
        let tokenService = new TokenService();
        let bearerToken = tokenService.getAuthToken();

        let promise = new Promise((resolve, reject) => {
            fetch(`${ConstantStrings.baseAzureURL}CarryOut/GetAllCarryOutsInCart/${customerId}`, {
                method: "GET",
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
            });
        });  

        return promise;
    }
    public getAllCarryOutsForCustomer(customerId: number): Promise<any> {
        let tokenService = new TokenService();
        let bearerToken = tokenService.getAuthToken();
        let promise = new Promise((resolve, reject) => {
            fetch(`${ConstantStrings.baseAzureURL}CarryOut/GetAllCarryOutsForCustomer/${customerId}`, {
                method: "GET",
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
            });
        });  

        return promise;
        
    }

    public getCarryOutById(bundleId: number) :Promise<any>{
        let tokenService = new TokenService();
        let bearerToken = tokenService.getAuthToken();
        let promise = new Promise((resolve, reject) => {
            fetch(`${ConstantStrings.baseAzureURL}CarryOut/GetCarryOutById/${bundleId}`, {
                method: "GET",
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
            });
        });  

        return promise;
    }

    public removeFromCart(requestBody: any): Promise<any> {
        let tokenService = new TokenService();
        let bearerToken = tokenService.getAuthToken();

        let promise = new Promise((resolve, reject) => {
            fetch(`${ConstantStrings.baseAzureURL}CarryOut/RemoveFromCart`, {
                method: "DELETE",
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearerToken
                }
            })
            .then(response => {
                if (response.status === 200) {
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

    public updateCarryOutOrder(requestBody: any): Promise<any> {
        let tokenService = new TokenService();
        let bearerToken = tokenService.getAuthToken();

        let promise = new Promise((resolve, reject) => {
            fetch(`${ConstantStrings.baseAzureURL}CarryOut/UpdateCarryOut`, {
                method: "PUT",
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearerToken
                }
            })
            .then(response => {
                if (response.status === 200) {
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

    public submitCarryOutOrder(requestBody: any): Promise<any> {
        let tokenService = new TokenService();
        let bearerToken = tokenService.getAuthToken();

        let promise = new Promise((resolve, reject) => {
            fetch(`${ConstantStrings.baseAzureURL}CarryOut/CreateCarryOut`, {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': bearerToken
                }
            })
            .then(response => {
                if (response.status === 200) {
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
}