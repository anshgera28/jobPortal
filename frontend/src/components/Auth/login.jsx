
import Navbar from '../shared/Navbar'
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
const Login = () => {
    return (
        <div>
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form action="" className="w-1/2 border-gray-200 border rounded-md p-4 my10">
                    <h1 className="text-2xl font-bold mb-4">Login</h1>
                    <div className="my-2">
                        <Label>Email</Label>
                        <Input type="email" placeholder="John Doe" />
                    </div>
                    <div className="my-2">
                        <Label>Password</Label>
                        <Input type="password" placeholder="JohnDoe@gmail.com" />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5">
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="student" className="cursor-pointer" />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input type="radio" name="role" value="recruiter" className="cursor-pointer" />
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