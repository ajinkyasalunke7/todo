import { Toaster } from "react-hot-toast";

export const CustomToast = () => {
    return (
        <Toaster
            position="top-center"
            reverseOrder={false}
            top={90}
            gutter={8}
            containerClassName=""
            containerStyle={{
                top: 60,
            }}
            toastOptions={{
                // Define default options
                className: "",
                duration: 3000,
                style: {
                    background: "#363636",
                    color: "#fff",
                },

                // Default options for specific types
                success: {
                    theme: {
                        primary: "green",
                        secondary: "black",
                    },
                },
            }}
        />
    );
};
