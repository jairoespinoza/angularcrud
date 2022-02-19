export class Country {
    name?: string;
    code?: string;
}

export class Representative {
    name?: string;
    image?: string;
}



export class Customer {
    id?: number;
    name?: number;
    country?: Country;
    company?: string;
    date?: string;
    status?: string;
    representative?: Representative;
}