import { queryClient } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const FormCreateProduct = () => {
  const [name, setName] = useState<string>("");

  async function createProduct(name: string) {
    await fetch("https://6726e67c302d03037e6ea211.mockapi.io/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
      }),
    });
  };

  const { mutate } = useMutation({
    mutationFn: () => createProduct(name),
    mutationKey: ["ADD_PRODUCT"],
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["PRODUCT"] }),
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate()
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
    </div>
  );
};

export default FormCreateProduct;
