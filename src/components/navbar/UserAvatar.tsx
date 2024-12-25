import { getCookie } from "@/utils/getCookie";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";

interface ReqTokenProps {
  success: boolean;
  expires_at: string;
  request_token: string;
}
const UserAvatarComponent = () => {
  const { toast } = useToast();
  const session = getCookie("session");

  const handleAuthClick = async () => {
    const url = "https://api.themoviedb.org/3/authentication/token/new";
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
        },
      });
      const data: ReqTokenProps = await res.json();

      if (data.success) {
        window.location.href = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=${process.env.APP_URL}`;
        toast({
          title: "Redirecting...",
        })
      } else {
        toast({
          title: "Something went wrong",
          description: "Try again later",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      {session ? (
        <div></div>
      ) : (
        <div className="flex space-x-5">
          <Button onClick={() => handleAuthClick()}>Login</Button>
          <Button>Sign Up</Button>
        </div>
      )}
    </div>
  );
};

export default UserAvatarComponent;
