import Index from "../views/Index";
import DashboardView from "../views/Dashboard";
import Dashboard from "../components/dashboard/home";
import PassportView from "../views/Dashboard/Passport";
import Passport from "../components/dashboard/passport/passport";
export default {
    path: "",
    component: Index,
    children: [
        {
            path: "/dashboard",
            component: DashboardView,
            children: [
                {
                    path: "",
                    component: Dashboard,
                    name: "dashboard",
                    meta: { auth: true },
                }
            ]
        },
        {
            path: "/passport",
            component: PassportView,
            children: [
                {
                    path: "",
                    component: Passport,
                    name: "passport",
                    meta: { auth: true },
                }
            ]
        },
    ]
};