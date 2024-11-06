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
  },
  SignUpPage: {
    name: "Sign up",
    path: "/register",
    isShow: true,
    isAuth: false,
  },
  NotFoundPage: {
    path: "/*",
    isShow: false,
  },
};

export default routerMeta;
