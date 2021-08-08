export const reducer = (state, action) => {
  switch (action.type) {
    case "add list": {
      return [
        ...state,
        { list_id: state.length + 1, list_name: action.payload, cards: [] }
      ];
    }
    case "delete list": {
      return state?.filter((list) => list.list_name !== action.payload);
    }
    case "add card": {
      let { list_name, title, desc, creation_time } = action.payload;
      return state.map((list) => {
        if (list.list_name === list_name) {
          return {
            list_id: list.list_id,
            list_name: list_name,
            cards: [
              ...list.cards,
              {
                title: title,
                desc: desc,
                creation_time: creation_time
              }
            ]
          };
        }
        return list;
      });
    }
    case "delete card": {
      let { list_id, card } = action.payload;
      return state?.map((list) => {
        if (list.list_id === list_id) {
          let tempCards = list.cards.filter((c) => {
            if (
              c.title !== card.title ||
              c.desc !== card.desc ||
              c.creation_time !== card.creation_time
            ) {
              return c;
            }
          });
          list.cards = tempCards;
        }
        return list;
      });
    }
    case "drag card": {
      let { drop_list_id, drag_list_id, card } = action.payload;
      let tempState = state?.map((list) => {
        if (list.list_id === drag_list_id) {
          let tempCards = list.cards.filter((c) => {
            if (
              c.title !== card.title ||
              c.desc !== card.desc ||
              c.creation_time !== card.creation_time
            ) {
              return c;
            }
          });
          list.cards = tempCards;
        }
        return list;
      });

      return tempState
        .map((list) => {
          if (list.list_id === drop_list_id) {
            return {
              list_id: list.list_id,
              list_name: list.list_name,
              cards: [
                ...list.cards,
                {
                  title: card.title,
                  desc: card.desc,
                  creation_time: card.creation_time
                }
              ]
            };
          }
          return list;
        })
        .map((list) => {
          list.cards.sort((a, b) => a.creation_time - b.creation_time);
          return list;
        });
    }
    default:
      return state;
  }
};
