import React, { useEffect, useState, Fragment } from 'react';
import { ScrollView, View, ImageBackground } from 'react-native';
import { Header, Left, Body, Right, Title, Button, Icon } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { Button as Btn } from 'react-native-elements';
import styles from './style';
import { getIngredientList, getGlassList, getAlcoholicList } from '../../store/actions/CocktailsActions';
import Accordion from '../../components/Accordion/Accordion';
import Colors from '../../constants/Colors';

const Filters = props => {

    const navigation = props.navigation;

    const allCocktails = useSelector(state => state.cocktails.allCocktails);
    const alcoholicList = useSelector(state => state.cocktails.alcoholicList);
    const categories = useSelector(state => state.cocktails.categories);
    const glassList = useSelector(state => state.cocktails.glassList);
    const ingredientList = useSelector(state => state.cocktails.ingredientList);

    const [selectedAlcoholic, setSelectedAlcoholic] = useState('');
    const [checkedCategories, setCheckedCategories] = useState([]);
    const [checkedGlasses, setCheckedGlasses] = useState([]);
    const [checkedIngredients, setCheckedIngredients] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAlcoholicList());
        dispatch(getGlassList());
        dispatch(getIngredientList());
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
        } else if (type === 'ingredients') {
            checkedList = [...checkedIngredients]
            setChecked = setCheckedIngredients;
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

    const filterCocktails = () => {
        let byAlcoholic = [];
        for (let i = 0; i < allCocktails.length; i++) {
            if (allCocktails[i].strAlcoholic === selectedAlcoholic) {
                byAlcoholic.push(allCocktails[i]);
            }
        }
        console.log("byAlcoholic: ", byAlcoholic)
        const listAlcoholic = byAlcoholic.length > 0 ? byAlcoholic : allCocktails;
        let byCategories = [];
        for (let i = 0; i < listAlcoholic.length; i++) {
            for (let j = 0; j < checkedCategories.length; j++) {
                if (listAlcoholic[i].strCategory === checkedCategories[j]) {
                    byCategories.push(listAlcoholic[i]);
                }
            }
        }
        console.log("byCategories: ", byCategories)
        const listCategories = byCategories.length > 0 ? byCategories : allCocktails;
        let byGlasses = [];
        for (let i = 0; i < listCategories.length; i++) {
            for (let j = 0; j < checkedGlasses.length; j++) {
                if (listCategories[i].strGlass === checkedGlasses[j]) {
                    byGlasses.push(listCategories[i]);
                }
            }
        }
        console.log("byGlasses: ", byGlasses)
        const listGlasses = byGlasses.length > 0 ? byGlasses : allCocktails;
        let byIngredients = [];
        for (let i = 0; i < listGlasses.length; i++) {
            for (let j = 0; j < checkedIngredients.length; j++) {
                if (listGlasses[i].ingredientList.some(ingredient => ingredient === checkedIngredients[j])) {
                    byIngredients.push(listGlasses[i]);
                }
            }
        }
        console.log("byIngredients: ", byIngredients)

        let temp = [];
        if (byIngredients.length === 0 && byGlasses.length > 0) {
            temp = byGlasses;
        }
        if (byIngredients.length === 0 && byGlasses.length === 0 && byCategories.length > 0) {
            temp = byCategories;
        }
        if (byIngredients.length === 0 && byGlasses.length === 0 && byCategories.length === 0) {
            temp = byAlcoholic;
        }
        if (byIngredients.length > 0) {
            temp = byIngredients
        }

        console.log("filteredCocktails: ", temp)
        navigation.navigate('FilteredCocktails', { filteredCocktails: temp })
    }

    const clearFiltersHandler = () => {
        setSelectedAlcoholic('');
        setCheckedCategories([]);
        setCheckedGlasses([]);
        setCheckedIngredients([]);
    }

    console.log(allCocktails)
    console.log(selectedAlcoholic)
    console.log(checkedCategories)
    console.log(checkedGlasses)
    console.log(checkedIngredients)

    return (
        <Fragment>
            <View style={styles.screen}>
                <Header style={styles.header} androidStatusBarColor={'black'}>
                    <Left>
                        <Button transparent onPress={() => navigation.goBack()}>
                            <Icon name='arrow-back' style={{ color: 'white' }} />
                        </Button>
                    </Left>
                    <Body>
                        {/* <Title style={styles.title}>Filters</Title> */}
                    </Body>
                    <Right />
                </Header>
                <View style={styles.container}>
                    <ScrollView>
                        <View>
                            <View style={{ marginBottom: 30 }}>
                                <Accordion
                                    title={'Alcoholic'}
                                    list={alcoholicList}
                                    selected={selectedAlcoholic}
                                    selectHandler={(item) => setSelectedAlcoholic(item)}
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
                                <Accordion
                                    title={'Ingredient'}
                                    list={ingredientList}
                                    checkedList={checkedIngredients}
                                    isMultiSelect
                                    selectHandler={(item) => updateCheckedList('ingredients', item)}
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