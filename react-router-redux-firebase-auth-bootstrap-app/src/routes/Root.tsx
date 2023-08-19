import { Routes, Route, Navigate, Outlet} from 'react-router-dom';

const PrivateRoute = ({ user, children }) => {
    return user ? children : <Navigate to="/" />;
}

const PrivateWrapper = ({ user }) => {
    return user ? <Outlet /> : <Navigate to="/" />;
}

const RootRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    )
}

export default RootRoutes;