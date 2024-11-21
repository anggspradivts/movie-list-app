import { Dispatch, RefObject, SetStateAction } from "react";

interface HandleClickOutsideProps {
  event: MouseEvent;
  ref: RefObject<HTMLElement>;
  setState: Dispatch<SetStateAction<boolean>>
}
export function handleClickOutside({ event, ref, setState }: HandleClickOutsideProps) {
  if (ref.current && !ref.current.contains(event.target as Node)) {
    setState(false)
  }
}