import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import SpaceXPage from "../pages/SpaceXPage";
import ViewSpaceXPage from "../pages/ViewSpaceXPage";
import Page404 from "../pages/Page404";

export default function MainRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SpaceXPage />} />
        <Route path="launches" element={<SpaceXPage />} />
        <Route path="launches/:id" element={<ViewSpaceXPage />} />
        <Route path="404" element={<Page404 />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
