import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { LogOut, UserCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const Navbar = () => {
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>

          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-0 focus:ring-offset-0">
                <Avatar className="w-10 h-10 rounded-full">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="object-cover w-full h-full rounded-full"
                  />
                </Avatar>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2 shadow-lg border border-gray-100 focus:outline-none focus:ring-0">
              <div className="flex items-center gap-2 mb-3">
                <Avatar className="w-10 h-10 rounded-full">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="object-cover w-full h-full rounded-full"
                  />
                </Avatar>
                <div>
                  <h4 className="text-sm font-medium">John Doe</h4>
                  <p className="text-sm text-muted-foreground">Lorem ipsum dol.</p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm hover:bg-gray-100 focus:outline-none flex items-center"
                >
                  <UserCircle size={18} className="mr-2" />
                  View profile
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sm text-red-500 hover:bg-red-50 hover:text-red-600 focus:outline-none flex items-center"
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
