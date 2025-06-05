import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import Navbar from '../shared/Navbar';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Link } from "react-router-dom";

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!input.email || !input.password) {
            toast.error("Please fill all fields");
            return;
        }

        try {
            console.log("Attempting to login...");
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            console.log("Login response:", res);

            if (res?.data?.success) {
                toast.success("Login successful!");
                localStorage.setItem("user", JSON.stringify(res.data.user));
                navigate("/");
            } else {
                toast.error("Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Login Error:", error);
            if (error.response) {
                toast.error(error.response.data?.message || "Login failed. Please try again.");
            } else if (error.request) {
                toast.error("No response from server. Please check your connection.");
            } else {
                toast.error("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form onSubmit={handleSubmit} className="w-1/2 border-gray-200 border rounded-md p-4 my10">
                    <h1 className="text-2xl font-bold mb-4">Login</h1>
                    <div className="my-2">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Enter your email"
                            autoComplete="email"
                        />
                    </div>
                    <div className="my-2">
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                        />
                    </div>
                    <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600">
                        Login
                    </Button>
                    <span className="text-sm text-muted-foreground">
                        Don't have an account? <Link to="/signup" className="text-blue-500 hover:text-blue-600">Sign Up</Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Login;
