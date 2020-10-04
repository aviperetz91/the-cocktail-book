import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, ImageBackground } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';
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
        console.log(byAlcoholic)
        let byCategories = [];
        for (let i = 0; i < byAlcoholic.length; i++) {
            for (let j = 0; j < checkedCategories.length; j++) {
                if (byAlcoholic[i].strCategory === checkedCategories[j] && !byCategories.some(el => el.idDrink === byAlcoholic[i].idDrink)) {
                    byCategories.push(byAlcoholic[i]);
                }
            }
        }
        console.log(byCategories)
        byCategories = byCategories.length > 0 ? byCategories : allCocktails;
        let byGlasses = [];
        for (let i = 0; i < byCategories.length; i++) {
            for (let j = 0; j < checkedGlasses.length; j++) {
                if (byCategories[i].strGlass === checkedGlasses[j] && !byGlasses.some(el => el.idDrink === byCategories[i].idDrink)) {
                    byGlasses.push(byCategories[i]);
                }
            }
        }
        console.log(byGlasses)
        byGlasses = byGlasses.length > 0 ? byGlasses : allCocktails;
        let byIngredients = [];
        for (let i = 0; i < byGlasses.length; i++) {
            for (let j = 0; j < checkedIngredients.length; j++) {
                if (byGlasses[i].ingredientList.some(ingredient => ingredient === checkedIngredients[j]) && !byIngredients.some(el => el.idDrink === byGlasses[i].idDrink)) {
                    byIngredients.push(byGlasses[i]);
                }
            }
        }
        console.log(byIngredients)
        navigation.navigate('FilteredCocktails', { filteredCocktails: byIngredients })
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
        <ImageBackground
            source={{ uri: 'https://i.imgur.com/urdfAiX.jpg' }}
            style={styles.backImage}
        >
                <View style={styles.container}>
                    <ScrollView>
                        <View>
                            <View style={{ marginBottom: 30 }}>
                                <Accordion
                                    title={'Filter By Alcoholic'}
                                    list={alcoholicList}
                                    selected={selectedAlcoholic}
                                    selectHandler={(item) => setSelectedAlcoholic(item)}
                                />
                                <Accordion
                                    title={'Filter By Category'}
                                    list={categories}
                                    checkedList={checkedCategories}
                                    isMultiSelect
                                    selectHandler={(item) => updateCheckedList('categories', item)}
                                />
                                <Accordion
                                    title={'Filter By Glass'}
                                    list={glassList}
                                    checkedList={checkedGlasses}
                                    isMultiSelect
                                    selectHandler={(item) => updateCheckedList('glasses', item)}
                                />
                                <Accordion
                                    filter={'ingredients'}
                                    title={'Filter By Ingredient'}
                                    list={ingredientList}
                                    checkedList={checkedIngredients}
                                    isMultiSelect
                                    selectHandler={(item) => updateCheckedList('ingredients', item)}
                                />
                            </View>
                        </View>
                        <View>
                            <Button
                                title="Clear filters"
                                type="solid"
                                buttonStyle={{ padding: 10, backgroundColor: Colors.warning }}
                                containerStyle={{ marginBottom: 10 }}
                                onPress={clearFiltersHandler}
                            />
                            <Button
                                title="Show Results"
                                type="solid"
                                buttonStyle={{ padding: 10, backgroundColor: Colors.success }}
                                onPress={filterCocktails}
                            />
                        </View>
                    </ScrollView>
                </View>
        </ImageBackground>
    );
};

export default Filters;