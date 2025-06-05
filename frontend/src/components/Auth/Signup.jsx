import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../utils/constant";
import Navbar from '../shared/Navbar';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";




const Signup = () => {

    const[input, setInput] = useState({
            fullName: "",
            email: "",
            phoneNumber: "",
            password: "",
            role: "",
            file: ""
        });
        const navigate = useNavigate();
        const changeEventHandler = (e) => {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
        }

        const changeFileEventHandler = (e) => {
            setInput({
                ...input,
                file: e.target.files?.[0]
            })
        }
        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log("Form submitted with input:", input); // Log the input data

            // Add validation
            if (!input.fullName || !input.email || !input.password || !input.phoneNumber || !input.role) {
                toast.error("Please fill all required fields");
                return;
            }

            const formData = new FormData();
            formData.append("fullName", input.fullName);
            formData.append("email", input.email);
            formData.append("phoneNumber", input.phoneNumber);
            formData.append("password", input.password);
            formData.append("role", input.role);

            if(input.file){
                formData.append("file", input.file);
            }

            // Log the FormData contents
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            try {
                console.log("Attempting to sign up...");
                console.log("API Endpoint:", `${USER_API_END_POINT}/register`); // Log the full URL

                const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true
                });

                console.log("Full response:", res); // Log the complete response

                if (res?.data?.success) {
                    toast.success("Signup successful! Redirecting to login...");
                    window.location.href = "/login";
                } else {
                    console.log("Response without success:", res); // Log if success is false
                    toast.error("Signup failed. Please try again.");
                }
            } catch (error) {
                console.error("Full error object:", error);
                if (error.response) {
                    console.error("Error response data:", error.response.data);
                    console.error("Error response status:", error.response.status);
                    toast.error(error.response.data?.message || "Signup failed. Please try again.");
                } else if (error.request) {
                    console.error("No response received:", error.request);
                    toast.error("No response from server. Please check your connection.");
                } else {
                    console.error("Error setting up request:", error.message);
                    toast.error("An error occurred. Please try again.");
                }
            }
        }

    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form onSubmit={handleSubmit} className="w-1/2 border-gray-200 border rounded-md p-4 my10">
                    <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
                    <div className="my-2">
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullName}
                            name="fullName"
                            onChange={changeEventHandler}
                            placeholder="John Doe"
                            autoComplete="name"
                        />
                    </div>
                    <div className="my-2">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="john@example.com"
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
                            autoComplete="new-password"
                        />
                    </div>
                    <div className="my-2">
                        <Label>Phone Number</Label>
                        <Input
                            type="tel"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="eg: 9876543210"
                            autoComplete="tel"
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="student" className="cursor-pointer" checked = {input.role === "student"} onChange={changeEventHandler}/>
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="recruiter" className="cursor-pointer" checked = {input.role === "recruiter"} onChange={changeEventHandler}/>
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className="flex items-center space-x-2">
                        <Label>Profile</Label>
                        <Input
                        accept="image/*"
                         type="file" onChange={changeFileEventHandler} className="cursor-pointer" />

                        </div>
                    </div>
                    <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600">Sign Up</Button>
                    <span className="text-sm text-muted-foreground">Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-600">Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup
