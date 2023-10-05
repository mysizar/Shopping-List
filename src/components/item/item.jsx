import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faCircleNotch,
  faCheckCircle,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { db } from "../../config/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

function Item({ item, getShoppingList }) {
  const isComplete = async (id) => {
    const listItem = doc(db, "shopping-lists", id);
    try {
      await updateDoc(listItem, { isSelected: !item.isSelected });
      getShoppingList();
    } catch (err) {
      console.error(err);
    }
  };

  const quantityIncrease = async (id) => {
    const listItem = doc(db, "shopping-lists", id);
    try {
      await updateDoc(listItem, { quantity: item.quantity + 1 });
      getShoppingList();
    } catch (err) {
      console.error(err);
    }
  };

  const quantityDecrease = async (id) => {
    const listItem = doc(db, "shopping-lists", id);
    try {
      await updateDoc(listItem, {
        quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
      });
      getShoppingList();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteItem = async (id) => {
    const listItem = doc(db, "shopping-lists", id);
    try {
      await deleteDoc(listItem);
      getShoppingList();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className={`item-container ${item.isSelected ? "inactive" : ""}`}>
        <div className="item-name" onClick={() => isComplete(item.id)}>
          <FontAwesomeIcon
            icon={item.isSelected ? faCheckCircle : faCircleNotch}
          />
          <span className={item.isSelected ? "completed" : ""}>
            {item.itemName}
          </span>
        </div>
        <div className={`quantity ${item.isSelected ? "inactive" : ""}`}>
          <button onClick={() => quantityDecrease(item.id)}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <span className="count"> {item.quantity} </span>
          <button onClick={() => quantityIncrease(item.id)}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
        <button onClick={() => deleteItem(item.id)}>
          <FontAwesomeIcon className="delete" icon={faTrashCan} />
        </button>
      </div>
    </>
  );
}

export default Item;

Item.propTypes = {
  items: PropTypes.array,
  item: PropTypes.object,
  index: PropTypes.number,
  setItems: PropTypes.func,
  getShoppingList: PropTypes.func,
};
