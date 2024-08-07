import { ChangeEvent, MouseEvent, useContext, useState } from "react";
import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

import colourTheme from "../components/colourTheme";

export default function NewEntry() {
  const emptyEntry: Entry = { title: "", description: "", created_at: new Date(), scheduled: new Date() };
  const { saveEntry } = useContext(EntryContext) as EntryContextType;
  const [newEntry, setNewEntry] = useState<Entry>(emptyEntry);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewEntry({
      ...newEntry,
      [event.target.name]: event.target.value,
    });
  };
  const handleSend = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(newEntry);
    saveEntry(newEntry);
    setNewEntry(emptyEntry);
  };
  return (
    <section
      className={
        colourTheme["list-item-background"] +
        " flex justify-center flex-col w-fit ml-auto mr-auto mt-10 gap-5 p-8 rounded-md"
      }
    >
      <input
        className="p-3 rounded-md"
        type="text"
        placeholder="Title"
        name="title"
        value={newEntry.title}
        onChange={handleInputChange}
      />
      <textarea
        className="p-3 rounded-md"
        placeholder="Description"
        name="description"
        value={newEntry.description}
        onChange={handleInputChange}
      />
      <p className={colourTheme["generic-text"]}>Created at:</p>
      <input
        className="p-3 rounded-md"
        type="date"
        name="created_at"
        value={new Date(newEntry.created_at).toISOString().split("T")[0]}
        onChange={handleInputChange}
      />
      <p className={colourTheme["generic-text"]}>Scheduled:</p>
      <input
        className="p-3 rounded-md"
        type="date"
        name="scheduled"
        value={new Date(newEntry.scheduled).toISOString().split("T")[0]}
        onChange={handleInputChange}
      />
      <button
        onClick={(e) => {
          handleSend(e);
        }}
        className={"text-white bg-blue-400 hover:bg-blue-600 font-semibold p-3 rounded-md"}
      >
        Create
      </button>
    </section>
  );
}
