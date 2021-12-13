export class AddUser {    
    public name: string;
    public email: string;
    public gender: string;
    public status: string

    constructor(name:string, email: string, gender:string, status:string) {        
        this.name = name;
        this.email = email;
        this.gender = gender;
        this.status = status
    }
}