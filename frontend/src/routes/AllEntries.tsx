import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Entry, EntryContextType } from "../@types/context";
import { EntryContext } from "../utilities/globalContext";

import colourTheme from "../components/colourTheme";

export default function AllEntries() {
  const { entries, deleteEntry } = useContext(EntryContext) as EntryContextType;
  let navigate = useNavigate();
  if (entries.length == 0) {
    return (
      <section>
        <h1 className={colourTheme["generic-text"] + " text-center font-semibold text-2xl m-5"}>
          You don't have any cards.
        </h1>
        <p className={colourTheme["generic-text"] + " text-center font-medium text-md"}>
          Let's{" "}
          <Link className="text-blue-400 underline underline-offset-1" to="/create">
            Create One
          </Link>
          .
        </p>
      </section>
    );
  }
  return (
    <section className="grid grid-cols-2 md:grid-cols-4">
      {entries.map((entry: Entry, index: number) => {
        return (
          <div
            id={entry.id}
            key={index}
            className={
              colourTheme["list-item-background"] +
              " shadow-md shadow-gray-500 m-3 p-4 rounded flex flex-col justify-between"
            }
          >
            <h1 className={colourTheme["list-item-text"] + " font-bold text-sm md:text-lg"}>{entry.title}</h1>
            <p className={colourTheme["list-item-text"] + " text-center text-lg font-light md:mt-2 md:mb-4 mt-1 mb-3"}>
              {entry.description}
            </p>
            
            <time className={colourTheme["list-item-text"] + " text-right text-sm md:text-lg"}>
                Scheduled for: {new Date(entry.scheduled.toString()).toLocaleDateString()}
              </time>
            <section className="flex items-center justify-between flex-col md:flex-row pt-2 md:pt-0">
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    deleteEntry(entry.id as string);
                  }}
                  className="m-1 md:m-2 p-1 font-semibold rounded-md bg-red-500 hover:bg-red-700"
                >
                  ✖
                </button>
                <button
                  onClick={() => {
                    navigate(`/edit/${entry.id}`, { replace: true });
                  }}
                  className="m-1 md:m-2 p-1 font-semibold rounded-md bg-blue-500 hover:bg-blue-700"
                >
                  🖊
                </button>
              </div>
              <time className={colourTheme["list-item-text"] + " text-right text-sm md:text-lg"}>
                {new Date(entry.created_at.toString()).toLocaleDateString()}
              </time>
            </section>
          </div>
        );
      })}
    </section>
  );
}
