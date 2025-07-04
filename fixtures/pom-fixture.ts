import {test as baseTest} from "@playwright/test"
import {HomePage} from "../pages/HomePage"
import {RegisterPage} from "../pages/RegisterPage"

// Type
type POMFixtureType ={
    homePage: HomePage;
    registerPage: RegisterPage

}


// Fixture
export const test = baseTest.extend<POMFixtureType>({
     homePage: async({page}, use)=>{
       await use(new HomePage(page))
     },
     registerPage: async({page},use)=>{
       await use(new RegisterPage(page))
     }
})