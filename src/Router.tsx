import { lazy, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/common/Layout";
import ErrorFallback from "./components/ErrorFallback";
import routerMeta from "./lib/routerMeta";
import LoadingFallback from "./components/LoadingFallback";

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
              <Suspense fallback={<LoadingFallback />}>
                <ErrorBoundary
                  fallbackRender={({ resetErrorBoundary, error }) => {
                    return <ErrorFallback resetErrorBoundary={resetErrorBoundary} />;
                  }}>
                  {Component && <Component />}
                </ErrorBoundary>
              </Suspense>
            }
          />
        ))}
      </Route>
    </Routes>
  );
};

export default Router;
