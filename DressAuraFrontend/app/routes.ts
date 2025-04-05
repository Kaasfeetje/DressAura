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
    route("/c/:categoryName", "routes/category/category.tsx"),
    ...prefix("dashboard", [
        layout("routes/dashboard/dashboardLayout.tsx", [
            index("routes/dashboard/dashboard.tsx"),
            ...prefix("products", [
                route(
                    "/create",
                    "routes/dashboard/products/dashboardCreateProduct.tsx",
                ),
            ]),
        ]),
    ]),
] satisfies RouteConfig;
