const initialState = {
  searchData: null,
  valuesData: { checkIn: "", checkOut: "", requireCapacity: 1 },
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEARCH_DATA":
      // Xử lý action SET_SEARCH_DATA
      return {
        ...state,
        searchData: action.payload,
      };
    case "SET_VALUES_DATA":
      // Xử lý action SET_VALUES_DATA, chỉ cập nhật valuesData khi có thay đổi từ action payload
      return {
        ...state,
        valuesData: {
          ...state.valuesData,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default searchReducer;
