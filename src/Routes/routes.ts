import { roles }            from "../config/roles";
import HomeViewModel        from "../ViewModel/HomeViewModel";
import ProfileViewModel     from "../ViewModel/ProfileViewModel";

interface Route {
    component: React.ComponentType;
    options?: any;
    name: string;
    path: string;
    exact: boolean;
}

const routesList: Route[] = [
    {
        component: HomeViewModel,
        exact    : true,
        name     : "home",
        options: {
            bodyClass: "body-background",
            currentRole: roles.EMPLOYEE,
        },
        path     : "/"
    },
    {
        component: ProfileViewModel,
        exact    : true,
        name     : "menu",
        options: {
            bodyClass: "body-background",
            currentRole: roles.EMPLOYEE,
        },
        path     : "/menu"
    },
];

export default routesList;