import { roles }            from "../config/roles";
import HomeViewModel        from "../ViewModel/HomeViewModel";
import ProfileViewModel     from "../ViewModel/ProfileViewModel";
import GamesViewModel       from "../ViewModel/GamesViewModel";
import GroupsViewModel      from "../ViewModel/GroupsViewModel";
import StatsViewModel       from "../ViewModel/StatsViewModel";
import OneGroupViewModel    from "../ViewModel/OneGroupViewModel";

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
            currentRole: roles.USER,
        },
        path     : "/"
    },
    {
        component: ProfileViewModel,
        exact    : true,
        name     : "menu",
        options: {
            bodyClass: "body-background",
            currentRole: roles.USER,
        },
        path     : "/menu"
    },
    {
        component: GamesViewModel,
        exact    : true,
        name     : "mygames",
        options: {
            bodyClass: "body-background",
            currentRole: roles.USER,
        },
        path     : "/mygames"
    },
    {
        component: GroupsViewModel,
        exact    : true,
        name     : "groups",
        options: {
            bodyClass: "body-background",
            currentRole: roles.USER,
        },
        path     : "/groups"
    },
    {
        component: StatsViewModel,
        exact    : true,
        name     : "stats",
        options: {
            bodyClass: "body-background",
            currentRole: roles.USER,
        },
        path     : "/stats"
    },
    {
        component: OneGroupViewModel,
        exact    : true,
        name     : "view-group",
        options: {
            bodyClass: "body-background",
            currentRole: roles.USER,
        },
        path     : "/view-group/:id"
    },
];

export default routesList;