import BookOpen from "@/client/components/ui/icons/book-open";
import ListBullet from "@/client/components/ui/icons/list-bullet";
import Check from "@/client/components/ui/icons/check";
import Trash from "@/client/components/ui/icons/trash";
import { RadioCards } from "@radix-ui/themes";

const bookLocations = [
  { name: "Currently Reading", value: "reading", icon: <BookOpen /> },
  { name: "Want To Read", value: "want-to-read", icon: <ListBullet /> },
  { name: "Finished", value: "finished", icon: <Check /> },
  { name: "Did Not Finish", value: "did-not-finish", icon: <Trash /> },
] as const;

export default function AddToLibrary() {
  return (
    <RadioCards.Root>
      {bookLocations.map((obj, i) => (
        <RadioCards.Item value={obj.value} key={i} checked={obj.value === "did-not-finish"}>
          <p>{obj.name}</p>
          {obj.icon}
        </RadioCards.Item>
      ))}
    </RadioCards.Root>
  );
}
