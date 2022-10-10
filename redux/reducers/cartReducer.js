let defaultState = {
  selectedItems: { items: [], total: 0, restaurantName: "" },
};

let cartReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let newState = { ...state };

      if (action.payload.checkBoxValue) {
        newState.selectedItems = {
          items: [...state.selectedItems.items, action.payload],
          restaurantName: action.payload.restaurantName,
          checkBoxValue: action.payload.checkBoxValue,
        };
      } else {
        newState.selectedItems = {
          items: [
            ...newState.selectedItems.items.filter(
              (item) => item.title !== action.payload.title
            ),
          ],
        };
      }

      console.log(newState);
      return newState;

    default:
      return state;
  }
};

export default cartReducer;
