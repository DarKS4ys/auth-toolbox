import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import CardWrapper from "./CardWrapper";

export default function ErrorCard() {
  return (
    <CardWrapper headerLabel="Oops! Something went wrong." backButtonHref="/auth/login" backButtonLabel="Back to login">
        <div className="w-full flex items-center justify-center">
            <ExclamationTriangleIcon className="w-12 h-12 text-destructive"/>
        </div>
    </CardWrapper>
  )
}
