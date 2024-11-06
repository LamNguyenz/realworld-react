import { lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/common/Layout";
import ErrorFallback from "./components/ErrorFallback";
import routerMeta from "./lib/routerMeta";

const assignRouter = Object.keys(routerMeta).map((componentKey) => {
  const props = routerMeta[componentKey];

  return {
    Component: props.lazyImport ? lazy(props.lazyImport) : null,
    props,
  };
});

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {assignRouter.map(({ Component, props }) => (
          <Route
            key={props.path}
            path={props.path}
            element={
              <ErrorBoundary
                fallbackRender={({ resetErrorBoundary }) => <ErrorFallback resetErrorBoundary={resetErrorBoundary} />}>
                {Component && <Component />}
              </ErrorBoundary>
            }
          />
        ))}
      </Route>
    </Routes>
  );
};

export default Router;
