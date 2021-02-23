import { ChangeEvent, useCallback, useEffect, useState } from "react"
import useLocalStorage from "../utils/useLocalStorage"

interface Item {
  name: string
}

export default function ItemList() {
  const [, updateState] = useState(null)
  const forceUpdate = useCallback(() => updateState({}), [])

  const [items, setItems] = useLocalStorage<Item[]>([], "randoCandidates")
  const [itemIndex, setItemIndex] = useState<number>(null)
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {}, [items])

  function updateSelection() {
    setItemIndex(Math.floor(Math.random() * items.length))
  }

  function updateItems() {
    const currentItems = items as Item[]
    const newItems = inputValue.split(/, ?/).map((item) => {
      return {
        name: item,
      }
    })

    const combined = Array.from(new Set(currentItems.concat(newItems)))
    setItems(combined)

    setInputValue("")
  }

  function updateInputValue(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.currentTarget.value)
  }

  function removeAtIndex(index: number) {
    let oldItems = items
    oldItems.splice(index, 1)
    setItems(oldItems)
    forceUpdate()
    setItemIndex(null)
  }

  return (
    <>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <input
            value={inputValue}
            onChange={updateInputValue}
            placeholder="Enter an item or comma-separated items"
          />
          <button onClick={updateItems}>Add item(s) to list</button>
        </form>
        {items.length == 0 ? (
          <p className="placeholder">Enter items above</p>
        ) : (
          <>
            <ul>
              {items.map((item: Item, index: number) => (
                <li
                  className={index == itemIndex ? "selected" : ""}
                  key={item.name}
                >
                  {item.name}

                  <button onClick={() => removeAtIndex(index)}>&times;</button>
                </li>
              ))}
            </ul>
            <button onClick={updateSelection}>Pick a random item</button>
          </>
        )}
      </div>
      <style jsx>{`
        .placeholder {
          text-align: center;
          padding: 2em;
          opacity: 0.5;
          background-color: rgba(128, 128, 128, 0.2);
          border-radius: 0.25em;
        }

        .selected {
          color: royalblue;
          background-color: rgba(65, 105, 225, 0.1);
        }

        ul {
          padding: 0;
          list-style: none;
        }

        li {
          color: inherit;
          padding: 0.5em;
          border-radius: 0.25em;
          transition: 0.2s cubic-bezier(0.5, 0.18, 0.14, 0.96);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        li + li {
          border-top: 1px solid rgba(128, 128, 128, 0.1);
        }

        form {
          display: grid;
          gap: 1em;
          grid-template-columns: 1fr max-content;
        }

        li button {
          padding-bottom: 0.3em;
          line-height: 1;
          opacity: 0.5;
          transition: 0.2s ease;
        }

        li:hover button {
          opacity: 1;
          color: red;
          background-color: rgba(255, 50, 50, 0.1);
        }
      `}</style>
    </>
  )
}
