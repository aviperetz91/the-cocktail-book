import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Header, Left, Title, Tab, Tabs, TabHeading, Text, Right, Button, Icon, Spinner } from 'native-base';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { Tooltip, SearchBar } from 'react-native-elements';
import Categories from '../Categories/Categories/';
import Filters from '../Filters/Filters';
import CocktailItem from '../../components/CocktailItem/CocktailItem';
import Colors from '../../constants/Colors';
import { getAllCocktails, getCocktailByName, clearData } from '../../store/actions/CocktailsActions';

const Home = props => {

    const navigation = props.navigation;

    const [activeTab, setActiveTab] = useState(0);
    const [displaySearchBar, setDisplaySearchBar] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [render, setRender] = useState(false);

    const searchResults = useSelector(state => state.cocktails.searchResults)

    const tooltipRef = React.createRef();
    const searchBarRef = React.createRef();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCocktails())
        setTimeout(() => { setRender(true) }, 5000)
    }, [dispatch])

    const searchHandler = input => {
        if (input === '') {
            dispatch(clearData('searchResults'))
        } else {
            dispatch(getCocktailByName(input))
        }
    }

    if (!render) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Spinner color={Colors.darkPrimary} />
            </View>
        )
    } else {
        return (
            <Container>
                {displaySearchBar ?
                    <View style={{ flex: 1, elevation: 15, backgroundColor: 'white' }}>
                        <SearchBar
                            ref={searchBarRef}
                            placeholder="Search..."
                            onChangeText={(input) => {
                                setSearchInput(input)
                                searchHandler(input)
                            }}
                            value={searchInput}
                            searchIcon={
                                <TouchableOpacity onPress={() => {
                                    setDisplaySearchBar(false);
                                    setSearchInput('')
                                    dispatch(clearData('searchResults'))
                                }}>
                                    <Icon name='arrow-back' style={{ fontSize: 23, color: Colors.primary }} />
                                </TouchableOpacity>
                            }
                            lightTheme
                            containerStyle={{ backgroundColor: 'white' }}
                            inputContainerStyle={{ backgroundColor: 'white' }}
                        />
                        <FlatList
                            keyExtractor={(item, index) => index}
                            data={searchResults}
                            renderItem={({item}) => (
                                <CocktailItem
                                    title={item.strDrink}
                                    image={item.strDrinkThumb}
                                    tags={item.strTags}
                                    onSelect={() => navigation.navigate('CocktailDetails', {
                                        id: item.idDrink,
                                        name: item.strDrink
                                    })}
                                />
                            )}
                        />
                    </View>
                    :
                    <Header hasTabs style={{ marginBottom: 15, backgroundColor: Colors.primary }} androidStatusBarColor={Colors.darkPrimary}>
                        <Left>
                            <View>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Button transparent onPress={() => tooltipRef.current.toggleTooltip()}>
                                        <Icon type={'Ionicons'} name={"ellipsis-vertical"} color={'white'} style={{ fontSize: 20 }} />
                                    </Button>
                                    <Button transparent onPress={() => {
                                        const toggle = !displaySearchBar;
                                        setDisplaySearchBar(toggle)
                                    }}>
                                        <Icon type={'Ionicons'} name={"search"} color={'white'} style={{ fontSize: 20 }} />
                                    </Button>
                                </View>
                                <Tooltip
                                    ref={tooltipRef}
                                    backgroundColor={'white'}
                                    containerStyle={{ borderRadius: 3, elevation: 5, position: 'absolute', top: 0, left: 0 }}
                                    height={75}
                                    width={120}
                                    withOverlay={false}
                                    popover={
                                        <View>
                                            <TouchableOpacity
                                                style={{ marginVertical: 5 }}
                                                onPress={() => tooltipRef.current.toggleTooltip()}
                                            >
                                                <Text>My Account</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={{ marginVertical: 5 }}
                                                onPress={() => tooltipRef.current.toggleTooltip()}
                                            >
                                                <Text>Settings</Text>
                                            </TouchableOpacity>
                                        </View>
                                    }>
                                </Tooltip>
                            </View>
                        </Left>
                        <Right>
                            <Title style={{ marginRight: 10 }}>
                                The Cocktail Book
                        </Title>
                        </Right>
                    </Header>
                }
                {displaySearchBar ?
                    null
                    :
                    <Tabs
                        initialPage={activeTab}
                        onChangeTab={(event) => setActiveTab(event.i)}
                    >
                        <Tab heading={
                            <TabHeading style={{ backgroundColor: Colors.primary }}>
                                <Icon type={'FontAwesome'} name={'th-large'} color={"white"} style={{ fontSize: 18 }} />
                                <Text> Categories</Text>
                            </TabHeading>
                        }>
                            <Categories navigation={navigation} />
                        </Tab>
                        <Tab heading={
                            <TabHeading style={{ backgroundColor: Colors.primary }}>
                                <Icon type={'FontAwesome'} name={'filter'} color={"white"} style={{ fontSize: 18 }} />
                                <Text> Filters</Text>
                            </TabHeading>
                        }>
                            <Filters navigation={navigation} />
                        </Tab>
                        <Tab heading={
                            <TabHeading style={{ backgroundColor: Colors.primary }}>
                                <Icon type={'FontAwesome'} name={'star'} color={"white"} style={{ fontSize: 18 }} />
                                <Text> Favorites</Text>
                            </TabHeading>
                        }>
                        </Tab>
                    </Tabs>
                }
            </Container>
        );
    }

}

export default Home;