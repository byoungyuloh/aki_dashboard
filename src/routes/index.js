import { useRoutes, Navigate } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/login" replace /> // 루트 경로에 접근하면 /login 으로 리다이렉트합니다.
    },
    LoginRoutes, // 로그인 라우트
    MainRoutes, // 메인 라우트
  ]); 
}
