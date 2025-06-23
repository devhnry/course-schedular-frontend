import AppRoutes from "./routes/routes.tsx";
import {Toaster} from "react-hot-toast";

function App() {
  return (
      <>
        <Toaster
            toastOptions={{
              style: {
                fontSize: "13px",
                fontWeight: 500,
                border: '1px solid #eee',
              },
              success: {
                iconTheme: {
                  primary: "#000",
                  secondary: "#fff",
                },
              },
            }}
            position="top-right" reverseOrder={false} />
        <AppRoutes />
      </>
  )
}
export default App
