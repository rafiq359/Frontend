const defaultLocale: string = "en";
const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";

export interface LangState {
  label: any;
  lang: string;
}

type Link = {
  href: string;
  label: string;
};

const initialState: LangState = {
  lang: defaultLocale,
  label: undefined,
};

const i18nReducer = (
  state: LangState,
  action: any,
  dropdown: Link[]
): LangState => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      const selectedItem = dropdown.find(
        (item) => item.href === action.payload
      );
      const newState = {
        ...state,
        lang: action.payload,
        selectedItem: selectedItem || undefined,
      };

      // Save the new state to localStorage
      localStorage.setItem("selectedLanguage", JSON.stringify(newState));

      return newState;
    default:
      return state;
  }
};

export { initialState, i18nReducer };
