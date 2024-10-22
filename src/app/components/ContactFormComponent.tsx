"use client";
import React, { useReducer } from "react";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/text-area";
import { KeyTextField, RichTextField } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import SectionTitle from "./typography/SectionTitle";

const initialFormState = {
  name: "",
  email: "",
  message: "",
};
const reducer = (state: typeof initialFormState, action: any) => {
  switch (action.type) {
    case "name":
      return {
        ...state,
        name: action.payload,
      };
    case "email":
      return {
        ...state,
        email: action.payload,
      };
    case "message":
      return {
        ...state,
        message: action.payload,
      };
    case "clear":
      return initialFormState;
    default:
      return state;
  }
};

export function ContactFormComponent({
  title,
  description,
}: {
  title: KeyTextField;
  description: RichTextField;
}) {
  const [state, dispatch] = useReducer(reducer, initialFormState);
  const [submitStatus, setSubmitStatus] = React.useState<
    "success" | "error" | "sending" | "idle"
  >("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted", state);

    setSubmitStatus("sending");
    setTimeout(() => {
      setSubmitStatus("success");

      dispatch({ type: "clear" });
    }, 3000);
  };

  const SubmitLabelText = () => {
    switch (submitStatus) {
      case "sending":
        return "Sending...";
      case "success":
        return "Success!";
      case "error":
        return "Error!";

      default:
        return "Submit";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: name, payload: value });
  };
  return (
    <div className="max-w-xl w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <SectionTitle title={title} />
      <PrismicRichText field={description} />

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Your name"
              type="text"
              name="name"
              value={state.name}
              onChange={handleChange}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="example@email.com"
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="message">Message</Label>
          <TextArea
            id="message"
            placeholder="Your message"
            type="text"
            name="message"
            value={state.message}
            onChange={handleChange}
          />
        </LabelInputContainer>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          {SubmitLabelText()} {submitStatus === "idle" && <>&rarr;</>}
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
