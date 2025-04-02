import {
    type RouteConfig,
    index,
    layout,
    prefix,
    route,
} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/login", "routes/login.tsx"),
    route("/register", "routes/register.tsx"),
    ...prefix("account", [
        layout("routes/account/accountLayout.tsx", [
            index("routes/account/account.tsx"),
            route("/personal-details", "routes/account/personalDetails.tsx"),
        ]),
    ]),
    route("/p/:productName", "routes/products/product.tsx"),
    ...prefix("dashboard", [route("/", "routes/dashboard/dashboard.tsx")]),
] satisfies RouteConfig;
