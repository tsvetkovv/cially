import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UsersRound, MessageCircle } from "lucide-react";

export default function MessagesBlock({ guild }) {
  return (
    <>
      <Card className="">
        <CardHeader>
          <CardTitle className="text-sm">
            <MessageCircle className="inline -translate-y-0.5 mr-2" />
            Messages Today
          </CardTitle>
          <CardDescription className="text-gray-300 text-2xl">
            21838
            <div className="text-xs mt-2 text-green-400">
              +20% than yesterday
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
    </>
  );
}
