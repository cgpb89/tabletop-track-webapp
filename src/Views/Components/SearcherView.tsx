import React            from "react";
import AutoComplete     from "./Forms/AutoComplete";
import { Container }    from "@material-ui/core";
import ButtonC          from "./Forms/ButtonC";

interface SearcherUserViewProps {
    suggestions: any[];
    onChange: (event: any, newValue: any) => void;
    getSuggestionTyped: string;
    searchUser: () => void;
    onSuggestionsClearRequested: () => void;
    getSuggestionValue: (suggestion: any) => string;
    renderSuggestion: (suggestion: any) => React.ReactNode;
}

class SearcherUserView extends React.Component<SearcherUserViewProps, any> {

    public render(): React.ReactNode {
        const { onChange, suggestions, getSuggestionTyped,
            searchUser, onSuggestionsClearRequested, getSuggestionValue, renderSuggestion } = this.props;
        return (
            <Container className={`wrap-container main-content`}>
                <div className={`row`}>
                    <div className={`col-xs-12 col-sm-12 col-md-10 col-lg-10`}>
                        <AutoComplete
                          suggestions={suggestions}
                          onChange={onChange}
                          getSuggestionTyped={getSuggestionTyped}
                          searchItem={searchUser}
                          onSuggestionsClearRequested={onSuggestionsClearRequested}
                          getSuggestionValue={getSuggestionValue}
                          renderSuggestion={renderSuggestion}
                        />
                    </div>
                    <div className={`col-xs-12 col-sm-12 col-md-2 col-lg-2`}>
                        <ButtonC
                            label={`Add`}
                            iconPhrase
                            iconClass={``}
                            className={`btn btn-blue large label-primary`}
                        />
                    </div>
                </div>
            </Container>
        );
    }
}

export default SearcherUserView;