
import React                    from "react";
import SearcherUserView         from "../Views/Components/SearcherView";
import { inject, observer }     from "mobx-react";
import { UserStore }            from "../Store/UserStore";
import { observable }           from "mobx";
import User                     from "../Models/User/User";

interface SearcherUserViewModelProps {
    UserStore?: UserStore;
}

@inject(UserStore.NAME_STORE)
@observer
class SearcherUserViewModel extends React.Component<SearcherUserViewModelProps, any> {

    private searchTimer: NodeJS.Timeout | undefined;

  @observable
  private userSelected: User = new User();

  @observable
  private suggestions: User[] = [];

  @observable
  private suggestionTyped: string = "";

  public getUserSelected(): User {
    return this.userSelected;
  }

  public setUserSelected(userSelected: User): void {
    this.userSelected = userSelected;
  }

  public getSuggestionTyped(): string {
    return this.suggestionTyped;
  }

  public setSuggestionTyped(suggestionTyped: string): void {
    this.suggestionTyped = suggestionTyped;
  }

  get userStore(): UserStore {
    return this.props.UserStore as UserStore;
  }

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  public getSuggestionValue = (suggestion: User) => {
    this.setUserSelected(suggestion);
    return suggestion.getFullName();
  }

  public renderSuggestion = (suggestion: User) => (
    <div>
      {suggestion.getFullName()}
    </div>
  );

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  private searchUser = () => {
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
    }
    // set timer before actually search for the user
    this.searchTimer = setTimeout(async () => {
      this.findUsers();
    }, 700);
  }

  private findUsers = async () => {
      if (this.getSuggestionTyped().length > 0) {
        this.suggestions = await this.userStore.getUsersByFilter(this.getSuggestionTyped());
      }
  }

  public onChange = (event: any, { newValue }: any) => {
    this.setSuggestionTyped(newValue.trim());
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  public onSuggestionsClearRequested = () => {
    this.suggestions = [];
  };

    public render(): React.ReactNode {
        return (
            <SearcherUserView
            suggestions={this.suggestions}
            onChange={this.onChange}
            getSuggestionTyped={this.getSuggestionTyped()}
            searchUser={this.searchUser}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            />
        );
    }
}

export default SearcherUserViewModel;