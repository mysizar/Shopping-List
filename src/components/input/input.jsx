import "./input.css";
import PropTypes from "prop-types";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { suggestionsList } from "../../data";
import { db, auth } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";

function Input({ getShoppingList }) {
  const [inputValue, setInputValue] = useState("");
  const shoppingListsCollectionRef = collection(db, "shopping-lists");

  const addNewItem = async () => {
    if (!inputValue.trim()) return;
    const newItem = {
      position: Date.now(),
      itemName: inputValue.trim(),
      quantity: 1,
      isSelected: false,
      userId: auth?.currentUser?.uid,
    };

    setInputValue("");
    try {
      await addDoc(shoppingListsCollectionRef, newItem);
      getShoppingList();
    } catch (err) {
      console.error(err);
    }
  };

  const addSuggestionItem = async (suggestion) => {
    const newItem = {
      position: Date.now(),
      itemName: suggestion,
      quantity: 1,
      isSelected: false,
      userId: auth?.currentUser?.uid,
    };

    setInputValue("");
    try {
      await addDoc(shoppingListsCollectionRef, newItem);
      getShoppingList();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="add-item-wrapper">
        <div className="add-item-box">
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="add-item-input"
            placeholder="Add an item..."
          />
          <FontAwesomeIcon icon={faPlus} onClick={() => addNewItem()} />
        </div>
        <div className="dropdown">
          {suggestionsList
            .filter((item) => {
              const searchTerm = inputValue.toLowerCase();
              const fullName = item.name.toLowerCase();

              return (
                searchTerm &&
                fullName.includes(searchTerm) &&
                fullName !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item, index) => (
              <div
                key={index}
                onClick={() => addSuggestionItem(item.name)}
                className="dropdown-row"
              >
                {item.name}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Input;

Input.propTypes = {
  items: PropTypes.array,
  setItems: PropTypes.func,
  getShoppingList: PropTypes.func,
};
