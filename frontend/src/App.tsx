import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route, RouterProvider } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import Users from './pages/Users'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import Tickets from './pages/Tickets'
import Login from './pages/Login'
import PrivateRoute from './utils/PrivateRoute'

const queryClient = new QueryClient()

const AuthProviderOutlet = () => (
    <RecoilRoot>
        <Outlet />
    </RecoilRoot>
)

const privateRoutes = [
    { path: '/', element: <Navigate to='/dashboard' /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/dashboard/:id', element: <Tickets /> },
    { path: '/users', element: <Users /> },
    { path: '/profile', element: <Profile /> },
]

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<AuthProviderOutlet />}>
            <Route path='/login' element={<Login />} />
            {privateRoutes.map(route => (
                <Route key={route.path} path={route.path} element={<PrivateRoute>{route.element}</PrivateRoute>} />
            ))}
        </Route>
    )
)

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <MantineProvider withGlobalStyles withNormalizeCSS theme={{ primaryColor: 'violet' }}>
                <RouterProvider router={router} />
            </MantineProvider>
        </QueryClientProvider>
    )
}

export default App
