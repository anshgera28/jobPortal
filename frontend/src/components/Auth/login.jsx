
import Navbar from '../shared/Navbar'
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: ""
    })
    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input);
    }
    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form onSubmit={handleSubmit} className="w-1/2 border-gray-200 border rounded-md p-4 my10">
                    <h1 className="text-2xl font-bold mb-4">Login</h1>
                    <div className="my-2">
                        <Label>Email</Label>
                        <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="John Doe" />
                    </div>
                    <div className="my-2">
                        <Label>Password</Label>
                        <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder="JohnDoe@gmail.com" />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="student" checked={input.role === "student"} onChange={changeEventHandler} className="cursor-pointer" />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="recruiter" checked={input.role === "recruiter"} onChange={changeEventHandler} className="cursor-pointer" />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600">Login</Button>
                    <span className="text-sm text-muted-foreground">Don't have an account? <Link to="/signup" className="text-blue-500 hover:text-blue-600">Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login