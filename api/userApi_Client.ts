import {ApiClient} from '../utils/ApiClient'
import { APIRequestContext } from '@playwright/test'
import { userApiData } from '../testData/userApiData';
import { userApiEndpoints } from '../endpoints/userApiEndpoints';

export class userApi_Client{
    private apiClient: ApiClient;
    constructor(request: APIRequestContext)
    {
        this.apiClient = new ApiClient(request)
    }
    private headers = userApiData.headers
    
    async getListOfUsers(baseURL:string){
        let endpoint = `${baseURL}${userApiEndpoints.ListUsers}`
        return await this.apiClient.getMethod(endpoint, this.headers)
    }

    async getSingleUser(baseURL: string, id: string){
        let endpoint = `${baseURL}${userApiEndpoints.ListUsers}${id}`
        console.log(endpoint)
        return await this.apiClient.getMethod(endpoint, this.headers)
    }

    async registerUser(baseURL: string , payload:any ){
        const endpoint = `${baseURL}${userApiEndpoints.RegisterUser}`
        return await this.apiClient.postMethod(endpoint, this.headers, payload)
    }

}


