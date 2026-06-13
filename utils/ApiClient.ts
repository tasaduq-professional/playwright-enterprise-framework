import {APIRequestContext} from '@playwright/test'; 

export class ApiClient{

    private request : APIRequestContext;

    constructor(request : APIRequestContext){
        this.request = request;
    }
    async getMethod(endpoint : string, headers={})
    {
        return await this.request.get(endpoint,{
            headers
        })
    }
    async postMethod(endpoint: string , headers= {}, payload:any){

        return await this.request.post(endpoint, {
            headers,
            data:payload
        })
    }
    async deleteMethod(endpoint: string, headers ={}, payload:any){
        return await this.request.delete(endpoint,{
            headers,
            data:payload
        })
    }
    async patchMethod(endpoint: string, headers= {}, payload:any){
        return await this.request.patch(endpoint, {
            headers,
            data:payload
        })
    }
    async updateMethod(endpoint: string, headers= {}, payload:any){
        return await this.request.put(endpoint, {
            headers,
            data:payload
        })
    }
}