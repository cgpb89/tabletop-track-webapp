
import React from "react";
import { inject, observer } from "mobx-react";
import { UserStore } from "../Store/UserStore";
import { observable } from "mobx";
import User from "../Models/User/User";
import AutoComplete from "../Views/Components/Forms/AutoComplete";

interface SearcherUserViewModelProps {
  UserStore?: UserStore;
  setUserSelected: (value: User) => void;
  getUserSelected: User | undefined;
  addItem: () => void;
  getUserArray: User[];
}

@inject(UserStore.NAME_STORE)
@observer
class SearcherUserViewModel extends React.Component<SearcherUserViewModelProps, any> {

  private searchTimer: NodeJS.Timeout | undefined;

  private resetInputSearch: boolean = false;

  @observable
  private suggestions: User[] = [];

  @observable
  private suggestionTyped: string = "";

  public getResetInputSearch(): boolean {
    return this.resetInputSearch;
  }

  public setResetInputSearch(resetInputSearch: boolean): void {
    this.resetInputSearch = resetInputSearch;
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
    const { setUserSelected, addItem } = this.props;
    setUserSelected(suggestion);
    addItem();
    return "";
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
    const { getUserArray } = this.props;

    if (this.getSuggestionTyped().length > 0) {
      let users = await this.userStore.getUsersByFilter(this.getSuggestionTyped());

      const usersIds = getUserArray.map(item => item.get_id());

      users = users.filter((item1: User, index: number) => {
        return !usersIds.includes(item1.get_id());
      });

      this.suggestions = users;
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
      <AutoComplete
        suggestions={this.suggestions}
        onChange={this.onChange}
        getSuggestionTyped={this.getSuggestionTyped()}
        searchItem={this.searchUser}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
      />
    );

  }
}

export default SearcherUserViewModel;