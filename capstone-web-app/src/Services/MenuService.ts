import ConstantStrings from "../Constants/ConstantStrings";

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
}