import ConstantStrings from "../Constants/ConstantStrings";

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
}