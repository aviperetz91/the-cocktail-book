import React, { useEffect, useState, Fragment } from 'react';
import { ScrollView, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button as Btn } from 'react-native-elements';
import styles from './style';
import { getGlassList, getAlcoholicList } from '../../store/actions/CocktailsActions';
import Header from '../../components/Header/Header';
import Accordion from '../../components/Accordion/Accordion';
import Colors from '../../constants/Colors';


const Filters = props => {

    const navigation = props.navigation;

    const cocktails = useSelector(state => state.cocktails.cocktails);
    const alcoholicList = useSelector(state => state.cocktails.alcoholicList);
    const categories = useSelector(state => state.cocktails.categories);
    const glassList = useSelector(state => state.cocktails.glassList);

    const [selectedAlcoholic, setSelectedAlcoholic] = useState('');
    const [checkedCategories, setCheckedCategories] = useState([]);
    const [checkedGlasses, setCheckedGlasses] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAlcoholicList());
        dispatch(getGlassList());
    }, [dispatch])

    const updateCheckedList = (type, item) => {
        let checkedList;
        let setChecked;
        if (type === 'categories') {
            checkedList = [...checkedCategories];
            setChecked = setCheckedCategories;
        } else if (type === 'glasses') {
            checkedList = [...checkedGlasses];
            setChecked = setCheckedGlasses;
        }
        const isFound = checkedList.some(el => el === item);
        let updated;
        if (isFound) {
            updated = checkedList.filter(el => el !== item)
        } else {
            updated = [...checkedList, item]
        }
        setChecked(updated)
    }

    const handleSelectAlcoholic = (item) => {
        if (item === selectedAlcoholic) {
            setSelectedAlcoholic('')
        } else {
            setSelectedAlcoholic(item)
        }
    }

    const filterCocktails = () => {
        const filtered = [];
        cocktails.forEach((drink, index) => {
            if (
                (drink.strAlcoholic === selectedAlcoholic || selectedAlcoholic === '') &&
                (checkedCategories.some(category => category === drink.strCategory) || checkedCategories.length === 0) &&
                (checkedGlasses.some(glass => glass === drink.strGlass) || checkedGlasses.length === 0)
            ) {
                filtered.push(drink)
            }
        })
        console.log("filteredCocktails: ", filtered)
        navigation.navigate('FilteredCocktails', { filteredCocktails: filtered })
    }

    const clearFiltersHandler = () => {
        setSelectedAlcoholic('');
        setCheckedCategories([]);
        setCheckedGlasses([]);
    }

    console.log(selectedAlcoholic)
    console.log(checkedCategories)
    console.log(checkedGlasses)

    return (
        <Fragment>
            <Header
                headerBackground={Colors.dark}
                statusBarColor={Colors.dark}
                iosBarStyle={'light-content'}
                pressHandler={navigation.openDrawer}
                iconType={'Ionicons'}
                iconName={'menu-outline'}
                iconColor={'white'}
                iconSize={32}
                title={'Filters'}
                titleColor={'white'}
                letterSpacing={4}
            />
            <View style={styles.screen}>
                <View style={styles.container}>
                    <ScrollView>
                        <View>
                            <View style={{ marginBottom: 30 }}>
                                <Accordion
                                    title={'Alcoholic'}
                                    list={alcoholicList}
                                    selected={selectedAlcoholic}
                                    selectHandler={(item) => handleSelectAlcoholic(item)}
                                />
                                <Accordion
                                    title={'Category'}
                                    list={categories}
                                    checkedList={checkedCategories}
                                    isMultiSelect
                                    selectHandler={(item) => updateCheckedList('categories', item)}
                                />
                                <Accordion
                                    title={'Glass'}
                                    list={glassList}
                                    checkedList={checkedGlasses}
                                    isMultiSelect
                                    selectHandler={(item) => updateCheckedList('glasses', item)}
                                />
                            </View>
                        </View>
                        <View>
                            <Btn
                                title="Clear filters"
                                type="solid"
                                buttonStyle={styles.clearButton}
                                containerStyle={{ marginBottom: 10 }}
                                onPress={clearFiltersHandler}
                            />
                            <Btn
                                title="Show Results"
                                type="solid"
                                buttonStyle={styles.showButton}
                                onPress={filterCocktails}
                            />
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Fragment>
    );
};

export default Filters;