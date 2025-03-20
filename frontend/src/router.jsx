import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Home from './pages/Home';
import HotelDetail from './pages/HotelDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Layout from './layouts/Layout';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import PresentationPage from './pages/PresentationPage';
import AdminAddProduct from './pages/AdminAddProduct';
import AdminListProducts from './pages/AdminListProducts';
import FullGallery from './components/FullGallery';
import AdminEditProduct from './pages/AdminEditProduct';
import AdminUserList from './pages/AdminUserList';
import AdminFeatureList from './pages/AdminFeatureList';
import AdminFeatureForm from './pages/AdminFeatureForm';
import CategoryForm from './components/CategoryForm';

const MainRouter = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <PresentationPage />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <Home />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/hotels/:id"
          element={
            <Layout>
              <HotelDetail />
            </Layout>
          }
        />
        <Route
          path="/hotels/:id/gallery"
          element={
            <PrivateRoute>
              <Layout>
                <FullGallery />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <Layout>
                <AdminDashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/add_hotel"
          element={
            <PrivateRoute role="admin">
              <Layout>
                <AdminAddProduct />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/hotels_list"
          element={
            <PrivateRoute role="admin">
              <Layout>
                <AdminListProducts />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/change_role"
          element={
            <PrivateRoute role="admin">
              <Layout>
                <AdminUserList />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/edit_hotel/:id"
          element={
            <PrivateRoute role="admin">
              <Layout>
                <AdminEditProduct />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/categories"
          element={
            <PrivateRoute role="admin">
              <Layout>
                <CategoryForm />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/features"
          element={
            <PrivateRoute role="admin">
              <Layout>
                <AdminFeatureList />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/features/add"
          element={
            <PrivateRoute role="admin">
              <Layout>
                <AdminFeatureForm />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/features/edit/:id"
          element={
            <PrivateRoute role="admin">
              <Layout>
                <AdminFeatureForm />
              </Layout>
            </PrivateRoute>
          }
        />

        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default MainRouter;
