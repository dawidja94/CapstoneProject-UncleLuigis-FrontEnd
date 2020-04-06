import ConstantStrings from "../Constants/ConstantStrings";
import TokenService from "./TokenService";
var jwt = require('jsonwebtoken');

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
        let bearerToken = tokenService.getAuthToken();

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

    public getReservation(requestBody: any): Promise<any> {
        let tokenService = new TokenService();
        let bearerToken = tokenService.getAuthToken();

        let promise = new Promise((resolve, reject) => {
            fetch(`${ConstantStrings.baseDevURL}Table/GetReservation`, {
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

    public cancelReservation(requestBody: any): Promise<any> {
        let tokenService = new TokenService();
        let bearerToken = tokenService.getAuthToken();

        let promise = new Promise((resolve, reject) => {
            fetch(`${ConstantStrings.baseDevURL}Table/CancelReservation`, {
                method: "PUT",
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

    public getCustomerReservations(): Promise<any> {
        let customerIdFromLS = localStorage.getItem("Customer ID");
        let customerId: number = 0;

        if (customerIdFromLS !== null) {
            customerId = parseInt(customerIdFromLS.toString());
        }

        let promise = new Promise((resolve, reject) => {
            fetch(`${ConstantStrings.baseAzureURL}Table/GetCustomerReservations/${customerIdFromLS}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
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