import { roles }        from "../../config/roles";
import { observable }   from "mobx";
import { serializable } from "serializr";

class User {
    @observable
    @serializable
    private firstName: string;
    @observable
    @serializable
    private lastName: string;
    @observable
    @serializable
    private email: string;
    @observable
    @serializable
    private isAdmin: boolean;
    @observable
    @serializable
    private role: string;
    @observable
    private image?: string;
    @observable
    private fullName: string;

    public constructor() {
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.isAdmin = false;
        this.role  = roles.USER;
        this.image = "";
        this.fullName = "";
    }

    public getFirstName(): string {
        return this.firstName;
    }

    public setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public isIsAdmin(): boolean {
        return this.isAdmin;
    }

    public setIsAdmin(isAdmin: boolean): void {
        this.isAdmin = isAdmin;
    }

    public getRole(): string {
        return this.role;
    }

    public setRole(role: string): void {
        this.role = role;
    }

    public getImage(): string | undefined {
        return this.image;
    }

    public setImage(image: string): void {
        this.image = image;
    }

    public getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

}

export default User;