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
        let bearerToken = "Bearer " + tokenService.getAccessToken();

        let promise = new Promise((resolve, reject) => {
            fetch(`${ConstantStrings.baseDevURL}CarryOut/AddToCart`, {
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
                    resolve(false);
                }
            })
        });

        return promise;
    }

    // Requires Authorization Bearer Token.
    public getAllCarryOutsInCart(customerId: number): Promise<any> {
        let tokenService = new TokenService();
        let bearerToken = "Bearer " + tokenService.getAccessToken();

        let promise = new Promise((resolve, reject) => {
            fetch(`${ConstantStrings.baseDevURL}CarryOut/GetAllCarryOutsInCart/${customerId}`, {
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