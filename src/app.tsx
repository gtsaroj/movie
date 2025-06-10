
import { BrowserRouter, Route, Routes } from "react-router"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routers } from './routes/routes';
import { BaseLayout } from './layouts/base/baseLayout';
import Home from './pages/home/home';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {
            Object.entries(routers).map(([pathName, config]) => {
              if (config?.isAccessToAnyOne) {
                return (
                  <Route element={<BaseLayout />} >
                    <Route index element={<Home />} />
                    <Route path={pathName} element={config?.element} />
                  </Route>
                )
              }
            })
          }
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
