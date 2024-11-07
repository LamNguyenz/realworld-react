export interface IRouterMeta {
  name?: string;
  path: string;
  isShow: boolean;
  isCommon?: boolean;
  isAuth?: boolean;
  icon?: string;
  lazyImport?: () => Promise<{ default: React.ComponentType<any> }>;
}

export type RouterMetaType = {
  [key: string]: IRouterMeta;
};

const routerMeta: RouterMetaType = {
  HomePage: {
    name: "Home",
    path: "/",
    isShow: true,
    isCommon: true,
    lazyImport: () => import("@/pages/HomePage"),
  },
  SignInPage: {
    name: "Sign in",
    path: "/login",
    isShow: true,
    isAuth: false,
    lazyImport: () => import("@/pages/LoginPage"),
  },
  SignUpPage: {
    name: "Sign up",
    path: "/register",
    isShow: true,
    isAuth: false,
    lazyImport: () => import("@/pages/RegisterPage"),
  },
  NotFoundPage: {
    path: "/*",
    isShow: false,
  },
};

export default routerMeta;
