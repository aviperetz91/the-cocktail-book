import React from 'react';
import { StyleSheet } from 'react-native';
import { Header, Item, Input, Icon, } from 'native-base';
import Colors from '../../constants/Colors';

const Search = props => {

    const { closeSearch, searchInput, setSearchInput, autoFocus, placeholder } = props;

    const handleClose = () => {
        setSearchInput('');
        closeSearch()
    }

    return (
        <Header searchBar rounded androidStatusBarColor={'transparent'} iosBarStyle={'light-content'} translucent style={styles.header}>
            <Item style={styles.searchBar}>
                <Icon type="MaterialCommunityIcons" name="keyboard-backspace" onPress={handleClose} />
                <Input
                    placeholder={placeholder}
                    value={searchInput}
                    onChangeText={(input) => setSearchInput(input)}
                    autoFocus={autoFocus}
                />
                {searchInput ? <Icon name="close-outline" onPress={() => setSearchInput('')} /> : null}
            </Item>
        </Header>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'black',
        marginTop: Platform.OS === 'android' ? 36 : 0,
        borderBottomWidth: 0,
        elevation: 0,
    },
    searchBar: {
        backgroundColor: Colors.light, 
        borderRadius: 50,
        height: 35
    },
})

export default Search;