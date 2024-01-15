import axios from "axios";

export enum TypeGuest {
    ADULT = 'adult',
    CHILD = 'child',
}

export function translateGuestType(type: TypeGuest){
    switch(type){
        case TypeGuest.ADULT:
            return 'Adulte';
        case TypeGuest.CHILD:
            return 'Enfant';
    }
}

export interface Guests {
    id: number;
    firstname: string|null;
    type:TypeGuest;
    lastname: string|null;
    birthyear: number|null;
    reception: boolean;
    dinner: boolean;
}

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});


export function getGestsApi(){
    return axiosInstance.get('/users/:id/guests').then(res => res.data);
}

export function setGestsApi(payload: Guests[]):Promise<Guests[]>{
    return axiosInstance.post<Guests[]>('/users/:id/guests').then(res => res.data);
}



