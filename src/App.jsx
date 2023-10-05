import { useState, useEffect } from "react";
import "./index.css";
import Item from "./components/item/item";
import Input from "./components/input/input";
import FooterBar from "./components/footer/footer";
import { db } from "./config/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";

import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [items, setItems] = useState([]);
  const [uid, setUid] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });
  });

  const getShoppingList = async () => {
    try {
      const q = query(
        collection(db, "shopping-lists"),
        where("userId", "==", uid)
      );
      const data = await getDocs(q);

      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const sortedData = filteredData.sort((a, b) => {
        if (a.isSelected === b.isSelected) return a.position - b.position;
        return b.isSelected - a.isSelected;
      });
      setItems(sortedData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getShoppingList();
  }, [uid]);

  return (
    <div className="app-background">
      <div className="main-container">
        <Input getShoppingList={getShoppingList} />

        <div className="item-list">
          {uid ? (
            <>
              {items.map((item, index) => (
                <Item
                  key={index}
                  item={item}
                  getShoppingList={getShoppingList}
                />
              ))}
            </>
          ) : (
            <p style={{ "text-align": "center" }}>
              Please login to view or add your items...
            </p>
          )}
        </div>

        <FooterBar setItems={setItems} items={items} />
      </div>
    </div>
  );
}

export default App;
