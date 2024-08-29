import BookOpen from "@/client/components/ui/icons/book-open";
import ListBullet from "@/client/components/ui/icons/list-bullet";
import Check from "@/client/components/ui/icons/check";
import Trash from "@/client/components/ui/icons/trash";
import NoSymbol from "@/client/components/ui/icons/no-symbol";

const bookLocations = [
  { name: "Currently Reading", value: "reading", icon: <BookOpen /> },
  { name: "Want To Read", value: "want-to-read", icon: <ListBullet /> },
  { name: "Finished", value: "finished", icon: <Check /> },
  { name: "Did Not Finish", value: "did-not-finish", icon: <Trash /> },
  { name: "Not In Library", value: "not-in-library", icon: <NoSymbol></NoSymbol> },
];

export default function AddToLibrary() {
  return (
    <select name="location" id="location">
      {bookLocations.map((obj, i) => (
        <option value={obj.value} key={i} disabled={obj.value === "not-in-library"}>
          {obj.name}
        </option>
      ))}
    </select>
  );
}
