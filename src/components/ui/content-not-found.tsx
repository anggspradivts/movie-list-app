interface ContentNotFoundProps {
  context: string;
  type: "default" | "with-context";
  classname?: string;
}
const ContentNotFound = ({ context, type, classname }: ContentNotFoundProps) => {
  return (
    <div className={`w-full h-full ${classname}`}>
      {type === "with-context" ? (
        <p className="font-semibold italic">
          Oops, {context} not found!! we will do something about this
        </p>
      ) : (
        <p>Not found</p>
      )}
    </div>
  );
};

export default ContentNotFound;
