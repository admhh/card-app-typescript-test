import ReactDOM from "react-dom";
import colourTheme from "./colourTheme";

export default function ModeToggle() {
  return (
    <button
      type="button"
      className={colourTheme['generic-text'] + " absolute bottom-10 right-10"}
      onClick={() => {
        console.log("clicked");

        const newColourTheme = structuredClone(colourTheme);

        // update document-level tracker
        if (colourTheme.theme == "light") {
          newColourTheme["main-background"] = "bg-slate-900";
          newColourTheme["list-item-background"] = "bg-slate-700";
          newColourTheme["list-item-text"] = "text-slate-100";
          newColourTheme["generic-text"] = "text-slate-200";
          newColourTheme.theme = "dark";

        } else {
          newColourTheme["main-background"] = "bg-white";
          newColourTheme["list-item-background"] = "bg-gray-300";
          newColourTheme["list-item-text"] = "text-gray-950";
          newColourTheme["generic-text"] = "text-black";
          newColourTheme.theme = "light";
        }

        // find all current elements, and update their colours

        for (const [key, value] of Object.entries(colourTheme)) {
          console.log(key, value);

          // get list of elements with this class
          // https://medium.com/@glasshost/find-all-elements-by-classname-in-react-c813792b9d34
          const elements = document.querySelectorAll("." + value);

          console.log(elements);

          for (let element of elements) {
            console.log(element);

            element.classList.remove(value);

            // https://stackoverflow.com/questions/57086672/element-implicitly-has-an-any-type-because-expression-of-type-string-cant-b
            element.classList.add(newColourTheme[key as keyof typeof newColourTheme]);
          }

          // update the theme
          colourTheme[key as keyof typeof newColourTheme] = newColourTheme[key as keyof typeof newColourTheme];
        }
      }}
    >
      Toggle Theme
    </button>
  );
}
