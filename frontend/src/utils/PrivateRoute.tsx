// import { Navigate } from 'react-router-dom'
// import { useRecoilValue } from 'recoil'
// import { userState } from '../atoms'
import Layout from '../components/Layout'

type PrivateRouteProps = {
    children: JSX.Element
}

const PrivateRoute = ({ children }: PrivateRouteProps): JSX.Element => {
    //const user = useRecoilValue(userState)
    // return user ? <Layout>{children}</Layout> : <Navigate to='/login' />
    return <Layout>{children}</Layout>
}

export default PrivateRoute
