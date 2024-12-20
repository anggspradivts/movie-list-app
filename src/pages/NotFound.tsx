import { CodeXml } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center space-y-5">
      <h1 className="text-8xl font-bold">404</h1>
      <p className="text-3xl font-bold flex space-x-2">
        Oops, the page you are trying to search is not found{" "}
        {/* <span>
          <CodeXml className="h-9 w-9" />
        </span> */}
      </p>
    </div>
  );
};

export default NotFoundPage;
