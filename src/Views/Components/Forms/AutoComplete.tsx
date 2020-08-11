import React          from "react";
import Autosuggest    from "react-autosuggest";
import { inject, observer } from "mobx-react";
import { UserStore } from "src/Store/UserStore";

interface AutoCompleteProps {
  suggestions: any[];
  onChange: (event: any, newValue: any) => void;
  getSuggestionTyped: string;
  searchItem: () => void;
  onSuggestionsClearRequested: () => void;
  getSuggestionValue: (suggestion: any) => string;
  renderSuggestion: (suggestion: any) => React.ReactNode;
}

@inject(UserStore.NAME_STORE)
@observer
class AutoComplete extends React.Component<AutoCompleteProps, any> {

  public render() {
    const { onChange, suggestions, getSuggestionTyped,
      searchItem, onSuggestionsClearRequested, getSuggestionValue, renderSuggestion } = this.props;

    const inputProps = {
      onChange: onChange,
      placeholder: "Type a user name/lastname",
      value: getSuggestionTyped,
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={searchItem}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }

}

export default AutoComplete;