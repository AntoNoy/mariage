import axios from "axios";

export enum TypeGuest {
    ADULT = 'adult',
    CHILD = 'child',
    TEEN= 'teen',
    BABY = 'baby',
}

export function translateGuestType(type: TypeGuest){
    switch(type){
        case TypeGuest.ADULT:
            return 'Adulte';
        case TypeGuest.CHILD:
            return 'Enfant';
        case TypeGuest.TEEN:
            return 'Adolescent';
        case TypeGuest.BABY:
            return 'Bébé';
    }
}

export interface Guests {
    id: number;
    firstname: string|null;
    type:TypeGuest;
    lastname: string|null;
    birthyear: number|null;
    wineReception: boolean|null;
    dinner:boolean|null;
}

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});


export function getGestsApi(){
    if(process.env.NEXT_PUBLIC_API_URL === ''){
        return new Promise<Guests[]>((resolve) => {
            resolve(mockData);
        })
    }
    return axiosInstance.get('/users/:id/guests').then(res => res.data);
}

export function setGestsApi(payload: Guests[]):Promise<Guests[]>{
    if(process.env.NEXT_PUBLIC_API_URL === undefined){
        return new Promise<Guests[]>((resolve) => {
            resolve(mockData);
        })
    }
    return axiosInstance.post<Guests[]>('/users/:id/guests').then(res => res.data);
}


let mockData: Guests[] = [
    {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        type: TypeGuest.ADULT,
        birthyear: null,
        wineReception: null,
        dinner: null,
    },
    {
        id: 2,
        firstname: 'Jane',
        lastname: 'Doe',
        type: TypeGuest.ADULT,
        birthyear: null,
        wineReception: null,
        dinner: null,
    },
    {
        id: 3,
        firstname: 'Richard',
        lastname: 'Doe',
        type: TypeGuest.CHILD,
        birthyear: null,
        wineReception: null,
        dinner: null,
    },
    {
        id: 4,
        firstname: 'Ember',
        lastname: 'Doe',
        type: TypeGuest.CHILD,
        birthyear: null,
        wineReception: null,
        dinner: null,
    },
    {
        id: 5,
        firstname: 'Baby',
        lastname: 'Doe',
        type: TypeGuest.BABY,
        birthyear: null,
        wineReception: null,
        dinner: null,
    }
];

