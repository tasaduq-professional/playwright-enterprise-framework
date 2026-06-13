import { test, expect, request } from "@playwright/test";
import { userApi_Client } from "../api/userApi_client";
import { userApiData } from  "../testData/userApiData";

const baseURL = 'https://reqres.in'
let userApi : userApi_Client;

test.beforeEach(async ({ request }) => {
   userApi = new userApi_Client(request);
});

test('Get List of Users ', async ({ request }) => {
   const response = await userApi.getListOfUsers(baseURL);
   console.log(await response.json());
});

test("Get Single user and verify", async ({request}) =>{
    const id = '2';
    const res = await userApi.getSingleUser(baseURL, id);
    const response = await res.json();
    console.log(response)
    expect(response.data.id).toEqual((Number(id)))
});

test('Verify Post call with Payload that comes from other file', async ({request}) =>{
     const payload = userApiData.registration
     const response = await userApi.registerUser(baseURL, payload)
     expect(response.ok()).toBeTruthy()
});

test("Verify Post Call with dynamic payload that comes from other file", async ({request}) =>{
    // We can provide password here dynamically using functions for now it is hardcoded
    const payload = {
      ...userApiData.registration,
      password: "567876545678"
    }
    console.log(payload)
    const response = await userApi.registerUser(baseURL, payload)
    expect(response.ok()).toBeTruthy()
});